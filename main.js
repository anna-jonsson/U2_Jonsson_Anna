"use strict";

// Link to GitHub repository: https://github.com/anna-jonsson/U2_Jonsson_Anna

// ** START OF CODE ** //

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
        <div>${city.name}</div>
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
}

function addCityOnSubmit (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let country = document.getElementById("country").value;
    let language = document.getElementById("language").value;
    let visited = document.getElementById("visited").value;

    let city = addNewCity(name, country, language, visited);

    city.id = database[database.length - 1].id + 1;

    addCityToDB(database, city);
    renderCities(database);

    let form = document.getElementById("city-form");
    form.reset();
}

function addCityBtnListener () {
    let btn = document.getElementById("add-btn");
    btn.addEventListener("click", addCityOnSubmit);
}


// Direct code (to be loaded parallel with site onload)
renderCities(database);
addCityBtnListener();