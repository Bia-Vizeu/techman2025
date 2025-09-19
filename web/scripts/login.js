// Seleciona o campo onde a senha aparece
const passwordField = document.getElementById("password");
// Seleciona todos os botões do teclado
const buttons = document.querySelectorAll(".key");

// Variável para guardar o valor da senha digitada
let password = "";

// Adiciona evento de clique em cada botão
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value === "C") {
      // Limpa tudo
      password = "";
    } else if (value === "back") {
      // Apaga o último número
      password = password.slice(0, -1);
    } else if (value === "enter") {
      // Aqui você pode validar a senha
      if (password === "1234") {
        alert("Login bem-sucedido!");
        window.location.href = "dashboard.html"; // redireciona para o dashboard
      } else {
        alert("Senha incorreta!");
      }
    } else {
      // Adiciona o número ao password
      password += value;
    }

    // Atualiza a exibição (mostra * para cada dígito)
    passwordField.textContent = "*".repeat(password.length);
  });
});
