// Importe a biblioteca CreateJS (EaselJS) para animações
const stage = new createjs.Stage("gameCanvas");

// Variáveis para armazenar informações do jogador e Makima (NPC)
let playerName = "";
let playerHealth = 100;
let makimaHealth = 100;
let gameStarted = false;
let gameEnded = false;

// Inicialize os sprites para animações
const playerSprite = new createjs.Sprite(/* Configuração do sprite do jogador */);
const makimaSprite = new createjs.Sprite(/* Configuração do sprite da Makima */);

// Variável para controlar o intervalo de ataque da Makima
let makimaAttackInterval;

// Probabilidade de ataque da Makima (por exemplo, 30%)
const makimaAttackProbability = 0.3;

// Carregue as animações para os sprites do jogador e da Makima
const playerData = {
    images: ["player_spritesheet.png"],
    frames: { width: 64, height: 64, count: 10 },
    animations: {
        attack: [0, 9],
    },
};

const makimaData = {
    images: ["makima_spritesheet.png"],
    frames: { width: 64, height: 64, count: 10 },
    animations: {
        attack: [0, 9],
    },
};

// Crie os sprites do jogador e da Makima com base nas configurações
playerSprite = new createjs.Sprite(new createjs.SpriteSheet(playerData));
makimaSprite = new createjs.Sprite(new createjs.SpriteSheet(makimaData));

// Função para iniciar o jogo (incluindo animações)
function startGame() {
    playerName = document.getElementById("playerName").value;
    gameStarted = true;

    // Configure e adicione os sprites ao palco
    playerSprite.gotoAndStop("attack");
    playerSprite.x = 100;
    playerSprite.y = 300;
    stage.addChild(playerSprite);

    makimaSprite.gotoAndStop("attack");
    makimaSprite.x = 300;
    makimaSprite.y = 300;
    stage.addChild(makimaSprite);

    // Inicie o intervalo de ataque da Makima
    makimaAttackInterval = setInterval(tryMakimaAttack, 2000); // Ataque a cada 2 segundos

    // Simule um tempo de carregamento
    setTimeout(function () {
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("loadingScreen").style.display = "none";
        document.getElementById("gameScreen").style.display = "block";

        // Inicie a animação do jogador
        createjs.Ticker.addEventListener("tick", stage);
    }, 2000); // Tempo de carregamento de 2 segundos
}

// Função para o jogador atacar (incluindo animação)
function playerAttack() {
    if (!gameEnded) {
        // Lógica de ataque do jogador
        const damage = Math.floor(Math.random() * 10) + 1;
        makimaHealth -= damage;
        updateHealthDisplays();

        // Inicie a animação de ataque do jogador
        playerSprite.gotoAndPlay("attack");

        // Verifique se a Makima foi derrotada
        if (makimaHealth <= 0) {
            endGame(true);
        }
    }
}

// Função para a Makima atacar (incluindo animação)
function makimaAttack() {
    if (!gameEnded) {
        // Lógica de ataque da Makima
        const damage = Math.floor(Math.random() * 10) + 1;
        playerHealth -= damage;
        updateHealthDisplays();

        // Inicie a animação de ataque da Makima
        makimaSprite.gotoAndPlay("attack");

        // Verifique se o jogador foi derrotado
        if (playerHealth <= 0) {
            endGame(false);
        }
    }
}

// Função para tentar o ataque da Makima com base na probabilidade
function tryMakimaAttack() {
    if (!gameEnded) {
        const randomValue = Math.random(); // Gere um valor aleatório entre 0 e 1
        if (randomValue < makimaAttackProbability) {
            makimaAttack(); // Realize o ataque da Makima
        }
    }
}

// Função para atualizar as informações de saúde na tela
function updateHealthDisplays() {
    document.getElementById("playerHealthDisplay").textContent = `Vida: ${playerHealth}`;
    document.getElementById("makimaHealthDisplay").textContent = `Vida da Makima: ${makimaHealth}`;
}

// Função para encerrar o jogo
function endGame(isVictory) {
    gameEnded = true;
    clearInterval(makimaAttackInterval); // Pare o intervalo de ataque da Makima
    createjs.Ticker.removeEventListener("tick", stage);

    // Exiba a tela de vitória ou derrota com base no resultado
    if (isVictory) {
        document.getElementById("victoryScreen").style.display = "block";
    } else {
        document.getElementById("defeatScreen").style.display = "block";
    }
}

// Inicialização do jogo
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("attackButton").addEventListener("click", playerAttack);
