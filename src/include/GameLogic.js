import React, { useState, useRef, useEffect } from "react";
import {
    CheckAndClearLines,
    UpdateGameState,
    ResetGameState,
    RandomColour,
    RandomShape,
    DrawStackedPieces
} from "./Utils";
import { Piece } from "./Piece";

export function SpawnPiece({ currentPiece, nextPiece, grid, context, previewCanvasContext, previewCanvas }) {
    // Define next piece
    nextPiece = new Piece(RandomShape, RandomColour, grid, context);
    // Function to draw nextPiece
    const drawNextPiece = () => {
        previewCanvasContext.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        nextPiece.drawPreview(previewCanvasContext, previewCanvas.width);
    }
    
    // Define how to spawn piece
    currentPiece = nextPiece || new Piece(RandomShape, RandomColour, grid, context);
    drawNextPiece();
}

export function GameLoop({ canvas, context, currentPiece }) {

    context.clearRect(0, 0, canvas.width, canvas.height)
    UpdateGameState({
        currentPiece,
        gameOverElement,
        gameInterval
    });
    DrawStackedPieces({
        gridMatrix,
        context,
        grid
    });

    // Draw Piece
    currentPiece.draw();

}

export function StartGame({ gameOverElement, canvas, context, gameInterval, speed }) {
    // make game over div invisible
    gameOverElement.style.visibility = 'hidden';

    // start game
    context.clearRect(0, 0, canvas.width, canvas.height);
    spawnPiece();
    gameInterval = setInterval(() => GameLoop(), speed);
    
    console.log('Game Started!')
}