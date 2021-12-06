import { log } from "./common";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// export { fetchCountries } //! function
const API_KEY = '';
const BASE_URL = 'https://restcountries.com/v2/name/';
const PERU_URL = 'https://restcountries.com/v2/name/peru'; //? test peru
const filters = {
    country: 'name',
    capital: 'capital',
    population: 'population',
    languages: 'languages',
    flag: 'flags'
}

//! function 
function fetchCountries() {
    const urlCountry = `${PERU_URL}`
    return fetch(urlCountry)
        .then(response => {
            response.json();
        })
        .then(data => console.log(data))
}

//! class
export default class CountrySearch {
    constructor() {
        this.searchQuery = '';
        // this.page = 1;
    }
    fetchCountries() {
        const urlCountry = `${BASE_URL}${this.searchQuery}?fields=${filters.country},${filters.capital},${filters.population},${filters.flag},${filters.languages}`
        console.log(urlCountry);
        return fetch(urlCountry)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response
            })
            .then(response => response.json())
            .then((countries) => {
                return countries; //! change this line to console.log(countries), this line returns array
            })
    }
    get query() {
        return this.searchQuery
    }
    set query(value) {
        this.searchQuery = value
    }
    testLength1(countries) { //! test > 10
        console.log(typeof countries);
        if (countries.length > 10) {
            console.log('length > 10');
            Notify.info('Too many matches found. Please enter a more specific name.', {
                width: '500px',
                fontSize: '20px',
                timeout: '3000',
                position: 'center-top',
            })
            return
        }
        console.log('length < 10');
        return countries
    }
    testLength2(countries) { //! test from 2 to 10
        if (2 > countries.length) {
            return console.log('wrong data');
        }
        return countries
    }
}
