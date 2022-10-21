// guardo en la variable "container" el elemento html "container-cards"
let container = document.getElementsByClassName('container-cards')[0]
let totalEventos = data.events

// creo la funcion que recorre cada "evento" e imprime dentro del "contenedor" dado
function imprimirEventos(contenedor, array) {
  contenedor.innerHTML = ""
  array.forEach((eve) => {
    contenedor.innerHTML +=
      `
      <div class="card">
      <img src="${eve.image}" alt="${eve.name}">
            <div class="titulo-card">
              <p id="category-css">${eve.category}</p>
              <h3>${eve.name}</h3>
              <p>${eve.description}</p>
            </div>
            <div class="pie-de-card">
              <p>Price: $${eve.price}</p>
              <a class="button" href="./details.html?id=${eve._id}">See more</a>
            </div>
      `
  })
}
//console.log(totalEventos);
imprimirEventos(container, totalEventos)

// -------- BARRA DE BUSQUEDA ----------------

let barraBuscador = document.getElementById('search-bar')

barraBuscador.addEventListener('input', (evento) => {

  let filtrados = totalEventos.filter((ev) =>
    ev.name.toLowerCase().includes(evento.target.value.toLowerCase())
  )

  if (filtrados.length === 0 || filtrados === false || filtrados === undefined) {
    container.innerHTML =
    `
    <div class="not-found">
      <h3>No results found for your search. Please try again!</h3>
    </div>
    `
  } else if (filtrados !== 0) {
    container.innerHTML = ""
    imprimirEventos(container, filtrados)
  }

})

// ----------- CATEGORIAS --------------

let categorias = new Set(totalEventos.map(element => element.category))
categorias = [...categorias]
console.log(categorias);

// --------- SEPARANDO EVENTOS POR CATEGORIAS ------------

let arrrayEventos = categorias.map(cadaCategoria => {

  let categoriasFiltradas = totalEventos.filter(cadaEvento => cadaEvento.category === cadaCategoria)

  return categoriasFiltradas
})

// ------------ CHECKBOXES --------------

let checkboxes = document.querySelectorAll(".checkbox")
console.log(checkboxes);

for (element of checkboxes) {
  element.addEventListener(
    'click',
    (event) => buscar(event, totalEventos)
  )
}


function buscar(event, array) {
  // console.log(event.target.checked);
  let checkboxesActivados = document.querySelectorAll('.checkbox:checked')
  let arrayFiltrado = []

  for (let cadacheck of checkboxesActivados){
    let nuevoArray = array.filter(eve => eve.category.toLowerCase() === cadacheck.value.toLowerCase())
    // console.log(nuevoArray);
    arrayFiltrado = arrayFiltrado.concat(nuevoArray)
  }

  // console.log(arrayFiltrado);

  if (arrayFiltrado.length === 0) {
    arrayFiltrado = array
    arrayFiltrado = [...arrayFiltrado]
  }

  imprimirEventos(container, arrayFiltrado)
}