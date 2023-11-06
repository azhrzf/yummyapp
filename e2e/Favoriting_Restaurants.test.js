/* eslint-disable new-cap */
const assert = require('assert');
Feature('Favoriting Restaurants');

Before(({I}) => {
  I.amOnPage('/#/favorites');
});
Scenario('showing empty favorited restaurants', ({I}) => {
  I.amOnPage('/#/favorite');
  I.see('Belum ada restaurant', '.restaurants__not__found');
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

  I.amOnPage('/#/favorite');
  I.seeElement('.item--inner--detail');
  const favoritedRestaurantTitle = await I.grabTextFrom('.title');

  assert.strictEqual( firstRestaurantTitle, favoritedRestaurantTitle);
});
