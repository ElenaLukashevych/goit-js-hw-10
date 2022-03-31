import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { getRefs } from './js/get-refs';

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import countries from './templates/countries.hbs'
import oneСountry from './templates/oneСountry.hbs'

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));



function onInput() {
    const inputValue = refs.inputEl.value.trim();
    if (inputValue === '') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return
    }

    fetchCountries(inputValue)
        .then(
            data => {
                console.log(data);
                handlerInputValue(data)
            })
            .catch(onFatchError);

};



function handlerInputValue(data) {
 if (data.length > 10) {
                    notification()
                    return;
 }
 
 else if (data.length <= 10 && data.length > 1) {
     renderMarkup(data);
     return;
                    
                } else if (data.length === 1) {
                    renderMarkupOneСountry(data); 
                } 
}


function renderMarkup(data) {
     refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';

  refs.countryList.insertAdjacentHTML('beforeend', countries(data));


};


function renderMarkupOneСountry(country) {
     refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    console.log(country);

    const language = Object.values(country[0].languages);

  

    console.log(language);
  refs.countryInfo.insertAdjacentHTML('afterbegin', oneСountry(country))

}



function onFatchError() {
Notiflix.Notify.failure("Oops, there is no country with that name");

};

function notification() {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");

};



