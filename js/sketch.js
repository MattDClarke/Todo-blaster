var ship;
var asteroids = [];
var lasers = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < todos.length; i += 1) {
    asteroids.push(new Asteroid(null, null, todos[i].text));
  }
}

// always runs
function draw() {
  background(0);
  for (let i = 0; i < asteroids.length; i += 1) {
    if (ship.hits(asteroids[i])) {
      ship.isHit = true;
      setTimeout(function() {
        ship.isHit = false;
      }, 300);
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (let i = lasers.length - 1; i >= 0; i -= 1) {
    lasers[i].render();
    lasers[i].update();

    // collision detection
    // problem: looping through astroids and adding new ones at same time when they breakup
    //  solution - loop backwards
    for (let j = asteroids.length - 1; j >= 0; j -= 1) {
      if (lasers[i].hits(asteroids[j])) {
        // make very small pieces disappear
        if (asteroids[j].r > 12) {
          var newAsteroids = asteroids[j].breakup();
          asteroids.push(...newAsteroids);
        }
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        break;
      }
    }

  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (keyCode === CONTROL ) {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode === RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setRotation(-0.1);
    } else if (keyCode === UP_ARROW) {
    ship.boosting(true);
  }
}
