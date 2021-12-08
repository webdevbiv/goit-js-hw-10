import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import CountrySearch from './js/fetchCountries'
import countriesListTpl from './templates/countriesList.hbs'
import countryTpl from './templates/country.hbs'
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
    notifyOptions: {
        width: '500px',
        fontSize: '20px',
        timeout: '1500',
        position: 'right-top',
    }
}
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const fetchCountriesSearch = new CountrySearch(); //! class

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY))

function onInputChange(e) {
    e.preventDefault();
    const userInput = e.target.value.trim()
    console.log(userInput);
    if (userInput === '') {
        clearAdjacentHTML()
        return
    }

    fetchCountriesSearch.query = userInput;
    fetchCountriesSearch.fetchCountries() //! returns response.jason()
        .then(testUserInput)
        .catch(error)
}

//! tests functions
function testUserInput(countries) {
    test1(countries)
    test2(countries)
    test3(countries)
    test4(countries)
}

function test1(countries) {
    if (countries.length >= 10) {
        clearAdjacentHTML()
        Notify.info('Too many matches found. Please enter a more specific name.', refs.notifyOptions)
    }
}
function test2(countries) {
    if (2 <= countries.length && countries.length <= 10) {
        clearAdjacentHTML()
        countries.reverse()
        createMarkup(countries, refs.countryList, countriesListTpl)
    }
}
function test3(countries) {
    if (countries.length === 1) {
        clearAdjacentHTML()
        createMarkup(countries, refs.countryInfo, countryTpl)
    }
}
function test4(countries) {
    if (countries.status === 404 && countries.message === 'Not Found') {
        clearAdjacentHTML()
        Notify.warning('Oops, there is no country with that name', refs.notifyOptions)
    }
}
function error(er) {
    console.log(er);
}
//! utility functions
function createMarkup(countries, element, template) {
    element.insertAdjacentHTML('beforeend', template(countries))
}

function clearAdjacentHTML() {
    refs.countryList.innerHTML = ''
    refs.countryInfo.innerHTML = ''
}





