const preguntaElement = document.getElementById('pregunta');
const opcionesElement = document.getElementById('opciones');
const resultadoElement = document.getElementById('resultado');

let preguntaActual = 0;
let puntaje = 0;
let opcionesDesactivadas = false;

// Función para mezclar el arreglo de preguntas aleatoriamente (Algoritmo Fisher-Yates)
function mezclarPreguntas() {
  for (let i = preguntas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [preguntas[i], preguntas[j]] = [preguntas[j], preguntas[i]];
  }
}

// Invocamos la función para mezclar las preguntas al cargar la página
mezclarPreguntas();

function cargarPregunta() {
  if (preguntaActual >= preguntas.length) {
    // El juego ha terminado, mostrar resultado
    opcionesElement.style.display = 'none';
    preguntaElement.textContent = 'Juego terminado';
    resultadoElement.textContent = `Obtuviste ${puntaje} puntos de ${preguntas.length}`;
    document.getElementById('btn-reintentar').style.display = 'block';
  } else {
    const pregunta = preguntas[preguntaActual];
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
  mezclarPreguntas(); // Mezcla las preguntas antes de reiniciar
  cargarPregunta();
}

function responder(opcionSeleccionada) {
  if (!opcionesDesactivadas) {
    const pregunta = preguntas[preguntaActual];
    opcionesDesactivadas = true;

    if (opcionSeleccionada === pregunta.respuesta) {
      puntaje++;
      resultadoElement.textContent = '¡Respuesta correcta!';
    } else {
      resultadoElement.textContent = 'Respuesta incorrecta';
    }

    preguntaActual++;
    setTimeout(() => {
      if (preguntaActual < preguntas.length) {
        cargarPregunta();
      } else {
        mostrarResultado();
      }
    }, 1000);
  }
}
const bodyElement = document.body;
const btnToggleMode = document.getElementById('btn-toggle-mode');

btnToggleMode.addEventListener('click', () => {
  bodyElement.classList.toggle('dark-mode');
});


cargarPregunta();
