import React from 'react';
import io from 'socket.io-client';
import './style.css';

class Board extends React.Component {

    timeout;
    socket = io.connect("/");   //CONNECTING TO SOCKET.IO SERVER

    ctx;
    isDrawing = false;

    constructor(props) {
        super(props);

        //ON whiteboard EVENT OF SOCKET.IO
        this.socket.on("whiteboard", function(data){

            var root = this;
            var interval = setInterval(function(){
                if(root.isDrawing) return;
                root.isDrawing = true;
                clearInterval(interval);
                var image = new Image();
                var canvas = document.querySelector('#board');
                var ctx = canvas.getContext('2d');
                image.onload = function() {
                    ctx.drawImage(image, 0, 0);
                    root.isDrawing = false;
                };
                image.src = data;
            }, 200)
        })
    }

    //CALLING FUNCTION TO DRAW ON CANVAS
    componentDidMount() {
        this.drawOnCanvas();
    }

    //FUNCTION TO RECEIVE THE SIZE AND COLOR OF BRUSH
    componentWillReceiveProps(newProps) {
        this.ctx.strokeStyle = newProps.color;
        this.ctx.lineWidth = newProps.size;
    }

    //FUNCTION TO DRAW ON CANVAS / WRITE ON WHITEBOARD
    drawOnCanvas() {
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d');
        var ctx = this.ctx;

        var draw = document.querySelector('#draw');
        var drawStyle = getComputedStyle(draw);
        canvas.width = parseInt(drawStyle.getPropertyValue('width'));
        canvas.height = parseInt(drawStyle.getPropertyValue('height'));

        //COORDINATES OF THE MOUSE POINTER
        var mouse = {x: 0, y: 0};
        var lastMouse = {x: 0, y: 0};

        //CAPTURING MOUSE WORK
        canvas.addEventListener('mousemove', function(e) {
            lastMouse.x = mouse.x;
            lastMouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);


        //DRAWING ON WHITEBOARD
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.color;

        //MOUSE EVENT LISTENERS
        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onDraw, false);
        }, false);

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onDraw, false);
        }, false);

        //ONDRAW FUNCTION
        var root = this;
        var onDraw = function() {
            ctx.beginPath();
            ctx.moveTo(lastMouse.x, lastMouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            if(root.timeout != undefined) 
                clearTimeout(root.timeout);
            
                root.timeout = setTimeout(function(){
                var base64ImageData = canvas.toDataURL("image/png");
                root.socket.emit("whiteboard", base64ImageData);
            }, 1000)
        };
    }

    render() {
        return (
            <div className="draw" id="draw">
                <canvas className="board" id="board">
                    {/* DRAWING BOARD */}
                </canvas>
            </div>
        )
    }
}

export default Board;