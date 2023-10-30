import 'regenerator-runtime';
import '../styles/main.css';
import drawer from './views/drawer';
import swRegister from './utils/sw-register';
import router from './routes/routes';

window.addEventListener('hashchange', async () => {
  await router();
});

window.addEventListener('load', async () => {
  swRegister();
  drawer();
  await router();
});
