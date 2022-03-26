import './css/styles.css';
// import './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('input#search-box');

inputEl.addEventListener('input', onInput);

function onInput() {
    fetchCountries()
}


