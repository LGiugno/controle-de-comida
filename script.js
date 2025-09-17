// -----------------------------------------------------
// Banco de alimentos (nutrientes por 100g)
// Fonte: TACO (Tabela Brasileira de Composição de Alimentos) + equivalentes aproximados
// -----------------------------------------------------
const LOCAL_FOOD_DB = {
  // Cereais e derivados
  'arroz branco': { calories: 130, protein: 2.7, carbs: 28.1, fat: 0.3 },
  'arroz integral': { calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
  'arroz parboilizado': { calories: 123, protein: 2.5, carbs: 25.8, fat: 0.6 },
  'macarrão cozido': { calories: 131, protein: 5, carbs: 25, fat: 1 },
  'pão francês': { calories: 268, protein: 9, carbs: 58, fat: 3.3 },
  'pão integral': { calories: 247, protein: 13, carbs: 41, fat: 3.4 },
  'aveia': { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9 },
  'farinha de trigo': { calories: 364, protein: 10, carbs: 76, fat: 1 },
  'farinha de mandioca': { calories: 360, protein: 1.6, carbs: 88, fat: 0.3 },
  'polenta': { calories: 70, protein: 2, carbs: 15, fat: 0.2 },

  // Leguminosas
  'feijão carioca': { calories: 127, protein: 8.4, carbs: 23.6, fat: 0.5 },
  'feijão preto': { calories: 132, protein: 8.9, carbs: 23.7, fat: 0.5 },
  'lentilha': { calories: 116, protein: 9, carbs: 20, fat: 0.4 },
  'grão-de-bico': { calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6 },
  'soja': { calories: 173, protein: 16.6, carbs: 9.9, fat: 9 },
  'ervilha': { calories: 81, protein: 5, carbs: 14, fat: 0.4 },

  // Carnes e ovos
  'peito de frango': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  'frango': { calories: 190, protein: 28, carbs: 0, fat: 7 },
  'carne bovina': { calories: 250, protein: 26, carbs: 0, fat: 15 },
  'patinho moído': { calories: 219, protein: 26, carbs: 0, fat: 12 },
  'picanha': { calories: 288, protein: 25, carbs: 0, fat: 20 },
  'alcatra': { calories: 239, protein: 26, carbs: 0, fat: 15 },
  'lombo suíno': { calories: 242, protein: 27, carbs: 0, fat: 14 },
  'presunto': { calories: 145, protein: 21, carbs: 1.5, fat: 5 },
  'peixe': { calories: 150, protein: 26, carbs: 0, fat: 5 },
  'salmão': { calories: 208, protein: 20, carbs: 0, fat: 13 },
  'sardinha': { calories: 208, protein: 25, carbs: 0, fat: 11 },
  'ovo cozido': { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  'ovo frito': { calories: 196, protein: 13, carbs: 1, fat: 15 },

  // Laticínios
  'leite integral': { calories: 61, protein: 3.2, carbs: 5, fat: 3.3 },
  'leite desnatado': { calories: 42, protein: 3.4, carbs: 5, fat: 0.2 },
  'queijo muçarela': { calories: 280, protein: 22, carbs: 2.2, fat: 21 },
  'queijo prato': { calories: 360, protein: 22, carbs: 1.5, fat: 30 },
  'queijo minas': { calories: 264, protein: 18, carbs: 2, fat: 20 },
  'iogurte natural': { calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  'manteiga': { calories: 717, protein: 0.9, carbs: 0.1, fat: 81 },

  // Frutas
  'banana prata': { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  'banana nanica': { calories: 92, protein: 1.3, carbs: 24, fat: 0.3 },
  'maçã': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  'pera': { calories: 57, protein: 0.4, carbs: 15, fat: 0.1 },
  'uva': { calories: 69, protein: 0.7, carbs: 18, fat: 0.2 },
  'laranja': { calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
  'mexerica': { calories: 53, protein: 0.8, carbs: 13, fat: 0.3 },
  'abacaxi': { calories: 50, protein: 0.5, carbs: 13, fat: 0.1 },
  'manga': { calories: 60, protein: 0.8, carbs: 15, fat: 0.4 },
  'melancia': { calories: 30, protein: 0.6, carbs: 8, fat: 0.2 },
  'mamão': { calories: 43, protein: 0.5, carbs: 11, fat: 0.3 },
  'abacate': { calories: 160, protein: 2, carbs: 9, fat: 15 },
  'morango': { calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
  'kiwi': { calories: 61, protein: 1.1, carbs: 15, fat: 0.5 },
  'goiaba': { calories: 68, protein: 2.6, carbs: 14, fat: 1 },
  'caju': { calories: 43, protein: 1, carbs: 11, fat: 0.3 },
  'acerola': { calories: 32, protein: 0.8, carbs: 7.7, fat: 0.2 },

  // Verduras e legumes
  'batata cozida': { calories: 86, protein: 1.7, carbs: 20, fat: 0.1 },
  'batata doce': { calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  'mandioca': { calories: 160, protein: 1, carbs: 38, fat: 0.3 },
  'cenoura': { calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
  'beterraba': { calories: 43, protein: 1.6, carbs: 10, fat: 0.2 },
  'abóbora': { calories: 26, protein: 1, carbs: 6.5, fat: 0.1 },
  'chuchu': { calories: 19, protein: 0.8, carbs: 4, fat: 0.1 },
  'couve': { calories: 49, protein: 4.3, carbs: 9, fat: 0.9 },
  'alface': { calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2 },
  'rúcula': { calories: 25, protein: 2.6, carbs: 3.7, fat: 0.7 },
  'espinafre': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  'brócolis': { calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  'couve-flor': { calories: 25, protein: 1.9, carbs: 5, fat: 0.3 },
  'tomate': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  'pepino': { calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1 },
  'pimentão': { calories: 31, protein: 1, carbs: 6, fat: 0.3 },
  'cebola': { calories: 40, protein: 1.1, carbs: 9, fat: 0.1 },
  'alho': { calories: 149, protein: 6.4, carbs: 33, fat: 0.5 },

  // Oleaginosas e sementes
  'castanha-do-pará': { calories: 656, protein: 14, carbs: 12, fat: 66 },
  'castanha de caju': { calories: 553, protein: 18, carbs: 30, fat: 44 },
  'amendoim': { calories: 567, protein: 25, carbs: 16, fat: 49 },
  'nozes': { calories: 654, protein: 15, carbs: 14, fat: 65 },
  'amêndoas': { calories: 579, protein: 21, carbs: 22, fat: 50 },
  'linhaça': { calories: 534, protein: 18, carbs: 29, fat: 42 },
  'chia': { calories: 486, protein: 17, carbs: 42, fat: 31 },

  // Açúcares e doces
  'açúcar refinado': { calories: 387, protein: 0, carbs: 100, fat: 0 },
  'mel': { calories: 304, protein: 0.3, carbs: 82, fat: 0 },
  'chocolate ao leite': { calories: 535, protein: 7.6, carbs: 59, fat: 30 },
  'chocolate amargo': { calories: 546, protein: 4.9, carbs: 46, fat: 31 },
  'doce de leite': { calories: 315, protein: 7, carbs: 56, fat: 8 },

  // Bebidas
  'café sem açúcar': { calories: 2, protein: 0.1, carbs: 0, fat: 0 },
  'refrigerante': { calories: 41, protein: 0, carbs: 11, fat: 0 },
  'suco de laranja': { calories: 45, protein: 0.7, carbs: 10, fat: 0.2 },
  'cerveja': { calories: 43, protein: 0.5, carbs: 3.6, fat: 0 },
  'vinho tinto': { calories: 85, protein: 0.1, carbs: 2.7, fat: 0 }
};

// -----------------------------------------------------
// Variáveis globais para a refeição
// -----------------------------------------------------
let alimentosAdicionados = [];

// -----------------------------------------------------
// Sistema de Usuários (localStorage)
// -----------------------------------------------------
function salvarUsuario(usuario) {
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}

function obterUsuarioLogado() {
  const usuario = localStorage.getItem("usuarioLogado");
  return usuario ? JSON.parse(usuario) : null;
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "index.html";
}

// -----------------------------------------------------
// Cadastro de Usuário
// -----------------------------------------------------
function cadastrarUsuario(event) {
  event.preventDefault();
  const nome = document.getElementById("cadastroNome").value;
  const email = document.getElementById("cadastroEmail").value;
  const senha = document.getElementById("cadastroSenha").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  // Verificar se usuário já existe
  if (localStorage.getItem(email)) {
    alert("Este email já está cadastrado!");
    return;
  }

  const usuario = { nome, email, senha, refeicoes: [] };
  localStorage.setItem(email, JSON.stringify(usuario));
  alert("Cadastro realizado com sucesso!");
  window.location.href = "index.html";
}

// -----------------------------------------------------
// Login
// -----------------------------------------------------
function login(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  const usuario = JSON.parse(localStorage.getItem(email));

  if (usuario && usuario.senha === senha) {
  salvarUsuario(usuario);
  window.location.href = "usuario.html";
  } else {
  alert("Email ou senha inválidos!");
  }
}

// -----------------------------------------------------
// Adicionar alimento à lista temporária
// -----------------------------------------------------
function adicionarAlimento() {
  const alimentoSelect = document.getElementById("alimentoSelect");
  const quantidade = document.getElementById("quantidade");
  const unidade = document.getElementById("unidade");
  
  const alimento = alimentoSelect.value.toLowerCase();
  const qtd = parseFloat(quantidade.value);
  const und = unidade.value;
  
  if (!alimento || !qtd || qtd <= 0) {
    alert("Preencha todos os campos corretamente!");
    return;
  }
  
  if (!LOCAL_FOOD_DB[alimento]) {
    alert("Alimento não encontrado no banco local.");
    return;
  }
  
  const nutrientes = LOCAL_FOOD_DB[alimento];
  const fator = qtd / 100;
  
  const alimentoInfo = {
    alimento,
    quantidade: qtd,
    unidade: und,
    calories: nutrientes.calories * fator,
    protein: nutrientes.protein * fator,
    carbs: nutrientes.carbs * fator,
    fat: nutrientes.fat * fator
  };
  
  alimentosAdicionados.push(alimentoInfo);
  atualizarListaAlimentos();
  
  // Limpar campos
  alimentoSelect.value = "";
  quantidade.value = "";
  unidade.value = "g";
}

// -----------------------------------------------------
// Atualizar lista de alimentos na interface
// -----------------------------------------------------
function atualizarListaAlimentos() {
  const listaAlimentos = document.getElementById("listaAlimentos");
  const listaAlimentosCard = document.getElementById("listaAlimentosCard");
  
  if (alimentosAdicionados.length === 0) {
    listaAlimentosCard.style.display = "none";
    listaAlimentos.innerHTML = "";
    return;
  }
  
  listaAlimentosCard.style.display = "block";
  listaAlimentos.innerHTML = "";
  
  alimentosAdicionados.forEach((alimento, index) => {
    const div = document.createElement("div");
    div.className = "alimento-item";
    div.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      margin: 8px 0;
      background: rgba(255,255,255,0.02);
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.03);
    `;
    
    div.innerHTML = `
      <div>
        <strong>${alimento.alimento.charAt(0).toUpperCase() + alimento.alimento.slice(1)}</strong>
        <br>${alimento.quantidade}${alimento.unidade} - ${alimento.calories.toFixed(1)} kcal
      </div>
      <button type="button" onclick="removerAlimento(${index})" style="background: var(--danger); padding: 6px 10px; font-size: 0.8rem;">
        Remover
      </button>
    `;
    
    listaAlimentos.appendChild(div);
  });
  
  // Adicionar resumo nutricional
  const resumo = calcularResumoNutricional();
  const resumoDiv = document.createElement("div");
  resumoDiv.style.cssText = `
    margin-top: 15px;
    padding: 12px;
    background: rgba(110,231,183,0.1);
    border-radius: 8px;
    border: 1px solid rgba(110,231,183,0.2);
  `;
  
  resumoDiv.innerHTML = `
    <strong>Resumo Nutricional:</strong>
    <br>Total: ${resumo.totalCalories.toFixed(1)} kcal
    <br>Proteínas: ${resumo.totalProtein.toFixed(1)}g
    <br>Carboidratos: ${resumo.totalCarbs.toFixed(1)}g
    <br>Gorduras: ${resumo.totalFat.toFixed(1)}g
  `;
  
  listaAlimentos.appendChild(resumoDiv);
}

// -----------------------------------------------------
// Calcular resumo nutricional
// -----------------------------------------------------
function calcularResumoNutricional() {
  return alimentosAdicionados.reduce((total, alimento) => ({
    totalCalories: total.totalCalories + alimento.calories,
    totalProtein: total.totalProtein + alimento.protein,
    totalCarbs: total.totalCarbs + alimento.carbs,
    totalFat: total.totalFat + alimento.fat
  }), { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 });
}

// -----------------------------------------------------
// Remover alimento da lista temporária
// -----------------------------------------------------
function removerAlimento(index) {
  alimentosAdicionados.splice(index, 1);
  atualizarListaAlimentos();
}

// -----------------------------------------------------
// Cadastro de Refeição (atualizado para múltiplos alimentos)
// -----------------------------------------------------
function cadastrarRefeicao(event) {
  event.preventDefault();
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    alert("Usuário não logado!");
    window.location.href = "index.html";
    return;
  }
  
  if (alimentosAdicionados.length === 0) {
    alert("Adicione pelo menos um alimento antes de salvar a refeição!");
    return;
  }
  
  const nomeRefeicao = document.getElementById("nomeRefeicao").value || "Refeição";
  const dataRefeicao = document.getElementById("dataRefeicao").value;
  
  const resumo = calcularResumoNutricional();
  
  const refeicao = {
    nome: nomeRefeicao,
    alimentos: [...alimentosAdicionados], // Copia os alimentos
    data: dataRefeicao,
    dataCompleta: new Date().toISOString(),
    totalCalories: resumo.totalCalories,
    totalProtein: resumo.totalProtein,
    totalCarbs: resumo.totalCarbs,
    totalFat: resumo.totalFat
  };
  
  // Atualizar usuário no localStorage
  const usuarioCompleto = JSON.parse(localStorage.getItem(usuario.email));
  usuarioCompleto.refeicoes.push(refeicao);
  localStorage.setItem(usuario.email, JSON.stringify(usuarioCompleto));
  salvarUsuario(usuarioCompleto);
  
  alert("Refeição cadastrada com sucesso!");
  
  // Resetar formulário
  alimentosAdicionados = [];
  document.getElementById("refeicaoForm").reset();
  document.getElementById("listaAlimentosCard").style.display = "none";
  
  // Voltar para a data atual
  const hoje = new Date().toISOString().split('T')[0];
  document.getElementById("dataRefeicao").value = hoje;
  
  // Limpar a lista de alimentos
  document.getElementById("listaAlimentos").innerHTML = "";
}

// -----------------------------------------------------
// Preencher select de alimentos (REMOVER required)
// -----------------------------------------------------
function preencherSelectAlimentos() {
  const select = document.getElementById("alimentoSelect");
  if (!select) return;

  select.innerHTML = '<option value="">Selecione um alimento</option>';
  const alimentos = Object.keys(LOCAL_FOOD_DB).sort();
  
  alimentos.forEach(alimento => {
    const option = document.createElement("option");
    option.value = alimento;
    option.textContent = alimento.charAt(0).toUpperCase() + alimento.slice(1);
    select.appendChild(option);
  });
  
  // Remover o atributo required do select após preenchê-lo
  select.removeAttribute('required');
}

// -----------------------------------------------------
// Listagem de Refeições na página de refeições passadas
// -----------------------------------------------------
function carregarRefeicoesPassadas() {
  const usuario = obterUsuarioLogado();
  const tbody = document.getElementById("tabelaRefeicoesBody");
  
  if (!usuario || !tbody) {
    window.location.href = "index.html";
    return;
  }

  const usuarioCompleto = JSON.parse(localStorage.getItem(usuario.email));
  tbody.innerHTML = "";
  
  if (!usuarioCompleto.refeicoes || usuarioCompleto.refeicoes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Nenhuma refeição cadastrada</td></tr>`;
    return;
  }

  usuarioCompleto.refeicoes.sort((a, b) => new Date(b.dataCompleta) - new Date(a.dataCompleta));
  
  usuarioCompleto.refeicoes.forEach(refeicao => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${new Date(refeicao.data).toLocaleDateString('pt-BR')}</td>
      <td>${refeicao.nome}</td>
      <td>${refeicao.alimentos.length} alimento(s)</td>
      <td>${refeicao.totalCalories.toFixed(1)} kcal</td>
      <td>${refeicao.totalProtein.toFixed(1)}g</td>
      <td>
        <button onclick="verDetalhesRefeicao('${refeicao.dataCompleta}')" style="padding: 4px 8px; font-size: 0.8rem;">
          Ver Detalhes
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// -----------------------------------------------------
// Ver detalhes da refeição
// -----------------------------------------------------
function verDetalhesRefeicao(dataCompleta) {
  const usuario = obterUsuarioLogado();
  const usuarioCompleto = JSON.parse(localStorage.getItem(usuario.email));
  const refeicao = usuarioCompleto.refeicoes.find(r => r.dataCompleta === dataCompleta);
  
  if (!refeicao) return;
  
  let detalhes = `Refeição: ${refeicao.nome}\nData: ${new Date(refeicao.data).toLocaleDateString('pt-BR')}\n\n`;
  detalhes += "Alimentos:\n";
  
  refeicao.alimentos.forEach(alimento => {
    detalhes += `- ${alimento.alimento}: ${alimento.quantidade}${alimento.unidade} (${alimento.calories.toFixed(1)} kcal)\n`;
  });
  
  detalhes += `\nTotal: ${refeicao.totalCalories.toFixed(1)} kcal\n`;
  detalhes += `Proteínas: ${refeicao.totalProtein.toFixed(1)}g\n`;
  detalhes += `Carboidratos: ${refeicao.totalCarbs.toFixed(1)}g\n`;
  detalhes += `Gorduras: ${refeicao.totalFat.toFixed(1)}g`;
  
  alert(detalhes);
}

// -----------------------------------------------------
// Listagem de Refeições no painel do usuário
// -----------------------------------------------------
function carregarRefeicoes() {
  const usuario = obterUsuarioLogado();
  const lista = document.getElementById("listaRefeicoes");
  
  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  if (lista) {
    // Obter usuário completo do localStorage
    const usuarioCompleto = JSON.parse(localStorage.getItem(usuario.email));
    
    lista.innerHTML = "";
    
    if (!usuarioCompleto.refeicoes || usuarioCompleto.refeicoes.length === 0) {
      lista.innerHTML = "<li>Nenhuma refeição cadastrada</li>";
      return;
    }

    // Mostrar apenas as últimas 5 refeições
    const ultimasRefeicoes = usuarioCompleto.refeicoes
      .sort((a, b) => new Date(b.dataCompleta) - new Date(a.dataCompleta))
      .slice(0, 5);

    ultimasRefeicoes.forEach((ref, index) => {
      const li = document.createElement("li");
      li.className = "refeicao-card";
      li.innerHTML = `
        <div class="refeicao-info">
          <strong>${ref.nome}</strong> - ${ref.alimentos.length} alimento(s)
          <br>${ref.totalCalories.toFixed(1)} kcal | P: ${ref.totalProtein.toFixed(1)}g | C: ${ref.totalCarbs.toFixed(1)}g | G: ${ref.totalFat.toFixed(1)}g
          <br><small>${new Date(ref.data).toLocaleDateString('pt-BR')}</small>
        </div>
      `;
      lista.appendChild(li);
    });
  }
}

// -----------------------------------------------------
// Perfil do Usuário
// -----------------------------------------------------
function carregarUsuario() {
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  const elementoNome = document.getElementById("usuarioNome");
  if (elementoNome) {
    elementoNome.textContent = usuario.nome;
  }
}

// -----------------------------------------------------
// Configurar botão de logout
// -----------------------------------------------------
function configurarLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function(e) {
      e.preventDefault();
      logout();
    });
  }
}

// -----------------------------------------------------
// Proteção de rotas - verificar se usuário está logado
// -----------------------------------------------------
function verificarAutenticacao() {
  const paginasProtegidas = ['usuario.html', 'cadastrorefeicao.html', 'refeicoespastadas.html'];
  const paginaAtual = window.location.pathname.split('/').pop();
  
  if (paginasProtegidas.includes(paginaAtual) && !obterUsuarioLogado()) {
    window.location.href = "index.html";
  }
}

// -----------------------------------------------------
// Inicialização
// -----------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  // Configurar formulários
  const cadastroForm = document.getElementById("cadastroForm");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", cadastrarUsuario);
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", login);
  }

  const refeicaoForm = document.getElementById("refeicaoForm");
  if (refeicaoForm) {
    refeicaoForm.addEventListener("submit", cadastrarRefeicao);
    preencherSelectAlimentos();
  }

  // Configurar botão de adicionar alimento
  const adicionarAlimentoBtn = document.getElementById("adicionarAlimentoBtn");
  if (adicionarAlimentoBtn) {
    adicionarAlimentoBtn.addEventListener("click", adicionarAlimento);
  }

  // Carregar dados específicos de cada página
  if (document.getElementById("listaRefeicoes")) {
    carregarRefeicoes();
  }

  if (document.getElementById("usuarioNome")) {
    carregarUsuario();
  }

  if (document.getElementById("tabelaRefeicoesBody")) {
    carregarRefeicoesPassadas();
  }

  configurarLogout();

  // Configurar data atual como padrão no campo de data
  const dataRefeicao = document.getElementById("dataRefeicao");
  if (dataRefeicao) {
    const hoje = new Date().toISOString().split('T')[0];
    dataRefeicao.value = hoje;
  }

  // Executar verificação de autenticação
  verificarAutenticacao();
});
