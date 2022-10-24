let containerDetails = document.getElementsByClassName('container-cards-details')[0]
// let totalEventos = data.events

let id = location.search
let param = new URLSearchParams(id)
let idMetodos = (param.get("id"))

// console.log(id)
// console.log(param)

let events;
let currentDate;
fetch('https://mind-hub.up.railway.app/amazing')
      .then( data => data.json())
      .then( res => {
        // console.log(res)
        events = res.events
        // console.log(events)
        currentDate = res.date
        // console.log(currentDate)
        let detalleEvento = events.find( element => element.id === idMetodos )
        // console.log(detalleEvento)

        if (detalleEvento.date > currentDate) {
          detailsFuture(detalleEvento)
        } else if (detalleEvento.date < currentDate) {
          detailsPast(detalleEvento)
        }
      })
      .catch ( err => console.log(err))


function detailsPast(eve) {
  containerDetails.innerHTML =
    `
      <div class="card-details">
        <div class="img-card">
          <img src="${eve.image}" alt="${eve.name}">
        </div>
        <div class="titulo-card-details">
          <h3>${eve.name}</h3>
          <p>Category: ${eve.category}</p>
          <p>Place: ${eve.place}</p>
          <p>Capacity: ${eve.capacity}</p>
          <p>Assistance: ${eve.assistance}</p>
          <p>Price: $${eve.price}</p>
          <p>Date: ${eve.date}</p>
        </div>
      </div>
    `
}

function detailsFuture(eve) {
  containerDetails.innerHTML =
    `
    <div class="card-details">
      <div class="img-card">
        <img src="${eve.image}" alt="${eve.name}">
      </div>
      <div class="titulo-card-details">
        <h3>${eve.name}</h3>
        <p>Category: ${eve.category}</p>
        <p>Place: ${eve.place}</p>
        <p>Capacity: ${eve.capacity}</p>
        <p>Estimate: ${eve.estimate}</p>
        <p>Price: $${eve.price}</p>
        <p>Date: ${eve.date}</p>
      </div>
    </div>
  `
}