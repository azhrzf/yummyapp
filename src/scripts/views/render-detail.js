import {addEvent, actButton} from '../data/like-button';
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
    dataShow.innerHTML = '';
    dataShow.style.display = 'block';
    const pictureUrl = 'https://restaurant-api.dicoding.dev/images/medium/';
    const {
      id,
      name,
      description,
      city,
      address,
      pictureId,
      categories,
      menus,
      rating,
      customerReviews,
    } = data.restaurant;

    const categoriesString = categories.map((category) => {
      return category.name;
    }).join(', ');

    const foodNames = menus.foods.map((food) => food.name);
    const drinkNames = menus.drinks.map((drink) => drink.name);

    dataShow.innerHTML += `
        <article tabindex=0>
            <img src=${pictureUrl}${pictureId} alt=restaurant ${id}_${name}>
                <div class="data--show--desc">
                    <div class="data--show--desc-in">
                        <div>
                            <h4>Kota ${city}</h4>
                            <p>${address}</p>
                            <p>Rating: ${rating}</p>
                            <p>${categoriesString}</p> 
                        </div>
                        <div>
                          <button aria-label="like this movie"
                          id="${id}" class="like">
                          <i class="fa fa-heart-o fa-2xl"
                          aria-hidden="true"></i>
                          </button>
                        </div>
                    </div>
                    <h3 class="text__important title">${name}</h3>
                    <p id=${id}_desc class="toggle_desc">
                        ${description}
                    </p>
                    <div class="menu">
                    <h2>Food Menu</h2>
                        <ul>
                        ${foodNames.map((name) => `<li>${name}</li>`).join('')}
                        </ul>
                        <h2>Drink Menu</h2>
                        <ul>
                        ${drinkNames.map((name) => `<li>${name}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="reviews">
                        <h2>Customer Reviews</h2>
                        <ul>
                            ${customerReviews.map((review) => `
                            <li>
                                <p class="review__name">${review.name}</p>
                                <p class="review__date">${review.date}</p>
                                <p class="review__text">${review.review}</p>
                            </li>
                            `).join('')}
                        </ul>
                    </div>
                  </div>
                </article>
            `;
    const likeClass = document.querySelectorAll('.like');
    await actButton(likeClass);
    await addEvent(likeClass);
  } else {
    dataShow.innerHTML = `
        <h3 class="text__important no-bg">Gagal memuat data</h3>
        `;
  }
};

export default renderDetail;
