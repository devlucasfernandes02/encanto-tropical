const carrossel = document.querySelectorAll('.carrossel');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let btnMenu = document.querySelector('.btn-abrir-menu');
let menu = document.querySelector('.menu-mobile');
let overlay = document.querySelector('.overlay-menu');
const chatInput = document.querySelector(".chat-input textarea")
const sendChatBtn = document.querySelector(".chat-input span")
const chatbox = document.querySelector(".chatbox")
const chatbotToggler = document.querySelector(".chatbot-toggler")
const chatbotCloseBtn = document.querySelector(".close-btn")

let currentCarrossel = 0;
let userMessage;
const API_KEY = "AIzaSyCR7em8xl5yECIS731OstFKlSc2Ur7VXHA";
const inputInitHeight = chatInput.scrollHeight;

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

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLI) => {
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;
    const messageElement = incomingChatLI.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          contents: [{ 
            role: "user", 
            parts: [{ text: userMessage }] 
          }] 
        }),
      };

      fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.candidates[0].content.parts[0].text;
      }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
      }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLI = createChatLi("Thinking...", "incoming")
        chatbox.appendChild( incomingChatLI);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLI);
    }, 600);

}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"))
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"))

sendChatBtn.addEventListener("click", handleChat);

// Seleciona os elementos do DOM no carrinho.html
const cartContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Recupera os itens do carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Salva o carrinho atualizado no localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Renderiza os itens no carrinho
function renderCart() {
  cartContainer.innerHTML = ''; // Limpa a exibição atual do carrinho
  let total = 0;

  // Renderiza cada item do carrinho
  cart.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${item.name}</strong> - R$ ${item.price.toFixed(2)} x ${item.quantity} = R$ ${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeFromCart(${item.id})">Remover</button>
    `;
    cartContainer.appendChild(listItem);

    total += item.price * item.quantity;
  });

  // Atualiza o total
  cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Adiciona um produto ao carrinho (usado na página de produtos)
function addToCart(id, name, price) {const product = { id, name, price, quantity: 1 };}

  // Verifica se o produto já existe no carrinho
  const existingProduct = cart.find((item) => item.id === id);
  if (existingProduct) {
    existingProduct.quantity += 1; // Incrementa a quantidade
  } else {
    cart.push(product); // Adiciona um novo produto
  }
// Remove um item do carrinho
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  renderCart();
}

// Limpa o carrinho completamente
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

// Finaliza a compra
function finalizePurchase() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  alert('Compra finalizada com sucesso!');
  clearCart();
}

// Carrega os itens do carrinho na inicialização da página
document.addEventListener('DOMContentLoaded', renderCart);