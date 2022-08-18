let parrafoFooter = document.querySelector("#Parrafo");
parrafoFooter.innerText =
  "CEO - Almagro 135, Catamarca - Argentina / centrodeesteticayodontologia@gmail.com tel:383-4453272";

const usuario = [{ nombre: "pablo", mail: "x", pass: "x" }];
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

function recuperarUsuario(storage) {
  return JSON.parse(storage.getItem("usuario"));
}
function guardarDatos(admin, storage) {
  const usuario = {
    name: admin.nombre,
    user: admin.email,
    pass: admin.pass,
  };

  storage.setItem("usuario", JSON.stringify(usuario));
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

function estaLogueado(usuario) {
  if (usuario) {
    saludar(usuario);
    
      cargarPaciente();
    
    intercambiarClases(toggles, "d-none");
  }
}
function saludar(usuario) {
  nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`;
}
function intercambiarClases(array, clase) {
  array.forEach((element) => {
    element.classList.toggle(clase);
  });
}
function cargarPaciente() {
  
  turnos.forEach((turno, i) => {
    tablaPaciente.innerHTML +=
    `
    <tr>
    <th scope="row">${i + 1}</th>
    <td>${turno.nombre}</td>
    <td>${turno.tel}</td>
    <td>${turno.comentario}</td>
    </tr>
    `
  });
}

function borrarDatos() {
  localStorage.removeItem("usuario");
  sessionStorage.clear();
}
btnLogout.addEventListener("click", () => {
  borrarDatos();
  window.location.href = "../index.html";
  intercambiarClases(toggles, "d-none");
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
    let data = validarUsuario(usuario, mailLogin.value, passLogin.value);
    
    if (!data) {
      swal.fire({
        title: "Error",
        text: "Usuario y/o contraseña erróneos",
        icon: "error",
      });
    } else {
      guardarDatos(data, localStorage);
      saludar(recuperarUsuario(localStorage));
      
      cargarPaciente();
      
      location.reload();
      modal.hide();
      intercambiarClases(toggles, "d-none");
    }
  }
});
estaLogueado(recuperarUsuario(localStorage));
const mostrarTurnos = () => {
  if (turnos.length) {
    for (let i = 0; i < turnos.length; i++) {
      /*  Toastify({
          text:`        Nombre: ${turnos[i].nombre}
          Telefono: ${turnos[i].tel} 
          Doctor/a: ${turnos[i].doctor}
          Comentario: ${turnos[i].comentario}
          `
        }).showToast(); */
        /* swal.fire(
          {
            title:'Ficha del Paciente',
            icon:'info',
          }
          ) */
          /*  alert(
            `        Nombre: ${turnos[i].nombre}
            Telefono: ${turnos[i].tel} 
            Doctor/a: ${turnos[i].doctor}
            Comentario: ${turnos[i].comentario}
            `
            ); */
          }
        }
      };
      
      