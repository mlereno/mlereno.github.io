// Define the game board and state
let tabuleiro = {
    squares: [
        { level: 1, size: 400 }, // Outermost square
        { level: 2, size: 280 }, // Middle square
        { level: 3, size: 160 }  // Innermost square
    ],
    positions: [
        // Outer square positions
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

    // Board settings
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw squares
    tabuleiro.squares.forEach(square => {
        const size = square.size;
        ctx.beginPath();
        ctx.rect(centerX - size / 2, centerY - size / 2, size, size);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';
        ctx.stroke();
    });

    // Draw valid positions
    tabuleiro.positions.forEach(pos => {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
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
    desenharQuadrados(tabuleiro);
    const canvas = document.getElementById(tabuleiro.canvasId);
    canvas.addEventListener('click', handleCanvasClick);
}

// Start the game
window.onload = iniciarJogo;
