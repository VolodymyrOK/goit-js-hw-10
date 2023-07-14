import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import refs from './js/refs';
import { createMarkup, createMarkupCat } from './js/markup';
import { showLoader } from './js/loader';
import { messageError } from './js/message-error';

const { select, catInfo } = refs;

fetchBreeds()
  .then(data => {
    select.innerHTML = createMarkup(data);
    showLoader('endStartInit');
  })
  .catch(err => {
    console.log(err);
  });

select.addEventListener('change', onChange);

function onChange(event) {
  showLoader('choiceData');

  const id = event.currentTarget.value;

  fetchCatByBreed(id)
    .then(data => {
      catInfo.innerHTML = '';
      if (!data.length) {
        throw new Error('Oops! Error reading data!');
      }
      catInfo.innerHTML = createMarkupCat(data);
      showLoader('endSearch');
    })
    .catch(err => {
      messageError(err.message);
      showLoader('endSearch');
    });
}
