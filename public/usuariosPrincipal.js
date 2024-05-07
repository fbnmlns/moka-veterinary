function cargarTabla() {
    fetch("http://localhost:5000/empleado/")
        .then(
            function (response) {
                return response.json();
            }
        ).then(
            function (json) {
                for (var cont = 0; json.length > cont; cont++) {
                    if (json[cont].rol != "Admin") {
                        var linea = "<tr><td class=Usuarios-btn-row>" + json[cont].primerNombre + " " + json[cont].segundoNombre + " " + json[cont].primerApellido + " " + json[cont].segundoApellido + "<a class=Usuarios-btn-editar href='EditarPerfilUsuarios.html?id=" + json[cont]._id + "'>Editar</a>" + "</td><td>" + json[cont].rol + "</td><td>" + json[cont].pinEmpleado + "</td><td>" + json[cont].emailEmpleado + "</td><td>" + json[cont].idEmpleado + "</td><td>" + json[cont].estadoEmpleado + "</td></tr>";
                        document.getElementById("tablaEmpleados").insertAdjacentHTML("beforeend", linea);
                    }
                }
            }
        )
}

function searchBar() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-bar");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaEmpleados");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
const input = document.getElementById('search-bar');
const log = document.getElementById('valores');

input.addEventListener('input', searchBar);
