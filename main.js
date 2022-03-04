'use strict'

// Link to GitHub repository: https://github.com/anna-jonsson/U2_Jonsson_Anna

// ** START OF CODE ** //

// A global variable for header, which addresses the h1 in the HTML document.
//This together with an event listener for 'header' was added to be able to refresh the page when clicking on the header.

let header = document.querySelector('h1')
header.addEventListener('click', function () {
  window.location.reload()
})

//Function for adding new city (object) with parameters and returning 'city' to make it available outside this function.

function addNewCity (name, country, language, visited) {
  let city = {
    name: name,
    country: country,
    language: language,
    visited: visited
  }

  return city
}

//Function to add newly created 'city' to array 'database' in separate document.

function addCityToDB (database, city) {
  database.push(city)
}

//Function to create/render HTML elements (li, div, button) and add class ('city') to them.
//This function also adds an ID to 'div', which is the 'id' key from object 'city'.
//Finally, the function returns the variable 'div' to make it available outside this function.

function renderCity (city) {
  let div = document.createElement('div')
  div.classList.add('city')
  div.id = city.id
  div.innerHTML = `
        <li>${city.name}</li>
        <div>${city.country}</div>
        <div>${city.language}</div>
        <div>${Number(city.visited)}</div>

        <button type="button">Remove</button>
    `

  return div
}

//Function to render 'cities'. Setting the HTML element with ID #results in variable 'results'.
//For loop created to loop through the cities and add them to parent element 'results'.
//Event listener 'filterBtnListener()' to make filtering available in this stage.

function renderCities (cities) {
  let results = document.getElementById('results')
  results.innerHTML = ''

  for (let city of cities) {
    let result = renderCity(city)
    results.appendChild(result)
  }

  filterBtnListener()
}

//Function to handle adding of new cities to the database.
//1. Preventing the default action connected to event, which in this case is sending user to a new page.
//2. Setting each HTML input field's inserted values in variables. E.g. 'name' for input field with id = #name's value.
//3. Using these variables when calling function 'addNewCity'.
//4. If statement to check if all fields are filled in:
//       4.1 If yes: alert '[city] was added to the list'.
//       4.2 If no: alert 'You need to fill in all fields in order to add city!' and don't add city to database.
//5. Giving the submitted city a subsequent id following the last (current) id in the array 'database'.
//6. Call functions to add city to database, render cities and eventlistener 'removeCityBtnListener' (to
//make remove functionality available in this stage).
//7. Reset (clear) the form after submission.

function addCityOnSubmit (event) {
  event.preventDefault()

  let name = document.getElementById('name').value
  let country = document.getElementById('country').value
  let language = document.getElementById('language').value
  let visited = document.getElementById('visited').value

  let city = addNewCity(name, country, language, visited)

  if (name == '' || country == '' || language == '' || visited == '') {
    return alert('You need to fill in all fields in order to add city!')
  }

  alert(`${name} was added to the list!`)

  city.id = database[database.length - 1].id + 1

  addCityToDB(database, city)
  renderCities(database)
  removeCityBtnListener()

  let form = document.getElementById('city-form')
  form.reset()
}

//Adding event listener for 'add' button in HTML connected to add city form.
//When button is clicked, addCityOnSubmit() is called.

function addCityBtnListener () {
  let btn = document.getElementById('add-btn')
  btn.addEventListener('click', addCityOnSubmit)
}

//Function to check city for id and if id correlates with given city it will be removed.
//This is done through a for loop, looping through the array of cities and if city.id == id -> remove.
//The loop will then come to a stop.

function removeCityByID (cities, id) {
  for (let i = 0; i < cities.length; i++) {
    let city = cities[i]

    if (city.id == id) {
      cities.splice(i, 1)

      return
    }
  }
}

//Adding event listener for all buttons within HTML elements with class 'city'.
//If button is clicked, call function removeCityOnClick().

function removeCityBtnListener () {
  let buttons = document.querySelectorAll('.city button')

  for (let button of buttons) {
    button.addEventListener('click', removeCityOnClick)
  }
}

//Function to remove city from database when clicking on 'remove' button.
//1. Using parameter event to set variable 'button' to address event.target.
//2. Setting variable 'id' to button.parentElement.id to be able to precise which city to be removed.
//3. If statement which checks through a confirm if user really wants to remove city:
//       3.1 If yes: remove the city from the database using parameters 'database' and 'id'.
//       3.2 If no: return false (do nothing).
//4. Conclude the function by calling renderCities() and removeCityBtnListener() (to
//make remove functionality available in this stage).

