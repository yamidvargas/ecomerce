const urlServer = 'https://apifake-json-server.herokuapp.com';

const getCategories = async () => {
  const res = await fetch(`${urlServer}/categories?_sort=id&_order=asc`);
  const data = await res.json();
  return data;
}

const getCategoryById = async (id) => {
  const res = await fetch(urlServer + '/categories/' + id);
  const data = await res.json();
  return data;
}

const createCategory = async (category) => {
  const res = await fetch(urlServer + '/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category)
  });
  const data = await res.json();
  return data;
}

const updateCategory = async (category) => {
  const res = await fetch(urlServer + '/categories/' + category.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category)
  });
  const data = await res.json();
  return data;
}

const deleteCategory = async (id) => {
  const res = await fetch(urlServer + '/categories/' + id, {
    method: 'DELETE'
  });
  const data = await res.json();
  return data;
}

export const categoriesServices = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}
