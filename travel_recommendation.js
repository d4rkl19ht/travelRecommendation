let xhr = new XMLHttpRequest();
xhr.open("GET", "./travel_recommendation_api.json");
xhr.responseType = "json";
let places = [];
let slideshow_interval = "";

let countries = "";
let beaches = "";
let temples = "";

xhr.onload = () => {
  countries = xhr.response.countries;
  beaches = xhr.response.beaches;
  temples = xhr.response.temples;

  countries.forEach((country) => {
    country.cities.forEach((city) => {
      places.push(city);
    });
  });

  beaches.forEach((beach) => {
    places.push(beach);
  });

  temples.forEach((temple) => {
    places.push(temple);
  });

  let cardslideshow = document.getElementById('cardslideshow');

  cardslideshow.innerHTML = card_result(places);
  document.getElementById(`card_img_0`).style.opacity = 1;

  let i = 1;
  slideshow_interval = setInterval(()=>{
    if(i > 0) document.getElementById(`card_img_${i-1}`).style.opacity = 0;
    else document.getElementById(`card_img_${places.length-1}`).style.opacity = 0;

    document.getElementById(`card_img_${i}`).style.opacity = 1;
    i++;
    if(i==places.length) i=0;
  },5000)
}
xhr.send();

const txtSearch = document.getElementById("txtSearch");
const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");

btnSearch.addEventListener("click", () => {
  search_place(txtSearch.value);
});

btnClear.addEventListener("click", () => {
  txtSearch.value = "";
  txtSearch.focus();
});

function search_place(place) {
  places=[];
  clearInterval(slideshow_interval);
  
  if(place.toLowerCase().includes('countr')){
    countries.forEach((country) => {
        country.cities.forEach((city) => {
          places.push(city);
        });
    });
  } else {
    countries.forEach((country) => {
        country.cities.forEach((city) => {
            if(city.name.toLowerCase().includes(place.toLowerCase())){
                places.push(city);
            };
        });
    });
  };

  if(place.toLowerCase().includes('beach')){
    beaches.forEach((beach) => {
        places.push(beach);
    });
  }else {
    beaches.forEach((beach) => {
        if(beach.name.toLowerCase().includes(place.toLowerCase())){
            places.push(beach);
        }
    });
  };

  if(place.toLowerCase().includes('temple')){
    temples.forEach(temple=>{
        places.push(temple);
    });
  }else {
    temples.forEach(temple=>{
        if(temple.name.toLowerCase().includes(place.toLowerCase())){
            places.push(temple);
        };
    });
  };
  
  let searchresults = "";
  cardslideshow.style.opacity = 0;
  setTimeout(() => {
    places.forEach(place=>{
        searchresults += card_result_static(place);
    })
    cardslideshow.innerHTML = searchresults;
    cardslideshow.style.opacity = 1;    
  }, 500);
};

function card_result_static(obj) {
  return `<div class="card mb-5 w-100">
        <img src="./assets/${obj.imageUrl}" class="card-img-top" alt="${obj.imageUrl}">
        <div class="card-body">
            <h5 class="card-title">${obj.name}</h5>
            <p class="card-text">${obj.description}</p>
            <a href="#" class="btn btn-success fw-bolder">BOOK NOW</a>
        </div>
    </div>`;
}

function card_result(places) {
  let str_images = "";
  for(let i=0; i < places.length; i++) {
    str_images += 
   `<div class="card cardslideshow mb-5 w-100 position-absolute top-0 start-0" style="opacity:0" id="card_img_${i}">
        <img src="./assets/${places[i].imageUrl}" class="card-img-top" alt="${places[i].imageUrl}">
        <div class="card-body">
            <h5 class="card-title">${places[i].name}</h5>
            <p class="card-text">${places[i].description}</p>
            <a href="#" class="btn btn-success fw-bolder">BOOK NOW</a>
        </div>
    </div>`;
  };
  return str_images;
}
