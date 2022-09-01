// імпорт бібліотек
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
// імпорт файлів та стілів
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const search = document.querySelector('#search-box');
console.log('~ search', search);
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
const accessMessage =
  'Too many matches found. Please enter a more specific name.';
const errorMessage = 'Oops, there is no country with that name';

// вішаеєм слухача і за допомогою пакета lodash.debounce запити будуть виконуватися 1 раз в 300мс
search.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

// функція пошуку країн
function inputCountry(event) {
  //вирішує проблеми с пробілами
  let removeSpaces = event.target.value.trim();

  if (!removeSpaces) {
    clearCountries();
    return;
  }
  fetchCountries(removeSpaces)
    .then(countries => {
      // якщо більше 10 символів, введіще ще
      if (countries.length > 10) {
        clearCountries();
        return Notify.info(accessMessage);
      }
      // якщо більше від 2 до 10 символів, покажи розмітку
      else if (countries.length >= 2 && countries.length <= 10) {
        clearCountries();
        return renderCountries(countries);
      }
      // якщо 1, покажи повністю країну
      if (countries.length === 1) {
        clearCountries();
        return renderCountry(countries);
      }
    })
    .catch(error => Notify.failure(errorMessage));
}

// функція рендерить 2-10 країн

function renderCountries(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `<li class="country-list"><img class="country-img"
      src="${flags.svg}"
      alt="Flag of${name.official}"
      width="50">
      <h1 class="country-name">${name.official}</h1></li>`;
    })
    .join('');

  info.insertAdjacentHTML('beforeend', markup);
}

// функція рендерить розмітку країни
function renderCountry(country) {
  const markup = country
    .map(({ name, capital, population, flags, languages }) => {
      return `<div class="country-div">
      <li class="country-list"><img class="country-img"
      src="${flags.svg}"
      alt="Flag of${name.official}"
      width="50">
      <h1 class="country-name">${name.official}</h1></li>
      <p class="country-capital"><b>Capital: &nbsp </b>${capital}</p>
      <p class="country-population"><b>Population: &nbsp </b>${population}</p>
      <p class="country-languages"><b>languages: &nbsp </b>${Object.values(
        languages
      )}</p>
    </div>`;
    })
    .join('');

  info.insertAdjacentHTML('beforeend', markup);
}

//очищює поле країн
function clearCountries() {
  list.innerHTML = '';
  info.innerHTML = '';
}

// =============================================
