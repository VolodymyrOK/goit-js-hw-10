import refs from './refs';

const { select, loader, loaderText, error, catInfo } = refs;

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

export { showLoader };
