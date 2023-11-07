import 'regenerator-runtime';
import '../styles/main.css';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import heroes from '../public/images/heros/hero-image_1.jpg';
import heroesResized from '../public/images/heros/hero-image_1-small.jpg';
import drawer from './views/drawer';
import swRegister from './utils/sw-register';
import router from './routes/routes';

const setJumbotron = async () => {
  const pictureElement = document.createElement('picture');

  const sourceElement = document.createElement('source');
  sourceElement.setAttribute('media', '(max-width: 768px)');
  sourceElement.setAttribute('srcset', heroesResized);

  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', heroes);
  imgElement.setAttribute('data-src', heroes);
  imgElement.setAttribute('alt', 'hero image');
  imgElement.classList.add('lazyload');

  pictureElement.appendChild(sourceElement);
  pictureElement.appendChild(imgElement);

  const containerElement = document.querySelector('.jumbotron');
  containerElement.appendChild(pictureElement);
};

window.addEventListener('hashchange', async () => {
  await router();
});

window.addEventListener('load', async () => {
  setJumbotron();
  swRegister();
  drawer();
  await router();
});
