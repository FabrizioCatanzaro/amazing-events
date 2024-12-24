import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
import { BACK_URL } from './url.js';

let container = document.getElementsByClassName('container-cards')[0]
let barraBuscador = document.getElementById('search-bar')
let checkboxContainer = document.querySelector('#checkbox-container')

// ---- TRAIGO LOS EVENTOS DESDE LA API -----

let events
let pastEvents

axios.get(`${BACK_URL}`)
      .then( res => {
        events = res.data
        let currentDate = new Date().toISOString().split('T')[0]
        pastEvents = events.filter(cadaevent => cadaevent.date < currentDate)
        console.log(pastEvents)
        imprimirEventos(container, pastEvents)
        printChecks(events, checkboxContainer )
        barraBuscador.addEventListener('keyup' , filtrar)
        checkboxContainer.addEventListener( 'change', filtrar)
      })
      .catch ( err => console.log(err))

// -------------------- FUNCIONES ----------------------------

// -- FUNCION PARA CREAR LOS EVENTOS EN UNA CARD SIN IMPRIMIR AÚN --

function crearCard(evento){
  
  let div = document.createElement('DIV')
  div.classList = 'newcard'
  div.innerHTML = `
  <div class="card">
    <img src="${evento.image}" alt="Imagen de ${evento.name}">
  <div class="titulo-card">
    <p id="category-css">${evento.category}</p>
    <h3>${evento.name}</h3>
    <p>${evento.description}</p>
  </div>
  <div class="pie-de-card">
    <p>Price: $${evento.price}</p>
    <a class="button" href="./details.html?id=${evento._id}">See more</a>
  </div>
  `

  return div
}

// -- FUNCION PARA IMPRIMIR LOS EVENTOS EN DISTINTAS CARDS DINÁMICAMENTE --

function imprimirEventos(contenedor, array) {
  contenedor.innerHTML = ""
  if(array.length > 0){
    let fragment = document.createDocumentFragment() // evita el reflow
    array.forEach( evento => fragment.appendChild( crearCard(evento) ) )
    contenedor.appendChild(fragment)
  } else{
    contenedor.innerHTML =
    `
    <div class="not-found">
      <h3>No results found for your search. Please try again!</h3>
    </div>
    `
  }
}

// -- FUNCION PARA IMPRIMIR LOS CHECKBOX DE FORMA DINAMICA --

function printChecks(array, contenedor) {
  let fn = array => array.category
  let categorias = new Set (array.filter( fn ).map( fn ))
  categorias.forEach((cat) => {
    contenedor.innerHTML += `
    <label>
    <input class="checkbox" type="checkbox" id="${cat.toLowerCase()}" name="letter" value="${cat.toLowerCase()}">${cat.toUpperCase()}
    </label>
    `
  });
}

// -- FUNCION PARA FILTRAR SEGUN LA CATEGORIA Y LA BUSQUEDA REALIZADA MEDIANTE LA SEARCHBAR

function filtrar(){
  let checked = [...document.querySelectorAll('.checkbox:checked')].map( e => e.value)
  console.log(checked);
  let filtradoPorCategoria = pastEvents.filter( eve => checked.includes( eve.category.toLowerCase() ) || checked.length === 0 )
  let filtradoPorBusqueda = filtradoPorCategoria.filter( eve => eve.name.toLowerCase().includes( barraBuscador.value.toLowerCase() ) )
  imprimirEventos(container, filtradoPorBusqueda)
}