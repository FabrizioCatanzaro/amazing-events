let containerDetails = document.getElementsByClassName('container-cards-details')[0]
let totalEventos = data.events

let id = location.search
let param = new URLSearchParams(id)
let idParametro = parseInt(param.get("id"))

let eve = totalEventos.find(element => element._id === idParametro)

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
                    <p>Estimate: ${eve.estimate}</p>
                    <p>Price: $${eve.price}</p>
                    </div>
                </div>
        `
