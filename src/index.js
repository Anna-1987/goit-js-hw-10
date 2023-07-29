import axios from 'axios';
import { Notify } from 'notiflix';
import {fetchBreeds, fetchCatByBreed} from './js/cat-api';
import './css/styles.css';

axios.defaults.headers.common['x-api-key'] = 'live_4VL5WxaMciqhwzBy1cC7z5pIO72Juknys9AzB6ZX4HiMKDqzhFeFvgZWR6kmtsqJ';

const refs = {
    select:document.querySelector('.breed-select'),
    catInfo:document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

    refs.loader.classList.replace('loader', 'is-hidden');
    refs.error.classList.add('is-hidden');
    refs.catInfo.classList.add('is-hidden');

fetchBreeds().then(cat => {
    for (let i = 0; i < cat.length; i++) {
        const option = document.createElement('option');
        option.value = cat[i].id;
        option.text = cat[i].name;
        refs.select.append(option); 
    }
});

refs.select.addEventListener('change', onSearch);

 function onSearch(e){
    e.preventDefault();

    refs.loader.classList.replace('is-hidden', 'loader');
    refs.select.classList.add('is-hidden');
    refs.catInfo.classList.add('is-hidden');

    const breedId = e.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
        refs.loader.classList.replace('loader', 'is-hidden');
        refs.select.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        
        refs.catInfo.innerHTML = `<div class="img-box"><img src="${url}" alt="${breeds[0].name}" width="400"/></div>
           <div class="text-box">
             <h1 class="heard-text">${breeds[0].name}</h1>
             <p class="description">${breeds[0].description}</p>
             <p class="temperament"><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        refs.catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
};
 
function onFetchError(error) {
    refs.select.classList.remove('is-hidden');
    refs.loader.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 5000,
        width: '800px',
        fontSize: '12px'
    });
};