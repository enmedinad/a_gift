// Cargar palabras desde JSON
fetch('../assets_ignore/palabras.json')
    .then(response => response.json())
    .then(data => createWordElements(data));

let wordElements = [];
let isGrouped = false; // Variable para controlar si las palabras están agrupadas

// Crear elementos de palabra
function createWordElements(words) {
    const wordContainer = document.getElementById('word-container');

    words.forEach((wordObj) => {
        const wordElement = document.createElement('div');
        wordElement.classList.add('word');
        wordElement.textContent = wordObj.palabra;
        wordElement.setAttribute('data-frase', wordObj.frase);
        
        // Establecer posición inicial aleatoria en el eje Y
        wordElement.style.top = `${Math.random() * 95}vh`;
        
        wordContainer.appendChild(wordElement);

        // Agregar un objeto que mantenga la posición y velocidad de cada palabra
        wordElements.push({
            element: wordElement,
            speed: Math.random() * 0.5 + 1,  // Velocidad aleatoria para cada palabra
            positionX: -wordElement.offsetWidth, // Comenzar desde la izquierda (fuera de la pantalla)
            isPaused: false // Bandera para pausar el movimiento
        });

        // Pausar movimiento al hacer hover
        wordElement.addEventListener('mouseover', () => {
            if (!isGrouped) { // Solo pausar si no están agrupadas
                wordElements.forEach(w => w.isPaused = true);
                wordElement.style.cursor = 'pointer'; // Cambiar cursor en hover
            }
        });

        // Reanudar movimiento al quitar el hover
        wordElement.addEventListener('mouseout', () => {
            if (!isGrouped) { // Solo reanudar si no están agrupadas
                wordElements.forEach(w => w.isPaused = false);
            }
        });
    });

    // Iniciar animación
    moveWords();
}

// Función para mover las palabras continuamente
function moveWords() {
    wordElements.forEach(wordObj => {
        if (!wordObj.isPaused && !isGrouped) {  // Mover solo si no está pausada y no están agrupadas
            // Actualizar la posición horizontal
            wordObj.positionX += wordObj.speed;

            // Si la palabra sale de la pantalla (más allá del ancho), reiniciar la posición a la izquierda
            if (wordObj.positionX > window.innerWidth) {
                wordObj.positionX = -wordObj.element.offsetWidth;  // Reiniciar desde la izquierda
            }

            // Aplicar el movimiento a la palabra
            wordObj.element.style.transform = `translateX(${wordObj.positionX}px)`;
        }
    });

    // Llamar a la función en el próximo frame de animación
    requestAnimationFrame(moveWords);
}


fetch('../assets_ignore/palabras.json')
    .then(response => response.json())
    .then(data => {
        // Aquí se puede inicializar el movimiento inicial de palabras
        createWordElements(data);
// Botón para detener y agrupar palabras
document.getElementById('center-button').addEventListener('click', () => {
    isGrouped = true; // Activar el estado de agrupamiento

    // Limpiar el contenedor antes de agrupar
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = ''; // Vaciar el contenedor actual

    // Agregar nuevas palabras estáticas al contenedor
    data.forEach(item => {
        const wordBox = document.createElement('div');
        wordBox.className = 'word-box'; // Clase para los estilos
        wordBox.innerText = item.palabra; // Usar la palabra del JSON

        // Estilo para cada caja (puedes personalizar según lo que necesites)
        wordBox.style.padding = '10px';
        wordBox.style.borderRadius = '5px';
        wordBox.style.textAlign = 'center';
        wordBox.style.backgroundColor = '#00ffaa50'; // Cambia el color si es necesario
        wordBox.style.width = 'auto';

        // Evento para mostrar la frase al pasar el mouse
        wordBox.title = item.frase; // Mostrar la frase como tooltip

        // Agregar la caja al contenedor
        wordContainer.appendChild(wordBox);
    });
    alert("Para ver los significados solo pasa el mouse por encima y dejalo quieto encima uwu")
});
})
.catch(error => console.error('Error al cargar el JSON:', error));




// Crear lluvia de iconos
function createIconRain() {
    const iconContainer = document.getElementById('icon-container');
    const iconCount = 70; // Número de íconos que caerán

    for (let i = 0; i < iconCount; i++) {
        const iconElement = document.createElement('div');
        iconElement.classList.add('icon');

        // Crear un elemento de imagen
        const imgElement = document.createElement('img');
        imgElement.src = 'assets_ignore/img/cinamonrolluwu.png';  // Reemplaza con la ruta a la imagen
        imgElement.alt = 'Cinamonroll';  // Texto alternativo por accesibilidad
        imgElement.style.width = '60px';  // Ajusta el tamaño de la imagen

        // Añadir la imagen dentro del icono
        iconElement.appendChild(imgElement);

        // Establecer la posición inicial y un retraso aleatorio para cada icono
        iconElement.style.left = `${Math.random() * 100}vw`;
        iconElement.style.animationDelay = `${Math.random() * 10}s`;

        iconContainer.appendChild(iconElement);
    }
}

createIconRain();
