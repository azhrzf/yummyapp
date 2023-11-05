import 'regenerator-runtime';
import {addItem, getItem, deleteItem} from './favorite-db';

const toggleFav = (element, fav) => {
  const favText = fav ? 'unfavorite' : 'favorite';
  element.setAttribute('aria-label', `${favText} this restaurant`);
};

const setClick = async (element, data, id) => {
  if (data === undefined) {
    await addItem(id, id);
    element.innerText = '❤️';
    toggleFav(element, true);
  } else {
    await deleteItem(id);
    element.innerText = '🤍';
    toggleFav(element, false);
  }
  const currentRoute = `/${window.location.hash}`.replace('/#', '');
  if (currentRoute.includes('/favorites')) {
    location.reload();
  }
};

const actButton = async (id) => {
  const data = await getItem(id);
  const button = document.createElement('button');
  button.setAttribute('id', id);
  button.classList.add('like');

  if (data === undefined) {
    button.innerText = '🤍';
    toggleFav(button, false);
  } else {
    button.innerText = '❤️';
    toggleFav(button, true);
  }

  button.addEventListener('click', async () => {
    if (id !== '') {
      await setClick(button, data, id);
    }
  });

  return button;
};

export {actButton};
