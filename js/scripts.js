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

f// Seleciona todos os botões "Adicionar ao Carrinho" usando querySelectorAll
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Adiciona o evento de clique para cada botão
addToCartButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const productId = event.target.getAttribute('data-id');
    const productName = event.target.getAttribute('data-name');
    const productPrice = parseFloat(event.target.getAttribute('data-price'));

    addToCart(productId, productName, productPrice);
  });
});

// Função para adicionar produto ao carrinho
function addToCart(id, name, price) {
  const product = {
    id: id,
    name: name,
    price: price,
    quantity: 1
  };

  // Recupera o carrinho do localStorage ou cria um novo carrinho
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Verifica se o produto já existe no carrinho
  const existingProduct = cart.find(item => item.id === id);
  if (existingProduct) {
    existingProduct.quantity += 1; // Aumenta a quantidade do produto existente
  } else {
    cart.push(product); // Adiciona o novo produto
  }

  // Salva o carrinho atualizado no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Exibe uma mensagem ou realiza outra ação (opcional)
  alert(`${name} foi adicionado ao carrinho.`);
}
// Função para renderizar os itens do carrinho
function renderCart() {
  // Recupera o carrinho do localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.querySelector('#cart-items');
  const cartTotalElement = document.querySelector('#cart-total');

  // Limpa o carrinho exibido antes de renderizar
  cartContainer.innerHTML = '';  

  let total = 0;

  // Renderiza cada item do carrinho
  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${item.name}</strong> - R$ ${item.price.toFixed(2)} x ${item.quantity} = R$ ${(item.price * item.quantity).toFixed(2)}
    `;
    cartContainer.appendChild(listItem);

    total += item.price * item.quantity;
  });

  // Exibe o total
  cartTotalElement.innerHTML = `Total: R$ ${total.toFixed(2)}`;
}

// Função para limpar o carrinho
function clearCart() {
  localStorage.removeItem('cart');
  renderCart();  // Re-renderiza o carrinho após limpeza
}

// Função para finalizar a compra
function finalizePurchase() {
  alert('Compra finalizada com sucesso!');
  clearCart();
}

// Seleciona os botões de limpar carrinho e finalizar compra
const clearCartButton = document.querySelector('#clear-cart');
const finalizeButton = document.querySelector('#finalize-purchase');

// Adiciona os event listeners aos botões
clearCartButton.addEventListener('click', clearCart);
finalizeButton.addEventListener('click', finalizePurchase);

// Chama a função para renderizar o carrinho na inicialização
renderCart();

