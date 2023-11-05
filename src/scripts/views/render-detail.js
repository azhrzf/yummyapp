import {innerDetail} from './inner-detail';
const dataShow = document.querySelector('.data--show');

const getRestaurantData = async (id) => {
  try {
    const cache = await caches.open('yummyapp-api-detail');
    const cachedResponse = await cache.match(`https://restaurant-api.dicoding.dev/detail/${id}`);
    if (cachedResponse) {
      const responseJson = await cachedResponse.json();
      return responseJson;
    } else {
      const response = await fetch(`https://restaurant-api.dicoding.dev/detail/${id}`);
      const responseJson = await response.json();
      await cache.put(`https://restaurant-api.dicoding.dev/detail/${id}`, new Response(JSON.stringify(responseJson)));
      return responseJson;
    }
  } catch (error) {
    console.log('Error fetching restaurant data', error);
    return [];
  }
};


const renderDetail = async (id) => {
  const data = await getRestaurantData(id);
  if (data && !data.error) {
    await innerDetail(dataShow, data.restaurant);
  } else {
    dataShow.innerHTML = `
        <h3 class="text__important no-bg">
          Gagal memuat data
        </h3>`;
  }
};

export default renderDetail;
