import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

// import SlimSelect from 'slim-select';
// new SlimSelect({
//   select: '#selectElement',
// });

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = (axios.defaults.headers.common['x-api-key'] =
  'live_465kRbd1ImVDcUcymFr8AIz2lt4wQVQWQ8LZJ6kNyZUs9wxFIl9v421fWZcvwWND');

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
const { select, loader, error, catInfo } = refs;

error.style.display = 'none';
select.style.display = 'none';

fetchBreeds(BASE_URL, API_KEY)
  .then(data => {
    select.innerHTML = createMarkup(data);

    select.style.display = 'block';
    loader.style.display = 'none';
  })
  .catch(err => {
    error.style.display = 'block';
    loader.style.display = 'none';
    select.style.display = 'none';

    // console.log('Loading', err);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

select.addEventListener('change', onChange);

function onChange(event) {
  loader.style.display = 'block';
  catInfo.style.display = 'none';

  const id = event.currentTarget.value;

  fetchCatByBreed(BASE_URL, API_KEY, id)
    .then(data => {
      catInfo.innerHTML = createMarkupCat(data);

      loader.style.display = 'none';
      catInfo.style.display = 'flex';
    })
    .catch(err => {
      error.style.display = 'block';
      loader.style.display = 'none';
      select.style.display = 'none';

      // console.log('Loading', err);
      Notiflix.Report.failure('Title', 'Message', 'Button Text');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function createMarkupCat(arr) {
  return arr
    .map(
      ({ breeds: [{ name, description, temperament }], url }) =>
        `<div class="cat-info-img">
              <img src="${url}" alt="${name}" width="500"/>
         </div>
         <div class="cat-info-descr">
              <h2 class="cat-info-title">${name}</h2>
              <p class="cat-info-text">${description}</p>
              <p class="cat-info-temperament"><span>Temperament: </span>${temperament}</p>
         </div>`
    )
    .join('');
}
