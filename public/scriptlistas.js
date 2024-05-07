let pets_list = [];
fetch("http://localhost:5000/files/", requestOptions)
    .then(response => response.json())
    .then(result => {
        // alert(result.data.msg)
        console.log(result);
        let listaclientes = result
        pets_list = [...listaclientes]
        getPetsList()

    })
    .catch(error => console.log('error', error));

var requestOptions = {
    method: 'GET',
};

function deleteRow(i) {


    fetch(`http://localhost:5000/files/delete-file/${pets_list[i]._id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(result => {

            window.location.reload()
        })
        .catch(error => console.log('error', error));


}
function updateRow(i) {

    window.location.href = `http://localhost:5000/crearExpediente01.html?clientId=${pets_list[i]._id}&isEdit=1`

}

function ViewRow(i) {

    window.location.href = `http://localhost:5000/mascotas.html?clientId=${pets_list[i]._id}`

}

function getPetsList() {

    buildTable(pets_list)



    function buildTable(data) {
        var table = document.getElementById('myTable')

        for (var i = 0; i < data.length; i++) {
            var row = `<tr>
                        <td>${i + 1}</td>
                        <td>${data[i]["nombreCompleto"]}</td>
                        <td>${new Date(data[i]?.fechaDeNacimiento).toISOString().split('T')[0]}</td>
                        <td>${data[i]?.correo}</td>
                        <td>${data[i]?.numeroDeCelular}</td>
                        <td>${data[i]?.genero}</td>
                        <td><img style="width:50px;height:50px;"} src='http://localhost:5000/files/${data[i].imagen}'></td>
                        <td>${data[i]?.direccionCompleta}</td>
                        <td>${data[i]?.observaciones}</td>
                        <td> 
                            <button onclick="updateRow(${i})"> <i class="fa-solid fa-edit"></i></button>
                            <button onclick="ViewRow(${i})"> <i class="fa fa-eye" aria-hidden="true"></i></button>
                        </td>
                        
                  </tr>`
            table.innerHTML += row


        }
    }




}



