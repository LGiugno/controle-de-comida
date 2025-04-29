// --- CADASTRO DE USUÁRIO ---
if (document.querySelector("#signupForm")) {
    document.querySelector("#signupForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.querySelector("#nomeCompleto").value;
        const sobrenome = document.querySelector("#sobrenomeCompleto").value;
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        if (usuarios.some(user => user.username === username)) {
            alert("Usuário já existe. Escolha outro nome de usuário.");
            return;
        }

        usuarios.push({ nome, sobrenome, username, password, refeicoes: [] });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioLogado", username);

        window.location.href = "usuario.html";
    });
}

// --- LOGIN ---
if (document.querySelector("#loginForm")) {
    document.querySelector("#loginForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const user = usuarios.find(user => user.username === username && user.password === password);

        if (!user) {
            alert("Usuário ou senha incorretos!");
            return;
        }

        localStorage.setItem("usuarioLogado", username);
        window.location.href = "usuario.html";
    });
}

// --- BOAS-VINDAS (usuario.html) ---
if (document.getElementById("boasVindas")) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const username = localStorage.getItem("usuarioLogado");
    const user = usuarios.find(u => u.username === username);

    if (user) {
        document.getElementById("boasVindas").textContent = `Seja muito bem-vindo, ${user.nome}, o que deseja?`;
    } else {
        window.location.href = "index.html";
    }
}

// --- CADASTRO DE REFEIÇÃO (cadastrorefeicao.html) ---
if (document.querySelector("#formRefeicao")) {
    // Mostrar/ocultar campo "Outro" quando selecionado
    document.getElementById("tipoRefeicao").addEventListener("change", function() {
        const outroContainer = document.getElementById("outroRefeicaoContainer");
        outroContainer.style.display = this.value === "Outro" ? "block" : "none";
    });

    document.querySelector("#formRefeicao").addEventListener("submit", function (event) {
        event.preventDefault();

        const tipoSelecionado = document.getElementById("tipoRefeicao").value;
        const data = document.getElementById("data").value;
        const horario = document.getElementById("hora").value;
        const descricao = document.getElementById("descricao").value;

        // VALIDAÇÃO DO CAMPO "OUTRO" (nova parte adicionada)
        if (tipoSelecionado === "Outro" && document.getElementById("outroRefeicao").value.trim() === "") {
            alert("Por favor, descreva o tipo de refeição");
            return;
        }

        const tipo = tipoSelecionado === "Outro" ? document.getElementById("outroRefeicao").value : tipoSelecionado;

        const username = localStorage.getItem("usuarioLogado");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const userIndex = usuarios.findIndex(u => u.username === username);

        if (userIndex !== -1) {
            usuarios[userIndex].refeicoes.push({ 
                tipo, 
                data, 
                horario, 
                descricao 
            });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("Refeição cadastrada com sucesso!");
            window.location.href = "usuario.html";
        }
    });
}

// --- VISUALIZAR REFEIÇÕES (refeicoespastadas.html) ---
function carregarRefeicoes(dataSelecionada = "") {
    const username = localStorage.getItem("usuarioLogado");
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const user = usuarios.find(u => u.username === username);

    const lista = document.getElementById("listaRefeicoes");
    lista.innerHTML = "";

    if (!user || !user.refeicoes || user.refeicoes.length === 0) {
        lista.innerHTML = "<p>Nenhuma refeição cadastrada ainda.</p>";
        return;
    }

    const ordemTipos = [
        "Café da manhã", "Lanche da manhã", "Almoço",
        "Café da tarde", "Lanche da tarde", "Janta", "Ceia", "Outro"
    ];

    let refeicoesFiltradas = user.refeicoes;
    
    if (dataSelecionada) {
        refeicoesFiltradas = user.refeicoes.filter(r => r.data === dataSelecionada);
    }

    const refeicoesOrdenadas = refeicoesFiltradas
        .sort((a, b) => {
            if (a.data !== b.data) return new Date(a.data) - new Date(b.data);
            return ordemTipos.indexOf(a.tipo) - ordemTipos.indexOf(b.tipo);
        });

    if (refeicoesOrdenadas.length === 0) {
        lista.innerHTML = "<p>Nenhuma refeição encontrada para o filtro selecionado.</p>";
        return;
    }

    refeicoesOrdenadas.forEach(ref => {
        const div = document.createElement("div");
        div.className = "refeicao-item";
        div.innerHTML = `<h3>${ref.tipo}</h3>
                        <p><strong>Data:</strong> ${ref.data}</p>
                        <p><strong>Horário:</strong> ${ref.horario}</p>
                        <p><strong>Descrição:</strong> ${ref.descricao}</p>`;
        lista.appendChild(div);
    });
}

function filtrarRefeicoes() {
    const dataSelecionada = document.getElementById("dataFiltro").value;
    carregarRefeicoes(dataSelecionada);
}

// Carrega as refeições quando a página é aberta
if (document.getElementById("listaRefeicoes")) {
    document.addEventListener("DOMContentLoaded", function() {
        carregarRefeicoes();
    });
}

