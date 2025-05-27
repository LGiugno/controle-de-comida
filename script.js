document.addEventListener("DOMContentLoaded", function () {
    // Funções de Apoio
    
    // Hash simples para senhas (apenas para demonstração)
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
        }
        return hash.toString();
    }

    // Sanitização básica para prevenir XSS
    function sanitizeHTML(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Validação de data no formato DD/MM/AAAA
    function isValidDate(dateString) {
        const regEx = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateString.match(regEx)) return false;
        const parts = dateString.split("/");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        
        if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;
        
        const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
            monthLength[1] = 29;
        }
        
        return day > 0 && day <= monthLength[month - 1];
    }

    // Validação de horário no formato HH:MM
    function isValidTime(timeString) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeString);
    }

    // Inicializa o localStorage se necessário
    function initializeStorage() {
        if (!localStorage.getItem("usuarios")) {
            localStorage.setItem("usuarios", JSON.stringify([]));
        }
    }

    // ======================
    // Login e Cadastro
    // ======================

    initializeStorage();

    const formLogin = document.getElementById("loginForm");
    const formCadastro = document.getElementById("signupForm");

    // Função de login
    if (formLogin) {
        formLogin.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!username || !password) {
                alert("Por favor, preencha todos os campos!");
                return;
            }

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuarios.find(u => u.username === username && u.password === simpleHash(password));

            if (usuario) {
                localStorage.setItem("usuarioLogado", username);
                window.location.href = "usuario.html";
            } else {
                alert("Usuário ou senha inválidos!");
            }
        });
    }

    // Função de cadastro
    if (formCadastro) {
        formCadastro.addEventListener("submit", function (event) {
            event.preventDefault();
            const nomeCompleto = document.getElementById("nomeCompleto").value.trim();
            const sobrenomeCompleto = document.getElementById("sobrenomeCompleto").value.trim();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirmPassword")?.value.trim();

            // Validações
            if (!nomeCompleto || !sobrenomeCompleto || !username || !password) {
                alert("Por favor, preencha todos os campos obrigatórios!");
                return;
            }

            if (confirmPassword && password !== confirmPassword) {
                alert("As senhas não coincidem!");
                return;
            }

            if (password.length < 6) {
                alert("A senha deve ter pelo menos 6 caracteres!");
                return;
            }

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            if (usuarios.find(u => u.username === username)) {
                alert("Nome de usuário já está em uso. Por favor, escolha outro.");
                return;
            }

            usuarios.push({ 
                nomeCompleto, 
                sobrenomeCompleto, 
                username, 
                password: simpleHash(password), 
                refeicoes: [] 
            });
            
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("Cadastro realizado com sucesso!");
            window.location.href = "index.html";
        });
    }

    // Logout
    if (document.getElementById("btnLogout")) {
        document.getElementById("btnLogout").addEventListener("click", function () {
            localStorage.removeItem("usuarioLogado");
            window.location.href = "index.html";
        });
    }

    // Exibir boas-vindas
    const boasVindas = document.getElementById("boasVindas");
    if (boasVindas) {
        const usuarioLogado = localStorage.getItem("usuarioLogado");
        if (usuarioLogado) {
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuarios.find(u => u.username === usuarioLogado);
            const nome = usuario?.nomeCompleto || usuarioLogado;
            boasVindas.innerHTML = `Seja bem-vindo, <strong>${sanitizeHTML(nome)}</strong>!`;
        } else {
            window.location.href = "index.html";
        }
    }

    // ======================
    // Gerenciamento de Refeições
    // ======================

    // Banco de dados local de fallback (nutrientes por 100g)
    const LOCAL_FOOD_DB = {
        'arroz cozido': { calories: 130, protein: 2.7, carbs: 28.1, fat: 0.3 },
        'arroz branco': { calories: 130, protein: 2.7, carbs: 28.1, fat: 0.3 },
        'arroz integral': { calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
        'peito de frango': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        'frango': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        'batata cozida': { calories: 86, protein: 1.7, carbs: 20, fat: 0.1 },
        'batata': { calories: 86, protein: 1.7, carbs: 20, fat: 0.1 },
        'ovo cozido': { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
        'ovo': { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
        'macarrão cozido': { calories: 131, protein: 5, carbs: 25, fat: 1 },
        'carne bovina': { calories: 250, protein: 26, carbs: 0, fat: 15 },
        'peixe': { calories: 150, protein: 26, carbs: 0, fat: 5 },
        'pão integral': { calories: 247, protein: 13, carbs: 41, fat: 3.4 },
        'queijo': { calories: 400, protein: 25, carbs: 1.3, fat: 33 },
        'leite': { calories: 42, protein: 3.4, carbs: 5, fat: 1 },
        'feijão cozido': { calories: 76, protein: 4.5, carbs: 13.6, fat: 0.5 }
    };

    // Função melhorada para converter quantidades para gramas
    function getQuantityFactor(quantidade) {
        const numMatch = quantidade.match(/\d+/);
        if (!numMatch) return 100; // Assume 100g por padrão se não conseguir extrair número
        
        const num = parseFloat(numMatch[0]);
        
        // Converte para gramas
        if (quantidade.includes('kg')) return num * 1000; // 1kg = 1000g
        if (quantidade.includes('oz')) return num * 28.35; // 1oz = 28.35g
        if (quantidade.includes('ml')) return num; // Assumindo 1ml = 1g para líquidos
        if (quantidade.includes('copo') || quantidade.includes('xícara')) return num * 240; // 1 copo/xícara ≈ 240g
        if (quantidade.includes('colher')) return num * 15; // 1 colher de sopa ≈ 15g
        if (quantidade.includes('fatia')) return num * 30; // 1 fatia ≈ 30g
        
        return num; // Assume que já está em gramas
    }

    async function analisarNutricao(ingredientes) {
        const APP_ID = "d5a0b94f";
        const API_KEY = "ff182d965b44546496e5279b87bb1b84";
        
        if (!APP_ID || !API_KEY) {
            console.error("Credenciais da API não configuradas");
            return analisarNutricaoLocal(ingredientes);
        }

        const linhas = ingredientes.split('\n').filter(l => l.trim() !== '');
        let useLocalDB = false;

        try {
            // Primeiro testamos a API com um request simples
            const testResponse = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-app-id": APP_ID,
                    "x-app-key": API_KEY
                },
                body: JSON.stringify({ query: "100g de arroz" })
            });

            if (!testResponse.ok) {
                console.warn("API Nutritionix não disponível, usando banco de dados local");
                return analisarNutricaoLocal(ingredientes);
            }

            // Se a API está funcionando, processamos os ingredientes
            let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0;
            let foodsProcessed = 0;

            for (let linha of linhas) {
                try {
                    // Extrai quantidade e alimento
                    const match = linha.match(/(\d+\s?(g|kg|ml|oz|copo|xícara|colher|fatia)?)\s?(de\s)?(.+)/i);
                    if (!match) continue;
                    
                    const quantidade = match[1] || '100g';
                    const alimento = match[4].trim().toLowerCase();
                    
                    // Converte a quantidade para gramas
                    const gramas = getQuantityFactor(quantidade);
                    
                    // Calcula o fator de proporção (baseado em 100g)
                    const factor = gramas / 100;
                    
                    // Verifica no banco local primeiro
                    const localFood = Object.keys(LOCAL_FOOD_DB).find(key => alimento.includes(key));
                    if (localFood) {
                        const nutrientes = LOCAL_FOOD_DB[localFood];
                        
                        totalCalories += Math.round(nutrientes.calories * factor);
                        totalProtein += parseFloat((nutrientes.protein * factor).toFixed(1));
                        totalCarbs += parseFloat((nutrientes.carbs * factor).toFixed(1));
                        totalFat += parseFloat((nutrientes.fat * factor).toFixed(1));
                        foodsProcessed++;
                        continue;
                    }

                    // Se não encontrou local, tenta a API
                    const response = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-app-id": APP_ID,
                            "x-app-key": API_KEY
                        },
                        body: JSON.stringify({ query: linha })
                    });

                    if (!response.ok) {
                        console.warn(`Erro na API para: ${linha}`, response.status);
                        continue;
                    }

                    const data = await response.json();
                    if (data?.foods?.length > 0) {
                        const food = data.foods[0];
                        totalCalories += food.nf_calories || 0;
                        totalProtein += food.nf_protein || 0;
                        totalCarbs += food.nf_total_carbohydrate || 0;
                        totalFat += food.nf_total_fat || 0;
                        foodsProcessed++;
                    }
                } catch (error) {
                    console.error(`Erro processando: ${linha}`, error);
                }
            }

            if (foodsProcessed === 0) {
                return analisarNutricaoLocal(ingredientes);
            }

            return {
                calories: Math.round(totalCalories),
                protein: parseFloat(totalProtein.toFixed(1)),
                carbs: parseFloat(totalCarbs.toFixed(1)),
                fat: parseFloat(totalFat.toFixed(1))
            };

        } catch (error) {
            console.error("Erro geral na API, usando banco local", error);
            return analisarNutricaoLocal(ingredientes);
        }
    }

    // Função de fallback para banco de dados local
    function analisarNutricaoLocal(ingredientes) {
        const linhas = ingredientes.split('\n').filter(l => l.trim() !== '');
        let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0;
        let foodsProcessed = 0;

        linhas.forEach(linha => {
            const match = linha.match(/(\d+\s?(g|kg|ml|oz|copo|xícara|colher|fatia)?)\s?(de\s)?(.+)/i);
            if (!match) return;
            
            const quantidade = match[1] || '100g';
            const alimento = match[4].trim().toLowerCase();
            
            // Converte a quantidade para gramas
            const gramas = getQuantityFactor(quantidade);
            
            // Calcula o fator de proporção (baseado em 100g)
            const factor = gramas / 100;
            
            const foodKey = Object.keys(LOCAL_FOOD_DB).find(key => alimento.includes(key));
            if (foodKey) {
                const nutrientes = LOCAL_FOOD_DB[foodKey];
                
                totalCalories += Math.round(nutrientes.calories * factor);
                totalProtein += parseFloat((nutrientes.protein * factor).toFixed(1));
                totalCarbs += parseFloat((nutrientes.carbs * factor).toFixed(1));
                totalFat += parseFloat((nutrientes.fat * factor).toFixed(1));
                foodsProcessed++;
            }
        });

        return foodsProcessed > 0 ? {
            calories: totalCalories,
            protein: totalProtein,
            carbs: totalCarbs,
            fat: totalFat
        } : null;
    }

    // Exibir refeições do usuário logado
    if (document.getElementById("listaRefeicoes")) {
        exibirRefeicoes();
    }

    function exibirRefeicoes() {
        const lista = document.getElementById("listaRefeicoes");
        lista.innerHTML = ''; // Limpa a lista antes de recarregar
        
        const username = localStorage.getItem("usuarioLogado");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuario = usuarios.find(u => u.username === username);

        if (usuario && usuario.refeicoes.length > 0) {
            // Ordena refeições por data (mais recente primeiro)
            const refeicoesOrdenadas = usuario.refeicoes.sort((a, b) => {
                const dateA = new Date(a.data.split('/').reverse().join('/'));
                const dateB = new Date(b.data.split('/').reverse().join('/'));
                return dateB - dateA;
            });

            refeicoesOrdenadas.forEach((ref, index) => {
                const li = document.createElement("li");
                li.classList.add("refeicao-item");
                li.innerHTML = `
                    <div class="refeicao-header">
                        <strong>${sanitizeHTML(ref.tipo)}</strong>
                        <span class="refeicao-data">${sanitizeHTML(ref.data)} às ${sanitizeHTML(ref.horario)}</span>
                    </div>
                    <div class="refeicao-descricao">${sanitizeHTML(ref.descricao)}</div>
                    <div class="refeicao-ingredientes">
                        <em>Ingredientes:</em> ${ref.ingredientes && ref.ingredientes.length > 0 ? 
                            sanitizeHTML(ref.ingredientes.join(", ")) : "Nenhum"}
                    </div>
                    ${ref.nutricao ? `
                    <div class="refeicao-nutricao">
                        <strong>Informação Nutricional:</strong>
                        <ul>
                            <li>Calorias: ${sanitizeHTML(ref.nutricao.calorias)} kcal</li>
                            <li>Proteínas: ${sanitizeHTML(ref.nutricao.proteinas)}g</li>
                            <li>Carboidratos: ${sanitizeHTML(ref.nutricao.carboidratos)}g</li>
                            <li>Gorduras: ${sanitizeHTML(ref.nutricao.gorduras)}g</li>
                        </ul>
                    </div>
                    ` : ''}
                    <button class="btn-excluir" data-index="${index}">Excluir</button>
                `;
                lista.appendChild(li);
            });

            // Adiciona event listeners para os botões de excluir
            document.querySelectorAll(".btn-excluir").forEach(btn => {
                btn.addEventListener("click", function() {
                    const index = parseInt(this.getAttribute("data-index"));
                    excluirRefeicao(index);
                });
            });
        } else {
            lista.innerHTML = "<li class='empty'>Nenhuma refeição registrada.</li>";
        }
    }

    function excluirRefeicao(index) {
        if (!confirm("Tem certeza que deseja excluir esta refeição?")) return;
        
        const username = localStorage.getItem("usuarioLogado");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const userIndex = usuarios.findIndex(u => u.username === username);

        if (userIndex !== -1) {
            usuarios[userIndex].refeicoes.splice(index, 1);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            exibirRefeicoes(); // Atualiza a lista
            alert("Refeição excluída com sucesso!");
        }
    }

    // ======================
    // Cadastro de Refeição
    // ======================

    if (document.querySelector("#formRefeicao")) {
        // Mostrar/ocultar campo "Outro" para tipo de refeição
        document.getElementById("tipoRefeicao").addEventListener("change", function () {
            const outroContainer = document.getElementById("outroRefeicaoContainer");
            outroContainer.style.display = this.value === "Outro" ? "block" : "none";
        });

        // Análise nutricional ao sair do campo de ingredientes
        document.getElementById("ingredientes").addEventListener("blur", async function () {
            const ingredientes = this.value.trim();
            if (ingredientes) {
                try {
                    document.getElementById("nutricaoLoading").style.display = "block";
                    const nutricao = await analisarNutricao(ingredientes);
                    
                    if (nutricao) {
                        document.getElementById("nutricaoInfo").style.display = "block";
                        document.getElementById("nutricaoDetalhes").innerHTML = `
                            <p><strong>Calorias:</strong> ${nutricao.calories} kcal</p>
                            <p><strong>Macronutrientes:</strong></p>
                            <ul>
                                <li>Proteína: ${nutricao.protein}g</li>
                                <li>Carboidratos: ${nutricao.carbs}g</li>
                                <li>Gorduras: ${nutricao.fat}g</li>
                            </ul>
                        `;
                    }
                } catch (error) {
                    console.error("Erro na análise nutricional:", error);
                    alert("Não foi possível obter informações nutricionais. Verifique os ingredientes.");
                } finally {
                    document.getElementById("nutricaoLoading").style.display = "none";
                }
            }
        });

        // Submissão do formulário de refeição
        document.querySelector("#formRefeicao").addEventListener("submit", async function (event) {
            event.preventDefault();

            const tipoSelecionado = document.getElementById("tipoRefeicao").value;
            const data = document.getElementById("data").value.trim();
            const horario = document.getElementById("hora").value.trim();
            const descricao = document.getElementById("descricao").value.trim();
            const ingredientes = document.getElementById("ingredientes").value.trim();

            // Validações
            if (tipoSelecionado === "Outro" && document.getElementById("outroRefeicao").value.trim() === "") {
                alert("Por favor, descreva o tipo de refeição");
                return;
            }

            if (!isValidDate(data)) {
                alert("Formato de data inválido. Use DD/MM/AAAA");
                return;
            }

            if (!isValidTime(horario)) {
                alert("Formato de horário inválido. Use HH:MM");
                return;
            }

            if (!descricao) {
                alert("Por favor, adicione uma descrição para a refeição");
                return;
            }

            const tipo = tipoSelecionado === "Outro" ? document.getElementById("outroRefeicao").value.trim() : tipoSelecionado;

            let nutricao = null;
            if (ingredientes !== "") {
                try {
                    document.getElementById("submitLoading").style.display = "inline-block";
                    nutricao = await analisarNutricao(ingredientes);
                } catch (error) {
                    const usarSemNutricao = confirm("Não foi possível obter informações nutricionais completas. Deseja salvar mesmo assim?");
                    if (!usarSemNutricao) {
                        document.getElementById("submitLoading").style.display = "none";
                        return;
                    }
                }
            }

            const username = localStorage.getItem("usuarioLogado");
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const userIndex = usuarios.findIndex(u => u.username === username);

            if (userIndex !== -1) {
                usuarios[userIndex].refeicoes.push({
                    tipo,
                    data,
                    horario,
                    descricao,
                    ingredientes: ingredientes !== "" ? ingredientes.split('\n') : [],
                    nutricao: nutricao ? {
                        calorias: nutricao.calories,
                        proteinas: nutricao.protein,
                        carboidratos: nutricao.carbs,
                        gorduras: nutricao.fat
                    } : null
                });
                
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                alert("Refeição cadastrada com sucesso!");
                window.location.href = "usuario.html";
            } else {
                alert("Erro ao salvar refeição. Usuário não encontrado.");
                window.location.href = "index.html";
            }
        });
    }

    // ======================
    // Filtro de Refeições
    // ======================

    function filtrarRefeicoes() {
        const dataFiltro = document.getElementById("dataFiltro").value;
        if (!dataFiltro) {
            exibirRefeicoes();
            return;
        }

        const username = localStorage.getItem("usuarioLogado");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuario = usuarios.find(u => u.username === username);

        if (!usuario) return;

        const lista = document.getElementById("listaRefeicoes");
        lista.innerHTML = '';

        const refeicoesFiltradas = usuario.refeicoes.filter(ref => {
            return ref.data === dataFiltro;
        });

        if (refeicoesFiltradas.length > 0) {
            refeicoesFiltradas.forEach((ref, index) => {
                const li = document.createElement("li");
                li.classList.add("refeicao-item");
                li.innerHTML = `
                    <div class="refeicao-header">
                        <strong>${sanitizeHTML(ref.tipo)}</strong>
                        <span class="refeicao-data">${sanitizeHTML(ref.data)} às ${sanitizeHTML(ref.horario)}</span>
                    </div>
                    <div class="refeicao-descricao">${sanitizeHTML(ref.descricao)}</div>
                    <div class="refeicao-ingredientes">
                        <em>Ingredientes:</em> ${ref.ingredientes && ref.ingredientes.length > 0 ? 
                            sanitizeHTML(ref.ingredientes.join(", ")) : "Nenhum"}
                    </div>
                    ${ref.nutricao ? `
                    <div class="refeicao-nutricao">
                        <strong>Informação Nutricional:</strong>
                        <ul>
                            <li>Calorias: ${sanitizeHTML(ref.nutricao.calorias)} kcal</li>
                            <li>Proteínas: ${sanitizeHTML(ref.nutricao.proteinas)}g</li>
                            <li>Carboidratos: ${sanitizeHTML(ref.nutricao.carboidratos)}g</li>
                            <li>Gorduras: ${sanitizeHTML(ref.nutricao.gorduras)}g</li>
                        </ul>
                    </div>
                    ` : ''}
                    <button class="btn-excluir" data-index="${index}">Excluir</button>
                `;
                lista.appendChild(li);
            });
        } else {
            lista.innerHTML = "<li class='empty'>Nenhuma refeição encontrada para esta data.</li>";
        }
    }

    function limparFiltro() {
        document.getElementById("dataFiltro").value = '';
        exibirRefeicoes();
    }
});
