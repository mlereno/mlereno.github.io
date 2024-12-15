const tamanhoTabuleiro = 400;
let numQuadrados;
let maxPecas;
let pecasJogador = 0;
let pecasComputador = 0;
let tabuleiroEstado = [];
let turnoDoJogador = true; // Variável para controlar o turno
let pecaSelecionada = null; // Armazena a peça selecionada para movimentação

const moinhos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas verticais
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

const adjacencias = {
    0: [1, 3], 1: [0, 2, 4], 2: [1, 5],
    3: [0, 4, 6], 4: [1, 3, 5, 7], 5: [2, 4, 8],
    6: [3, 7], 7: [4, 6, 8], 8: [5, 7],
};

function iniciarJogo() {
    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = ''; // Limpa o tabuleiro anterior
    numQuadrados = parseInt(document.getElementById("numQuadrados").value);
    maxPecas = numQuadrados * 3; // Define o número máximo de peças
    pecasJogador = 0;
    pecasComputador = 0;
    tabuleiroEstado = Array(9).fill(null); // Reseta o estado do tabuleiro

    desenharQuadrados('gameCanvas');
    adicionarCasas(tabuleiro);
    turnoDoJogador = true; // Jogador começa
    document.getElementById("mensagem").innerText = "Jogo iniciado! Sua vez.";
}

const conexoes = {
    1: [2, 8],
    2: [1, 3, 9],
    3: [2, 4, 10],
    4: [3, 5, 11],
    5: [4, 6, 12],
    6: [5, 7, 13],
    7: [6, 14],
    8: [1, 9, 15],
    9: [2, 8, 10, 16],
    10: [3, 9, 11, 17],
    11: [4, 10, 12, 18],
    12: [5, 11, 13, 19],
    13: [6, 12, 14, 20],
    14: [7, 13, 21],
    15: [8, 16],
    16: [9, 15, 17],
    17: [10, 16, 18],
    18: [11, 17, 19],
    19: [12, 18, 20],
    20: [13, 19, 21],
    21: [14, 20],
};

// Função para desenhar o tabuleiro
function desenharTabuleiro(tabuleiro) {
    tabuleiro.innerHTML = ''; // Limpa o tabuleiro antes de desenhar
    const totalCasas = 24;  // Número de casas no tabuleiro
    for (let i = 1; i <= totalCasas; i++) {
        const casa = document.createElement("div");
        casa.classList.add("casa");
        casa.dataset.index = i;
        casa.innerHTML = ''; // Pode ser preenchido com o símbolo do jogador ou computador
        casa.addEventListener("click", () => jogar(i)); // Interação de clique
        tabuleiro.appendChild(casa);
    }
}


function adicionarCasas(tabuleiro) {
    const pontos = calcularPosicoesCasas();

    pontos.forEach((pos, index) => {
        const casa = document.createElement("div");
        casa.classList.add("casa");
        casa.style.left = `${pos.x}px`;
        casa.style.top = `${pos.y}px`;
        casa.dataset.index = index;
        casa.addEventListener("click", () => {
            if (turnoDoJogador) {
                jogar(index);
            } else {
                document.getElementById("mensagem").innerText = "Aguarde sua vez!";
            }
        });
        tabuleiro.appendChild(casa);
    });
}

function calcularPosicoesCasas() {
    const tamanho = tamanhoTabuleiro / 3;
    const pontos = [];
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            pontos.push({ x: x * tamanho, y: y * tamanho });
        }
    }
    return pontos;
}

function jogar(index) {
    if (tabuleiroEstado[index] !== null || pecasJogador >= maxPecas) return;

    colocarPeca(index, "jogador");
    tabuleiroEstado[index] = "jogador";
    pecasJogador++;
    turnoDoJogador = false;

    if (verificarMoinho("jogador")) {
        document.getElementById("mensagem").innerText = "Você formou um moinho!";
    } else if (!verificarFimDeJogo()) {
        setTimeout(() => jogadaComputador(), 500);
    }
}

function colocarPeca(index, jogador) {
    const casa = document.querySelector(`.casa[data-index='${index}']`);
    const peca = document.createElement("div");
    peca.classList.add('peca', jogador);
    casa.appendChild(peca);
}

function jogadaComputador() {
    const casasLivres = tabuleiroEstado.map((v, idx) => v === null ? idx : null).filter(idx => idx !== null);
    if (casasLivres.length === 0 || pecasComputador >= maxPecas) {
        document.getElementById("mensagem").innerText = "Empate ou peças esgotadas!";
        return;
    }

    const jogadaIndex = casasLivres[Math.floor(Math.random() * casasLivres.length)];
    colocarPeca(jogadaIndex, "computador");
    tabuleiroEstado[jogadaIndex] = "computador";
    pecasComputador++;

    if (verificarMoinho("computador")) {
        document.getElementById("mensagem").innerText = "O computador formou um moinho!";
    }

    turnoDoJogador = true;
    document.getElementById("mensagem").innerText = "Sua vez!";
}

