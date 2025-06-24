document.addEventListener("DOMContentLoaded", () => {
  const formularioLogin = document.getElementById("login-form");
  const campoEmail = document.getElementById("login-email");
  const campoSenha = document.getElementById("login-password");
  const mensagemErro = document.getElementById("login-error");

  formularioLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dadosLogin = {
      email: campoEmail.value.trim(),
      senha: campoSenha.value.trim(),
    };

    try {
      const resposta = await fetch("http://localhost:4000/autenticacao/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosLogin),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        mensagemErro.textContent = resultado.erro || "Erro desconhecido";
        return;
      }

      localStorage.setItem("usuarioLogado", JSON.stringify(resultado.usuario));
      window.location.href = "index.html";
    } catch (erro) {
      mensagemErro.textContent = "Falha na conexao com o servidor";
    }
  });
});

document.getElementById("signin").addEventListener("click", () => {
  document.querySelector(".container").classList.add("sign-in-js");
  document.querySelector(".container").classList.remove("sign-up-js");
});

document.getElementById("signup").addEventListener("click", () => {
  document.querySelector(".container").classList.add("sign-up-js");
  document.querySelector(".container").classList.remove("sign-in-js");
});

