import react from 'react'
import { RandomColour } from './Utils'
import { RandomShape } from './Utils'

export class Piece {
    constructor(shape, color, grid, context) {
        this.shape = shape;                 // 2D array, represents the shape
        this.color = color;                 // Random color
        this.grid = grid;                   // Size of the grid
        this.context = context;             // Canvas context to draw on 
        this.position = { x: Math.floor(grid.columns / 2) - 1, y: -1 };     // Starting position, top-center
        this.blockSize = grid.blockSize;    // Block size in pixels
        // Matrix 2D Array
        this.gridMatrix = gridMatrix;
    }

    // Method to draw the piece
    draw() {
        this.context.fillStyle = this.color;

        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[row].length; col++) {
                if (this.shape[row][col]) { // If cell is 1, draw a block
                    this.context.fillRect(
                        (this.position.x + col) * this.blockSize,
                        (this.position.y + row) * this.blockSize,
                        this.blockSize,
                        this.blockSize
                    );
                    // Add a border for better visibility and style
                    this.context.strokeStyle = '#000';
                    this.context.strokeRect(
                        (this.position.x + col) * this.blockSize,
                        (this.position.y + row) * this.blockSize,
                        this.blockSize,
                        this.blockSize
                    );
                }
            }
        }
    }

    // Draw preview
    drawPreview(ctx, canvasSize) {
        const scale = canvasSize / (this.shape[0].length * this.grid.blocksize);
        ctx.scale(scale, scale);
        ctx.fillStyle = this.color;

        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    ctx.fillRect(
                        x * this.grid.blockSize,
                        y * this.grid.blockSize,
                        this.grid.blockSize,
                        this.grid.blockSize
                    )
                }
            });
        });
        
        ctx.scale(1 / scale, 1 / scale); // Reset scale
    }

    // Check movement
    canMove(dx, dy) {
        return this.shape.every((row, rowIndex) =>
            row.every((value, colIndex) => {
                if (value) {
                    const newX = this.position.x + colIndex + dx;
                    const newY = this.position.y + rowIndex + dy;

                    // Check grid boundaries
                    if (newX < 0 || newX >= this.grid.columns || newY < 0 || newY >= this.grid.rows) {
                        return false;
                    }

                    if (this.gridMatrix[newY] && this.gridMatrix[newY][newX]) {
                        return false
                    }
                }
                return true;
            }))
    }

    // Merge Pieces
    merge() {
        this.shape.forEach((row, rowIndex) => {
            row.forEach((value, colIndex) => {
                if (value) {
                    const x = this.position.x + colIndex;
                    const y = this.position.y + rowIndex;
                    if (y >= 0) {
                        this.gridMatrix[y][x] = this.color;
                    }
                }
            })
        })
    }

    // Moving methods
    moveDown() {
        if (this.canMove(0, 1)) {
            this.position.y++
            return true;
        }
        return false;
    }

    moveLeft() {
        if (this.canMove(-1, 0)) {
            this.position.x--
        }
    }

    moveRight() {
        if (this.canMove(1, 0)) {
            this.position.x++
        }
    }

    rotate() {
        const newShape = this.shape[0].map((_, index) =>
            this.shape.map(row => row[index]).reverse())

        const oldShape = this.shape;
        this.shape = newShape;

        // Check if the newShape fits on the grid
        if (!this.canMove(0, 0)) {
            this.shape = oldShape
        }
    }
}