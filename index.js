import { verificarLogin } from './auth.js';
import { atualizarRanking } from './ranking.js';
import { calcularAdjacencias, verificarMoinho } from './utils.js';

// Variáveis globais
const tamanhoTabuleiro = 400;
let numQuadrados;
let maxPecas;
let pecasJogador = 0;
let pecasComputador = 0;
let tabuleiroEstado = [];
let turnoDoJogador = true;

function iniciarJogo() {
    if (!verificarLogin()) {
        alert("Por favor, faça login antes de iniciar o jogo.");
        return;
    }

    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = ''; // Limpa o tabuleiro
    numQuadrados = 3; // Número padrão para o tabuleiro 3x3
    maxPecas = numQuadrados * 8;
    pecasJogador = 0;
    pecasComputador = 0;
    tabuleiroEstado = Array(24).fill(null); // Tabuleiro de 24 casas

    desenharTabuleiro(tabuleiro);
    document.getElementById("mensagem").innerText = "Jogo iniciado! Sua vez.";
}

function desenharTabuleiro(tabuleiro) {
    for (let i = 0; i < 24; i++) {
        const casa = document.createElement("div");
        casa.classList.add("casa");
        casa.dataset.index = i;
        casa.addEventListener("click", () => jogar(i));
        tabuleiro.appendChild(casa);
    }
}

function jogar(index) {
    if (!turnoDoJogador || tabuleiroEstado[index] !== null) return;

    tabuleiroEstado[index] = "jogador";
    pecasJogador++;
    atualizarTabuleiro();
    
    if (verificarMoinho(tabuleiroEstado, index, "jogador")) {
        document.getElementById("mensagem").innerText = "Você formou um moinho!";
    } else {
        turnoDoJogador = false;
        setTimeout(jogadaComputador, 500);
    }
}

function jogadaComputador() {
    const index = tabuleiroEstado.findIndex(c => c === null);
    if (index !== -1) {
        tabuleiroEstado[index] = "computador";
        pecasComputador++;
        atualizarTabuleiro();
    }
    turnoDoJogador = true;
    document.getElementById("mensagem").innerText = "Sua vez!";
}

function atualizarTabuleiro() {
    const casas = document.querySelectorAll('.casa');
    casas.forEach((casa, i) => {
        casa.innerHTML = '';
        if (tabuleiroEstado[i] === "jogador") {
            casa.classList.add('peca-jogador');
        } else if (tabuleiroEstado[i] === "computador") {
            casa.classList.add('peca-computador');
        }
    });
    if (pecasJogador >= 9 && pecasComputador >= 9) atualizarRanking("jogador");
}

document.getElementById("btnIniciar").addEventListener("click", iniciarJogo);
