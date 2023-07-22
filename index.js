import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  loaderText: document.querySelector('.loader-text'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
const { select, loader, loaderText, error, catInfo } = refs;

fetchBreeds()
  .then(data => {
    select.innerHTML = createMarkup(data);
    // new SlimSelect({
    //   select: '.breed-select',
    // });
  })
  .catch(() => {
    messageError();
  })
  .finally(showLoader('endStartInit'));

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

select.addEventListener('change', onChange);

function onChange(event) {
  showLoader('choiceData');

  const id = event.currentTarget.value;

  fetchCatByBreed(id)
    .then(data => {
      if (!data.length) {
        messageError();
      }
      catInfo.innerHTML = createMarkupCat(data);
      showLoader('endSearch');
    })
    .catch(() => {
      messageError();
    })
    .finally();
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
  if (showCode === 'endStartInit') {
    select.style.display = 'block';
    loader.style.display = 'none';
    loaderText.style.display = 'none';
  }
  if (showCode === 'showError') {
    select.style.display = 'none';
    loader.style.display = 'none';
    loaderText.style.display = 'none';
    error.style.display = 'block';
  }
  if (showCode === 'endSearch') {
    loader.style.display = 'none';
    loaderText.style.display = 'none';
    catInfo.style.display = 'flex';
  }
  if (showCode === 'choiceData') {
    loader.style.display = 'inline-block';
    loaderText.style.display = 'block';
    catInfo.style.display = 'none';
  }
}

function messageError() {
  showLoader('showError');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
