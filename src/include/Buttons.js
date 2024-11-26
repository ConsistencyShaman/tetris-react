import React, { useRef, useState } from 'react'
import { ResetGameState } from './Utils';
import { StartGame } from './GameLogic';

export function Buttons({ gameInterval, currentPiece, grid, gridMatrix }) {
    // Fullscreen
    const fullscreenRef = useRef(null);
    const handleFullscreen = () => {
        const gameContainer = document.getElementById('game-container');

        if (document.fullscreenElement) {
            // If there's a fullscreen element, exit fullscreen
            document.exitFullscreen();
            return;
        } else {
            // Make the game-container div fullscreen
            gameContainer.requestFullscreen();
        }
    }
    // Speed
    const speedRef = useRef(null);
    const speedValueRef = useRef(null);
    const speedSliderRef = useRef(null);
    // const [speed, setSpeed] = useState(500);

    const handleSpeed = () => {
    
        const newSpeed = parseInt(speedSliderRef.current.value);
        speed(newSpeed);
        speedValueRef.current.textContent = newSpeed;
        // Import functions from game state componenet??
        if (gameInterval) {
            clearInterval(gameInterval);
            StartGame({ gameOverElement, canvas, context, gameInterval, speed });
        }

    }
    // Restart game
    const handleRestart = () => {
        if (gameInterval) {
            clearInterval(gameInterval);
        }
        // emptyScore();
        currentPiece = null; // this wont work because its prop, need to set a trigger state in parent
        // emptyMatrix();
        ResetGameState(grid, gridMatrix, score, scoreRef);

        StartGame({ gameOverElement, canvas, context, gameInterval, speed });
    }
    
    return (
        <div>
            <div id="settings">
                <button
                    id="fullscreen-btn"
                    ref={fullscreenRef}
                    onClick={handleFullscreen}
                >
                    <i className="fas fa-expand"/>
                </button>

                <label htmlFor="speedSlider" ref={speedSliderRef}>Speed:</label>
                <input
                    type="range"
                    id="speed-slider"
                    min="100"
                    max="1000"
                    value={speed}
                    step="100"
                    ref={speedRef}
                    onChange={handleSpeed}
                />
                <span id="speed-value" ref={speedValueRef}>500</span>

                <button 
                    id="restart-btn"
                    ref={restartRef}
                    onClick={handleRestart}
                >
                    <i className="fas fa-refresh"/>
                </button>
            </div>
        </div>
    )
}