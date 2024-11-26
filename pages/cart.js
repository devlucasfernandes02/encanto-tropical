const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let cart = [];

// Adicionar produto ao carrinho
app.post('/cart', (req, res) => {
  const { id, name, price, quantity } = req.body;

  const existingProduct = cart.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ id, name, price, quantity });
  }

  res.status(201).json({ message: 'Produto adicionado ao carrinho!', cart });
});

// Listar produtos no carrinho
app.get('/cart', (req, res) => {
  res.status(200).json(cart);
});

// Atualizar quantidade de um produto no carrinho
app.put('/cart/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const product = cart.find((item) => item.id === parseInt(id));

  if (product) {
    product.quantity = quantity;
    res.status(200).json({ message: 'Quantidade atualizada!', cart });
  } else {
    res.status(404).json({ message: 'Produto não encontrado!' });
  }
});

// Remover produto do carrinho
app.delete('/cart/:id', (req, res) => {
  const { id } = req.params;

  cart = cart.filter((item) => item.id !== parseInt(id));
  res.status(200).json({ message: 'Produto removido!', cart });
});

// Limpar carrinho
app.delete('/cart', (req, res) => {
  cart = [];
  res.status(200).json({ message: 'Carrinho limpo!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

async function addToCart(product) {
    const response = await fetch('http://localhost:3000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  
    const data = await response.json();
    console.log(data.message);
  }

  const API_URL = 'http://localhost:3000/cart';

async function fetchCart() {
  const response = await fetch(API_URL);
  const cart = await response.json();
  displayCart(cart);
}

function displayCart(cart) {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';

  cart.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - Quantidade: ${item.quantity} - Preço: R$ ${item.price}`;
    
    // Botão para atualizar a quantidade
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = item.quantity;
    quantityInput.addEventListener('change', () => updateQuantity(item.id, quantityInput.value));

    // Botão para remover item
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = () => removeFromCart(item.id);

    listItem.appendChild(quantityInput);
    listItem.appendChild(removeButton);
    cartContainer.appendChild(listItem);
  });
}

async function addToCart(product) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  await response.json();
  fetchCart();
}

async function updateQuantity(id, quantity) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity: parseInt(quantity) }),
  });
  fetchCart();
}

async function removeFromCart(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchCart();
}

async function clearCart() {
  await fetch(API_URL, { method: 'DELETE' });
  fetchCart();
}

// Inicializar a visualização do carrinho
fetchCart();

function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  function displayCart(cart) {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    
    cart.forEach((item) => {
      // (exibe itens conforme o exemplo anterior)
    });
    
    const totalContainer = document.createElement('p');
    totalContainer.textContent = `Total: R$ ${calculateTotal(cart).toFixed(2)}`;
    cartContainer.appendChild(totalContainer);
  }

  // Salvar carrinho no localStorage
function saveCartToLocal(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Carregar carrinho do localStorage
  function loadCartFromLocal() {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  
  async function fetchCart() {
    let cart = loadCartFromLocal();
    displayCart(cart);
    // (opcional) carregar do backend se necessário
  }
  function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  
  // Ao atualizar o carrinho, salve-o no local storage
  function updateLocalCart(cart) {
    saveCartToLocalStorage(cart);
    displayCart(cart);
  }
  function notify(message) {
    alert(message);
  }
  
  // Exemplo de uso:
  notify("Produto adicionado ao carrinho!");
      