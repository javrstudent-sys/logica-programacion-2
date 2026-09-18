//console.log("Hola mundo");
/**
 *? Creando el sistema backend para pedir datos de formulario, mandarlos al localstorage y pedirlos.
 */
/**
 *! Declaración y asignacion de arrays
 */
const formEl = document.getElementById("temperaturas-form");
const mainEl = document.querySelector("#grados-container");
let cards = []; //array para almacenar los datos de las conversiones que se vayan registrando, para poder enviarlos al backend en un futuro.

/**
 * ! AddEventListener
 */
window.addEventListener("load", (event) => {
    const storedCards = getLocalStorage("cards"); //obtenemos el array cards del localStorage para poder mostrarlo en la interfaz del usuario.
    if (storedCards === undefined) {
        console.log("No hay conversiones almacenados en el localStorage"); //vemos un mensaje en la consola cuando no hay cards almacenados en el localStorage.
    }
    storedCards.map((cards) => addAlbumCard(cards, mainEl)); //iteramos sobre el array cards y agregamos cada card de las conversiones al contenedor de cards sin borrar su contenido existente. Dentro del parentsis podemos agregar la posicion donde queremos insertar el contenido HTML. En este caso, lo estamos insertando al final del contenedor de cards .
    cards.push(...storedCards); //agregamos las cards almacenados en el localStorage al array albums para poder enviarlos al backend en un futuro.
    cards.map((cards) => addAlbumCard(cards, mainEl)); //ponemos esta linea para que si no hay cards en el localStorage, se muestre un mensaje de que no hay conversiones registrados.
});


/**
 * ! Elemento de formulario . AddEventListener
 */
formEl.addEventListener("submit", (event) => {
    event.preventDefault(); //preventimos que el formulario se envie y recargue la pagina.
    const formData = new FormData(formEl); //creamos un objeto FormData con los datos del formulario.
    const dataArray = [...formData]; //convertimos el objeto FormData en un array de arrays.
    const cardData = Object.fromEntries(dataArray); //convertimos el array de arrays en un objeto.
    cards.push(cardData); //agregamos el objeto cardData al array cards para almacenar los datos de las conversiones que se vayan registrando, para poder enviarlos al backend en un futuro.
    setLocalStorage("cards", cards); //guardamos el array cards en el localStorage para poder recuperarlo después.
    mainEl.innerHTML = ""; //limpiamos el contenedor de cards para que no se dupliquen las cards de conversiones al enviar el formulario varias veces.
    cards.map((cards) => addAlbumCard(cards, mainEl)); //iteramos sobre el array cards y agregamos cada card de las conversiones al contenedor de las conversiones sin borrar su contenido existente. Dentro del parentsis podemos agregar la posicion donde queremos insertar el contenido HTML. En este caso, lo estamos insertando al final del contenedor de álbumes.
    formEl.reset(); //reseteamos el formulario para que quede vacío después de enviar los datos.  
});

/**
 * ! Local storage Set y Get
 */
const setLocalStorage = (key, value) => {
    //paso 1, convertimos el valor a texto JSON para poder guardarlo en el localStorage, ya que el localStorage solo puede almacenar strings.
    const textValue = JSON.stringify(value); //convertimos el valor a texto JSON para poder guardarlo en el localStorage, ya que el localStorage solo puede almacenar strings.
    //paso 2, guardamos el valor en el localStorage con la clave especificada.
    localStorage.setItem(key, textValue);
};

const getLocalStorage = (key) => {
    //paso 1, obtenemos el valor del localStorage con la clave especificada.
    if (localStorage.getItem(key) == null) return; //si no hay valor guardado, retornamos undefined. Esta es una forma de evitar errores al intentar parsear un valor nulo
    //Esta forma de escribir el if es una forma de escribir un if en una sola línea, donde si la condición se cumple, se ejecuta la instrucción después del return. En este caso, si no hay valor guardado, retornamos undefined. 
    //con Json.parse() convertimos el valor de texto JSON a un objeto JavaScript para poder usarlo en nuestro código.
    const data = JSON.parse(localStorage.getItem(key));
    return data;
};



/**
 * ! Constructor de cards html . element y variables js.
 */
const addAlbumCard = (conversorDataObject, htmlElement) => {
    
   // Nos aseguramos de convertir el valor recibido a número
let celsius = Number(conversorDataObject.grados); 
let escala = " ";
let resultado; 

if (conversorDataObject.escala === "Kelvin") {
    resultado = celsius + 273.15;
    escala = conversorDataObject.escala;
} else if (conversorDataObject.escala === "Fahrenheit") { // Comparacion estricta
    resultado = (celsius * 1.8) + 32;
    escala = conversorDataObject.escala;
}else{
    escala = "Celcius "
    resultado = celsius;
}

    const conversorCard = `
    <div class="card border shadow-sm mb-3" id="card-dinamic">
        <div class="row g-0">
            <!--  imagen -->
            <div class="col-4 bg-Tertiary d-flex flex-column align-items-center justify-content-center rounded-start p-2 text-center border-end" id="logo-box">
                <img src="./assets/img.jpg" alt="logo de grados" class="img-fluid mb-1" style="max-height: 100px; object-fit: contain;">
                <small class="fw-bold text-dark">${conversorDataObject.escala|| 'grados'}</small>
            </div>
            <!--  informacion -->
            <div class="col-8">
                <div class="card-body">
                    <!-- Tipo de conversion -->
                    <h5 class="card-title mb-1 text-dark fw-bold">Conversión a : ${conversorDataObject.escala}</h5>
                    
                    <!-- grados Celsius -->
                    <p class="card-text text-muted mb-1 small">
                        Celsius: <strong>${conversorDataObject.grados}</strong>°
                    </p>
                    
                    <!-- grados convertidos -->
                    <span class="badge bg-dark text-white mb-2"> ${escala}: ${resultado}° </span>
                    
                </div>
            </div>
        </div>
    </div>
    `;
    
    htmlElement.insertAdjacentHTML("beforeend", conversorCard);
};
