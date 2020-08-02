var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 10;
var rightLineY=210;
var leftLineY=210;

var player1Score = 0;
var player2Score = 0;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

canvas = document.getElementById('myCanvas');
canvasContext = canvas.getContext('2d');
window.onload = function() {
	
    
    
    var framesPerSecond = 30;
    setInterval(moveEverything, 1000/framesPerSecond);
    
    canvas.addEventListener('mousemove',
		function(evt) {
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
		});
}


function ballReset() {
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if(paddle2YCenter < ballY - 35) {
		paddle2Y = paddle2Y + 6;
	} else if(paddle2YCenter > ballY + 35) {
		paddle2Y = paddle2Y - 6;
	}
}


function moveEverything() {
    computerMovement();
	ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
	if(ballX > 785) {
		if(ballY > paddle2Y &&
			ballY < paddle2Y+PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;
		} else {
			ballReset();	
			player1Score++;
		}
    }
    else if(ballX < 15) {
        if(ballY > paddle1Y &&
			ballY < paddle1Y+PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;
		} else {
			ballReset();
			player2Score++;
		}
    }
	else if(ballY > 585) {
		ballSpeedY = -5;
    }
    else if(ballY < 15) {
        ballSpeedY= 5;
    }
    drawEverything();
}
    

function drawEverything() {
	canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
    
    drawCircle(ballX, ballY, 15, "white");
    
    canvasContext.fillText(player1Score, 100, 100);
	canvasContext.fillText(player2Score, canvas.width-100, 100);
}

function drawCircle(centerX,centerY,radius,drawColor) {
    canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    canvasContext.fill();
}

function colorRect(leftX,topY, width,height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY, width,height);
}
