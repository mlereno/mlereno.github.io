// Define the game board and state
let tabuleiro = {
    positions: [
        // Define square positions for the game
        { x: 100, y: 100 }, { x: 300, y: 100 }, { x: 500, y: 100 },
        { x: 100, y: 300 },                     { x: 500, y: 300 },
        { x: 100, y: 500 }, { x: 300, y: 500 }, { x: 500, y: 500 },
          // Middle square positions                                  
  { x: 170, y: 170 }, { x: 300, y: 170 }, { x: 430, y: 170 }, 
  { x: 170, y: 300 },                     { x: 430, y: 300 }, 
  { x: 170, y: 430 }, { x: 300, y: 430 }, { x: 430, y: 430 }, 
  // Inner square positions                                   
  { x: 230, y: 230 }, { x: 300, y: 230 }, { x: 370, y: 230 }, 
  { x: 230, y: 300 },                     { x: 370, y: 300 }, 
  { x: 230, y: 370 }, { x: 300, y: 370 }, { x: 370, y: 370 }, 
    ],
    pieces: [], // Tracks placed pieces
    currentPlayer: 'player1',
    canvasId: 'gameCanvas',
    selectedPiece: null // Piece selected for moving
};

// Initialize the canvas and draw the board
function desenharQuadrados(tabuleiro) {
    const canvas = document.getElementById(tabuleiro.canvasId);
    if (!canvas) {
        console.error(`Canvas with ID "${tabuleiro.canvasId}" not found.`);
        return;
    }
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw valid positions
    tabuleiro.positions.forEach(pos => {
        ctx.beginPath();
        ctx.rect(pos.x - 25, pos.y - 25, 50, 50); // Draw a square around each position
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';
        ctx.stroke();
    });

    // Draw pieces
    tabuleiro.pieces.forEach(piece => {
        ctx.beginPath();
        ctx.arc(piece.x, piece.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = piece.player === 'player1' ? 'red' : 'blue';
        ctx.fill();
    });
}

// Handle player clicks to place or move pieces
function handleCanvasClick(event) {
    const canvas = document.getElementById(tabuleiro.canvasId);
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Find the closest valid position
    let closestPos = null;
    let minDist = 20; // Maximum clickable distance
    tabuleiro.positions.forEach(pos => {
        const dist = Math.sqrt((pos.x - clickX) ** 2 + (pos.y - clickY) ** 2);
        if (dist < minDist) {
            closestPos = pos;
            minDist = dist;
        }
    });

    if (closestPos) {
        // Check if the position is already occupied
        const occupied = tabuleiro.pieces.some(p => p.x === closestPos.x && p.y === closestPos.y);
        if (!occupied) {
            // Place a piece
            tabuleiro.pieces.push({ x: closestPos.x, y: closestPos.y, player: tabuleiro.currentPlayer });
            togglePlayer();
            desenharQuadrados(tabuleiro);
        } else {
            console.log('Position is already occupied!');
        }
    }
}

// Switch the player turn
function togglePlayer() {
    tabuleiro.currentPlayer = tabuleiro.currentPlayer === 'player1' ? 'player2' : 'player1';
    console.log(`Current player: ${tabuleiro.currentPlayer}`);
}

// Initialize the game
function iniciarJogo() {
    console.log("Jogo iniciado!");
    desenharQuadrados(tabuleiro);
    const canvas = document.getElementById(tabuleiro.canvasId);
    canvas.addEventListener('click', handleCanvasClick);
}

window.onload = function () {
    // Attach event listener to the "Iniciar Jogo" button
    const btnIniciar = document.getElementById("btnIniciar");
    if (btnIniciar) {
        btnIniciar.addEventListener("click", iniciarJogo);
    } else {
        console.error("Button with ID 'btnIniciar' not found.");
    }
};

// Start the game
window.onload = iniciarJogo;
