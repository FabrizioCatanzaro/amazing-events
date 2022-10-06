let container = document.getElementsByClassName('container-cards')[0]

for (let i = 0; i < data.events.length; i++){
    if (data.currentDate < data.events[i].date){
        let card = document.createElement('div')
        card.innerHTML +=
        `
        <div class="card">
        <img src="${data.events[i].image}" alt="${data.events[i].name}">
              <div class="titulo-card">
                <h3>${data.events[i].name}</h3>
                <p>${data.events[i].description}</p>
              </div>
              <div class="pie-de-card">
                <p>Price: ${data.events[i].price}</p>
                <a class="button" href="./details.html">See more</a>
              </div>
        `
        container.appendChild(card)
    }
}
