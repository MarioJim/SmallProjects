// Initial values and global variables
var board, turn, difficulty = 3, startingP = -1, gameRunning = true;
var difficulties = ["Very Easy", "Easy", "Medium", "Hard"];
var btnResetBoard, btnCompFirst, btnPlayerFirst;
var btnDiff = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 4);
    board = new Board(height, 500, 0);
    // Button to reset board
    btnResetBoard = createButton("Reset Board");
    btnResetBoard
        .position(80, 80)
        .style("width", "340px")
        .style("height", "100px")
        .style("font-size", "28px")
        .mousePressed(() => {
            board.resetBoard();
        });
    // Button to change starting player to computer
    btnCompFirst = createButton("Computer");
    btnCompFirst
        .position(90, 300)
        .style("width", "140px")
        .style("height", "60px")
        .style("font-size", "20px")
        .mousePressed(() => {
            startingP = 1;
            board.resetBoard();
        });
    // Button to change starting player to user
    btnPlayerFirst = createButton("Player");
    btnPlayerFirst
        .position(270, 300)
        .style("width", "140px")
        .style("height", "60px")
        .style("font-size", "20px")
        .mousePressed(() => {
            startingP = -1;
            board.resetBoard();
        });
    // Buttons to change the difficulty to i
    for (let i = 0; i < 4; i++) {
        btnDiff[i] = createButton(difficulties[i]);
        btnDiff[i]
            .position(150, 500 + i * 60)
            .style("width", "200px")
            .style("height", "40px")
            .style("font-size", "20px")
            .mousePressed(() => {
                difficulty = i;
                board.resetBoard();
            });
    }
    noLoop();
    turn = startingP;
}

function draw() {
    background(180, 230, 210);
    // Interface
    textSize(35);
    textAlign(CENTER, CENTER);
    text("Who should go first?", 250, 260);
    text("Choose a difficulty", 250, 460);
    textSize(25);
    text("Current difficulty: " + difficulties[difficulty], 250, 750);
    // If game has ended...
    if (board.currentState() != 0 || board.numberOfMoves >= 9) {
        gameRunning = false;
        textSize(100);
        switch (board.currentState()) {
            case -1:
                text("Player wins!", width / 2, height / 2);
                break;
            case 0:
                text("It's a tie!", width / 2, height / 2);
                break;
            case 1:
                text("Computer wins!", width / 2, height / 2);
                break;
        }
    }
    // Else, continue the game
    else {
        board.show();
        if (turn == 1) {
            let CompMove = board.computerMove(difficulty);
            board.moves[CompMove] = 1;
            board.numberOfMoves++;
            turn = -1;
            redraw();
        }
    }
}

function mousePressed() {
    // If the game has finished, click again to reset
    if (!gameRunning) {
        board.resetBoard();
        redraw();
        return;
    }
    // If clicking inside the board
    if (mouseX > board.x && mouseX < board.x + board.size) {
        let xPos = floor((mouseX - board.x) / board.cellSize);
        let yPos = floor((mouseY - board.y) / board.cellSize);
        let pMove = 3 * yPos + xPos;
        // And move is available
        if (board.isMoveAvailable(pMove)) {
            board.moves[pMove] = -1;
            board.numberOfMoves++;
            turn = 1;
            redraw();
        }
    }
}