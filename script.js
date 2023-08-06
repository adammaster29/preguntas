const preguntaElement = document.getElementById('pregunta');
const opcionesElement = document.getElementById('opciones');
const resultadoElement = document.getElementById('resultado');
const loadingElement = document.getElementById('loading');
const gameContainerElement = document.getElementById('game-container');
const bodyElement = document.body;
const btnToggleMode = document.getElementById('btn-toggle-mode');

let preguntaActual = 0;
let puntaje = 0;
let opcionesDesactivadas = false;
let preguntasAleatorias = [];

function mezclarPreguntas() {
  for (let i = preguntas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [preguntas[i], preguntas[j]] = [preguntas[j], preguntas[i]];
  }
  preguntasAleatorias = preguntas.slice(0, 8);
}

function cargarPregunta() {
  if (preguntaActual >= preguntasAleatorias.length) {
    // El juego ha terminado, mostrar resultado
    opcionesElement.style.display = 'none';
    preguntaElement.textContent = 'Juego terminado';
    resultadoElement.textContent = `Obtuviste ${puntaje} puntos de ${preguntasAleatorias.length}`;
    document.getElementById('btn-reintentar').style.display = 'block';
  } else {
    const pregunta = preguntasAleatorias[preguntaActual];
    preguntaElement.textContent = pregunta.pregunta;

    opcionesElement.style.display = 'block';
    opcionesElement.innerHTML = '';

    pregunta.opciones.forEach((opcion, index) => {
      const boton = document.createElement('button');
      boton.className = 'opcion';
      boton.textContent = opcion;
      boton.addEventListener('click', () => responder(index));
      opcionesElement.appendChild(boton);
    });

    opcionesDesactivadas = false;
    resultadoElement.textContent = '';
    document.getElementById('btn-reintentar').style.display = 'none';
  }
}

function reiniciarJuego() {
  preguntaActual = 0;
  puntaje = 0;
  opcionesDesactivadas = false;
  resultadoElement.textContent = '';
  document.getElementById('btn-reintentar').style.display = 'none';
  mezclarPreguntas();
  cargarPregunta();
}

function responder(opcionSeleccionada) {
  if (!opcionesDesactivadas) {
    const pregunta = preguntasAleatorias[preguntaActual];
    opcionesDesactivadas = true;

    if (opcionSeleccionada === pregunta.respuesta) {
      puntaje++;
      resultadoElement.textContent = '¡Respuesta correcta!';
    } else {
      resultadoElement.textContent = 'Respuesta incorrecta';
    }

    preguntaActual++;
    setTimeout(() => {
      if (preguntaActual < preguntasAleatorias.length) {
        cargarPregunta();
      } else {
        cargarPregunta(); // Mostrar la última pregunta con el resultado final
      }
    }, 1000);
  }
}

btnToggleMode.addEventListener('click', () => {
  bodyElement.classList.toggle('dark-mode');
});

// Agregamos un tiempo de carga de 2 segundos antes de mostrar el juego
setTimeout(() => {
  mezclarPreguntas();
  cargarPregunta();
  loadingElement.style.display = 'none';
  gameContainerElement.style.display = 'block';
}, 2000);

/* Resto del código... */

function mostrarJuego() {
    loadingElement.style.display = 'none';
    gameContainerElement.style.display = 'block';
  }
  
  // Agregamos un tiempo de carga de 2 segundos antes de mostrar el juego
  setTimeout(mostrarJuego, 2000);
  
  