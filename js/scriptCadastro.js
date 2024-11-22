const form =document.querySelector('form');
const senha= document.getElementById('criarSenha'); // ID atualizado
const confirmaSenha =document.getElementById('confirmarSenha'); // ID atualizado
const errorMsg= document.getElementById('errorMsg');
const successMsg= document.getElementById('successMsg');


form.addEventListener('submit', function (event) {
    Event.preventDefault(); // Impede o envio do formulário
    
    
    errorMsg.style.display ='none';
    successMg.style.display= 'none';
    // Verificar se as senhas são iguais
    if (senha.value !== confirmaSenha.value) {
       errorMsg.style.display= 'block'; // Mostra a mensagen de erro

    } 
    else {
        successMsg.style.display='block' ;
        form.reset();
    }    
});