import { authService } from '../services/auth.service.js';

const login = async (email, password) =>{
  let isLoggedIn = false;

  const user = await authService.auth(email, password)
    .then(user => {
      if(user.length > 0){
        localStorage.setItem('user', JSON.stringify(user[0]));
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        isLoggedIn = true;
      }

      return user;

    })
    .catch(error => {
      console.log(error);
    })

  if(!isLoggedIn){
    notification( 'Usuario o contraseña incorrectos', 'error');
  }else{
    notification( 'Redireccionando...', 'success');
    setTimeout(() => {
      if(user[0].role === 'admin'){
        window.open('admin.html', '_self');
      }else{
        window.open('index.html', '_self');
      }
    }, 1000)
  }
}

const validateFormLogin = (event) => {
  event.preventDefault();
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  if (email.value === "") {
    document.getElementById('error-email').innerHTML = "Por favor, escribe tu correo electrónico";
    email.focus();
    return false;
  }else{
    document.getElementById('error-email').innerHTML = "";
  }

  if (!emailValido(email.value)) {
    document.getElementById('error-email').innerHTML = "Por favor, escribe un correo electrónico válido";
    email.focus();
    return false;
  }else{
    document.getElementById('error-email').innerHTML = "";
  }

  if (password.value === "") {
    document.getElementById('error-password').innerHTML = "Por favor, escribe tu clave.";
    password.focus();
    return false;
  }else{
    document.getElementById('error-password').innerHTML = "";
  }

  //return true; //Se pueden enviar los datos del formulario al servidor
  //window.open('admin.html', '_self');
  login(email.value, password.value);
}

const validateFormRegister = (event) => {
  event.preventDefault();
  const name = document.getElementById('name');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  if (name.value === "") {
    document.getElementById('error-name').innerHTML = "Por favor escribe tu nombre.";
    name.focus();
    return false;
  }else{
    document.getElementById('error-name').innerHTML = "";
  }

  if (username.value === "") {
    document.getElementById('error-username').innerHTML = "Por favor escribe tu nombre de usuario.";
    username.focus();
    return false;
  }else{
    document.getElementById('error-username').innerHTML = "";
  }

  if (email.value === "") {
    document.getElementById('error-email').innerHTML = "Por favor, escribe tu correo electrónico";
    email.focus();
    return false;
  }else{
    document.getElementById('error-email').innerHTML = "";
  }

  if (!emailValido(email.value)) {
    document.getElementById('error-email').innerHTML = "Por favor, escribe un correo electrónico válido";
    email.focus();
    return false;
  }else{
    document.getElementById('error-email').innerHTML = "";
  }

  if (password.value === "") {
    document.getElementById('error-password').innerHTML = "Por favor, escribe tu clave.";
    password.focus();
    return false;
  }else{
    document.getElementById('error-password').innerHTML = "";
  }

  const user = {
    id: new Date().getTime(),
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
    role: 'user'
  }

  authService.register(user)
    .then(response => {
      notification( 'Usuario registrado correctamente', 'success');
      localStorage.setItem('email', email.value);
      localStorage.setItem('password', password.value);
      localStorage.setItem('user', JSON.stringify(user));
      setTimeout(() => {
        window.open('index.html', '_self');
      }, 1000)
    })
    .catch(error => {
      notification( 'Error al registrar usuario', 'error');
    })
}

// Redirección a la página de admin en caso exista una sesión iniciada
function redirectAdmin(key){
  const emailSession = localStorage.getItem('email');
  const passwordSession = localStorage.getItem('password');

  if(emailSession !== null && passwordSession !== null){
    window.open('admin.html', '_self');
  }
}

const btnRegister = document.getElementById('btnRegister');
if(btnRegister){
  btnRegister.addEventListener('click', () => {
    window.open('register.html', '_self');
  });
}

const btnLogin = document.getElementById('btnLogin');
if(btnLogin){
  btnLogin.addEventListener('click', () => {
    window.open('login.html', '_self');
  });
}

const formularioLogin = document.getElementById('formularioLogin');
if(formularioLogin){
  formularioLogin.addEventListener('submit', (event) => {
    validateFormLogin(event);
  });
}

const formularioRegister = document.getElementById('formularioRegister');
if(formularioRegister){
  formularioRegister.addEventListener('submit', (event) => {
    validateFormRegister(event);
  });
}

redirectAdmin();
