"use strict";

// Link to GitHub repository: https://github.com/anna-jonsson/U2_Jonsson_Anna

// ** START OF CODE ** //

let header = document.querySelector("h1");
header.addEventListener("click", function () {
    window.location.reload()
})


function addNewCity (name, country, language, visited) {

    let city = {
        name: name,
        country: country,
        language: language,
        visited: visited
    };

    return city;
}

function addCityToDB (database, city) {

    database.push(city);

};

function renderCity (city) {

    let div = document.createElement("div");
    div.classList.add("city");
    div.id = city.id;
    div.innerHTML = `
        <li>${city.name}</li>
        <div>${city.country}</div>
        <div>${city.language}</div>
        <div>${Number(city.visited)}</div>

        <button type="button">Remove</button>
    `;

    return div;
}

function renderCities (cities) {
    let results = document.getElementById("results");
    results.innerHTML = "";

    for (let city of cities) {
        let result = renderCity(city);
        results.appendChild(result);
    }

    filterBtnListener ()
}

function addCityOnSubmit (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let country = document.getElementById("country").value;
    let language = document.getElementById("language").value;
    let visited = document.getElementById("visited").value;

    let city = addNewCity(name, country, language, visited);

    if (name == "" || country == "" || language == "" || visited == "") {
        return alert("You need to fill in all fields in order to add city!");
    }

    alert(`${name} was added to the list!`);

    city.id = database[database.length - 1].id + 1;

    addCityToDB(database, city);
    renderCities(database);
    removeCityBtnListener();

    let form = document.getElementById("city-form");
    form.reset();
}

function addCityBtnListener () {
    let btn = document.getElementById("add-btn");
    btn.addEventListener("click", addCityOnSubmit);
}

function removeCityByID (cities, id) {

    for (let i = 0 ; i < cities.length ; i++) {

        let city = cities[i];

        if (city.id == id) {
            cities.splice(i, 1);

            return;
        }
    }
}

function removeCityBtnListener () {
    let buttons = document.querySelectorAll(".city button");
    
    for (let button of buttons) {
        button.addEventListener("click", removeCityOnClick);
    }

}

function removeCityOnClick (event) {

    let button = event.target; 
    let id = button.parentElement.id;

    if (confirm(`Want to remove this city from the list?`) == true ) {

    removeCityByID(database, id);
    } else {

        return false;
    }

    renderCities(database);
    removeCityBtnListener();

}



function citiesByCountry (cities, country) {
    let countryCities = [];

    for (let city of cities) {
        if (city.country.toLowerCase() == country.toLowerCase()) {
            countryCities.push(city);
        }
    }
    return countryCities;
}

function citiesByLanguage (cities, language) {
    let languageCities = [];

    for (let city of cities) {
        if (city.language.toLowerCase() == language.toLowerCase()) {
            languageCities.push(city);
        }
    }

    return languageCities;
}

function filterShowFullList () {
    let formLanguage = document.getElementById("filter-by-language");
    let formCountry = document.getElementById("filter-by-country");
    
    formLanguage.reset();
    formCountry.reset();

    renderCities(database);
    removeCityBtnListener();
} 

function filterByCountry (event) {
    event.preventDefault();
    let countryValue = document.querySelector("#filter-country").value;
    let cities = citiesByCountry(database, countryValue); 

    let formLanguage = document.getElementById("filter-by-language");
    let formCountry = document.getElementById("filter-by-country");
    
    formLanguage.reset();
    formCountry.reset();

    renderCities(cities);
    removeCityBtnListener();

}

function filterByLanguage (event) {
    event.preventDefault();
    let languageValue = document.querySelector("#filter-language").value;
    let cities = citiesByLanguage(database, languageValue); 

    let formLanguage = document.getElementById("filter-by-language");
    let formCountry = document.getElementById("filter-by-country");
    
    formLanguage.reset();
    formCountry.reset();

    renderCities(cities);
    removeCityBtnListener();

}

function filterBtnListener () {

    let formLanguage = document.getElementById("filter-by-language");
    let formCountry = document.getElementById("filter-by-country");
    let formShowFullList = document.getElementById("reset-filters");

    formLanguage.addEventListener("submit", filterByLanguage);
    formCountry.addEventListener("submit", filterByCountry);
    formShowFullList.addEventListener("click", filterShowFullList);

}

// Direct code (to be loaded parallel with site onload)
renderCities(database);
addCityBtnListener();
filterBtnListener();
removeCityBtnListener();