import {addEvent, actButton} from '../data/like-button';
import {getAllItems} from '../data/favorite-db';
const dataShow = document.querySelector('.data--show');

const getRestaurantData = async () => {
  try {
    const cache = await caches.open('yummyapp-api');
    const cachedResponse = await cache.match('https://restaurant-api.dicoding.dev/list');
    if (cachedResponse) {
      const responseJson = await cachedResponse.json();
      return responseJson;
    } else {
      const response = await fetch('https://restaurant-api.dicoding.dev/list');
      const responseJson = await response.json();
      await cache.put('https://restaurant-api.dicoding.dev/list', new Response(JSON.stringify(responseJson)));
      return responseJson;
    }
  } catch (error) {
    console.log('Error fetching restaurant data', error);
    return [];
  }
};

const truncateWords = (text, limit) => {
  if (text.split(' ').length > limit) {
    const newText = text.split(' ').splice(0, limit).join(' ');
    return `${newText} ...`;
  }
};

const fetchAndCache = async (url, cacheName) => {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(url);

    if (cachedResponse) {
      return;
    }

    const response = await fetch(url);
    if (response.ok) {
      await cache.put(url, response.clone());
    }
  } catch (error) {
    console.error(`Error fetching and caching ${url}: ${error}`);
  }
};

const renderRestaurant = async (filterFavorite) => {
  const prepData = await getRestaurantData();
  const favoritesData = await getAllItems();
  const filteredData = prepData.restaurants.filter((restaurant) => {
    return favoritesData.includes(restaurant.id);
  });
  const dataRestaurants = filterFavorite ? filteredData : prepData.restaurants;
  if (prepData && dataRestaurants.length > 0) {
    dataShow.innerHTML = '';
    dataShow.style.display = 'grid';
    dataRestaurants.map(async (restaurant) => {
      const {id, name, description, pictureId, city, rating} = restaurant;
      const pictureUrl = 'https://restaurant-api.dicoding.dev/images/medium/';

      const apiDetail = `https://restaurant-api.dicoding.dev/detail/${id}`;
      const cacheDetail = 'yummyapp-api-detail';
      await fetchAndCache(apiDetail, cacheDetail);

      dataShow.innerHTML += `
            <article tabindex=0>
                <img src=${pictureUrl}${pictureId} alt=restaurant ${id}_${name}>
                <div class="data--show--desc">
                    <div class="data--show--desc-in">
                      <h4>Kota ${city}</h4>
                      <p>Rating: ${rating}</p>
                      <button aria-label="like this movie"
                      id="${id}" class="like">

                    </button>              
                    </div>
                    <h3 class="title">
                      <a
                        class="text__anchor"
                        href="/#/detail/${id}">
                          ${name}
                      </a>
                    </h3>
                    <p id=${id}_desc class="toggle_desc">
                        ${truncateWords(description, 50)}
                    </p>
                  </div>
                </article>
            `;
    });
    const likeClass = document.querySelectorAll('.like');
    await actButton(likeClass);
    await addEvent(likeClass);
  } else if (prepData && dataRestaurants.length === 0) {
    dataShow.innerHTML = `
        <h3 class="text__important no-bg">Belum ada restaurant</h3>
        `;
  } else {
    dataShow.innerHTML = `
        <h3 class="text__important no-bg">Gagal memuat data</h3>
        `;
  }
};

export default renderRestaurant;
