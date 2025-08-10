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
function mostrarEnPantalla(sopa) {
  const container = document.getElementById("sopa-container");
  container.innerHTML = "";
  sopa.forEach((fila) => {
    const filaDiv = document.createElement("div");
    filaDiv.style.display = "flex";
    fila.forEach((letra) => {
      const letraDiv = document.createElement("div");
      letraDiv.textContent = letra;
      letraDiv.style.border = "1px solid black";
      letraDiv.style.width = "30px";
      letraDiv.style.height = "30px";
      letraDiv.style.display = "flex";
      letraDiv.style.justifyContent = "center";
      letraDiv.style.alignItems = "center";
      letraDiv.style.userSelect = "none";
      letraDiv.style.fontWeight = "bold";
      filaDiv.appendChild(letraDiv);
    });
    container.appendChild(filaDiv);
  });
}
const sopa = new SopaDeLetras(10, 10);
sopa.agregarPalabra(new Palabra("JS", 0, 0, "horizontal"));
const tableroConLetras = sopa.mostrarTablero();
mostrarEnPantalla(tableroConLetras);
