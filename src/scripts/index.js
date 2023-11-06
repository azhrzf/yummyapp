import 'regenerator-runtime';
import '../styles/main.css';
import heroes from '../public/images/heros/hero-image_1.jpg';
import drawer from './views/drawer';
import swRegister from './utils/sw-register';
import router from './routes/routes';

const createImg = document.createElement('img');
createImg.src = heroes;
createImg.alt = 'hero image';

const main = document.querySelector('jumbotron');
main.appendChild(createImg);

window.addEventListener('hashchange', async () => {
  await router();
});

window.addEventListener('load', async () => {
  swRegister();
  drawer();
  await router();
});
