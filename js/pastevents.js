let container = document.getElementsByClassName('container-cards')[0]

let pastEvents = data.events.filter(cadaevent => cadaevent.date <= data.currentDate)

function imprimirEventosPasados(contenedor, array) {
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

imprimirEventosPasados(container, pastEvents)

// -------- BARRA DE BUSQUEDA ----------------

let barraBuscador = document.getElementById('search-bar')

barraBuscador.addEventListener('input', (evento) => {

  let filtrados = pastEvents.filter((ev) =>
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
    imprimirEventosPasados(container, filtrados)
  }

})

// ------------ CHECKBOXES --------------

let checkboxes = document.querySelectorAll(".checkbox")
console.log(checkboxes);

for (element of checkboxes) {
  element.addEventListener(
    'click',
    (event) => buscar(event, pastEvents)
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

  imprimirEventosPasados(container, arrayFiltrado)
}