function cargarInfo() {
    var direccion = window.location.search;
    var variables = new URLSearchParams(direccion);
    var id = variables.get("id");

    var datos = {
        idUsuario: id
    }

    fetch("http://localhost:5000/empleado/buscar", {
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
                var rol = document.getElementById("rol");
                var pinEmpleado = document.getElementById("pinEmpleado");
                var emailEmpleado = document.getElementById("emailEmpleado");
                var idEmpleado = document.getElementById("idEmpleado");
                var estadoEmpleado = document.getElementById("estadoEmpleado");

                primerNombre.value = json.primerNombre;
                segundoNombre.value = json.segundoNombre;
                primerApellido.value = json.primerApellido;
                segundoApellido.value = json.segundoApellido;
                rol.value = json.rol;
                pinEmpleado.value = json.pinEmpleado;
                emailEmpleado.value = json.emailEmpleado;
                idEmpleado.value = json.idEmpleado;
                estadoEmpleado.value = json.estadoEmpleado;

            }
        )
}

const butonActualizar = document.getElementById("actualizar");

butonActualizar.addEventListener("click", editarInfo);

function editarInfo() {
    console.log("Funciona?");
    var direccion = window.location.search;
    var variables = new URLSearchParams(direccion);
    var id = variables.get("id");
    console.log(id);
    var datos = {
        idUsuario: id,
        primerNombre: document.getElementById("primerNombre").value,
        segundoNombre: document.getElementById("segundoNombre").value,
        primerApellido: document.getElementById("primerApellido").value,
        segundoApellido: document.getElementById("segundoApellido").value,
        rol: document.getElementById("rol").value,
        pinEmpleado: document.getElementById("pinEmpleado").value,
        emailEmpleado: document.getElementById("emailEmpleado").value,
        idEmpleado: document.getElementById("idEmpleado").value,
        estadoEmpleado: document.getElementById("estadoEmpleado").value
    }

    fetch("http://localhost:5000/empleado/actualizar", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            function (response) {
                return response.json();
            }
        ).then(
            function (json) {
                console.log(json);
                window.location.replace("http://localhost:5000/Usuarios1.html");
            }
        )
}