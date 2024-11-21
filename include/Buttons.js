import React, { useRef, useState } from 'react'

export function Buttons({ gameInterval, currentPiece }) {
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
    const [speed, setSpeed] = useState(500);

    const handleSpeed = () => {
    
        const newSpeed = parseInt(speedSlider.value);
        setSpeed(newSpeed);
        speedValueRef.current.textContent = newSpeed;
        // Import functions from game state componenet??
        if (gameInterval) {
            clearInterval(gameInterval);
            startGame();
        }

    }
    // Restart game
    const handleRestart = () => {
        if (gameInterval) {
            clearInterval(gameInterval);
        }
        emptyScore();
        currentPiece = null; // this wont work because its prop, need to set a trigger state in parent
        emptyMatrix();

        startGame(speed);
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

                <label htmlFor="speedSlider">Speed:</label>
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