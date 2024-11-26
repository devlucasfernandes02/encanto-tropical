document.addEventListener('DOMContentLoaded', function () {
    // Selecionando os elementos do DOM
    const loginForm = document.getElementById('form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const errorMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg');

    // Função para validar o e-mail com regex
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Adicionando o evento de submit ao formulário
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário

        // Resetando as mensagens
        errorMsg.style.display = 'none';
        successMsg.style.display = 'none';

        // Validação do e-mail
        if (!validarEmail(email.value)) {
            errorMsg.textContent = 'Por favor, insira um e-mail válido.';
            errorMsg.style.display = 'block';
            return;
        }

        // Validação da senha
        if (password.value.length < 6) {
            errorMsg.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            errorMsg.style.display = 'block';
            return;
        }

        // Se tudo estiver certo, exibe mensagem de sucesso
        successMsg.style.display = 'block';
        setTimeout(function () {
            window.location.href = "../index.html"; // Redireciona para a página principal
        }, 2000); // Redireciona após 2 segundos
    });
});