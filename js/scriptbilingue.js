const translations = {
  en: {
    inicio: "Home",
    produtos: "Products",
    destaques: "Highlights",
    sobre: "About Us",
    contato: "Contact",
    inicioMobile: "Home",
    produtosMobile: "Products",
    destaquesMobile: "Highlights",
    sobreMobile: "About Us",
    contatoMobile: "Contact",
    facalogin: "Hello, log in or sign up",
    facaloginMobile: "Hello, log in or sign up",
    entrega: "Delivery in up to 3h across Brazil",
    clube: "Subscription Club",
    agende: "Schedule delivery time",
    whats: "Order on WhatsApp",
    promocoes: "Promotions",
    vendidos: "Best sellers",
    epoca: "Seasonal Offers",
    rua: "Flower Charm Street, number 1, Aldeia neighborhood, Recife - PE",
    direitos: "Copyright Tropical Charm - 12345678000190 2024 © All rights reserved.",
  },
  pt: {
    inicio: "Início",
    produtos: "Produtos",
    destaques: "Destaques",
    sobre: "Sobre nós",
    contato: "Contato",
    inicioMobile: "Início",
    produtosMobile: "Produtos",
    destaquesMobile: "Destaques",
    sobreMobile: "Sobre nós",
    contatoMobile: "Contato",
    facalogin: "Olá, faça o login ou cadastre-se",
    facaloginMobile: "Olá, faça o login ou cadastre-se",
    entrega: "Entrega em até 3h para todo o Brasil",
    clube: "Clube de assinatura",
    agende: "Agende o horário da entrega",
    whats: "Compre pelo Whatsapp",
    promocoes: "Promoções",
    vendidos: "Mais vendidos",
    epoca: "Ofertas de Época",
    rua: "Rua Encanto das Flores, número 1, Bairro Aldeia, Recife - PE",
    direitos: "Copyright Encanto Tropical - 12345678000190 2024 © Todos os direitos reservados.",
  }
};

let currentLanguage = "pt"; // Idioma inicial

function changeLanguage() {
  // Alterna o idioma
  currentLanguage = currentLanguage === "pt" ? "en" : "pt";

  // Atualiza todos os textos na página com base no idioma atual
  for (const [key, value] of Object.entries(translations[currentLanguage])) {
    const element = document.getElementById(key);
    if (element) {
      element.textContent = value;
    }
  }
}

// Adiciona o evento de clique ao ícone de idioma
document.getElementById("icon-language").addEventListener("click", changeLanguage);
