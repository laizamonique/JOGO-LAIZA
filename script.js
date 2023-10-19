// script.js

// Variáveis para armazenar informações do jogador
let playerName = "";
let playerHealth = 100;

// Variáveis para informações da personagem Makima (NPC)
let makimaHealth = 100;

// Função para iniciar o jogo
function startGame() {
    // Obter o nome do jogador do campo de entrada
    playerName = document.getElementById("playerName").value;

    // Esconder a tela inicial e exibir a tela de jogo
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    // Atualizar informações na tela de jogo
    document.getElementById("playerNameDisplay").textContent = `Jogador: ${playerName}`;
    document.getElementById("playerHealthDisplay").textContent = `Vida: ${playerHealth}`;
    document.getElementById("makimaHealthDisplay").textContent = `Vida da Makima: ${makimaHealth}`;
}

// Função para o jogador atacar
function playerAttack() {
    // Simples exemplo de ataque - você pode expandir isso
    const damage = Math.floor(Math.random() * 10) + 1;
    makimaHealth -= damage;

    // Atualizar informações na tela
    document.getElementById("makimaHealthDisplay").textContent = `Vida da Makima: ${makimaHealth}`;

    // Verificar se a Makima foi derrotada
    if (makimaHealth <= 0) {
        endGame(true);
    }
}

// Função para encerrar o jogo
function endGame(isVictory) {
    // Esconder a tela de jogo
    document.getElementById("gameScreen").style.display = "none";

    // Exibir a tela de fim de jogo com base na vitória ou derrota
    if (isVictory) {
        document.getElementById("victoryScreen").style.display = "block";
    } else {
        document.getElementById("defeatScreen").style.display = "block";
    }
}

// Inicialização do jogo
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("attackButton").addEventListener("click", playerAttack);
