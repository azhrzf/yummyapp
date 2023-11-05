/* eslint-disable new-cap */
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
  I.seeElement('.like');
  I.click(locate('.like').first());
  I.amOnPage('/#/favorite');
  I.seeElement('.item--detail');
});
