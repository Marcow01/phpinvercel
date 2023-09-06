<!DOCTYPE html>
<html>
<head>
    <title>Resultado do Formulário</title>
</head>
<body>
    <h2>Resultado do Formulário</h2>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nome = $_POST["nome"];
        $email = $_POST["email"];

        echo "<p>Nome: $nome</p>";
        echo "<p>Email: $email</p>";
    } else {
        echo "<p>O formulário não foi enviado.</p>";
    }
    ?>
</body>
</html>