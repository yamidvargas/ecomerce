import { productsServices } from '../services/products.service.js';
import { categoriesServices } from '../services/categories.service.js';
// Obtenemos los valores de la url
let valores = window.location.search;
//Creamos la instancia URLSearchParams para acceder a los valores de la url
let urlParams = new URLSearchParams(valores);

const createCardMore = (category, products) => {
  let productosMore = document.getElementById('productos')
  productosMore.innerHTML = '';
  const $html = `
      <div class="item-producto d-flex justify-content-between align-items-center">
        <h2 class="category-title">${category.name}</h2>
        <a href="./" class="more-products">Volver</a>
      </div>
      <div class="items d-grid">
        ${ products.map(product => {
          if(parseInt(product.category) === category.id){
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
          }}).join('') }
      </div>
    `;
  productosMore.innerHTML += $html;

}

const getProductsByCategory = async () => {
  let categoryId = Number(urlParams.get('categoryId'));

  productsServices.getProducts()
    .then(async products => {
      let category = await categoriesServices.getCategoryById(categoryId)
        .then(category => {
          return category;
        })
        .catch(err => {
          console.log(err);
        })
      console.log(category);
      createCardMore(category, products);
    })
    .catch(err => {
      console.log(err);
  })
}

getProductsByCategory();
