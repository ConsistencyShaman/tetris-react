import React, { useEffect, useRef } from "react";

export function Matrix({ 
    gridMatrix, 
    context, 
    canvas,
    widthCanvas,
    heightCanvas,
    grid,
    blockSize
 }) {
    
    // Setup ref
    const canvasRef = useRef(null);

    // Setup canvas size and context
    useEffect(() => {
        canvas = canvasRef.current;
        context = canvas.getContext('2d');
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
            <canvas id="tetris" ref={canvasRef} style={{ width: widthCanvas, height: heightCanvas }}></canvas>
        </div>
    )
}

export function PreviewMatrix({widthPreviewCanvas, heightPreviewCanvas}) {
    const previewCanvasRef = useRef(null);
   

    return (
        <div id="preview-matrix">
            <canvas id="preview-piece" ref={previewCanvasRef} style={{ width: widthPreviewCanvas, height: heightPreviewCanvas }}/>
        </div>
    )
}