import 'regenerator-runtime';
import {addItem, getItem, deleteItem} from './favorite-db';

const actButton = async (elements) => {
  elements.forEach(async (element) => {
    const data = await getItem(element.id);
    if (data === undefined) {
      element.innerHTML = `<span>🤍</span>`;
    } else {
      element.innerHTML = `<span>❤️</span>`;
    }
  });
};

const addEvent = async (elements) => {
  elements.forEach((element) => {
    element.addEventListener('click', async () => {
      const data = await getItem(element.id);
      if (data === undefined) {
        await addItem(element.id, element.id);
        element.innerHTML = `<span>❤️</span>`;
      } else {
        await deleteItem(element.id);
        element.innerHTML = `<span>🤍</span>`;
      }
      const currentRoute = `/${window.location.hash}`.replace('/#', '');
      if (currentRoute.includes('/favorites')) {
        location.reload();
      }
    },
    );
  });
};

export {actButton, addEvent};
