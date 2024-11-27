const form = document.getElementById('form');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('password1');
const confirmaSenha = document.getElementById('password2');
const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');

// Função para validar o e-mail usando uma expressão regular
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para validar o formulário com promessas
function validarFormularioComPromise() {
    return new Promise((resolve, reject) => {
        if (nome.value.trim() === '') {
            reject('O campo Nome é obrigatório.');
        } else if (email.value.trim() === '') {
            reject('O campo E-mail é obrigatório.');
        } else if (!validarEmail(email.value.trim())) {
            reject('O e-mail digitado não é válido.');
        } else if (senha.value.trim() === '') {
            reject('O campo Senha é obrigatório.');
        } else if (senha.value.length < 6) {
            reject('A senha deve ter pelo menos 6 caracteres.');
        } else if (senha.value !== confirmaSenha.value) {
            reject('As senhas não coincidem.');
        } else {
            resolve('Cadastro realizado com sucesso!');
        }
    });
}

// Evento de envio do formulário
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    validarFormularioComPromise()
        .then((message) => {
            // Exibe mensagem de sucesso
            successMsg.style.display = 'block';
            successMsg.textContent = message;

            // Salvar os dados no Local Storage
            const userData = {
                nome: nome.value.trim(),
                email: email.value.trim(),
                senha: senha.value.trim(), // Nunca salve senhas em texto plano em um sistema real
            };

            let usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuariosCadastrados.push(userData);
            localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));

            // Limpa os campos do formulário
            form.reset();

            // Redireciona após 2 segundos
            setTimeout(() => {
                window.location.href = "../pages/loginADM.html"; // Altere o caminho, se necessário
            }, 2000);
        })
        .catch((error) => {
            // Exibe mensagem de erro
            errorMsg.style.display = 'block';
            errorMsg.textContent = error;
        });
});