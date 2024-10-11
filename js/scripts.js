const carrossel = document.querySelectorAll('.carrossel');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let btnMenu = document.querySelector('.btn-abrir-menu');
let menu = document.querySelector('.menu-mobile');
let overlay = document.querySelector('.overlay-menu');

let currentCarrossel = 0;

btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu')
});

menu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
});

overlay.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
});

function updateCarrossel() {
    const container = document.querySelector('.carrossel-container');
    const carrosselWidth = carrossel[0].clientWidth;
    container.style.transform = `translateX(${-carrosselWidth * currentCarrossel}px)`;
}

nextBtn.addEventListener('click', () => {
    currentCarrossel = (currentCarrossel + 1) % carrossel.length;
    updateCarrossel();
});

prevBtn.addEventListener('click', () => {
    currentCarrossel = (currentCarrossel - 1 + carrossel.length) % carrossel.length;
    updateCarrossel();
});

window.addEventListener('resize', updateCarrossel);


