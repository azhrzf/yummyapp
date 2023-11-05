/* eslint-disable max-len */
import {actButton} from '../src/scripts/data/favorite-button';
import {getItem, putItem, deleteItem, getAllItems} from '../src/scripts/data/favorite-db';

describe('Favoriting a restaurant', () => {
  const id = 'RHEWjroda';
  const setButton = async (id) => {
    document.body.innerHTML = '';
    document.body.appendChild(await actButton(id));
  };

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await setButton(id);
    expect(document.querySelector('[aria-label="favorite this restaurant"]')).toBeTruthy();
  });

  it('should not show the unfavorite button when the restaurant has not been favorited before', async () => {
    await setButton(id);
    expect(document.querySelector('[aria-label="unfavorite this restaurant"]')).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await setButton(id);
    document.getElementById(id).dispatchEvent(new Event('click'));
    expect(await getItem(id)).toEqual(id);

    await deleteItem(id);
  });

  it('should not add a restaurant again when its already favorited', async () => {
    await putItem(id, id);
    await setButton(id);
    document.getElementById(id).dispatchEvent(new Event('click'));
    expect(await getAllItems()).toEqual([]);

    await deleteItem(id);
  });

  it('should not add a restaurant when it has no id', async () => {
    await setButton('');
    console.log(document.body.innerHTML);
    document.querySelector('.like').dispatchEvent(new Event('click'));
    expect(await getAllItems()).toEqual([]);
  });
});

describe('Unfavoriting a restaurant', () => {
  const id = 'RHEWjroda';
  const setButton = async (id) => {
    document.body.innerHTML = '';
    document.body.appendChild(await actButton(id));
  };

  beforeEach(async () => {
    await putItem(id, id);
    await setButton(id);
  });

  afterEach(async () => {
    await deleteItem(id);
  });

  it('should display unfavorite button when the movie has been liked', async () => {
    expect(document.querySelector('[aria-label="unfavorite this restaurant"]')).toBeTruthy();
  });

  it('should not display favorite button when the movie has been liked', async () => {
    expect(document.querySelector('[aria-label="favorite this restaurant"]')).toBeFalsy();
  });

  it('should be able to remove favorited restaurant from the list', async () => {
    document.getElementById(id).dispatchEvent(new Event('click'));
    expect(await getAllItems()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await deleteItem(id);
    document.getElementById(id).dispatchEvent(new Event('click'));
    expect(await getAllItems()).toEqual([]);
  });
});
