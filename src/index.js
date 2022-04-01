import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { getRefs } from './js/get-refs';

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import countries from './templates/countries.hbs'
// import oneСountry from './templates/oneСountry.hbs'

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));



function onInput() {
    const inputValue = refs.inputEl.value.toLowerCase().trim();
    if (inputValue === '') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return
    }

    fetchCountries(inputValue)
        .then(handlerInputValue)
            .catch(onFatchError);

};



function handlerInputValue(data) {

     refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    const language = Object.values(data[0].languages).join(', ');
    
    if (data.length <= 10 && data.length > 1) {

        refs.countryList.insertAdjacentHTML('beforeend', countries(data));

    } else if (data.length === 1) {

     const markup = `<img src="${data[0].flags.svg}" alt="" width="180">
        <h2>${data[0].name.official}</h2>
        <p><span>Capital:</span> ${data[0].capital}</p>
                <p><span>Population:</span> ${data[0].population}</p>
       <p><span>Languages:</span> ${ language }</p>`;
     
        refs.countryInfo.insertAdjacentHTML('beforeend', markup);
        

    //  refs.countryInfo.insertAdjacentHTML('beforeend', oneСountry(data));

     
    } else 
        
        notification()
    
};


function onFatchError() {
Notiflix.Notify.failure("Oops, there is no country with that name");

};

function notification() {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");

};



