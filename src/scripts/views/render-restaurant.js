import {getAllItems} from '../data/favorite-db';
import {innerRestaurant} from './inner-restaurant';
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

const getDetailRestaurantData = async (id) => {
  try {
    const cache = await caches.open('yummyapp-api-detail');
    const cachedResponse = await cache.match(`https://restaurant-api.dicoding.dev/detail/${id}`);
    if (!cachedResponse) {
      const response = await fetch(`https://restaurant-api.dicoding.dev/detail/${id}`);
      const responseJson = await response.json();
      await cache.put(`https://restaurant-api.dicoding.dev/detail/${id}`, new Response(JSON.stringify(responseJson)));
    }
  } catch (error) {
    console.log('Error fetching restaurant data', error);
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
    await innerRestaurant(dataShow, dataRestaurants);
    dataRestaurants.forEach(async (restaurant) => {
      await getDetailRestaurantData(restaurant.id);
    });
  } else if (prepData && dataRestaurants.length === 0) {
    dataShow.innerHTML = `
        <h3 class=".restaurants__not__found text__important no-bg">
          Belum ada restaurant
        </h3>`;
  } else {
    dataShow.innerHTML = `
        <h3 class="fail__importing__data text__important no-bg">
          Gagal memuat data
        </h3>`;
  }
};

export default renderRestaurant;
