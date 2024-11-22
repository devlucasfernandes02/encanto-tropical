<!-- <?php
// Conexão com o banco de dados
//$conn = new mysqli('localhost', 'root', '', 'Encanto_Tropical_cd');

// Verifica se houve erro na conexão
//if ($conn->connect_error) {
    die('Erro na conexão: ' . $conn->connect_error);
//}

// Recebe os dados do formulário
//$nome = $_POST['nome'];
//$email = $_POST['email'];
//$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT); // Criptografa a senha -->

// // Prepara o SQL para inserção
// $sql = "INSERT INTO conta_clientes (nome, email, senha) VALUES (?, ?, ?)";
// $stmt = $conn->prepare($sql);
// $stmt->bind_param('sss', $nome, $email, $senha);

// // Executa o SQL
// if ($stmt->execute()) {
//     echo "Cadastro realizado com sucesso!";
// } else {
//     if ($conn->errno === 1062) {
//         echo "Erro: O email já está cadastrado.";
//     } else {
//         echo "Erro: " . $stmt->error;
//     }
// }

// // Fecha a conexão
// $stmt->close();
// $conn->close();
// ?> -->
