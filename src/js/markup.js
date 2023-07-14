function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
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

export { createMarkup, createMarkupCat };
