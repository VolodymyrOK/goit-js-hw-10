import axios from 'axios';
import Notiflix from 'notiflix';
import { messageError } from './message-error';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_465kRbd1ImVDcUcymFr8AIz2lt4wQVQWQ8LZJ6kNyZUs9wxFIl9v421fWZcvwWND';

async function fetchBreeds() {
  try {
    const response = await axios.get('/breeds');
    return response.data;
  } catch (error) {
    messageError('Oops! Something went wrong! Try reloading the page!');
  }
  // return axios.get('/breeds').then(resp => {
  //   if (resp.status !== 200) {
  //     throw new Error('Oops! Something went wrong! Try reloading the page!');
  //   }
  //   return resp.data;
  // });
}

async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`/images/search?breed_ids=${breedId}`);
    return response.data;
  } catch (error) {
    messageError('Oops! Error api! Try reloading the page!');
  }

  // return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
  //   if (resp.status !== 200) {
  //     throw new Error('Oops! Something went wrong! Try reloading the page!');
  //   }
  //   return resp.data;
  // });
}

export { fetchBreeds, fetchCatByBreed };
