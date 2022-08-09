window.addEventListener('scroll', function()  {
  let elements = document.querySelectorAll('.scroll-content');
  let screenSize = window.innerHeight;
  for(var i = 0; i < elements.length; i++) {
    var element = elements[i];

    if(element.getBoundingClientRect().top < screenSize - 80) {

      element.classList.add('visible');
    } else {
      element.classList.remove('visible');
    }
  }
});

const addToCart = (id, url_img, producto, price, quantity= 1) => {
  const cartItems = localStorage.getItem('cartItems');
  const products = cartItems ? [...JSON.parse(cartItems)] : [];
  const cart = {
    id,
    url_img,
    producto,
    price,
    quantity
  }

  products.push(cart);

  localStorage.setItem('cartItems', JSON.stringify(products));

  addToCartItem(id, url_img, producto, price, quantity);

  notification('Producto agregado al carrito', 'success');
}

const addToCartItem = (id, url_img, producto, price, quantity= 1) => {
  let $cartItems = document.getElementById('cart__content');

  const total = Number(price) * Number(quantity);
  let html = `<div class="cart__item d-flex align-items-center" id="cart__item-${id}">
            <div class="cart__item--img">
              <img src="${url_img}" alt="producto" class="cart-img"/>
            </div>
            <div class="cart__body d-flex align-items-center">
              <div class="item__name d-flex justify-content-center align-items-center w-100">
                <h3>${producto}</h3>
              </div>
              <div class="cart__info d-flex justify-content-between align-items-center w-100">
                <div class="item__price">
                  <p>Precio</p>
                  <span class="price">${price}</span>
                </div>
                <div class="item__cantidad">
                  <p>Cantidad</p>
                  <span class="cantidad">${quantity}</span>
                </div>
                <div class="item__total">
                  <p>Total</p>
                  <span class="total">${total}</span>
                </div>
                <div role="button" class="item__btn" tabindex="-1" id="item__btn-${id}" onclick="removeItem(${id})">
                  <span class="material-icons">delete_forever</span>
                </div>
              </div>
            </div>
          </div>`;


  if($cartItems){
    $cartItems.innerHTML += html;
    totalItemsCart();
  }

}

const getCart = () => {
  const cartItems = localStorage.getItem('cartItems');
  if(cartItems){
    if(cartItems){
      const cart = JSON.parse(cartItems);
      cart.forEach(item => {
        addToCartItem(item.id, item.url_img, item.producto, item.price, item.quantity);
      })
    }
  }
}

function showHideCart(){
  const cart = document.getElementById('cart');

  if(cart.classList.contains('show')){
    cart.classList.remove('show');
  }else{
    cart.classList.add('show');
  }
}

function removeItem(id){

  const cartItems = localStorage.getItem('cartItems');
  const products = JSON.parse(cartItems);

  const list = products.filter(item => Number(item.id) !== Number(id));
  localStorage.setItem('cartItems', JSON.stringify(list));

  const cart__item = document.getElementById(`cart__item-${id}`);
  console.log(cart__item)
  cart__item.style.opacity = '0';

  setTimeout(() => {
    cart__item.remove();
    totalItemsCart();
  },300)
}

function totalItemsCart(){
  let items = document.querySelectorAll('.cart__item');
  const arrayItems = [...items];
  document.getElementById('cantidadCart').innerText = `${items.length}`;
  let total = 0;
  arrayItems.forEach((item, i) => {
    const price = Number(item.querySelector('div .price').innerText);
    const cantidad = Number(item.querySelector('div .cantidad').innerText);
    total += price * cantidad;
  })
  document.getElementById('totalPagar').innerText = `$ ${total}`;
}

function notification(message, type){
  const $notification = document.getElementById('notification');
  const $alert = document.createElement('div')

  $alert.classList.add('alert', 'alert-' + type);
  $alert.innerHTML = `
      <p class="alert-text d-flex align-items-center"><span class="material-icons-two-tone mr-1">done</span> ${message}</p>
    `;
  $notification.appendChild($alert);

  setTimeout(() => {
    $alert.classList.add('show')
  }, 100);

  setTimeout(() => {
    $alert.classList.add('hide')
  }, 2000);

  setTimeout(() => {
    $alert.remove()
  }, 2500);
}

const verificarUser = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if(user){
    const btn__login = document.getElementById('btn__login');
    if(btn__login){
      btn__login.setAttribute('href', 'javascript:');
      btn__login.addEventListener('click', () => {
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        location.reload();
      })
      btn__login.innerHTML = `<span class="material-icons-two-tone mr-2">account_circle</span> Logout`;
    }
  }
}

const btnShowCart = document.getElementById('btnShowCart')
const btnCloseCart = document.getElementById('btnCloseCart')

if(btnShowCart && btnCloseCart){
  btnShowCart.addEventListener('click', showHideCart)
  btnCloseCart.addEventListener('click', showHideCart)
}

getCart();
verificarUser();
