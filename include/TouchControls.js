import React, { useEffect, useRef } from 'react'

export function TouchControls({ currentPiece }) {
    const left = useRef(null);
    const right = useRef(null);
    const rotate = useRef(null);
    const down = useRef(null);

    useEffect(() => {
        const leftBtn = left.current;
        const rightBtn = right.current;
        const rotateBtn = rotate.current;
        const downBtn = down.current;

        const handleTouch = (moveFunction) => (event) => {
            event.preventDefault(); 
            moveFunction(); // Call the corresponding move function
        };

        if (leftBtn) {
            leftBtn.addEventListener('touchstart', handleTouch(currentPiece.moveLeft));
        }
        if (rightBtn) {
            rightBtn.addEventListener('touchstart', handleTouch(currentPiece.moveRight));
        }
        if (downBtn) {
            downBtn.addEventListener('touchstart', handleTouch(currentPiece.moveDown));
        }
        if (rotateBtn) {
            rotateBtn.addEventListener('touchstart', handleTouch(currentPiece.rotate));
        }

        // Cleanup
        return () => {
            if (leftBtn) {
                leftBtn.addEventListener('touchstart', handleTouch(currentPiece.moveLeft));
            }
            if (rightBtn) {
                rightBtn.addEventListener('touchstart', handleTouch(currentPiece.moveRight));
            }
            if (downBtn) {
                downBtn.addEventListener('touchstart', handleTouch(currentPiece.moveDown));
            }
            if (rotateBtn) {
                rotateBtn.addEventListener('touchstart', handleTouch(currentPiece.rotate));
            }
        };
    }, [currentPiece]);

    return (
        <div id="buttons">
            <button id="up-btn" ref={rotate}><i className="fas fa-sync-alt"></i></button>
            <div id="horizontal-btns">
                <button id="left-btn" ref={left}><i className="fas fa-arrow-left"></i></button>
                <button id="down-btn" ref={down}><i className="fas fa-arrow-down"></i></button>
                <button id="right-btn" ref={right}><i className="fas fa-arrow-right"></i></button>
            </div>

        </div>
    )
}