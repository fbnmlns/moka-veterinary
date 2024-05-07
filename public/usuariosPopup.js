var btn = document.getElementById("register-button");
btn.addEventListener('click', registrarEmpleado);
function registrarEmpleado() {
    var datos = {
        primerNombre: document.getElementById("primerNombre").value,
        segundoNombre: document.getElementById("segundoNombre").value,
        primerApellido: document.getElementById("primerApellido").value,
        segundoApellido: document.getElementById("segundoApellido").value,
        telefonoEmpleado: document.getElementById("telefonoEmpleado").value,
        direccionEmpleado: document.getElementById("direccionEmpleado").value,
        myFile: document.getElementById("myFile").value,
        rol: document.getElementById("rol").value,
        pinEmpleado: document.getElementById("pinEmpleado").value,
        emailEmpleado: document.getElementById("emailEmpleado").value,
        idEmpleado: document.getElementById("idEmpleado").value,
        estadoEmpleado: document.getElementById("estadoEmpleado").value
    }
    fetch("http://localhost:5000/empleado/registrarEmpleado", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            function (response) {
                return response.json();
            }
        )
}
