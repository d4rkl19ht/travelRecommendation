const txtSearch = document.getElementById('txtSearch');
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

btnSearch.addEventListener('click',()=>{
    search_place(txtSearch.value);
})

btnClear.addEventListener('click',()=>{
    txtSearch.value="";
    txtSearch.focus();
})



function search_place(place) {
    let xhr = new XMLHttpRequest();
    const url = './travel_recommendation_api.json';
    let results = "";
        
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = ()=> {
        let countries = xhr.response.countries;
        let temples = xhr.response.temples;
        let beaches = xhr.response.beaches;

        countries.forEach(country=>{
            let cities = country.cities;
            cities.forEach(city=>{
                if(city.name.toLowerCase().includes(place.toLowerCase())){
                    results += card_result(city);
                }
            })
        })
        // countries.forEach(country => {
        //     let cities = country.cities;
        //     cities.forEach(city => {
        //         results += card_result(city);
        //     })
        // });

        temples.forEach(temple=>{
            if(temple.name.toLowerCase().includes(place.toLowerCase())){
                results += card_result(temple);
            }
        });

        beaches.forEach(beach => {
            if(beach.name.toLowerCase().includes(place.toLowerCase())){
                results += card_result(beach);
                }
        });

        div_results = document.getElementById('div_results');
        div_results.innerHTML = results;
    }

    xhr.send();
}

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