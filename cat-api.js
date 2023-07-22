import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_465kRbd1ImVDcUcymFr8AIz2lt4wQVQWQ8LZJ6kNyZUs9wxFIl9v421fWZcvwWND';
const END_POINT = '/breeds';
const END_POINT_FOR_SEARCH = '/images/search?breed_ids=';

function fetchBreeds() {
  return axios.get(`${END_POINT}`).then(resp => {
    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }
    return resp.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios.get(`${END_POINT_FOR_SEARCH}${breedId}`).then(resp => {
    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }
    return resp.data;
  });
}

export { fetchBreeds, fetchCatByBreed };
