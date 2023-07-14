import { showLoader } from './loader';
import Notiflix from 'notiflix';

function messageError(err) {
  Notiflix.Notify.failure(err);
}

export { messageError };
