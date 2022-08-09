const inputs = document.querySelectorAll("input");
const textareas = document.querySelectorAll("textarea");

inputs.forEach((input) => {
  input.addEventListener("blur", (event) => {
    if (event.target.value) {
      input.classList.add("is-valid");
    } else {
      input.classList.remove("is-valid");
    }
  });
});

textareas.forEach((text) => {
  text.addEventListener("blur", (event) => {
    if (event.target.value) {
      text.classList.add("is-valid");
    } else {
      text.classList.remove("is-valid");
    }
  });
});

const emailValido = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const validateForm = (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre');

  const mensaje = document.getElementById('mensaje');

  if (nombre.value === "") {
    //alert("Por favor, escribe tu nombre y apellidos.");
    document.getElementById('error-nombre').innerHTML = "Por favor, escribe tu nombre y apellidos.";
    nombre.focus();
    return false;
  }else{
    document.getElementById('error-nombre').innerHTML = "";
  }

  if (mensaje.value === "") {
    //alert("Por favor, escribe un mensaje.");
    document.getElementById('error-mensaje').innerHTML = "Por favor, escribe un mensaje.";
    mensaje.focus();
    return false;
  }else{
    document.getElementById('error-mensaje').innerHTML = "";
  }

  return true; //Se pueden enviar los datos del formulario al servidor
}

const submitBtn = document.getElementById('btnDone');
submitBtn.addEventListener('click', validateForm);
