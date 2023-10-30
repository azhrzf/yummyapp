import renderRestaurant from '../views/render-restaurant';
import renderDetail from '../views/render-detail';

const home = async () => {
  await renderRestaurant(false);
};

const favorites = async () => {
  await renderRestaurant(true);
};

const detail = async (params) => {
  await renderDetail(params);
};

const notFound = () => {
  const dataShow = document.querySelector('.data--show');
  dataShow.innerHTML = `<h3 class="text__important no-bg">404 Not Found</h3>`;
};

const routes = {
  '/': home,
  '/favorites': favorites,
  '/detail/:id': detail,
};

const router = async () => {
  const currentRoute = `/${window.location.hash}`.replace('/#', '');
  const matchedRoute = Object.keys(routes).find((route) => {
    const regex = new RegExp(`^${route.replace(/:\w+/g, '(.+)')}$`);
    return regex.test(currentRoute);
  });

  if (matchedRoute && !window.location.hash.includes('#maincontent')) {
    if (matchedRoute.includes('/detail/')) {
      const id = currentRoute.split('/detail/')[1];
      if (id === '') {
        notFound();
      } else {
        await routes[matchedRoute](id);
      }
    } else {
      await routes[matchedRoute]();
    }
  } else if (!window.location.hash.includes('#maincontent')) {
    notFound();
  }
};

export default router;
