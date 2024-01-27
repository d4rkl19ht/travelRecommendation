let xhr = new XMLHttpRequest();
const url = './travel_recommendation_api.json';
let results = "";


xhr.open('GET', url, true);
xhr.responseType = 'json';
xhr.onload = ()=> {
    let countries = xhr.response.countries;
    let temples = xhr.response.temples;
    let beaches = xhr.response.beaches;

    countries.forEach(country => {
        let cities = country.cities;
        cities.forEach(city => {
            results += card_result(city);
        })
    });
    div_results = document.getElementById('div_results');
    div_results.innerHTML = results;
}

xhr.send();

function card_result(obj){
    return `<div class="card mb-5 w-100">
        <img src="./assets/${obj.imageUrl}" class="card-img-top" alt="${obj.imageUrl}">
        <div class="card-body">
            <h5 class="card-title">${obj.name}</h5>
            <p class="card-text">${obj.description}</p>
            <a href="#" class="btn btn-primary">Book Now</a>
        </div>
    </div>`
}