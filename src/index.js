import './css/styles.css';
import { log } from './js/common'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { fetchCountries } from './js/fetchCountries' //!function
import CountrySearch from './js/fetchCountries'
import countriesListTpl from './templates/countriesList.hbs'
import countryTpl from './templates/country.hbs'
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
    // debounce: require('lodash.debounce')
    notifyOptrions: {
        width: '500px',
        fontSize: '20px',
        timeout: '3000',
        position: 'center-top',
    }
}
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
// var debounce = require('lodash.debounce'); //! debounce
// console.log(refs.input);
// console.log(refs.countryList);
// console.log(refs.countryInfo);

// fetchCountries() //! function
const fetchCountriesSearch = new CountrySearch(); //! class

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY))

function onInputChange(e) {
    e.preventDefault();
    const userInput = e.target.value
    console.log(userInput);
    if (e.target.value === '') {
        clearAppendCountryList()
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

function test1(countries) {
    if (countries.length >= 10) {
        Notify.info('Too many matches found. Please enter a more specific name.', refs.notifyOptrions)
        clearAppendHTML()
        return countries
    }
    return countries
}

function test2(countries) {
    if (2 <= countries.length && countries.length <= 10) {
        clearAppendHTML()
        appendCountryList(countries)
        return countries
    }
    return countries
}

function test3(countries) {
    if (countries.length === 1) {
        clearAppendHTML()
        appendCountry(countries)
        return countries
    }
    return countries
}

function test4(countries) {
    if (countries.status === 404 && countries.message === 'Not Found') {
        Notify.warning('Oops, there is no country with that name', refs.notifyOptrions)
        clearAppendHTML()
    }
}

function appendCountryList(countries) {
    refs.countryList.insertAdjacentHTML('beforeend', countriesListTpl(countries))
}

function clearAppendHTML() {
    refs.countryList.innerHTML = ''
    refs.countryInfo.innerHTML = ''
}

function appendCountry(countries) {
    refs.countryList.insertAdjacentHTML('beforeend', countryTpl(countries))
}



