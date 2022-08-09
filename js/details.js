import { productsServices } from '../services/products.service.js';
// Obtenemos los valores de la url
let valores = window.location.search;
//Creamos la instancia URLSearchParams para acceder a los valores de la url
let urlParams = new URLSearchParams(valores);

const createDetails = (product) => {
  const $details = document.getElementById('productos-details');
  const $html = `
    <div class="details d-flex">
      <div class="details__photo">
        <img
          src="${product.photo_url}"
          alt="producto"
        />
      </div>
      <div class="product__info">
        <h2 class="product__info--title">${product.name}</h2>
        <div
          class="d-flex justify-content-between product__info--disponible"
        >
          <span class="disponible">
            <i class="material-icons">check</i> Disponible
          </span>
          <span class="codigo"> SKU 1205698 </span>
        </div>
        <div class="rate">
          <span class="material-icons">star_rate</span>
          <span class="material-icons">star_rate</span>
          <span class="material-icons">star_rate</span>
          <span class="material-icons">star_rate</span>
          <span class="material-icons">star_border</span>
        </div>
        <div class="prices">
          <span class="price">$${product.price}</span>
          <small class="price--old">$1.500</small>
        </div>
        <div class="add-shoping">
          <div class="div__input--cant">
            <button id="menos" data-menos>
              <span class="material-icons">remove</span>
            </button>
            <input type="text" value="1" id="cantidad" min="1" max="9" />
            <button id="mas" data-mas>
              <span class="material-icons">add</span>
            </button>
          </div>
          <div class="details__actions">
            <button id="add__to_cart" type="button" data-addcart>
              <span class="material-icons">shopping_cart</span>
            </button>
            <button id="favorite" data-favorite>
              <span class="material-icons">favorite</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="description">
      <p>
        ${product.description}
      </p>
    </div>
  `;

  $details.innerHTML = $html;
  $details.querySelector('[data-mas]').addEventListener('click', () => {
    addCantidad('mas');
  })

  $details.querySelector('[data-menos]').addEventListener('click', () => {
    addCantidad('menos');
  })

  $details.querySelector('[data-addcart]').addEventListener('click', () => {
    const id = product.id;
    const cantidad = document.getElementById('cantidad');
    const quantity = Number(cantidad.value);
    const price = Number(product.price);
    const name = product.name;
    const photo_url = product.photo_url;

    addToCart(id, photo_url, name,price, quantity)
  })
}

const productsRelacionados = (products) => {
  let productosAdmin = document.getElementById('products__relacionados')
  productosAdmin.innerHTML = '';
  products.map((product) => {
      const $html = `
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
      `;

      if(productosAdmin){
        productosAdmin.innerHTML += $html;

      }
  }).join('')
}

const addCantidad = (action) => {
  if(action === 'mas'){
    if(cantidad.value <= 8){
      cantidad.value = Number(cantidad.value) + 1;
    }

  }else{
    if(cantidad.value > 1){
      cantidad.value = Number(cantidad.value) - 1;
    }
  }
}

if (urlParams.has('id')){
  const id = urlParams.get('id');
  productsServices.getProductById(id)
    .then((product) => {
      createDetails(product);
      productsServices.getProductsByCategory(product.category)
        .then((products) => {
          productsRelacionados(products);
        })
        .catch((error) => {
          console.log(`Ocurrio un error al obtener los productos: ${error}`);
        })
    }).catch((error) => {
      console.log(`Ocurrio un error al obtener el producto: ${error}`);
    })
}
