const $grande = document.querySelector('.grande')
const $puntos = document.querySelectorAll('.punto')
const $images = document.querySelectorAll('.img')
const $btnLeft = document.getElementById('btn-left')
const $btnRight = document.getElementById('btn-right')

const $arrayPuntos = [...$puntos];
const $arrayImages = [...$images];

if($grande){
  $grande.style.width = `${$arrayPuntos.length * 100}%`;
}

function next(){
  let position = Number(document.getElementById('position').value);
  position++;

  if(position > $arrayPuntos.length - 1){
    position = 0;
  }

  let operacion = position * -(100 / $arrayPuntos.length);
  $grande.style.transform = `translateX(${operacion}%)`;

  $arrayPuntos.map( (punto) => {
    punto.classList.remove('active');
  })
  const punto = document.querySelectorAll('.punto')[position];
  punto.classList.add('active');
  document.getElementById('position').value = position;
}

function prev(){
  let position = Number(document.getElementById('position').value);
  position--;

  if(position <= 0){
    position = $arrayPuntos.length - 1;
  }

  //$grande.style.transition = 'all 1s ease';

  let operacion = position * -(100 / $arrayPuntos.length);
  $grande.style.transform = `translateX(${operacion}%)`;

  $arrayPuntos.map( (punto) => {
    punto.classList.remove('active');
  })

  const punto = document.querySelectorAll('.punto')[position];

  punto.classList.add('active');

  document.getElementById('position').value = position;
}

$arrayPuntos.forEach( (punto, i) => {
  punto.addEventListener('click', () => {

    let position =  i
    let operacion = position * -(100 / $arrayPuntos.length);

    $grande.style.transform = `translateX(${operacion}%)`;

    $arrayPuntos.map( (punto) => {
      punto.classList.remove('active');
    })

    punto.classList.add('active');

    document.getElementById('position').value = position;
  })
})

$arrayImages.map( (img) => {
  img.style.width = `${100 / $arrayImages.length}%`;
})

if($btnRight){
  $btnRight.addEventListener('click', () => {
    next();
  })
}

if($btnLeft){
  $btnLeft.addEventListener('click', () => {
    prev();
  })
}

setInterval(() => {
  next();
}, 5000)
