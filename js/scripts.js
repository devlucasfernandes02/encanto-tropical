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

// Variáveis globais para o carrinho
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');

// Função para adicionar itens ao carrinho
function addToCart(nome, preco) {
    const itemIndex = cart.findIndex(item => item.nome === nome);
    if (itemIndex !== -1) {
        cart[itemIndex].quantidade += 1;
    } else {
        cart.push({ nome, preco, quantidade: 1 });
    }
    updateCart();
}

// Função para atualizar o carrinho
function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantidade, 0);
    cartItems.innerHTML = ''; // Limpar o carrinho antes de atualizá-lo
    if (cart.length > 0) {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <h4>${item.nome}</h4>
                <p>R$ ${item.preco.toFixed(2)} x ${item.quantidade}</p>
            `;
            cartItems.appendChild(cartItem);
        });
    } else {
        cartItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
    }
}

// Função para abrir/fechar o modal do carrinho
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = (cartModal.style.display === 'block' ? 'none' : 'block');
}

// Função para pesquisar produtos
async function search(flowers) {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    if (!searchInput) {
        const produtos = document.querySelectorAll('.produto');
        produtos.forEach(produto => produto.style.display = 'block');
        return;
    }

    try {
        const response = await fetch
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível buscar produtos. Tente novamente mais tarde.');
    }
}

// Função para exibir produtos na página
function displayProducts(produtos) {
    const gridProdutos = document.querySelector('.grid-produtos');
    gridProdutos.innerHTML = ''; // Limpa a lista atual de produtos

    if (produtos.length === 0) {
        gridProdutos.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    produtos.forEach(produto => {
        const produtoElement = document.createElement('div');
        produtoElement.className = 'produto';
        produtoElement.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <a href="#" class="btn-comprar" onclick="addToCart('${produto.nome}', ${produto.preco})">Comprar</a>
        `;
        gridProdutos.appendChild(produtoElement);
    });
}

// Fechar o modal ao clicar fora
window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Códigos de inicialização podem ser colocados aqui
});

// Inserir dado
localStorage.setItem("name");

// restart sem perder dados

// resgatar item
const name = localStorage.getItem("name");

console.log(name);

// resgate de item que nao existe
const lastName = localStorage.getItem("lastname")

console.log(lastName);

if (!lastName) {
console.log("Sem sobrenome!");
}

// remover item
localStorage.removeItem("name");

// limpar todos os itens
localStorage.setItem("a" , 1);
localStorage.setItem("b", 2);

//console.log(typeof localStorage.getItem("a"));

localStorage.clear();

// session storage
sessionStorage.setItem("number", 123);

//sessionStorage.removeItem("number");

//salvar objeto

const person ={
    login:"",
    password:"",
    email:"",
}

// localStorage.setItem("person",person);

localStorage.setItem("person", JSON.stringify(person));

const getPerson = localStorage.getItem("person");

console.log(getPerson);

const personObject = JSON.parse(getPerson);

console.log(typeof personObject);

console.log(Object.job);