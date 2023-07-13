import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
const { select, loader, error, catInfo } = refs;

showLoader('start');

fetchBreeds()
  .then(data => {
    select.innerHTML = createMarkup(data);
    showLoader('initSelect');
  })
  .catch(() => {
    showLoader('catch');
    messageError();
  });

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

select.addEventListener('change', onChange);

function onChange(event) {
  showLoader('clickSelect');

  const id = event.currentTarget.value;

  fetchCatByBreed(id)
    .then(data => {
      catInfo.innerHTML = createMarkupCat(data);
      showLoader('search');
    })
    .catch(() => {
      showLoader('catch');
      messageError();
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

function showLoader(showCode) {
  if (showCode === 'start') {
    select.style.display = 'none';
  }
  if (showCode === 'initSelect') {
    select.style.display = 'block';
    loader.style.display = 'none';
  }
  if (showCode === 'catch') {
    error.style.display = 'block';
    loader.style.display = 'none';
    select.style.display = 'none';
  }
  if (showCode === 'search') {
    loader.style.display = 'none';
    catInfo.style.display = 'flex';
  }
  if (showCode === 'clickSelect') {
    loader.style.display = 'block';
    catInfo.style.display = 'none';
  }
}

function messageError() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
