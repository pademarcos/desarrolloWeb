const parrafoFooter = document.querySelector("#Parrafo");
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
let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
const enviar = document.getElementById("btnEnviar");
const nombre = document.getElementById("nameInput");
const tel = document.getElementById("telInput");
const comentario = document.getElementById("txtComent");
const doctor = document.getElementById("drSelect");
const turnoMail = document.getElementById("turnoMail");
const listaColumna = document.querySelectorAll(".ordenarPor");
let borrarBtn = null;

parrafoFooter.innerText =
  "CEO - Almagro 135, Catamarca - Argentina / centrodeesteticayodontologia@gmail.com tel:383-4453272";

function recuperarUsuario() {
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario) {
    usuario = JSON.parse(sessionStorage.getItem("usuario"));
  }
  return usuario;
}

function guardarDatos(usuario, persistir) {
  if (persistir) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  } else {
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
  }
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
  if (usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a: <span class="nameUsuario">${usuario.nombre}</span>`;
  } else {
    nombreUsuario.innerHTML = "";
  }
}

function intercambiarClases(array, clase) {
  array.forEach((element) => {
    element.classList.toggle(clase);
  });
}

function eliminarTurno(indexTurno) {
  turnos.splice(indexTurno, 1);
  localStorage.setItem("turnos", JSON.stringify(turnos));
  location.reload();
}

function cargarPaciente() {
  tablaPaciente.innerHTML = "<div></div>";
  turnos.forEach((turno, i) => {
    tablaPaciente.innerHTML += `
    <tr>
    <th scope="row">${i + 1}</th>
    <td>${turno.nombre}</td>
    <td>${turno.tel}</td>
    <td>${turno.doctor}</td>
    <td>${turno.mail}</td>
    <td>${turno.comentario}</td>
    <td><button id="${i}" type="button" class="borrarBtn btn btn-danger">Eliminar</button></td>
    </tr>
    `;
  });

  if (turnos.length) {
    listaBorrarBtn = document.querySelectorAll(".borrarBtn");
    listaBorrarBtn.forEach((borrarBtn) => {
      borrarBtn.addEventListener("click", (e) => {
        eliminarTurno(e.srcElement.id);
      });
    });
  }
}

function ordenar(valor) {
  let ordenados = turnos.slice(0);
  return ordenados.sort((o1, o2) => {
    if (o1[valor] > o2[valor]) {
      return 1;
    } else if (o1[valor] < o2[valor]) {
      return -1;
    }
    return 0;
  });
}

function borrarDatos() {
  localStorage.removeItem("usuario");
  sessionStorage.removeItem("usuario");
}

listaColumna.forEach((titulo) => {
  titulo.addEventListener("click", (e) => {
    const ordenados = ordenar(e.target.id);
  turnos = ordenados;
  cargarPaciente();
  });
});

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
    let data = validarUsuario(
      usuariosPermitidos,
      mailLogin.value,
      passLogin.value
    );
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

estaLogueado(recuperarUsuario());


