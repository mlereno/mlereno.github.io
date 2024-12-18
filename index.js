// Ensure the game starts correctly and integrates with the graphical layout
document.addEventListener("DOMContentLoaded", () => {
    // Button to start the game
    const btnIniciar = document.getElementById("btnIniciar");

    // Function to initialize the game
    function iniciarJogo() {
        console.log("Jogo iniciado!");

        // Ensure canvas is initialized and clear
        const canvas = document.getElementById("gameCanvas");
        if (canvas) {
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        }

        // Call the game board drawing function from script.js
        desenharQuadrados(tabuleiro);

        // Set up canvas click event listener for placing pieces
        canvas.addEventListener("click", handleCanvasClick);
    }

    // Function to toggle the visibility of the rules section
function toggleContent(contentId) {
    const content = document.getElementById(contentId);
    if (content) {
        if (content.style.display === "none" || content.style.display === "") {
            content.style.display = "block";
        } else {
            content.style.display = "none";
        }
    } else {
        console.error(`Element with ID '${contentId}' not found.`);
    }
}


    // Attach the "iniciarJogo" function to the button click
    if (btnIniciar) {
        btnIniciar.addEventListener("click", iniciarJogo);
    } else {
        console.error("Button with ID 'btnIniciar' not found.");
    }
});
