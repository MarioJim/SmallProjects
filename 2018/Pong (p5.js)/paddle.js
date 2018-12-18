class Paddle {
    constructor(h) {
        this.pos = createVector(0, height / 2);
        this.w = 25;
        this.h = h;
        this.vel = 5;
    }

    show() {
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }

}

class CompPaddle extends Paddle {
    constructor(h) {
        super(h);
        this.pos.x = 50;
    }

    move(ballPos) {
        this.pos.y = constrain(ballPos.y, this.h / 2, height - this.h / 2);
    }
}

class PlayerPaddle extends Paddle {
    constructor(h, upKey, downKey) {
        super(h);
        this.upKey = upKey;
        this.downKey = downKey;
        this.pos.x = width - 50;
    }

    move(dir) {
        if ((this.pos.y > this.h / 2 && dir != 1) || (this.pos.y < height - this.h / 2 && dir != -1))
            this.pos.y += dir * this.vel;
    }
}