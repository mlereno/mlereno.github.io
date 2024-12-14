// Arquivo: utils.js

export function iniciarTabuleiro(numQuadrados) {
    const tabuleiro = document.getElementById('tabuleiro');
    if (!tabuleiro) {
        console.error('Elemento tabuleiro não encontrado');
        return;
    }

    // Limpa o tabuleiro antes de criar um novo
    tabuleiro.innerHTML = '';

    // Tamanho dinâmico do tabuleiro
    const tamanho = 400; // 400px de largura/altura
    const intervalo = tamanho / (2 * numQuadrados);

    // Desenha os quadrados concêntricos
    for (let i = 0; i < numQuadrados; i++) {
        const quadrado = document.createElement('div');
        quadrado.style.position = 'absolute';
        quadrado.style.border = '2px solid black';
        quadrado.style.width = `${tamanho - 2 * i * intervalo}px`;
        quadrado.style.height = `${tamanho - 2 * i * intervalo}px`;
        quadrado.style.top = `${i * intervalo}px`;
        quadrado.style.left = `${i * intervalo}px`;

        tabuleiro.appendChild(quadrado);
    }

    // Adiciona as casas
    for (let i = 0; i < numQuadrados * 8; i++) {
        const casa = document.createElement('div');
        casa.classList.add('casa');
        casa.dataset.index = i; // Atribui um índice único para cada casa

        // Define a posição das casas (cantos e lados)
        // Esta lógica precisará ser ajustada para alinhar com o design do tabuleiro
        casa.style.position = 'absolute';
        casa.style.width = '20px';
        casa.style.height = '20px';
        casa.style.border = '1px solid red';

        tabuleiro.appendChild(casa);
    }

    console.log(`Tabuleiro com ${numQuadrados} quadrados criado.`);
}
