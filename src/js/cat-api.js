import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds(){
  return axios.get(`${BASE_URL}/breeds`).then(response => response.data);
}

export function fetchCatByBreed(breedId){
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
  .then(response => {
   return response.data
  })
}

