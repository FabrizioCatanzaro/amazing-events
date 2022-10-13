let container = document.getElementsByClassName('container-cards')[0]

/* for (let i = 0; i < data.events.length; i++) {
  if (data.currentDate > data.events[i].date) {
    container.innerHTML +=
      `
        <div class="card">
        <img src="${data.events[i].image}" alt="${data.events[i].name}">
              <div class="titulo-card">
                <h3>${data.events[i].name}</h3>
                <p>${data.events[i].description}</p>
              </div>
              <div class="pie-de-card">
                <p>Price: $${data.events[i].price}</p>
                <a class="button" href="./details.html">See more</a>
              </div>
        `
  }
} */

// imprimirCards(container, data)

/* function imprimirCards(contenedor, array) {
  for (let i = 0; i < array.events.length; i++) {
    if (array.currentDate > array.events[i].date) {
      contenedor.innerHTML +=
        `
    <div class="card">
    <img src="${array.events[i].image}" alt="${array.events[i].name}">
          <div class="titulo-card">
            <h3>${array.events[i].name}</h3>
            <p>${array.events[i].description}</p>
          </div>
          <div class="pie-de-card">
            <p>Price: $${array.events[i].price}</p>
            <a class="button" href="./details.html">See more</a>
          </div>
    `
    }
  }
} */

function imprimirEventosPasados (contenedor, array){
  return array.events.filter( event => event.date < array.currentDate)
  .map( event => {
    contenedor.innerHTML +=
        `
      <div class="card">
      <img src="${event.image}" alt="${event.name}">
            <div class="titulo-card">
              <h3>${event.name}</h3>
              <p>${event.description}</p>
            </div>
            <div class="pie-de-card">
              <p>Price: $${event.price}</p>
              <a class="button" href="./details.html">See more</a>
            </div>
      `
  } )
}

imprimirEventosPasados(container, data)