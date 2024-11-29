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
    sobrenos1: "At Encanto Tropical, we celebrate the beauty and vitality of tropical flowers. With a commitment to quality and sustainability, we work to bring you the exuberance of nature in each flower. We value personalized service and believe in the power of flowers to transform spaces and moments into something unique and special. Explore our catalog and let yourself be enchanted!",
    sobrenos2: "We are passionate about tropical flowers and the impact they have on transforming environments and emotions. At Encanto Tropical, we combine quality, care and sustainability to offer the best of tropical nature. Our goal is to bring beauty, color and life to you, with dedicated service and unique flowers.",
    sobrenos0: "About Us"
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
    sobrenos1: "Na Encanto Tropical, celebramos a beleza e a vitalidade das flores tropicais. Com compromisso com a qualidade e a sustentabilidade, trabalhamos para levar até você a exuberância da natureza em cada flor. Valorizamos o atendimento personalizado e acreditamos no poder das flores de transformar espaços e momentos em algo único e especial. Explore nosso catálogo e deixe-se encantar!",
    sobrenos2: "Somos apaixonados por flores tropicais e pelo impacto que elas têm em transformar ambientes e emoções. Na Encanto Tropical, combinamos qualidade, cuidado e sustentabilidade para oferecer o melhor da natureza tropical. Nosso objetivo é levar beleza, cor e vida até você, com atendimento dedicado e flores únicas.",
    sobrenos0: "Sobre Nós"
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
