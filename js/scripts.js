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
const cart = JSON.parse(localStorage.getItem('cart')) || [];

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

function addToCart(name, price) {
  const product = {name, price, quantity: 1 };

  // Recuperar o carrinho do localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log("Carrinho antes:", cart);

  // Adicionar ou atualizar o produto no carrinho
  const existingProduct = cart.find(item => item.id === id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push(product);
  }

  // Salvar o carrinho no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log("Carrinho atualizado:", cart);

  // Exibe uma mensagem ou realiza outra ação (opcional)
  alert(`Seu produto foi adicionado ao carrinho com sucesso!`);
}
// Função para carregar o carrinho na página do carrinho
function renderCart() {
  // Pegar o carrinho do localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log("Carrinho carregado:", cart);

  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = ''; // Limpar o container

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>O carrinho está vazio.</p>';
    return;
  }

  // Exibir os produtos no carrinho
  cart.forEach(item => {
    const productDiv = document.createElement('div');
    productDiv.className = 'cart-item';
    productDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>Preço: R$ ${item.price.toFixed(2)}</p>
      <p>Quantidade: ${item.quantity}</p>
    `;
    cartContainer.appendChild(productDiv);
  });
}

// Chamar renderCart ao carregar a página do carrinho
document.addEventListener('DOMContentLoaded', renderCart);