function selecionarCasa(index) {
    const casa = document.querySelector(`.casa[data-index="${index}"]`);
    if (casa) casa.classList.add('selecionada');
}

function mostrarCasasDisponiveis(indices) {
    indices.forEach(index => {
        const casa = document.querySelector(`.casa[data-index="${index}"]`);
        if (casa) casa.classList.add('disponivel');
    });
}


function casasSaoAdjacentes(index1, index2) {
    return adjacencias[index1]?.includes(index2);
}

function verificarMoinho(jogador) {
    return moinhos.some(([a, b, c]) => (
        tabuleiroEstado[a] === jogador && 
        tabuleiroEstado[b] === jogador && 
        tabuleiroEstado[c] === jogador
    ));
}

function verificarFimDeJogo() {
    const pecasJogador = tabuleiroEstado.filter(p => p === 'jogador').length;
    const pecasComputador = tabuleiroEstado.filter(p => p === 'computador').length;

    if (pecasJogador < 3) {
        document.getElementById("mensagem").innerText = "O computador venceu!";
        return true;
    } else if (pecasComputador < 3) {
        document.getElementById("mensagem").innerText = "Você venceu!";
        return true;
    }

    return false;
}

async function registrarUsuario(nick, password) {
    try {
       localStorage.setItem('userData', JSON.stringify(data));
        if (!response.ok) throw new Error('Erro no registro');
        document.getElementById("mensagem").innerText = "Registrado com sucesso!";
    } catch (error) {
        document.getElementById("mensagem").innerText = `Erro: ${error.message}`;
    }
}

async function obterRanking() {
    try {
        const response = await fetch('http://localhost:3000/ranking');
        const ranking = await response.json();
        console.log(ranking);
        // Adicione a lógica para exibir o ranking no DOM
    } catch (error) {
        console.error("Erro ao obter ranking:", error);
    }
}

function desenharQuadrados(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas with ID "${canvasId}" not found.`);
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Failed to get canvas context.');
        return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Canvas size and board parameters
    const width = canvas.width;
    const height = canvas.height;
    const padding = 50; // Padding around the outermost square
    const lineColor = '#000'; // Black lines
    const lineWidth = 2; // Line thickness

    // Define the center of the canvas
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw nested squares
    for (let i = 0; i < 3; i++) {
        const size = (width - 2 * padding) / 3 * (3 - i);
        ctx.beginPath();
        ctx.rect(centerX - size / 2, centerY - size / 2, size, size);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        ctx.stroke();
    }

    // Draw connecting lines
    const squareSize = (width - 2 * padding) / 3;
    const points = [
        { x: centerX - squareSize / 2, y: centerY - squareSize / 2 }, // Top-left
        { x: centerX + squareSize / 2, y: centerY - squareSize / 2 }, // Top-right
        { x: centerX - squareSize / 2, y: centerY + squareSize / 2 }, // Bottom-left
        { x: centerX + squareSize / 2, y: centerY + squareSize / 2 }  // Bottom-right
    ];

    points.forEach(point => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
    });

    // Draw valid positions for pieces (circles at intersections)
    const positions = [
        // Outer square
        { x: centerX - squareSize, y: centerY - squareSize },
        { x: centerX, y: centerY - squareSize },
        { x: centerX + squareSize, y: centerY - squareSize },
        { x: centerX - squareSize, y: centerY },
        { x: centerX + squareSize, y: centerY },
        { x: centerX - squareSize, y: centerY + squareSize },
        { x: centerX, y: centerY + squareSize },
        { x: centerX + squareSize, y: centerY + squareSize },
        // Middle square
        { x: centerX - squareSize / 2, y: centerY - squareSize / 2 },
        { x: centerX, y: centerY - squareSize / 2 },
        { x: centerX + squareSize / 2, y: centerY - squareSize / 2 },
        { x: centerX - squareSize / 2, y: centerY },
        { x: centerX + squareSize / 2, y: centerY },
        { x: centerX - squareSize / 2, y: centerY + squareSize / 2 },
        { x: centerX, y: centerY + squareSize / 2 },
        { x: centerX + squareSize / 2, y: centerY + squareSize / 2 },
        // Inner square
        { x: centerX - squareSize / 4, y: centerY - squareSize / 4 },
        { x: centerX, y: centerY - squareSize / 4 },
        { x: centerX + squareSize / 4, y: centerY - squareSize / 4 },
        { x: centerX - squareSize / 4, y: centerY },
        { x: centerX + squareSize / 4, y: centerY },
        { x: centerX - squareSize / 4, y: centerY + squareSize / 4 },
        { x: centerX, y: centerY + squareSize / 4 },
        { x: centerX + squareSize / 4, y: centerY + squareSize / 4 }
    ];

    positions.forEach(pos => {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
    });
}

