import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { getRefs } from './js/get-refs';

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import countries from './templates/countries.hbs'
// import oneСountry from './templates/oneСountry.hbs'

import { country } from './templates/country';


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
    
    if (data.length <= 10 && data.length > 1) {

        refs.countryList.insertAdjacentHTML('beforeend', countries(data));

    } else if (data.length === 1) {


    //  refs.countryInfo.insertAdjacentHTML('beforeend', oneСountry(data));
        
                  refs.countryInfo.insertAdjacentHTML('beforeend', country(data));

     
    } else 
        
        notification()
    
};





function onFatchError() {
Notiflix.Notify.failure("Oops, there is no country with that name");

};

function notification() {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");

};



