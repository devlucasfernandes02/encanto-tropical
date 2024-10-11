const carrossel = document.querySelectorAll('.carrossel');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentCarrossel = 0;

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


