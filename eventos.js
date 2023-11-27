// índice de masa corporal.

document.getElementById("imc").addEventListener("click",calcularIMC);

        function calcularIMC() {
            // Obtener los valores de peso y altura
            let peso = document.getElementById("peso").value;
            let altura = document.getElementById("altura").value;

            // Convertir a números
            peso = parseInt(peso);
            altura = parseInt(altura) / 100; // Convertir altura a metros

            // Calcular IMC
            let imc = peso / (altura * altura);

            // Mostrar el resultado en el input correspondiente
            document.getElementById("resultado").value = imc.toFixed(1);
        }
// .****************************************************************************************.
// conversor de divisas.

     function convertir(origen) {
        let tasaCambioDolaresAPesos = 4067.81; // Tasa de cambio (ejemplo)
        let tasaCambioPesosADolares = 1 / tasaCambioDolaresAPesos;

        console.log(tasaCambioDolaresAPesos);
        console.log(tasaCambioPesosADolares);

        let dolares = parseFloat(document.getElementById("dolar").value);
        let pesos = parseFloat(document.getElementById("pesos").value);

        if (origen === 'dolares') {
          // Si el cambio se realiza desde el campo de dólares
          document.getElementById("pesos").value = (dolares * tasaCambioDolaresAPesos).toFixed(2);
        } else {
          // Si el cambio se realiza desde el campo de pesos
          document.getElementById("dolar").value = (pesos * tasaCambioPesosADolares).toFixed(2);
        }
      }

// .****************************************************************************************.

// Aplicación de notas.
let notas = [
  {
    id: 1,
    titulo: "Sacar la basura",
    texto: "Mi mamá me va a retar sino lo hago",
    realizada: false,
  },

  {
    id: 2,
    titulo: "Comer",
    texto: "Quedó comida de ayer",
    realizada: false,
  },

  {
    id: 3,
    titulo: "Estudiar eventos",
    texto: "Estoy flojo de papeles y no voy a aprobar la task 3",
    realizada: false,
  },

  {
    id: 4,
    titulo: "Tomar",
    texto: "Debo hidratarme bien para no desmayarme",
    realizada: false,
  },
];

// función pintar notas

document.addEventListener("DOMContentLoaded", function() {
  // Llamar a la función pintarNotas aquí
  pintarNotas(notas);
});



function pintarNotas(notas) {
  let contenedorNotas = document.getElementById("contenedor-notas");
  contenedorNotas.innerHTML = "";

  if (notas.length === 0) {
      let noNotasParaMostrar = document.createElement("div");
      noNotasParaMostrar.classList.add("div-img", "card");
      noNotasParaMostrar.innerHTML = `<img src="${(src =
        "https://png.pngtree.com/thumb_back/fw800/background/20230714/pngtree-isolated-3d-illustration-of-emotions-and-feelings-on-a-white-background-image_3878253.jpg")}" class="card-img-top img-fluid " alt="...">
      
          <h5 class="card-title text-center">"NO HAY NOTAS PARA MOSTRAR"</h5>
          <p class="card-text text-center">"Por favor cree una nota nueva"</p>
      `;
      contenedorNotas.appendChild(noNotasParaMostrar);
      return;
  }

  

  notas.forEach(nota => {
      let cardDiv = document.createElement("div");
      cardDiv.classList.add("div-card","card","m-1");

      let navcheckboxtitulonota = document.createElement("nav");
      navcheckboxtitulonota.classList.add("div-navbar","navbar", "navbar-expand-lg", "bg-light");
      console.log(navcheckboxtitulonota);

      let diivcheckboxtitulonota = document.createElement("div");
      diivcheckboxtitulonota.classList.add("container")

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = nota.realizada;
      checkbox.classList.add("form-check-input");
      checkbox.addEventListener("click", () => marcarRealizada(nota.id));

      let tituloNota = document.createElement("h5");
      tituloNota.classList.add("card-title","m-1");
      tituloNota.textContent = nota.titulo;

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      let textoNota = document.createElement("p");
      textoNota.classList.add("card-text");
      textoNota.textContent = nota.texto;

      let botonBorrar = document.createElement("a");
      botonBorrar.classList.add("btn", "btn-danger", "border-dark");
      botonBorrar.innerHTML = `Borrar Nota`;
      botonBorrar.addEventListener("click", () => borrarNota(nota.id));

      
      navcheckboxtitulonota.appendChild(diivcheckboxtitulonota);
      diivcheckboxtitulonota.appendChild(checkbox);
      diivcheckboxtitulonota.appendChild(tituloNota);


      cardBody.appendChild(textoNota);
      cardBody.appendChild(botonBorrar);

      cardDiv.appendChild(navcheckboxtitulonota);
      cardDiv.appendChild(cardBody);
      contenedorNotas.appendChild(cardDiv);
  });
}

// ...








function agregarNota(titulo, texto) {
  let idGlobal = notas.length > 0 ? notas[notas.length - 1].id : 0;
  idGlobal++;
  let nuevaNota = { id: idGlobal, titulo, texto, realizada: false };
  notas.push(nuevaNota);
}

function agregarNotaYActualizar() {
  let titulo = document.getElementById("titulo").value;
  let texto = document.getElementById("texto").value;

  if (titulo && texto) {
    agregarNota(titulo, texto);
    pintarNotas(notas);
    limpiarCampos();
  } else {
    alert("Por favor, completa ambos campos.");
  }
}

function limpiarCampos() {
  document.getElementById("titulo").value = "";
  document.getElementById("texto").value = "";
}

function borrarNota(id) {
  notas = notas.filter((nota) => nota.id !== id);
  pintarNotas(notas);
  limpiarCampos();
}

function marcarRealizada(id) {
  let nota = notas.find((nota) => nota.id === id);
  if (nota) {
    nota.realizada = !nota.realizada;
    pintarNotas(notas);
  }
}

function filtrarPorRealizadas(notas) {
  return notas.filter((nota) => nota.realizada);
}

function filtrarPorTexto(notas, texto) {
  if (!texto) return notas;
  return notas.filter(
    (nota) => nota.titulo.toLowerCase().includes(texto) || nota.texto.toLowerCase().includes(texto)
  );
}

function aplicarFiltros() {
  let textoFiltro = document.getElementById("filtroTexto").value;
  let checkboxRealizadas = document.getElementById("filtroRealizadas").checked;

  let notasFiltradas = notas;

  if (checkboxRealizadas) {
    notasFiltradas = filtrarPorRealizadas(notasFiltradas);
  }

  notasFiltradas = filtrarPorTexto(notasFiltradas, textoFiltro);

  pintarNotas(notasFiltradas);
}
