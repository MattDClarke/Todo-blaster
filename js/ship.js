function Ship() {
  // starting pos vector
  this.pos = createVector(width / 2, height / 2);
  this.r = 20;

  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0,0);
  this.isBoosting = false;
  this.isHit = false;

  this.boosting = function(b) {
    this.isBoosting = b;
  }

  this.update = function() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    // dampening - reduce vel by 1% each frame
    this.vel.mult(0.99);

    if (this.isHit) {
      this.boost(true);
      ship.setRotation(random(-0.3, 0.3));
      ship.turn();
    }

  }

  this.boost = function(randomMult = false) {
    // get vector that points in direction of heading
    var force = p5.Vector.fromAngle(this.heading);
    // slow down boost
    force.mult(randomMult ? random(-0.4, 0.4) : 0.1);
    this.vel.add(force);
  }


  this.hits = function(asteroid) {
    // dist btn laser and asteroid pos
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid .pos.y);
    if (d < this.r + asteroid.r) {
      // hit
       return true;
    } else {
        return false;
    }
}

  this.render = function() {
    // push and pop makes sure ship translation and rotation does not affect asteroid or other things on the canvas
    push(); // save current rotation and translation state
    // position by vector values
    translate(this.pos.x, this.pos.y);
    // create triangle by plotting points
    // PI / 2 = conversion of 90 deg to radians
    rotate(this.heading + PI / 2);
    fill(this.isHit ? 'red' : 0);
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop() // restore rotation and translation state
  }

  // allow wrap around if it goes off screen
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

  this.setRotation = function(a) {
    this.rotation = a;
  }

  this.turn = function() {
    this.heading += this.rotation;
  }

}