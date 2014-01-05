/*------------------- 
a character entity
-------------------------------- */
game.character1 = me.ObjectEntity.extend({
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings); 

        this.setVelocity(0, 0);

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
        return false;
    }
 
});
