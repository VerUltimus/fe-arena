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
            game.data.moving = !game.data.moving;
            this.off_x = 0;
            this.off_y = 0;
        });

    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
        console.log(this.off_x.toString());
        if (game.data.moving && me.input.keyStatus("click")) {
            var x = (Math.floor(me.input.mouse.pos.x / 32));
            var y = (Math.floor(me.input.mouse.pos.y / 32));
            var tot_x = x + this.off_x - this.pos.x/32;
            var tot_y = y + this.off_y - this.pos.y/32;
            if (Math.abs(tot_x)+Math.abs(tot_y) <= this.movement) {
                this.pos.x = x*32;
                this.pos.y = y*32;
                this.off_x = tot_x;
                this.off_y = tot_y;
                console.log("moved");
                return true
            }
        } else if (!game.data.moving) {
            this.off_x = 0;
            this.off_y = 0;
        }
        return false;
    }
 
});
