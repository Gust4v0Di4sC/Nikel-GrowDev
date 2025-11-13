const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;
    const messageError = document.getElementById("messageError");

    const account = getAccount(email);

    messageError.textContent = "";

    if (!account) {
        messageError.textContent = "Opps! verifique o usuario ou a senha.";
        messageError.classList.add("active");
        return;
    }

    if(account){
        if (account.password !== password) {
            messageError.textContent = "Opps! Verifique o usuario ou a senha.";
            messageError.classList.add("active");
            return;
        }

        saveSession(email, checkSession);
        window.location.href = "home.html";
    }

    
})

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;
    const messageEmail = document.getElementById("emailHelper");
    const messagePassword = document.getElementById("passwordHelp");

    if (email.length < 26) {
        messageEmail.textContent = "Preencha o campo com um e-mail válido.";
        messageEmail.classList.add("active");
        return;
    }

    if (password.length < 4) {
        messagePassword.textContent = "Preencha a senha com no minimo 4 digitos";
        messagePassword.classList.add("active");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso");
});

function checkLogged(){
    if (session) {
        sessionStorage.setItem("logged",session);
        logged = session;
    }

    if (logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession){
    if (saveSession) {
        localStorage.setItem("session",data);
    }

    sessionStorage.setItem("logged",data);
}

function getAccount(key){
    const account = localStorage.getItem(key);

    if (account) {
        return JSON.parse(account);
    }

    return "";
}