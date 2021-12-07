const BASE_URL = 'https://restcountries.com/v2/name/';
const filters = {
    country: 'name',
    capital: 'capital',
    population: 'population',
    languages: 'languages',
    flag: 'flags'
}

//! class
export default class CountrySearch {
    constructor() {
        this.searchQuery = '';
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
            .catch(e => {
                console.log(e);
            })
    }
    get query() {
        return this.searchQuery
    }
    set query(value) {
        this.searchQuery = value
    }
    test1(countries) {
        if (countries.length >= 10) {
            Notify.info('Too many matches found. Please enter a more specific name.', refs.notifyOptrions)
            // clearAppendHTML()
            return countries
        }
        return countries
    }
}