function removeCityOnClick (event) {
  let button = event.target
  let id = button.parentElement.id

  if (confirm(`Want to remove this city from the list?`) == true) {
    removeCityByID(database, id)
  } else {
    return false
  }

  renderCities(database)
  removeCityBtnListener()
}

//Function to start handling of filtering cities - by country. Parameters 'cities' and 'country'.
//Looping through all cities and if statement to check if city.country is the same as country, and if so:
//add to new array 'countryCities'.
//toLowerCase() is added to give user the option to search for cities using lower case letter and still get a hit.
//Return 'countryCities' to make it available outside this function.

function citiesByCountry (cities, country) {
  let countryCities = []

  for (let city of cities) {
    if (city.country.toLowerCase() == country.toLowerCase()) {
      countryCities.push(city)
    }
  }
  return countryCities
}

//Function to start handling of filtering cities - by language. Parameters 'cities' and 'language'.
//Looping through all cities and if statement to check if city.language is the same as language, and if so:
//add to new array 'countryCities'.
//toLowerCase() is added to give user the option to search for cities using lower case letter and still get a hit.
//Return 'languageCities' to make it available outside this function.

function citiesByLanguage (cities, language) {
  let languageCities = []

  for (let city of cities) {
    if (city.language.toLowerCase() == language.toLowerCase()) {
      languageCities.push(city)
    }
  }

  return languageCities
}

//Function to be able to reset/remove the filters and show the complete list of cities.
//Addressing the filter forms for 'language' and 'country' in variables 'formLanguage' and 'formCountry'.
//Using these variables to reset the forms and then calling functions renderCities() and removeCityBtnListener (to
//make remove functionality available in this stage).

function filterShowFullList () {
  let formLanguage = document.getElementById('filter-by-language')
  let formCountry = document.getElementById('filter-by-country')

  formLanguage.reset()
  formCountry.reset()

  renderCities(database)
  removeCityBtnListener()
}

//Function to be able to filter cities by country.
//Addressing the value inserted in HTML input field for country through variable 'countryValue'.
//Function citiesByCountry with parameters 'database' and 'countryValue' is placed in variable 'cities'.
//Same variables ('formLanguage' and 'formCountry') are used as in last function, also used here to be
//able to reset the form after submission.
//End function by calling functions renderCities() with parameter 'cities' and removeCityBtnListener() (to
//make remove functionality available in this stage).

function filterByCountry (event) {
  event.preventDefault()
  let countryValue = document.querySelector('#filter-country').value
  let cities = citiesByCountry(database, countryValue)

  let formLanguage = document.getElementById('filter-by-language')
  let formCountry = document.getElementById('filter-by-country')

  formLanguage.reset()
  formCountry.reset()

  renderCities(cities)
  removeCityBtnListener()
}

//Function to be able to filter cities by language.
//Addressing the value inserted in HTML input field for language through variable 'languageValue'.
//Function citiesByLanguage with parameters 'database' and 'languageValue' is placed in variable 'cities'.
//Same variables ('formLanguage' and 'formCountry') are used as in last function, also used here to be
//able to reset the form after submission.
//End function by calling functions renderCities() with parameter 'cities' and removeCityBtnListener() (to
//make remove functionality available in this stage).

function filterByLanguage (event) {
  event.preventDefault()
  let languageValue = document.querySelector('#filter-language').value
  let cities = citiesByLanguage(database, languageValue)

  let formLanguage = document.getElementById('filter-by-language')
  let formCountry = document.getElementById('filter-by-country')

  formLanguage.reset()
  formCountry.reset()

  renderCities(cities)
  removeCityBtnListener()
}

//Adding variables to HTML elements for each form for filtering (language, country) and resetting ('show full list').
//Using these variables to add event listeners for what should happen when a user clicks on the 'search' (filter)
//buttons and 'show full list' button. Calling functions filterbyLanguage(), filterbyCountry() and
//filterShowFullList() to each of these individual event listeners, allowing for the user to either filter by
//country, language or show the full list.

function filterBtnListener () {
  let formLanguage = document.getElementById('filter-by-language')
  let formCountry = document.getElementById('filter-by-country')
  let formShowFullList = document.getElementById('reset-filters')

  formLanguage.addEventListener('submit', filterByLanguage)
  formCountry.addEventListener('submit', filterByCountry)
  formShowFullList.addEventListener('click', filterShowFullList)
}

// Direct code (to be loaded parallel with site onload)
renderCities(database)
addCityBtnListener()
filterBtnListener()
removeCityBtnListener()
