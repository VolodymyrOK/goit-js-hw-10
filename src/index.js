import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import refs from './js/refs';
import { createMarkup, createMarkupCat } from './js/markup';
import { showLoader } from './js/loader';
import { messageError } from './js/message-error';

const { select, catInfo } = refs;

fetchBreeds()
  .then(data => {
    select.innerHTML = createMarkup(data);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(showLoader('endStartInit'));

select.addEventListener('change', onChange);

function onChange(event) {
  showLoader('choiceData');

  const id = event.currentTarget.value;

  fetchCatByBreed(id)
    .then(data => {
      catInfo.innerHTML = '';
      catInfo.innerHTML = createMarkupCat(data);
      if (!data.length) {
        throw new Error('Oops! Error reading data!');
      }
      showLoader('endSearch');
    })
    .catch(err => {
      messageError(err.message);
      showLoader('endSearch');
    });
}
