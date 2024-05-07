function cargarTabla() {
    fetch("http://localhost:5000/cita/listarCitas").then(
        function (response) {
            return response.json();
        }
    ).then(
        function (json) {
            for (var cont = 0; json.length > cont; cont++) {
                var linea = "<tr class='citasV-row-dato'><td class='citasV-columna-dato'>" + json[cont].nombreMascota + "</td><td class='citasV-columna-dato'>" + json[cont].idDoctor + "</td><td class='citasV-columna-dato'>" + json[cont].hora + "</td><td class='citasV-columna-dato'>" + json[cont].fecha + "</td>" + "<td class='citasV-columna-dato'><a href='concluirCita.html?idCita=" + json[cont]._id + "&idMascota=" + json[cont].idMascota + "' class='link-concluir'>Concluir cita</a></td></tr>";

                document.getElementById("citasV-tabla").insertAdjacentHTML("beforeend", linea);
            }
        }
    )
}

function cargarDoctores() {
    fetch("http://localhost:5000/cita/listarDoctores").then(
        function (response) {
            return response.json();
        }
    ).then(
        function (json) {
            for (var cont = 0; json.length > cont; cont++) {
                var linea = "<option class='citasA-opcion'>" + json[cont].primerNombre + "</option>";

                document.getElementById("idDoctor").insertAdjacentHTML("beforeend", linea); 
            }
        }
    )
}

function cargarPadecimientos() {
    fetch("http://localhost:5000/cita/listarPadecimientos").then(
        function (response) {
            return response.json();
        }
    ).then(
        function (json) {
            for (var cont = 0; json.length > cont; cont++) {
                var linea = "<option class='citasC-opcion'>" + json[cont].nombrePadecimiento + "</option>";

                document.getElementById("selectPadecimientos").insertAdjacentHTML("beforeend", linea);
            }
        }
    )
}

function insertarCita() {
    var datos = {
        nombreMascota: document.getElementById("nombreMascota").value,
        idCliente: document.getElementById("idCliente").value,
        idDoctor: document.getElementById("idDoctor").value,
        hora: document.getElementById("hora").value,
        fecha: document.getElementById("fecha").value
    }

    fetch("http://localhost:5000/cita/insertarCita", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    }).then(
        function (response) {
            return response.json();
        }
    )
}

function printCheckedValue() {
    var checkValue = document.querySelector('input[name="rate"]:checked')
    console.log(checkValue.value);
}

function actualizarMascota() {
    var direccion = window.location.search;
    var variables = new URLSearchParams(direccion);
    var idMascota = variables.get("idMascota");
    var ranking = document.querySelector('input[name="rate"]:checked');

    var datos = {
        idMascota: idMascota,
        ranking: ranking.value,
        padecimientos: document.getElementById("selectPadecimientos").value
    }

    fetch("http://localhost:5000/cita/actualizarDatosMascota", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    }).then(
        function (response) {
            return response.json();
        }
    )
}

function actualizarHistorial() {
    var direccion = window.location.search;
    var variables = new URLSearchParams(direccion);
    var idMascota = variables.get("idMascota");

    var datos = {
        idMascota: idMascota,
        observaciones: document.getElementById("observaciones").value
    }

    fetch("http://localhost:5000/cita/actualizarDatosHistorial", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    }).then(
        function (response) {
            return response.json();
        }
    )
}

function eliminarCita() {
    var direccion = window.location.search;
    var variables = new URLSearchParams(direccion);
    var _id = variables.get("idCita");

    var datos = {
        _id: _id
    }

    fetch("http://localhost:5000/cita/borrarCita", {
        method: 'DELETE',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    }).then(
        function (response) {
            return response.json();
        }
    )
}