class Ball {
    constructor(yVel) {
        this.pos = createVector(width / 2, height / 2);
        this.r = 50;
        this.vel = createVector(yVel, random(10));
    }

    show() {
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r);
    }

    move() {
        // For testing
        if (this.pos.x < this.r / 2 || this.pos.x > width - this.r / 2)
            this.vel.x = -this.vel.x;


        if (this.pos.y < this.r / 2 || this.pos.y > height - this.r / 2)
            this.vel.y = -this.vel.y;
        this.pos.add(this.vel);
    }
}