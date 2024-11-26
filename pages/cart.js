// Função para obter o carrinho do localStorage ou inicializar um novo array vazio
function getCarrinho() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

// Função para salvar o carrinho no localStorage
function salvarCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(produto) {
  const carrinho = getCarrinho();
  
  // Verifica se o produto já está no carrinho
  const itemExistente = carrinho.find(item => item.id === produto.id);
  
  if (itemExistente) {
      itemExistente.quantidade += 1; // Se já existir, incrementa a quantidade
  } else {
      produto.quantidade = 1; // Caso contrário, adiciona com quantidade 1
      carrinho.push(produto);
  }
  
  salvarCarrinho(carrinho);
  atualizarQuantidadeCarrinho();
}

// Função para atualizar o contador de itens no ícone do carrinho
function atualizarQuantidadeCarrinho() {
  const carrinho = getCarrinho();
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
  
  document.getElementById("icon-bag").innerText = totalItens;
}

// Função para exibir os produtos no carrinho
function exibirCarrinho() {
  const carrinho = getCarrinho();
  const containerCarrinho = document.getElementById("container-carrinho");
  containerCarrinho.innerHTML = "";
  
  if (carrinho.length === 0) {
      containerCarrinho.innerHTML = "<p>O carrinho está vazio.</p>";
      return;
  }

  carrinho.forEach(item => {
      const itemElemento = document.createElement("div");
      itemElemento.classList.add("item-carrinho");
      itemElemento.innerHTML = `
          <p>${item.nome}</p>
          <p>Quantidade: ${item.quantidade}</p>
          <button onclick="removerDoCarrinho(${item.id})">Remover</button>
      `;
      containerCarrinho.appendChild(itemElemento);
  });
}

// Função para remover um item do carrinho
function removerDoCarrinho(id) {
  let carrinho = getCarrinho();
  carrinho = carrinho.filter(item => item.id !== id);
  
  salvarCarrinho(carrinho);
  atualizarQuantidadeCarrinho();
  exibirCarrinho();
}

// Exemplo de uso da função de adicionar ao carrinho
// (chame essa função quando o usuário clicar em um botão "Adicionar ao Carrinho")
function exemploAdicionarProduto() {
  const produto = {
      id: 1,
      nome: "orquideaencanto",
      preco: 235.90
      id: 2,
      nome: "buquedeflores",
      preco: 339,90
      id: 3,
      nome: "arranjodocealegria",
      preco: 249,90
      id: 4,
      nome: "arranjodocedesejo",
      preco: 239,90
      }; 
  adicionarAoCarrinho(produto);
}

// Carrega a quantidade de itens no carrinho ao abrir a página
document.addEventListener("DOMContentLoaded", () => {
  atualizarQuantidadeCarrinho();
});
  function notify(message) {
    alert(message);
  }
  
  // Exemplo de uso:
  notify("Produto adicionado ao carrinho!");
      