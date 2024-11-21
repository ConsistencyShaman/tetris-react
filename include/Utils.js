import shapes from './Data'
import colours from './Data'

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

// Check Lines
export function CheckAndClearLines(row) {
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

        const scoreElement = document.getElementById('score');
        scoreElement.textContent = `Score: ${score}`;
    }

    // Clear lines and update score
    let linesCleared = 0;
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
update() {
    // Handle piece movement, collision, stack
    if (!this.currentPiece.moveDown()) {
        this.currentPiece.merge();
        this.clearLines(); // Check for completed lines, clear if true
        this.spawnPiece(); // Spawn new piece after one lands

        console.log('Updated')

        // Check if new piece can move
        if (!this.currentPiece.canMove(0, 1)) {
            document.getElementById('game-over').style.visibility = 'visible'
            clearInterval(this.gameInterval);
            console.log('Cleared?')
            return;
        }
    }
}
// Empty the matrix
emptyMatrix() {
    for (let x = 0; x < this.grid.rows; x++) {
        for (let y = 0; y < this.grid.columns; y++) {
            this.gridMatrix[x][y] = 0;
        }
    }
    console.log('Matrix Cleared');
}
// Empty the score
emptyScore() {
    this.score = 0

    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${this.score}`;
}