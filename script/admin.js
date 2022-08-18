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
const turnos = JSON.parse(localStorage.getItem('turnos')) || [];
const enviar = document.getElementById('btnEnviar');
const nombre = document.getElementById('nameInput');
const tel = document.getElementById('telInput');
const comentario = document.getElementById('txtComent')
const doctor = document.getElementById('drSelect');

function recuperarUsuario(storage) {
    return JSON.parse(storage.getItem('usuario'));
  }
  function guardarDatos(admin, storage) {

    const usuario = {
        'name': admin.nombre,
        'user': admin.email,
        'pass': admin.pass
    }
  
    storage.setItem('usuario', JSON.stringify(usuario));
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

function estaLogueado(usuario) {

    if (usuario) {
        saludar(usuario);
        turnos.forEach(paciente => {
            cargarPaciente(paciente);
          });
        intercambiarClases(toggles, 'd-none');
    }
  }
  function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`
  }
  function intercambiarClases(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    })
  }
  function cargarPaciente(paciente) {
    rowPaciente.innerHTML = `
    <th scope="row">1</th>
    <td>${paciente.nombre}</td>
    <td>${paciente.tel}</td>
    <td>${paciente.comentario}</td>
    `
  }
  function borrarDatos() {
    localStorage.removeItem('usuario');
    sessionStorage.clear();
  }
  btnLogout.addEventListener('click', () => {
    borrarDatos();
    window.location.href='../index.html';
    intercambiarClases(toggles, 'd-none');
  });
  estaLogueado();

  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    if (!mailLogin.value || !passLogin.value) {
      alert('Todos los campos son requeridos');
      
    } else {
      let data = validarUsuario(usuario, mailLogin.value, passLogin.value);
      
      if (!data) {
        alert(`Usuario y/o contraseña erróneos`);
      } else {
          guardarDatos(data, localStorage);
          saludar(recuperarUsuario(localStorage));
          turnos.forEach(paciente => {
            cargarPaciente(paciente);
          });
        modal.hide();
        intercambiarClases(toggles, 'd-none');
      }
    }
  })
  estaLogueado(recuperarUsuario(localStorage));