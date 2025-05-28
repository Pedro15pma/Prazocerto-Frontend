var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var body = document.querySelector("body");

var loginForm = document.querySelector("#login-form");
var signupForm = document.querySelector("#signup-form");
var loginErrorDiv = document.querySelector("#login-error");
var signupErrorDiv = document.querySelector("#signup-error");

// Funções auxiliares para localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function setLoggedInUser(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
}

// Alternar entre painéis de login e cadastro
if (btnSignin) {
    btnSignin.addEventListener("click", function () {
       body.className = "sign-in-js"; 
       loginErrorDiv.textContent = ''; // Limpa erros ao trocar de painel
       signupErrorDiv.textContent = '';
    });
}

if (btnSignup) {
    btnSignup.addEventListener("click", function () {
        body.className = "sign-up-js";
        loginErrorDiv.textContent = ''; // Limpa erros ao trocar de painel
        signupErrorDiv.textContent = '';
    });
}

// Lógica de Cadastro
if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Previne o envio padrão do formulário
        signupErrorDiv.textContent = ''; // Limpa erros anteriores

        var name = document.querySelector("#signup-name").value.trim();
        var email = document.querySelector("#signup-email").value.trim();
        var password = document.querySelector("#signup-password").value.trim();

        if (!name || !email || !password) {
            signupErrorDiv.textContent = 'Por favor, preencha todos os campos.';
            return;
        }

        // Validação simples de email (pode ser melhorada)
        if (!/\S+@\S+\.\S+/.test(email)) {
            signupErrorDiv.textContent = 'Formato de e-mail inválido.';
            return;
        }

        var users = getUsers();
        var userExists = users.some(user => user.email === email);

        if (userExists) {
            signupErrorDiv.textContent = 'Este e-mail já está cadastrado.';
        } else {
            // Idealmente, a senha deveria ser hasheada antes de salvar
            users.push({ name: name, email: email, password: password }); 
            saveUsers(users);
            console.log("Usuário cadastrado:", { name: name, email: email });
            alert("Cadastro realizado com sucesso! Faça o login.");
            // Muda para a tela de login após cadastro bem-sucedido
            body.className = "sign-in-js"; 
            signupForm.reset(); // Limpa o formulário de cadastro
        }
    });
}

// Lógica de Login
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Previne o envio padrão do formulário
        loginErrorDiv.textContent = ''; // Limpa erros anteriores

        var email = document.querySelector("#login-email").value.trim();
        var password = document.querySelector("#login-password").value.trim();

        if (!email || !password) {
            loginErrorDiv.textContent = 'Por favor, preencha e-mail e senha.';
            return;
        }

        var users = getUsers();
        var foundUser = users.find(user => user.email === email);

        if (foundUser && foundUser.password === password) { // Comparação direta de senha (não seguro para produção)
            console.log("Login bem-sucedido para:", foundUser.email);
            setLoggedInUser({ name: foundUser.name, email: foundUser.email });
            window.location.href = "index.html"; // Redireciona para a página principal
        } else {
            loginErrorDiv.textContent = 'E-mail ou senha inválidos.';
        }
    });
}

