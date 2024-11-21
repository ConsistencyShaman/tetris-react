import React, { useEffect, useRef } from "react";

export function Matrix({ gridMatrix }) {
    const blockSize = 30;
    const grid = {
        rows: 20,
        columns: 10,
        blockSize: blockSize
    };

    // Setup ref
    const canvasRef = useRef(null);

    // Setup canvas size and context
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = grid.columns * grid.blockSize;
        canvas.height = grid.rows * grid.blockSize;

        // Draw grid
        const drawGrid = () => {
            // Clear before drawing
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw cells
            gridMatrix.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    context.fillStyle = cell;
                    context.fillRect(colIndex * blockSize, rowIndex * blockSize, blockSize, blockSize);
                    context.strokeStyle = '#444';
                    context.lineWidth = 0.5;
                    context.strokeRect(colIndex * blockSize, rowIndex * blockSize, blockSize, blockSize);
                });
            });
        };

        drawGrid();

    }, [gridMatrix]);

    return (
        <div id="matrix">
            <canvas id="tetris" ref={canvasRef}></canvas>
        </div>
    )
}