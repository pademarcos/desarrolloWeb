const pacientes = [
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
    alert("gracias!");
  }
}
lista();
