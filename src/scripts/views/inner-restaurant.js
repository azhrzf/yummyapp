import {actButton} from '../data/favorite-button';

const truncateWords = (text, limit) => {
  if (text.split(' ').length > limit) {
    const newText = text.split(' ').splice(0, limit).join(' ');
    return `${newText} ...`;
  }
};

const innerRestaurant = async (mainElement, dataRestaurants) => {
  mainElement.innerHTML = '';
  mainElement.style.display = 'grid';
  dataRestaurants.forEach(async (restaurant) => {
    const {id, name, description, pictureId, city, rating} = restaurant;
    const pictureUrl = 'https://restaurant-api.dicoding.dev/images/medium/';

    const article = document.createElement('article');
    article.setAttribute('tabindex', '0');

    const img = document.createElement('img');
    img.setAttribute('src', `${pictureUrl}${pictureId}`);
    img.setAttribute('alt', `restaurant ${id}_${name}`);
    article.appendChild(img);

    const dataShowDesc = document.createElement('div');
    dataShowDesc.classList.add('data--show--desc');
    article.appendChild(dataShowDesc);

    const dataShowDescIn = document.createElement('div');
    dataShowDescIn.classList.add('data--show--desc-in');
    dataShowDesc.appendChild(dataShowDescIn);

    const h4 = document.createElement('h4');
    h4.textContent = `Kota ${city}`;
    dataShowDescIn.appendChild(h4);

    const p = document.createElement('p');
    p.textContent = `Rating: ${rating}`;
    dataShowDescIn.appendChild(p);

    const favButton = await actButton(id);
    dataShowDescIn.appendChild(favButton);

    const h3 = document.createElement('h3');
    h3.classList.add('title');
    dataShowDesc.appendChild(h3);

    const a = document.createElement('a');
    a.setAttribute('href', `/#/detail/${id}`);
    a.classList.add('text__anchor');
    a.textContent = name;
    h3.appendChild(a);

    const pDesc = document.createElement('p');
    pDesc.setAttribute('id', `${id}_desc`);
    pDesc.classList.add('toggle_desc');
    pDesc.textContent = truncateWords(description, 50);
    dataShowDesc.appendChild(pDesc);

    mainElement.appendChild(article);
  });
};

export {innerRestaurant};
