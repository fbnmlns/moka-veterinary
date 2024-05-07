let params = (new URL(document.location)).searchParams;
let clientId = params.get("clientId");
let isEditable = params.get("isEdit");
let petId = params.get("petId");
let padecimientosList = [];
let isEditableexamenes = false;
let isEditableexamenesID;
let examenesList = [];
let isEditablepadecimientos = false;
let isEditablepadecimientosID;

fetch(`http://localhost:5000/pets/getPetById/${petId}`, {
    method: 'GET',
})
    .then(response => response.json())
    .then(result => {

        console.log('==============result.user======================');
        console.log(result.user);
        console.log('====================================');
        document.getElementById("nombresMascota").value = result?.user?.nombreMascota
        document.getElementById("raza").value = result?.user?.raza
        document.getElementById("observacionesMascota").value = result?.user?.observaciones
        document.getElementById("generoMascotas").value = result?.user?.genero
        document.getElementById("edadMascota").value = new Date(result?.user?.fechaNacimiento).toISOString().split('T')[0]

        document.getElementById("fileimage").src = `http://localhost:5000/pets/${result?.user?.imagen}`;


    })
    .catch(error => console.log('error', error));

fetch(`http://localhost:5000/files/getFileById/${clientId}`, {
    method: 'GET',
})
    .then(response => response.json())
    .then(result => {

        console.log('==============result.user======================');
        console.log(result.user);
        console.log('====================================');
        document.getElementById("nombresCliente").value = result?.user?.nombresCliente
        document.getElementById("fechaNacimiento").value = new Date(result?.user?.fechaDeNacimiento).toISOString().split('T')[0]
        document.getElementById("correo").value = result?.user?.correo
        document.getElementById("numeroCel").value = result?.user?.numeroDeCelular
        document.getElementById("genero").value = result?.user?.genero

        document.getElementById("idCliente").value = result?.user?.id
        document.getElementById("direccionCompleta").value = result?.user?.direccionCompleta
        document.getElementById("provincia").value = result?.user?.provincia
        document.getElementById("canton").value = result?.user?.canton
        document.getElementById("distrito").value = result?.user?.distrito
        document.getElementById("observacionesCliente").value = result?.user?.observaciones
        document.getElementById("nombresCliente").value = result?.user?.nombreCompleto
        document.getElementById("file").src = `http://localhost:5000/files/${result?.user?.imagen}`;


    })
    .catch(error => console.log('error', error));

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";


}

const Padecimiento = document.getElementById("Padecimiento");
Padecimiento.addEventListener("click", () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "nombrePadecimiento": document.getElementById("nuevoPadecimiento").value,
        "mascota": petId
    });



    if (isEditablepadecimientos) {
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/padecimiento/updateNewPadecimientos/${isEditablepadecimientosID}`, requestOptions)
            .then(response => response.json())
            .then(result => { alert('Record Updated!'); window.location.reload() })
            .catch(error => console.log('error', error));

    } else {

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/padecimiento/add-new", requestOptions)
            .then(response => response.json())
            .then(result => { alert('Record Added!'); window.location.reload() })
            .catch(error => console.log('error', error));

    }






})

fetch(`http://localhost:5000/padecimiento/${petId}`, requestOptions)
    .then(response => response.json())
    .then(result => {

        let padecimientos = result.padecimientos
        padecimientosList = [...padecimientos]
        padecimientosbuildTable(padecimientos)
    })
    .catch(error => console.log('error', error));

var requestOptions = {
    method: 'GET',
};

fetch(`http://localhost:5000/examenes/${petId}`, requestOptions)
    .then(response => response.json())
    .then(result => {

        let examenes = result.examenes
        examenesList = [...examenes]
        examenesbuildTable(examenes)
    })
    .catch(error => console.log('error', error));

var requestOptions = {
    method: 'GET',
};



function deleteRowpadecimientos(i) {


    fetch(`http://localhost:5000/padecimiento/delete-Padecimientos/${padecimientosList[i].padecimientoID}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(result => {

            window.location.reload()
        })
        .catch(error => console.log('error', error));


}
function updateRowpadecimientos(i) {


    document.getElementById("nuevoPadecimiento").value = padecimientosList[i]?.nombrePadecimiento
    isEditablepadecimientos = true;
    isEditablepadecimientosID = padecimientosList[i]?.padecimientoID;


}


function padecimientosbuildTable(data) {
    var table = document.getElementById('myTablenuevoPadecimiento')

    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
        <td>${i}</td>
        <td>${data[i]["Pet's name"]}</td>
        <td>${data[i]?.nombrePadecimiento}</td>
        <td> 
            <button onclick="updateRowpadecimientos(${i})"> <i class="fa-solid fa-edit"></i></button>
            <button onclick="deleteRowpadecimientos(${i})"> <i class="fa-solid fa-remove"></i></button>
        </td>
        
  </tr>`
        table.innerHTML += row


    }
}


function deleteRowexamenes(i) {


    fetch(`http://localhost:5000/examenes/delete-examenes/${examenesList[i].ID}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(result => {
            window.location.reload()
        })
        .catch(error => console.log('error', error));


}
function updateRowexamenes(i) {


    document.getElementById("Vacuna").value = examenesList[i]?.Vacuna
    document.getElementById("Exámen").value = examenesList[i]?.Exámen

    isEditableexamenes = true;
    isEditableexamenesID = examenesList[i]?.ID;


}

function examenesbuildTable(data) {
    var table = document.getElementById('myTableExámenes')

    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
        <td>${i}</td>
        <td>${data[i]["Pet's name"]}</td>
        <td>${data[i]?.Vacuna}</td>
        <td>${data[i]?.Exámen}</td>
        <td> 
            <button onclick="updateRowexamenes(${i})"> <i class="fa-solid fa-edit"></i></button>
            <button onclick="deleteRowexamenes(${i})"> <i class="fa-solid fa-remove"></i></button>
        </td>
        
  </tr>`
        table.innerHTML += row


    }
}


const Vacunas_y_Exámenes = document.getElementById("Vacunas_y_Exámenes");
Vacunas_y_Exámenes.addEventListener("click", () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "Vacuna": document.getElementById("Vacuna").value,
        "Exámen": document.getElementById("Exámen").value,
        "mascota": petId
    });



    if (isEditableexamenes) {
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/examenes/updateNewexamenes/${isEditableexamenesID}`, requestOptions)
            .then(response => response.json())
            .then(result => { alert('Record Updated!'); window.location.reload() })
            .catch(error => console.log('error', error));

    } else {

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/examenes/add-new", requestOptions)
            .then(response => response.json())
            .then(result => { alert('Record Added!'); window.location.reload() })
            .catch(error => console.log('error', error));

    }






})

