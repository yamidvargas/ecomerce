//const urlServer = 'http://localhost:3000';
//const urlServer = 'https://my-json-server.typicode.com/wilmerortiz/api-json-server';
//const urlServer = 'https://62d2e09981cb1ecafa67445b.mockapi.io/api/v1';
const urlServer = 'https://apifake-json-server.herokuapp.com';

const getProducts = async (_limit=null) => {
  const res = await fetch(urlServer + '/products' + (_limit ? '?_limit=' + _limit : ''));
  const data = await res.json();
  return data;
}

const getProductsByCategory = async (category, _limit=null) => {
  const res = await fetch(`${urlServer}/products?category=${category}${_limit ? '&_limit=' + _limit : ''}`);
  const data = await res.json();
  return data;
}

const getProductById = async (id) => {
  const res = await fetch(urlServer + '/products/' + id);
  const data = await res.json();
  return data;
}

const  addProduct = async (product) => {
  const res = await fetch(urlServer + '/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
  const data = await res.json();
  return data;
}

const editProduct = async (product) => {
  const res = await fetch(urlServer + '/products/' + product.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
  const data = await res.json();
  return data;
}

const deleteProduct = async (id) => {
  const res = await fetch(urlServer + '/products/' + id, {
    method: 'DELETE'
  });
  const data = await res.json();
  return data;
}

export const productsServices = {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
  getProductsByCategory
}
