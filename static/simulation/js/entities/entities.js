/*------------------- 
a character entity
-------------------------------- */

game.character1 = me.ObjectEntity.extend({

    movement : 6,
    off_x : 0,
    off_y : 0,
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings); 

        this.setVelocity(0, 0);

        me.input.registerPointerEvent('click', this.collisionBox, function() {
            if (game.data.moving.indexOf(true) < 0) {
                game.data.moving[0] = true;
                this.off_x = 0;
                this.off_y = 0;
            } else {
                game.data.moving[0] = false;
            }
        });

    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
        //console.log(this.off_x.toString());
        //console.log(this.moving);

        var x = (Math.floor(me.input.mouse.pos.x / 32));
        var y = (Math.floor(me.input.mouse.pos.y / 32));

        if (this.pos.x / 32 === x && this.pos.y / 32 === y) {
            $("#name").html("Gurl");
        }

        if (game.data.moving[0] && me.input.keyStatus("click")) {

            var tot_x = x + this.off_x - this.pos.x/32;
            var tot_y = y + this.off_y - this.pos.y/32;
            if (Math.abs(tot_x)+Math.abs(tot_y) <= this.movement) {
                var x1 = game.data.location_x.slice(0,0);
                var x2 = game.data.location_x.slice(1);
                var y1 = game.data.location_y.slice(0,0);
                var y2 = game.data.location_y.slice(1);
                var x_removed = x1.concat(x2);
                var y_removed = y1.concat(y2);
                if ((x_removed.indexOf(x*32) < 0) || (y_removed.indexOf(y*32) < 0)) {
                    game.data.location_x[0] = x*32;
                    game.data.location_y[0] = y*32;
                    this.pos.x = x*32;
                    this.pos.y = y*32;
                    this.off_x = tot_x;
                    this.off_y = tot_y;
                    console.log("moved");
                    return true;
                }
            }
        } else if (!game.data.moving[0]) {
            this.off_x = 0;
            this.off_y = 0;
        }
        return false;
    }
 
});

/*------------------- 
a character entity
-------------------------------- */
game.character2 = me.ObjectEntity.extend({

    movement : 6,
    off_x : 0,
    off_y : 0,
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings); 

        this.setVelocity(0, 0);

        me.input.registerPointerEvent('click', this.collisionBox, function() {
            if (game.data.moving.indexOf(true) < 0) {
                game.data.moving[1] = true;
                this.off_x = 0;
                this.off_y = 0;
            } else {
                game.data.moving[1] = false;
            }
        });

    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
        //console.log(this.off_x.toString());
        //console.log(this.moving);

        var x = (Math.floor(me.input.mouse.pos.x / 32));
        var y = (Math.floor(me.input.mouse.pos.y / 32));
        
        if (this.pos.x / 32 === x && this.pos.y / 32 === y) {
            $("#name").html("Dude");
        }

        if (game.data.moving[1] && me.input.keyStatus("click")) {

            var tot_x = x + this.off_x - this.pos.x/32;
            var tot_y = y + this.off_y - this.pos.y/32;
            if (Math.abs(tot_x)+Math.abs(tot_y) <= this.movement) {
                var x1 = game.data.location_x.slice(0,1);
                var x2 = game.data.location_x.slice(2);
                var y1 = game.data.location_y.slice(0,1);
                var y2 = game.data.location_y.slice(2);
                var x_removed = x1.concat(x2);
                var y_removed = y1.concat(y2);
                if ((x_removed.indexOf(x*32) < 0) || (y_removed.indexOf(y*32) < 0)) {
                    game.data.location_x[1] = x*32;
                    game.data.location_y[1] = y*32;
                    this.pos.x = x*32;
                    this.pos.y = y*32;
                    this.off_x = tot_x;
                    this.off_y = tot_y;
                    console.log("moved");
                    return true;
                }
            }
        } else if (!game.data.moving[1]) {
            this.off_x = 0;
            this.off_y = 0;
        }
        return false;
    }
 
});

