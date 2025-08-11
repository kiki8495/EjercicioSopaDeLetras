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
    const existe = this.palabras.some(
      (p) => p.texto.toUpperCase() === palabra.texto.toUpperCase()
    );

    if (existe) {
      alert(`La palabra "${palabra.texto}" ya fue agregada.`);
      return false;
    }

    this.palabras.push(palabra);
    return true;
  }
  agregarPalabraTablero() {
    this.palabras.forEach((palabra) => {
      let colocada = false;
      while (!colocada) {
        // Dirección aleatoria: 0 = horizontal, 1 = vertical
        let direccion = Math.floor(Math.random() * 2);
        let filaInicio, columnaInicio;
        let espacioLibre = true;

        if (direccion === 0) {
          // HORIZONTAL
          filaInicio = Math.floor(Math.random() * this.filas);
          columnaInicio = Math.floor(
            Math.random() * (this.columnas - palabra.texto.length)
          );

          for (let i = 0; i < palabra.texto.length; i++) {
            if (this.tablero[filaInicio][columnaInicio + i] !== "") {
              espacioLibre = false;
              break;
            }
          }

          if (espacioLibre) {
            for (let i = 0; i < palabra.texto.length; i++) {
              this.tablero[filaInicio][columnaInicio + i] = palabra.texto[i];
            }
            colocada = true;
          }
        } else {
          // VERTICAL
          filaInicio = Math.floor(
            Math.random() * (this.filas - palabra.texto.length)
          );
          columnaInicio = Math.floor(Math.random() * this.columnas);

          for (let i = 0; i < palabra.texto.length; i++) {
            if (this.tablero[filaInicio + i][columnaInicio] !== "") {
              espacioLibre = false;
              break;
            }
          }

          if (espacioLibre) {
            for (let i = 0; i < palabra.texto.length; i++) {
              this.tablero[filaInicio + i][columnaInicio] = palabra.texto[i];
            }
            colocada = true;
          }
        }
      }
    });
  }

  rellenarLetras() {
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        if (this.tablero[i][j] === "") {
          this.tablero[i][j] = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          );
        }
      }
    }
  }
  renderizarHTML(contenedor) {
    contenedor.innerHTML = "";
    this.tablero.forEach((fila) => {
      const divFila = document.createElement("div");
      divFila.classList.add("fila");
      fila.forEach((letra) => {
        const celda = document.createElement("span");
        celda.classList.add("celda");
        celda.textContent = letra;
        divFila.appendChild(celda);
      });
      contenedor.appendChild(divFila);
    });
  }
}

//Logica
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const inputPalabra = document.getElementById("inputPalabra");
  const listaPalabras = document.getElementById("listaPalabras");
  const contenedorSopa = document.getElementById("sopa-container");

  const sopa = new SopaDeLetras(15, 15);

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const texto = inputPalabra.value.trim();
    if (texto) {
      if (sopa.palabras.length >= 5) {
        alert("Solo puedes ingresar un máximo de 5 palabras.");
        return;
      }

      const nuevaPalabra = new Palabra(texto);
      if (sopa.agregarPalabra(nuevaPalabra)) {
        const li = document.createElement("li");
        li.textContent = nuevaPalabra.texto;
        listaPalabras.appendChild(li);
      }

      inputPalabra.value = "";

      // Cuando tenga 5 palabras, generar sopa
      if (sopa.palabras.length === 5) {
        sopa.agregarPalabraTablero();
        sopa.rellenarLetras();
        sopa.renderizarHTML(contenedorSopa);
      }
    }
  });
});
