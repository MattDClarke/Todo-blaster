function Laser(spos, angle) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(10);

    this.update = function() {
        this.pos.add(this.vel);
    }

    this.render = function() {
        push();
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
        pop();
    }

    this.hits = function(asteroid) {
        const text = asteroid.todo;
        // dist btn laser and asteroid pos
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid .pos.y);
        if (d < asteroid.r) {
            if (text !== '') {
                // pause draw()
                noLoop();
                // remove todo and update local storage
                const newTodos = todos.filter(itm => itm.text !== text);
                todos = newTodos;

                localStorage.setItem('todos', JSON.stringify(todos));

                // add item to local storage and list
                const item = {
                    id: Date.now(),
                    text,
                    done: true
                };
                // add to items completed
                items.push(item);
                // // remove duplicates
                var uniq = {};
                var itemsFiltered = items.filter(obj => !uniq[obj.text] && (uniq[obj.text] = true));
                items = itemsFiltered;
                if (items.length > 10) {
                    items.shift();
                }

                populateList(items, itemsList);
                localStorage.setItem('items-completed', JSON.stringify(items));

                // continue draw()
                loop();
            }
           return true;
        } else {
            return false;
        }
    }
}