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
        position: 'center-top',
    }
}
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const fetchCountriesSearch = new CountrySearch(); //! class

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY))

function onInputChange(e) {
    e.preventDefault();
    const userInput = e.target.value
    console.log(userInput);
    if (userInput === '') {
        clearAdjacentHTML()
        return
    }

    fetchCountriesSearch.query = userInput.trim();
    fetchCountriesSearch.fetchCountries() //! returns response.jason()
        .then(countries => {
            console.log(countries);
            test1(countries)
            return countries
        })
        .then(countries => {
            test2(countries)
            return countries
        })
        .then(countries => {
            test3(countries)
            return countries
        })
        .then(countries => {
            test4(countries)
        })
        .catch((e) => {
            console.log(e);
        })
}
//! tests functions
function test1(countries) {
    if (countries.length >= 10) {
        Notify.info('Too many matches found. Please enter a more specific name.', refs.notifyOptions)
        clearAdjacentHTML()
    }
}
function test2(countries) {
    if (2 <= countries.length && countries.length <= 10) {
        clearAdjacentHTML()
        createMarkupList(countries)
    }
}
function test3(countries) {
    if (countries.length === 1) {
        clearAdjacentHTML()
        createMarkup(countries)
    }
}
function test4(countries) {
    if (countries.status === 404 && countries.message === 'Not Found') {
        Notify.warning('Oops, there is no country with that name', refs.notifyOptions)
        clearAdjacentHTML()
    }
}
//! utility functions
function createMarkupList(countries) {
    refs.countryList.insertAdjacentHTML('beforeend', countriesListTpl(countries))
}

function clearAdjacentHTML() {
    refs.countryList.innerHTML = ''
    refs.countryInfo.innerHTML = ''
}

function createMarkup(countries) {
    refs.countryList.insertAdjacentHTML('beforeend', countryTpl(countries))
}



