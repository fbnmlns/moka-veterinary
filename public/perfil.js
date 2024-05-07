var _id = localStorage.getItem("idMongo");

function cargarTabla() {
  
  var datos = {
    _id: _id

  }

  fetch("http://localhost:5000/empleado/buscarEmpleado", {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(
      function (response) {
        return response.json();
      }
    )

    .then(
      function (json) {
        var primerNombre = document.getElementById("primerNombre");
        var segundoNombre = document.getElementById("segundoNombre");
        var primerApellido = document.getElementById("primerApellido");
        var segundoApellido = document.getElementById("segundoApellido");
        var emailEmpleado = document.getElementById("emailEmpleado");
        var telefonoEmpleado = document.getElementById("telefonoEmpleado");
        var direccionEmpleado = document.getElementById("direccionEmpleado");
        var myfile = document.getElementById("myfile");
    
      
        primerNombre.value = json.primerNombre;
        segundoNombre.value = json.segundoNombre;
        primerApellido.value = json.primerApellido;
        segundoApellido.value = json.segundoApellido;
        emailEmpleado.value = json.emailEmpleado;
        telefonoEmpleado.value = json.telefonoEmpleado;
        direccionEmpleado.value = json.direccionEmpleado;
        myfile.value = json.myfile;
        
      }

    )
}

var a = document.getElementById("sideBar-Usuarios1");
a.addEventListener('click', cambiarPantalla);

function cambiarPantalla(){
    if(localStorage.getItem("rol") != "Admin"){
        Swal.fire("No tiene permitido ingresar a esa seccion");
    }else{
        window.location.replace("http://localhost:5000/Usuarios1.html");
    }
}