import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import { Matrix, PreviewMatrix } from './include/Matrix';
import { Buttons } from './include/Buttons';
import { TouchControls } from './include/TouchControls';


function App() {
  const grid = {
    rows: 20,
    columns: 10,
    blocksize: 30
  }
  const canvasWidth = 300;
  const canvasHeight = 600;
  const previewCanvasWidth = 100;
  const previewCanvasHeight = 100;

  const [gridMatrix, setGridMatrix] = useState(Array.from({ length: grid.rows }, () => Array(grid.columns).fill(0)));
  const [currentPiece, setCurrentPiece] = useState(null);
  const [previewPiece, setPreviewPiece] = useState(null);
  const score = 0;
  const speed = 500;
  const [gameInterval, setGameInterval] = useState(null);


  return (
    <div className="App">

      <div class="tetris-container">
        <div id="score-container">
          <span id="score">Score: 0</span>
        </div>

        <div id='tetris-container'>
          {Matrix}
        </div>

        <div id="buttons">
          {Buttons}
        </div>

      </div>

      <div id="preview-container">
        {PreviewMatrix}
      </div>

      <div id="touch-controls" >
        {TouchControls}
      </div>

      <div id="game-over" class="hidden">
        <h1>Game Over!</h1>
      </div>
    </div>
  );
}

export default App;
