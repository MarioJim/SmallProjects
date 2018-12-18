let scorePlayer, scoreComp;
let ball;
let compPad, playerPad;

function reset() {
    scorePlayer = 0;
    scoreComp = 0;
    ball = new Ball(10);
    compPad = new CompPaddle(300);
    playerPad = new PlayerPaddle(300, UP_ARROW, DOWN_ARROW);
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 4);
    setTimeout(reset(), 3000);
    fill(255);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
}

function draw() {
    background(0);
    textSize(80);
    noStroke();
    text(scoreComp, width / 2 - 100, 50);
    text(scorePlayer, width / 2 + 100, 50);
    stroke(255);
    strokeWeight(8);
    line(width / 2, 0, width / 2, height);

    compPad.move(ball.pos);

    if (keyIsDown(playerPad.upKey)) playerPad.move(-1);
    if (keyIsDown(playerPad.downKey)) playerPad.move(1);

    compPad.show();
    playerPad.show();

    ball.show();
    ball.move();
}