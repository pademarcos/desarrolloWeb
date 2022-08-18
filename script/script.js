/* const pacientes = [
  { nombre: "Pablo", apellido: "de Marcos", edad: "39", tel: "3834008551" },
];

class paciente {
  constructor(nombre, apellido, edad, tel) {
    (this.nombre = nombre),
      (this.apellido = apellido),
      (this.edad = edad),
      (this.tel = tel);
  }
}
function ingresarPaciente() {
  let nuevoNombre = prompt("Ingrese el Nombre del nuevo paciente: ");
  let nuevoApellido = prompt("Ingrese el Apellido del nuevo paciente: ");
  let nuevaEdad = prompt("Ingrese la Edad del nuevo paciente: ");
  let nuevoTel = prompt("Ingrese el telefono del paciente a registrar: ");
  pacientes.push(new paciente(nuevoNombre, nuevoApellido, nuevaEdad, nuevoTel));
}
const mostrarPacientes = () => {
  for (let i = 0; i < pacientes.length; i++) {
    alert(
      `        Apellido: ${pacientes[i].apellido}
        Nombre:   ${pacientes[i].nombre}
        Edad:     ${pacientes[i].edad}
        Telefono: ${pacientes[i].tel} 
        `
    );
    console.log(
      "Nombre: " +
        pacientes[i].nombre +
        "\n" +
        "Apellido: " +
        pacientes[i].apellido +
        "\n" +
        "Edad: " +
        pacientes[i].edad +
        "\n" +
        "Telefono: " +
        pacientes[i].tel
    );
  }
};
function lista() {
  let opcion = prompt(
    "Agenda pacientes CEO: \n1 Lista de Pacientes \n2 Nuevo Paciente \n3 Salir"
  );
  if (opcion != "3") {
    switch (opcion) {
      case "1":
        mostrarPacientes();
        break;
      case "2":
        ingresarPaciente();
        mostrarPacientes();
        break;
      default:
        break;
    }
    lista();
  } else {
    alert("Gracias!");
  }
}
lista();
 */
//Desafio complementario: 'Interactuar con HTML'


let parrafoFooter = document.querySelector('#Parrafo');
parrafoFooter.innerText = 'CEO - Almagro 135, Catamarca - Argentina / centrodeesteticayodontologia@gmail.com tel:383-4453272';
 
const usuario = [{nombre:'pablo',mail:'x',pass:'x'}]; 
const mailLogin = document.getElementById('emailLogin');
const passLogin = document.getElementById('passwordLogin');
const recordar = document.getElementById('recordarme');
const btnLogin = document.getElementById('login');
const nombreUsuario = document.getElementById('nombreUsuario');
const rowPaciente = document.getElementById('rowPaciente');
const modalEl = document.getElementById('modalLogin');
const modal = new bootstrap.Modal(modalEl);
const toggles = document.querySelectorAll('.toggles'); 
 
function guardarDatos(admin, storage) {
  const usuario = {
      'name': admin.nombre,
      'user': admin.email,
      'pass': admin.pass
  }
  storage.setItem('usuario', JSON.stringify(usuario));
}
//revisar
function intercambiarClases(array, clase) {
  array.forEach(element => {
      element.classList.toggle(clase);
  })
}

function estaLogueado(usuario) {
  if (usuario) {
      saludar(usuario);
      mostrarTurnos();
      intercambiarClases(toggles, 'd-none');
  }
}

function recuperarUsuario(storage) {
  return JSON.parse(storage.getItem('usuario'));
}

function validarUsuario(admin, user, pass) {
  let encontrado = admin.find((admin) => admin.mail == user);
  
  if (typeof encontrado === 'undefined') {
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
  localStorage.removeItem('usuario');
  sessionStorage.clear();
}

function saludar(usuario) {
  nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`
}

function cargarPaciente(paciente) {
  rowPaciente.innerHTML = `
  <th scope="row">1</th>
  <td>${paciente.nombre}</td>
  <td>${paciente.tel}</td>
  <td>${paciente.email}</td>
  <td>${paciente.comentario}</td>
  `
}

btnLogout.addEventListener('click', () => {
  borrarDatos();
  intercambiarClases(toggles, 'd-none');
});

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  if (!mailLogin.value || !passLogin.value) {
    alert('Todos los campos son requeridos');
    
  } else {
    let data = validarUsuario(usuario, mailLogin.value, passLogin.value);
    
    if (!data) {
      alert(`Usuario y/o contraseña erróneos`);
    } else {
      
      if (recordar.checked) {
        guardarDatos(data, localStorage);
        saludar(recuperarUsuario(localStorage));
        window.location.href='../enlaces/admin.html';
        turnos.forEach(paciente => {
          cargarPaciente(paciente);
        });
      } else {
        guardarDatos(data, sessionStorage);
        saludar(recuperarUsuario(sessionStorage));
        window.location.href='../enlaces/admin.html';
        turnos.forEach(paciente => {
          cargarPaciente(paciente);
        });
      }
      modal.hide();
      intercambiarClases(toggles, 'd-none');
    }
  }
})

const turnos = JSON.parse(localStorage.getItem('turnos')) || [];
const enviar = document.getElementById('btnEnviar');
const nombre = document.getElementById('nameInput');
const tel = document.getElementById('telInput');
const comentario = document.getElementById('txtComent')
const doctor = document.getElementById('drSelect');

enviar.addEventListener('click',()=>{
  agregarTurno();
})

class turno{
  constructor(nombre, tel, doctor, comentario) {
    this.nombre = nombre;
    this.tel = tel;
    this.doctor = doctor;
    this.comentario = comentario;
  }
}

function agregarTurno(){
  const nuevoTurno = new turno(nombre.value, tel.value, doctor.value, comentario.value)
  turnos.push(nuevoTurno);
  localStorage.setItem('turnos', JSON.stringify(turnos));
}

const mostrarTurnos = () => {
  if (turnos.length) {
    for (let i = 0; i < turnos.length; i++) {
      /* Toastify({
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
        alert(
          `        Nombre: ${turnos[i].nombre}
          Telefono: ${turnos[i].tel} 
          Doctor/a: ${turnos[i].doctor}
          Comentario: ${turnos[i].comentario}
          `
          );
        }
      }
    }

    estaLogueado(recuperarUsuario(localStorage));