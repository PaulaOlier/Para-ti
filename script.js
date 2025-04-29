const nombreValido = "daniel villa";

function validarUsuario() {
  const nombre = document.getElementById("username").value.trim();
  if (nombre.toLowerCase() === nombreValido.toLowerCase()) {
    document.getElementById("login").style.display = "none";
    document.getElementById("secciones").style.display = "block";
    document.getElementById("musica").play();
    siguiente(0);
  } else {
    alert("Nombre incorrecto");
  }
}

function siguiente(num) {
  for (let i = 0; i <= 3; i++) {
    document.getElementById("seccion" + i).style.display = "none";
  }
  document.getElementById("seccion" + num).style.display = "block";

  if (num === 1) iniciarLaberinto();
}

function mostrarMensaje() {
  alert("Te amo con cada parte de mi incluso con las que estoy aprendiendo a sanar y construir. Eres mi todo. Te quiero y te amo, ADMV 🤍✨");
}

// Laberinto con colisiones
const mapa = [
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0],
  [1,1,1,1,1,0,1,0,1,1,1,1,0,1,1,1],
  [1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,1,0,1,0,1],
  [1,1,1,0,1,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,2]
];

let jugador = { x: 0, y: 0 };
let ctx;

function dibujar() {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 16; x++) {
      if (mapa[y][x] === 1) {
        ctx.fillStyle = "black";
      } else if (mapa[y][x] === 2) {
        ctx.fillStyle = "green";
      } else {
        ctx.fillStyle = "white";
      }
      ctx.fillRect(x * 20, y * 20, 20, 20);
      ctx.strokeRect(x * 20, y * 20, 20, 20);
    }
  }

  ctx.fillStyle = "blue";
  ctx.fillRect(jugador.x * 20, jugador.y * 20, 20, 20);
}

function mover(dx, dy) {
  const nx = jugador.x + dx;
  const ny = jugador.y + dy;
  if (nx >= 0 && nx < 16 && ny >= 0 && ny < 10 && mapa[ny][nx] !== 1) {
    jugador.x = nx;
    jugador.y = ny;
    if (mapa[ny][nx] === 2) {
      document.getElementById("laberinto-mensaje").textContent = "¡Que tesoo! jaja";
      document.getElementById("img-laberinto").style.display = "block";
    }
  }
  dibujar();
}

function iniciarLaberinto() {
  const canvas = document.getElementById("laberinto");
  ctx = canvas.getContext("2d");

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp": mover(0, -1); break;
      case "ArrowDown": mover(0, 1); break;
      case "ArrowLeft": mover(-1, 0); break;
      case "ArrowRight": mover(1, 0); break;
    }
  });

  dibujar();
}

// Cuestionario de selección múltiple
function verificarQuiz() {
  const respuestasCorrectas = {
    q1: ["blanco"],
    q2: ["gato"],
    q3: ["2 de octubre"]
  };

  let puntaje = 0;
  for (let clave in respuestasCorrectas) {
    const checkboxes = document.querySelectorAll(`input[name="${clave}"]:checked`);
    const valoresSeleccionados = Array.from(checkboxes).map(c => c.value);
    const correctas = respuestasCorrectas[clave];

    // Comparar si coinciden exactamente las respuestas correctas
    if (valoresSeleccionados.length === correctas.length &&
        valoresSeleccionados.every(v => correctas.includes(v))) {
      puntaje++;
    }
  }

  if (puntaje >= 2) {
    document.getElementById("img-quiz").style.display = "block";
  } else {
    alert("Algunas respuestas son incorrectas. Intenta de nuevo.");
  }
}
