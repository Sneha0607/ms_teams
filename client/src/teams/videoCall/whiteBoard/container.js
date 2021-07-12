import React, { useState } from 'react';
import Board from './board';
import './style.css';

const Container = () => {

    const [color, setColor] = useState('#000000');
    const [size, setSize] = useState('5');

    return (
        <div className="container">
            <div className="upperGap">
            </div>
            <div class="tools-section">
                <h3>Collaborate Whiteboard</h3>
                <div className="color-picker-container">
                    Brush Color : &nbsp; 
                    <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} />
                </div>
                <div className="brushsize-container">
                    Brush Size : &nbsp; 
                    <select value={size} onChange={(e)=>setSize(e.target.value)}>
                        <option> 5 </option>
                        <option> 10 </option>
                        <option> 15 </option>
                        <option> 20 </option>
                        <option> 25 </option>
                        <option> 30 </option>
                    </select>
                </div>
            </div>
            <div class="board-container">
                <Board color={color} size={size}></Board>
            </div>
        </div>
    )
}

export default Container;