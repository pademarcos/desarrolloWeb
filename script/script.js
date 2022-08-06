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
//lo hice en index y contacto


/* let parrafoContacto = document.getElementsByClassName('textoContacto');
parrafoContacto.innerText = `Somos un equipo de profesionales altamente capacitados con una formación continua en los avances de la
odontología moderna para brindarles trabajos estéticos odontológicos de excelencia.
Dónde encontrarnos: 
Almagro 135 
San Fdo. del Valle de Catamarca
Escribinos o llamanos: 
Whatsapp: 3834008551 
Teléfono: 383 - 4453272 
Correo electrónico: centrodeesteticayodontologia@gmail.com `;  */
// he intentado hacerlo con document.getElementsByClassName pero no me sale no se porque.
//opcion1 eventos
const turnos = JSON.parse(localStorage.getItem('turnos')) || [];
const enviar = document.getElementById('btnEnviar');
const nombre = document.getElementById('nameInput');
const tel = document.getElementById('telInput');
const doctor = document.getElementById('drSelect');

enviar.addEventListener('click',()=>{
  agregarTurno();
})

class turno{
  constructor(nombre, tel, doctor) {
    this.nombre = nombre;
    this.tel = tel;
    this.doctor = doctor;
  }
}

function agregarTurno(){
  const nuevoTurno = new turno(nombre.value, tel.value, doctor.value)
  turnos.push(nuevoTurno);
  localStorage.setItem('turnos', JSON.stringify(turnos));
}

const mostrarTurnos = () => {
  if (turnos.length) {
     for (let i = 0; i < turnos.length; i++) {
    alert(
      `        Nombre: ${turnos[i].nombre}
        Telefono: ${turnos[i].tel} 
        Doctor/a: ${turnos[i].doctor}
        `
    );
  }
  }
 
}


mostrarTurnos();
