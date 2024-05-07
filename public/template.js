const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]");

menuIconButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});


const imgUploadCLIENTE = document.querySelector('#myfile');
var imgstorage = "";  // Guardo mi imagen. 
//Creo un event Listener para decirle que hacer despues que doy click en upload.

imgUploadCLIENTE.addEventListener("change", function () {
    const lector = new FileReader(); // necesito leer 
    lector.addEventListener("load", () => {
        imgstorage = lector.result; // cuando la imagen este uploaded, necesito guardarla.
        document.querySelector("#imgDisplay").style.backgroundImage = `url(${imgstorage})`; // para display mi imagen
    });
    lector.readAsDataURL(this.files[0]); // Metodo FileReader
})