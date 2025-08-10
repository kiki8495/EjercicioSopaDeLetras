//Clases
class Palabra {
  constructor(texto, fila, columna) {
    this.texto = texto.toUpperCase();
    this.fila = fila;
    this.columna = columna;
  }
}
class SopaDeLetras {
  constructor(filas, columnas) {
    this.filas = filas;
    this.columnas = columnas;
    this.tablero = this.crearTablero();
    this.palabras = [];
  }
  crearTablero() {
    const matriz = [];
    for (let i = 0; i < this.filas; i++) {
      matriz[i] = [];
      for (let j = 0; j < this.columnas; j++) {
        matriz[i][j] = "";
      }
    }
    return matriz;
  }

  agregarPalabra(palabra) {
    this.palabras.push(palabra);
  }

  mostrarTablero() {
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        if (this.tablero[i][j] === "") {
          this.tablero[i][j] = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          );
        }
      }
    }
    return this.tablero;
  }
}
//
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const inputPalabra = document.getElementById("inputPalabra");
  const listaPalabras = document.getElementById("listaPalabras");
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const textContent = inputPalabra.value.trim();
    if (textContent) {
      const nuevaPalabra = new Palabra(textContent);
      agregarPalabraAlista(nuevaPalabra);
    }
  });

  function agregarPalabraAlista(palabra) {
    const li = document.createElement("li");
    li.textContent = palabra.texto;

    if (listaPalabras.children.length >= 5) {
      alert("Solo puedes ingresar un máximo de 5 palabras.");
      inputPalabra.disabled = true;
      document.getElementById("btn").disabled = true;
      return;
    }

    listaPalabras.appendChild(li);
  }
});

//
