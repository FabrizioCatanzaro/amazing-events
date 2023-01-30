let $contTablas = document.querySelector('.tablas-general')
const $table1 = document.querySelector('.tabla-1')
const $table2 = document.querySelector('.tabla-2')
const $table3 = document.querySelector('.tabla-3')

// ---- TRAIGO LOS EVENTOS DESDE LA API -----

let events
let pastEvents
let futureEvents

fetch('https://mh-amazing.herokuapp.com/amazing')
    .then(data => data.json())
    .then(res => {
        events = res.events
        currentDate = res.date
        pastEvents = events.filter(eachEve => eachEve.date < currentDate)
        futureEvents = events.filter(eachEve => eachEve.date > currentDate)

        appendKey(pastEvents)
        appendKey(futureEvents)

        let capacityEvents = [...events].sort((a, b) => a.capacity - b.capacity)
        let maxCapacityEvent = capacityEvents[capacityEvents.length - 1]

        let percAssisEvent = [...pastEvents].sort((a, b) => a.percentageAssistance - b.percentageAssistance)
        let minPercentageAssis = percAssisEvent[0]
        let maxPercentageAssis = percAssisEvent[percAssisEvent.length - 1]

        let pastCategories = new Set(pastEvents.map(event => event.category))
        pastCategories = [...pastCategories]

        let currentCategories = [...new Set(events.map(event => event.category))]

        let futureCategories = [...new Set(futureEvents.map(event => event.category))]
        

        currentCategories.forEach(impTabla3)
        futureCategories.forEach(impTabla2)
        $table1.innerHTML += `
                            <thead>
                                <tr>
                                    <th colspan="3">Events Statistics</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table-title">
                                    <td>Events with the highest percentage of attendance</td>
                                    <td>Events with the lowest percentage of attendance</td>
                                    <td>Event with larger capacity</td>
                                </tr>
                                <tr>
                                    <td>${maxPercentageAssis.name}: ${Math.round(maxPercentageAssis.percentageAssistance)}%</td>
                                    <td>${minPercentageAssis.name}: ${minPercentageAssis.percentageAssistance}%</td>
                                    <td>${maxCapacityEvent.name}: ${parseInt(maxCapacityEvent.capacity).toLocaleString('de-DE')}</td>
                                </tr>
                            </tbody>    
                            `
    })
    .catch(err => console.log(err))

// ------------------ FUNCIONES ---------------------

function appendKey(array) {
    if (array === pastEvents) {
        array.map(event => {
            event.percentageAssistance = 100 * event.assistance / event.capacity
            event.profit = parseInt(event.price) * parseInt(event.assistance)
        })
    } else if (array === futureEvents) {
        array.map(event => {
            event.percentageAssistance = 100 * event.estimate / event.capacity
            event.profit = parseInt(event.price) * parseInt(event.estimate)
        })
    }
}

function impTabla3(element) {
    let capacity = 0
    let assistance = 0
    let profits = 0
    pastEvents.forEach(event => {
        if (event.category === element) {
            capacity += event.capacity
            assistance += event.assistance
            profits += event.profit
        }
    })
    $table3.innerHTML += `<tr>
                            <td class="data_table">${element}</td>
                            <td class="data_table">${profits.toLocaleString('de-DE')}</td>
                            <td class="data_table">${Math.round(assistance * 100 / capacity)}%</td>
                        </tr>`
}

function impTabla2(element) {
    let capacity = 0
    let estimate = 0
    let profits = 0
    futureEvents.forEach(event => {
        if (event.category === element) {
            capacity += event.capacity
            estimate += event.estimate
            profits += event.profit
        }
    })
    $table2.innerHTML += `
                            <tr>
                                <td>${element}</td>
                                <td>${profits.toLocaleString('de-DE')}</td>
                                <td>${Math.round(estimate * 100 / capacity)}%</td>
                            </tr>
                            `
}