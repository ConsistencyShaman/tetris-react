import { shapes } from './Data'
import { colours } from './Data'

// Shapes
export function RandomShape() {

    const keys = Object.keys(shapes);  // Gets the keys from shapes object
    const randomGrab = Math.floor(Math.random() * keys.length);   // Randomly grab one key
    const randomKey = keys[randomGrab]; // Extract the random key
    const shape = {
        key: randomKey,
        value: shapes[randomKey]
    };

    return shape.value;

}

// Color
export function RandomColour() {
    // Randomly grab one colour tone
    const randomTone = Math.floor(Math.random() * colours.length);
    const oneTone = colours[randomTone];

    const generateRandomColour = (colour) => {
        const keys = Object.keys(colour);
        const randomGrab = Math.floor(Math.random() * keys.length);
        const randomColour = colour[keys[randomGrab]];

        return randomColour;
    };

    return generateRandomColour(oneTone);
}

// Check Lines and Update Score
export function CheckAndClearLines({ score, scoreRef, gridMatrix }) {
    let linesCleared = 0;
    // Check if line full
    const isLineFull = (row) => {
        return gridMatrix[row].every(cell => cell !== 0);
    }
    // Clear a full line
    const clearLine = (row) => {
        // Remove the full line
        gridMatrix.splice(row, 1);
        // Add a new empty line at the top
        gridMatrix.unshift(new Array(this.grid.columns).fill(0));
    }
    // Update game score
    const updateScore = (linesCleared) => {
        const points = linesCleared * 100;
        score += points;

        const scoreElement = scoreRef//document.getElementById('score');
        scoreElement.textContent = `Score: ${score}`;
    }

    // Detect and clear full lines
    for (let row = this.grid.rows - 1; row >= 0; row--) {
        if (isLineFull(row)) {
            clearLine(row);
            linesCleared++;
            row++ // Recheck the current row after clearing
        }
    }
    // Update score
    if (linesCleared > 0) {
        updateScore(linesCleared);
    }

}

// Update game state
export function UpdateGameState({ currentPiece, gameOverElement, gameInterval }) {
    // Handle piece movement, collision, stack
    if (!currentPiece.moveDown()) {
        currentPiece.merge();
        clearLines(); // Check for completed lines, clear if true
        spawnPiece(); // Spawn new piece after one lands

        console.log('Updated')

        // Check if new piece can move
        if (!currentPiece.canMove(0, 1)) {
            gameOverElement.style.visibility = 'visible' // document.getElementById('game-over')
            clearInterval(gameInterval);
            console.log('Piece cant move, gameover')
            return;
        }
    }
}

// Reset Game State
export function ResetGameState({ grid, gridMatrix, score, scoreRef }) {
    // Empty the matrix
    for (let x = 0; x < grid.rows; x++) {
        for (let y = 0; y < grid.columns; y++) {
            gridMatrix[x][y] = 0;
        }
    }
    console.log('Matrix Cleared');

    // Empty the score
    score = 0
    const scoreElement = scoreRef // document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;

}

// Draw Stacked Pieces
export function DrawStackedPieces({ gridMatrix, context, grid }) {
    // Iterate over each row in the matrix
    gridMatrix.forEach((row, rowIndex) => {
        // Iterate over each column in the matrix
        row.forEach((color, colIndex) => {
            if (color) { // Check if the cell is not empty
                // Set the fill colour
                context.fillStyle = color;

                // Draw cell
                context.fillRect(
                    colIndex * grid.blockSize, // X
                    rowIndex * grid.blockSize, // Y
                    grid.blockSize,            // Width
                    grid.blockSize             // Height 
                );

                // Draw border of the cell
                context.strokeStyle = '#000';
                context.strokeRect(
                    colIndex * grid.blockSize,
                    rowIndex * grid.blockSize,
                    grid.blockSize,
                    grid.blockSize
                );
            }
        });
    });
}