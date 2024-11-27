document.addEventListener('DOMContentLoaded', function() {
    // Inicializar i18next com traduções
    i18next.init({
        lng: 'pt', // idioma padrão
        debug: true,
        resources: {
            pt: {
                translation: {
                    "deliveryText": "Entrega em até 3h para todo o Brasil",
                    "subscriptionText": "Clube de assinatura",
                    "scheduleText": "Agende o horário da entrega",
                    "whatsappText": "Compre pelo Whatsapp"
                }
            },
            en: {
                translation: {
                    "deliveryText": "Delivery within 3 hours all over Brazil",
                    "subscriptionText": "Subscription club",
                    "scheduleText": "Schedule the delivery time",
                    "whatsappText": "Buy via WhatsApp"
                }
            }
        }
    }, function(err, t) {
        if (err) return console.error('Erro ao inicializar o i18next:', err);
        updateContent(); // Atualiza o conteúdo da página com as traduções
    });

    // Função para atualizar o conteúdo
    function updateContent() {
        // Atualiza o conteúdo dos elementos com os respectivos IDs
        document.getElementById('deliveryText').innerHTML = i18next.t('deliveryText');
        document.getElementById('subscriptionText').innerHTML = i18next.t('subscriptionText');
        document.getElementById('scheduleText').innerHTML = i18next.t('scheduleText');
        document.getElementById('whatsappText').innerHTML = i18next.t('whatsappText');
    }

    // Função para mudar o idioma
    window.changeLanguage = function(lang) {
        i18next.changeLanguage(lang, updateContent); // Troca o idioma e atualiza o conteúdo
    };
});
