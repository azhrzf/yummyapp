const hamburgerButtonElement = document.querySelector('#hamburger');
const drawerElement = document.querySelector('#drawer');
const mainElement = document.querySelector('main');

const drawer = () => {
  hamburgerButtonElement.addEventListener('click', (event) => {
    drawerElement.classList.toggle('open');
    event.stopPropagation();
  });

  mainElement.addEventListener('click', (event) => {
    drawerElement.classList.remove('open');
    event.stopPropagation();
  });
};

export default drawer;
