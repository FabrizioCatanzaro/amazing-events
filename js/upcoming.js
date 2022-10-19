let container = document.getElementsByClassName('container-cards')[0]

let upcomingEvents = data.events.filter(cadaevent => cadaevent.date > data.currentDate)

function imprimirEventosFuturos(contenedor, array) {
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
              <a class="button" href="./details.html">See more</a>
            </div>
      `
  })
}

imprimirEventosFuturos(container, upcomingEvents)

// -------- BARRA DE BUSQUEDA ----------------

let barraBuscador = document.getElementById('search-bar')

barraBuscador.addEventListener('input', (evento) => {

  let filtrados = upcomingEvents.filter((ev) =>
    ev.name.toLowerCase().includes(evento.target.value.toLowerCase())
  )
  container.innerHTML = ""
  imprimirEventosFuturos(container, filtrados)
})