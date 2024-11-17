window.addEventListener('resize', updateCarrossel);

i18next.init({
    lng: 'pt', // Idioma padrão
    debug: true, // Para verificar se há erros de carregamento no console
    resources: {
      en: {
        translation: {
          "greeting": "Hello",
          "welcomeMessage": "Welcome to our website!",
          "inicio": "Home", // Tradução de exemplo // Tradução de exemplo
          "produtos": "Products",
          "destaques": "Highlight",
          "sobre": "About us",
          "contatos": "Contacts"
        }
      },
      pt: {
        translation: {
          "greeting": "Olá",
          "welcomeMessage": "Bem-vindo ao nosso site!",
          "inicio": "Início", // Tradução de exemplo
          "produtos": "Produtos",
          "destaques": "Destaques",
          "sobre": "Sobre Nós",
          "contatos": "Contatos"
        }
      }
    }
  }, function(err, t) {
    if (err) return console.error('Erro ao inicializar o i18next:', err);
    updateContent(); // Chamado após a inicialização para atualizar o conteúdo com a tradução
  });

  function updateContent() {
    // Certifique-se de que os elementos realmente existem
    const greetingElement = document.getElementById('greeting');
    const welcomeMessageElement = document.getElementById('welcomeMessage');
    const inicioElement = document.getElementById('inicio');
    const produtosElement = document.getElementById('produtos');
    const destaquesElement = document.getElementById('destaques');
    const sobreElement = document.getElementById('sobre');
    const contatosElement = document.getElementById('contatos');
  
    if (greetingElement && welcomeMessageElement && inicioElement) {
      greetingElement.innerHTML = i18next.t('greeting');
      welcomeMessageElement.innerHTML = i18next.t('welcomeMessage');
      inicioElement.innerHTML = i18next.t('inicio');
      produtosElement.innerHTML = i18next.t('produtos');
      destaquesElement.innerHTML = i18next.t('destaques');
      sobreElement.innerHTML = i18next.t('sobre');
      contatosElement.innerHTML = i18next.t('contatos');
    } else {
      console.error("Elementos não encontrados.");
    }
  }

  window.changeLanguage = function(lang) {
    i18next.changeLanguage(lang, updateContent); // Muda o idioma e atualiza o conteúdo
  };