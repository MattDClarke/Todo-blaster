function Asteroid(pos, r, todo) {

    if (pos) {
        this.pos = pos.copy();
        this.todo = '';
    } else {
        this.pos = createVector(random(width), random(height));
        this.todo = todo;
    }

    if (r) {
        this.r = r * 0.5;
    } else {
        this.r = random(15, 50);
    }

    this.vel = p5.Vector.random2D();
    if (this.todo === '') {
        this.vel.mult(random(0.1, 5));
    }
    this.total = floor(random(5, 15));
    this.offset = [];
    for (let i = 0; i < this.total; i += 1) {
        this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }

    this.update = function() {
        this.pos.add(this.vel);
    }

    this.render = function() {
        push();
        stroke(255);
        noFill();
        translate(this.pos.x, this.pos.y);
        beginShape();
        for (let i = 0; i < this.total; i += 1) {
            // TWO_PI == 360deg
            // angle btn 0 and TWO_PI
            var angle = map(i, 0, this.total, 0, TWO_PI);
            var r = this.r + this.offset[i];
            // polar to cartesian transformation
            var x = r * cos(angle);
            var y = r * sin(angle);
            // construct a shape
            vertex(x, y)
        }
        text(todo, 0, 0);
        endShape(CLOSE);
        pop();
    }

    this.breakup = function() {
        // random number of asteroid pieces
        const numOfPieces = floor(random(2, 6));
        var newA = Array(numOfPieces).fill(null);
        return newA.map(() => new Asteroid(this.pos, this.r, ''));
    }


    // allow wrap around if it goes  off screen
    this.edges = function() {
        if (this.pos.x > width + this.r) {
        this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
        this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
        this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
        this.pos.y = height + this.r;
        }
    }

}