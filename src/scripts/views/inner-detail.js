import {actButton} from '../data/favorite-button';

const innerDetail = async (mainElement, data) => {
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
  } = data;

  const pictureUrl = 'https://restaurant-api.dicoding.dev/images/medium/';

  const categoriesString = categories.map((category) => {
    return category.name;
  }).join(', ');

  const foodNames = menus.foods.map((food) => food.name);
  const drinkNames = menus.drinks.map((drink) => drink.name);

  mainElement.innerHTML = '';
  mainElement.style.display = 'block';

  const article = document.createElement('article');
  article.setAttribute('tabindex', '0');
  article.classList.add('item--inner--detail');

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

  const div1 = document.createElement('div');
  dataShowDescIn.appendChild(div1);

  const h4 = document.createElement('h4');
  h4.textContent = `Kota ${city}`;
  div1.appendChild(h4);

  const p1 = document.createElement('p');
  p1.textContent = address;
  div1.appendChild(p1);

  const p2 = document.createElement('p');
  p2.textContent = `Rating: ${rating}`;
  div1.appendChild(p2);

  const p3 = document.createElement('p');
  p3.textContent = categoriesString;
  div1.appendChild(p3);

  const div2 = document.createElement('div');
  dataShowDescIn.appendChild(div2);

  const favButton = await actButton(id);
  div2.appendChild(favButton);

  const h3 = document.createElement('h3');
  h3.classList.add('text__important', 'title');
  h3.textContent = name;
  dataShowDesc.appendChild(h3);

  const pDesc = document.createElement('p');
  pDesc.setAttribute('id', `${id}_desc`);
  pDesc.classList.add('toggle_desc');
  pDesc.textContent = description;
  dataShowDesc.appendChild(pDesc);

  const menu = document.createElement('div');
  menu.classList.add('menu');
  dataShowDesc.appendChild(menu);

  const h2Food = document.createElement('h2');
  h2Food.textContent = 'Food Menu';
  menu.appendChild(h2Food);

  const ulFood = document.createElement('ul');
  menu.appendChild(ulFood);

  foodNames.forEach((name) => {
    const li = document.createElement('li');
    li.textContent = name;
    ulFood.appendChild(li);
  });

  const h2Drink = document.createElement('h2');
  h2Drink.textContent = 'Drink Menu';
  menu.appendChild(h2Drink);

  const ulDrink = document.createElement('ul');
  menu.appendChild(ulDrink);

  drinkNames.forEach((name) => {
    const li = document.createElement('li');
    li.textContent = name;
    ulDrink.appendChild(li);
  });

  const reviews = document.createElement('div');
  reviews.classList.add('reviews');
  dataShowDesc.appendChild(reviews);

  const h2Reviews = document.createElement('h2');
  h2Reviews.textContent = 'Customer Reviews';
  reviews.appendChild(h2Reviews);

  const ulReviews = document.createElement('ul');
  reviews.appendChild(ulReviews);

  customerReviews.forEach((review) => {
    const li = document.createElement('li');
    const pName = document.createElement('p');
    pName.classList.add('review__name');
    pName.textContent = review.name;
    li.appendChild(pName);
    const pDate = document.createElement('p');
    pDate.classList.add('review__date');
    pDate.textContent = review.date;
    li.appendChild(pDate);
    const pText = document.createElement('p');
    pText.classList.add('review__text');
    pText.textContent = review.review;
    li.appendChild(pText);
    ulReviews.appendChild(li);
  });

  mainElement.appendChild(article);
};

export {innerDetail};
