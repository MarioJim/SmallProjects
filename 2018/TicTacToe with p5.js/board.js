class Board {
    constructor(size = 0, x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.cellSize = size / 3;
        // Moves: 0 for empty, 1 for computer, -1 for player
        this.moves = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.numberOfMoves = 0;
        this.Computer = "X";
        this.Player = "O";
    }

    show() {
        translate(this.x, this.y);
        stroke(0);
        strokeWeight(4);
        // Vertical lines
        line(this.cellSize, 0, this.cellSize, this.size);
        line(2 * this.cellSize, 0, 2 * this.cellSize, this.size);
        // Horizontal lines
        line(0, this.cellSize, this.size, this.cellSize);
        line(0, 2 * this.cellSize, this.size, 2 * this.cellSize);
        // Show moves
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(200);
        for (let i = 0; i < 9; i++) {
            let xPos = (i - 3 * floor(i / 3)) * this.cellSize + this.cellSize / 2;
            let yPos = floor(i / 3) * this.cellSize + this.cellSize / 2;
            let letter;
            if (this.moves[i] == 0) letter = "";
            else if (this.moves[i] == 1) letter = this.Computer;
            else letter = this.Player;
            text(letter, xPos, yPos);
        }
    }

    // param possibleMove = index of moves that I want to check
    // returns true if it's empty, false if it's occupied
    isMoveAvailable(possibleMove) {
        if (this.moves[possibleMove] == 0) return true;
        else return false;
    }

    // returns -1 if player has won, 0 if no one has won, 1 if computer has won
    currentState() {
        let m = this.moves;
        let winner = 0;
        [-1, 1].forEach(function (p) {
            for (let i = 0; i < 3; i++) {
                // Check vertical
                if (m[i] == p && m[i + 3] == p && m[i + 6] == p) winner = p;
                // Check horizontal
                if (m[3 * i] == p && m[3 * i + 1] == p && m[3 * i + 2] == p) winner = p;
            }
            // Check diagonal like \
            if (m[0] == p && m[4] == p && m[8] == p) winner = p;
            // Check diagonal like /
            if (m[2] == p && m[4] == p && m[6] == p) winner = p;
        });
        return winner;
    }

    // param arr = possible moves to choose from ([0,2,6,8] for corners, [1,3,5,7] for edges)
    // returns move if there is any, -1 if they're all occupied
    chooseRandomFromArray(arr) {
        let corner = -1;
        let self = this;
        // For each possible move, check if it's available
        shuffle(arr).forEach(function (pMove) {
            if (self.isMoveAvailable(pMove))
                corner = pMove;
        });
        return corner;
    }

    // param difficulty = chosen difficulty
    // returns computer's chosen move
    computerMove(difficulty) {
        let tempBoard = new Board;
        tempBoard.moves = this.moves.slice();
        if (difficulty > 0) {
            // Check if computer can win in this move
            for (let i = 0; i < 9; i++)
                if (this.isMoveAvailable(i)) {
                    tempBoard.moves[i] = 1;
                    if (tempBoard.currentState() == 1)
                        return i;
                    tempBoard.moves = this.moves.slice();
                }
        }
        if (difficulty > 1) {
            // Check if player can win in next move, block them
            for (let i = 0; i < 9; i++)
                if (this.isMoveAvailable(i)) {
                    tempBoard.moves[i] = -1;
                    if (tempBoard.currentState() == -1)
                        return i;
                    tempBoard.moves = this.moves.slice();
                }
        }
        if (difficulty > 2) {
            // If computer is second and center is available, take it
            if (this.numberOfMoves == 1 && this.isMoveAvailable(4))
                return 4;
            // If player tries a diagonal, stop them by choosing a random edge
            if (this.numberOfMoves == 3)
                if ((this.moves[0] == -1 && this.moves[8] == -1) ||
                    (this.moves[2] == -1 && this.moves[6] == -1))
                    return this.chooseRandomFromArray([1, 3, 5, 7]);
        }
        // Else, if a corner is available, take it
        if (this.chooseRandomFromArray([0, 2, 6, 8]) != -1)
            return this.chooseRandomFromArray([0, 2, 6, 8]);
        // Else, just take a random edge
        if (this.chooseRandomFromArray([1, 3, 5, 7]) != -1)
            return this.chooseRandomFromArray([1, 3, 5, 7]);
    }

    // Reset board
    resetBoard() {
        gameRunning = true;
        turn = startingP;
        this.moves = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.numberOfMoves = 0;
        redraw();
    }
}