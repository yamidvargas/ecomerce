import { productsServices } from '../services/products.service.js';
import { categoriesServices } from '../services/categories.service.js';
// Obtenemos los valores de la url
let valores = window.location.search;
//Creamos la instancia URLSearchParams para acceder a los valores de la url
let urlParams = new URLSearchParams(valores);

const createCard = (category, products) => {
  let productosAll = document.getElementById('productos')

  if(productosAll && productosAll.innerHTML === 'Loading...'){
    productosAll.innerHTML = '';
  }

  const $html = `
      <div class="item-producto d-flex justify-content-between align-items-center">
        <h2 class="category-title">${category.name}</h2>
        <a href="more.html?categoryId=${category.id}" class="more-products">Ver Todo</a>
      </div>
      <div class="items d-grid">
        ${ products.map(product => {
          //if(parseInt(product.category) === category.id){
            return `
                <div class="card scroll-content fadeTop" id="cart-item-${product.id}">
                  ${(product.discount) ? '<span class="oferta d-flex align-items-center"><span class="material-icons-two-tone mr-1">local_offer</span>  Off -'+ product.discount + '% </span>' : ''}
                  <div class="card-thumb">
                    <img src="${product.photo_url}" alt="photo" style="width:100%">
                    <div class="card-content">
                      <div class="rating">
                        <span class="material-icons">star_rate</span>
                        <span class="material-icons">star_rate</span>
                        <span class="material-icons">star_rate</span>
                        <span class="material-icons">star_rate</span>
                        <span class="material-icons">star_border</span>
                      </div>
                      <div class="card-actions d-flex">
                        <a class="visibility" href="details.html?id=${product.id}"><span class="material-icons">visibility</span></a>
                        <a class="favorite" href="javascript:"><span class="material-icons">favorite</span></a>
                        <a class="shopping" href="javascript:" 
                          onclick="addToCart('${product.id}', '${product.photo_url}', '${product.name}', '${product.price}')">
                          <span class="material-icons">add_shopping_cart</span>
                        </a>
                      </div>
                      <div class="all-view">
                          <a href="more.html?categoryId=${product.category}" class="fancy-btn-alt fancy-btn-small">Ver similares</a>
                      </div>
                    </div>
                  </div>
                  
                  <div class="card-item-info">
                    <a class="detalles" href="details.html?id=${product.id}">${product.name}</a>
                    <p> 
                      ${(product.discount) ? '<span class="price-antes">$' + (parseFloat(product.price) + parseFloat(product.price*product.discount/100)).toFixed(2) + '</span> &nbsp;' : '' }
                      $ ${product.price}</p>
                  </div>
                </div>
              `
          //}
        }).join('') }
      </div>
    `;
  if(productosAll){
    productosAll.innerHTML += $html;
  }

}

const createCardAdmin = (products) => {
  let productosAdmin = document.getElementById('productos-admin')
  products.map((product, i) => {
    const $html = `
        <div class="card admin ${i >11 ? 'scroll-content fadeTop': ''}" id="item-${product.id}">
          <div class="card__header">
            <span class="material-icons" role="button" tabindex="1"
            data-edit>
              edit
            </span>
            <span class="material-icons" role="button" tabindex="1"
            data-delete>
              delete
            </span>
          </div>
          <div class="card-thumb">
            <img src="${product.photo_url}" alt="photo" style="width:100%">
          </div>
          
          <div class="card-item-info">
            <a class="detalles" href="details.html?id=${product.id}">${product.name}</a>
            <p>$ ${product.price}</p>
          </div>
        </div>
      `
    if(productosAdmin){
      productosAdmin.innerHTML += $html;
      productosAdmin.querySelectorAll('[data-edit]').forEach((btn, i) => {
        btn.addEventListener('click', () => {
          editar(products[i].id);
        })
      })

      productosAdmin.querySelectorAll('[data-delete]').forEach((btn) => {
        btn.addEventListener('click', () => {
          eliminar(products[i].id);
        })
      })
    }

  }).join('')
}

categoriesServices.getCategories()
  .then((categories) => {
    categories.map( async (category) => {
      await productsServices.getProductsByCategory(category.id, 6)
        .then((products) => {
          createCard(category, products);
        })
        .catch((err) => {
          console.log(`Ocurrió un error al obtener los productos: ${err}`);
        })
    })
  }).catch(err => {
    console.log(`Ocurrió un error al obtener las categorias: ${err}`);
  })

productsServices.getProducts()
  .then((products) => {
    createCardAdmin(products);
  })
  .catch((error) => {
    console.log(`Ocurrió un error al obtener los productos: ${error}`);
  })

const editar = (id) => {
  location.href = 'add.html?id=' + id;
}

const eliminar = (id) => {
  productsServices.deleteProduct(id)
    .then(() => {
      notification('Producto eliminado correctamente', 'success');

      setTimeout(() => {
        location.reload();
      }, 1000);
    })
    .catch((error) => {
      notification('Ocurrio un error al eliminar el producto', 'error');
    })
}

// Buscar productos
let search = document.getElementById('search-producto');
let btn__buscar = document.getElementById('btn__buscar');
let btn__limpiar = document.getElementById('btn__limpiar');

const filtrar = () => {
  btn__limpiar.style.opacity = '1';
  const text = search.value.toLowerCase();

  productsServices.getProducts() // Obtenemos los productos
    .then((products) => {
      products.map((product) => {
        let item = document.getElementById('item-' + product.id);
        if(product.name.toLowerCase().includes(text)){
          item.style.display = 'block';
        }else{
          item.style.display = 'none';
        }
      })
    }).catch((error) => {
      console.log(`Ocurrio un error al obtener los productos: ${error}`);
    })
}

btn__buscar.addEventListener('click', filtrar);
btn__limpiar.addEventListener('click', () => {
  search.value = '';
  filtrar();
  btn__limpiar.style.opacity = '0';
})
