/* eslint-disable new-cap */
const assert = require('assert');
Feature('Favoriting Restaurants');

Before(({I}) => {
  I.amOnPage('/#/favorites');
});

Scenario('favoriting one restaurant', async ({I}) => {
  I.see('Belum ada restaurant', '.restaurants__not__found');

  I.amOnPage('/');

  I.seeElement('.item--detail a');
  const firstRestaurant = locate('.item--detail a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('.like');
  I.click('.like');

  I.amOnPage('/#/favorites');
  I.seeElement('.item--detail');
  const favoritedRestaurantTitle = await I.grabTextFrom('.title');

  assert.strictEqual( firstRestaurantTitle, favoritedRestaurantTitle);
});

Scenario('unfavoriting one restaurant', async ({I}) => {
  I.see('Belum ada restaurant', '.restaurants__not__found');
  I.amOnPage('/');
  I.seeElement('.item--detail a');
  const favRestaurant = locate('.item--detail a').first();
  I.click(favRestaurant);

  I.seeElement('.like');
  I.click('.like');

  I.amOnPage('/#/favorites');
  I.seeElement('.item--detail a');

  const unFavRestaurant = locate('.item--detail a').first();
  I.click(unFavRestaurant);

  I.seeElement('.like');
  I.click('.like');

  I.amOnPage('/#/favorites');
  I.see('Belum ada restaurant', '.restaurants__not__found');
});

Scenario('customer review exist', async ({I}) => {
  I.amOnPage('/');
  I.seeElement('.item--detail a');
  const restaurant = locate('.item--detail a').first();
  I.click(restaurant);
  I.seeElement('.reviews');
  I.seeElement('.review__name');
  I.seeElement('.review__date');
  I.seeElement('.review__text');
});
