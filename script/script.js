const parrafoFooter = document.querySelector("#Parrafo");
const usuariosPermitidos = [{ nombre: "pablo", mail: "x", pass: "x" }];
const mailLogin = document.getElementById("emailLogin");
const passLogin = document.getElementById("passwordLogin");
const recordar = document.getElementById("recordarme");
const btnLogin = document.getElementById("login");
const nombreUsuario = document.getElementById("nombreUsuario");
const rowPaciente = document.getElementById("rowPaciente");
const modalEl = document.getElementById("modalLogin");
const modal = new bootstrap.Modal(modalEl);
const toggles = document.querySelectorAll(".toggles");
const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
const enviar = document.getElementById("btnEnviar");
const nombre = document.getElementById("nameInput");
const tel = document.getElementById("telInput");
const comentario = document.getElementById("txtComent");
const doctor = document.getElementById("drSelect");
const turnoMail = document.getElementById("turnoMail");

parrafoFooter.innerText =
"CEO - Almagro 135, Catamarca - Argentina / centrodeesteticayodontologia@gmail.com tel:383-4453272";

class turno {
  constructor(nombre, tel, doctor, mail, comentario) {
    this.nombre = nombre;
    this.tel = tel;
    this.doctor = doctor;
    this.mail = mail;
    this.comentario = comentario;
  }
}

function guardarDatos(usuario, persistir) {
  if (persistir) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  } else {
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
  }
}

function intercambiarClases(array, clase) {
  array.forEach((element) => {
    element.classList.toggle(clase);
  });
}

function estaLogueado(usuario) {
  if (usuario) {
    saludar(usuario);
    intercambiarClases(toggles, "d-none");
  }
}

function recuperarUsuario() {
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario) {
    usuario = JSON.parse(sessionStorage.getItem("usuario"));
  }
  return usuario
}

function validarUsuario(admin, user, pass) {
  let encontrado = admin.find((admin) => admin.mail == user);

  if (typeof encontrado === "undefined") {
    return false;
  } else {
    if (encontrado.pass != pass) {
      return false;
    } else {
      return encontrado;
    }
  }
}

function borrarDatos() {
  localStorage.removeItem("usuario");
  sessionStorage.removeItem("usuario");
}

function saludar(usuario) {
  if (usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a: <span class="nameUsuario">${usuario.nombre}</span>`;
  } else {
    nombreUsuario.innerHTML = "";
  }
}

function agregarTurno() {
  const nuevoTurno = new turno(
    nombre.value,
    tel.value,
    doctor.value,
    turnoMail.value,
    comentario.value
  );
  turnos.push(nuevoTurno);
  localStorage.setItem("turnos", JSON.stringify(turnos));
}

btnLogout.addEventListener("click", () => {
  borrarDatos();
  intercambiarClases(toggles, "d-none");
  window.location.href = "../index.html";
});

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (!mailLogin.value || !passLogin.value) {
    swal.fire({
      title: "Atención!",
      text: "Todos los datos son requeridos",
      icon: "info",
    });
  } else {
    let data = validarUsuario(usuariosPermitidos, mailLogin.value, passLogin.value);
    if (!data) {
      swal.fire({
        title: "Error",
        text: "Usuario y/o contraseña erróneos",
        icon: "error",
      });
    } else {
      guardarDatos(data, recordar.checked);
      saludar(recuperarUsuario());
      modal.hide();
      intercambiarClases(toggles, "d-none");
      window.location.href = "../enlaces/admin.html";
    }
  }
});


    
     
 


//EmailJS
if (window.location.href.includes("contacto.html")) {
  enviar.addEventListener("click", () => {
    agregarTurno();
document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   enviar.value = 'Enviando..';

   const serviceID = 'default_service';
   const templateID = 'template_fyntten';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      enviar.value = 'Enviar';
      swal.fire({
        title: "CEO",
        text: "El mensaje ha sido enviado correctamente, pronto nos comunicaremos con Ud.",
        icon: "info",
      });
    }, (err) => {
      enviar.value = 'Enviar';
      alert(JSON.stringify(err));
    });
});

 });
 //aqui no se como hacer para que funcione recargar la web una vez enviado el mail y mostrado el sweetalert.
then(() => {
        location.reload();
      });
};
estaLogueado(recuperarUsuario());