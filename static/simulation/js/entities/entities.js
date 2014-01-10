/*------------------- 
a character entity
-------------------------------- */

game.character1 = me.ObjectEntity.extend({

    movement : 6,
    off_x : 0,
    off_y : 0,
    char_name : "Gurl",
    hp: 80,
    cur_hp: 80,
    str: 20,
    mag: 20,
    skl: 20,
    spd: 20,
    luk: 20,
    def: 20,
    res: 20,
    player_one: true,
    weapon1: "Bronze Sword",
    weapon2: "Bronze Axe",
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings); 
        this.setVelocity(0, 0);
        showTiles(this,0);
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
        updateOnHover(this);
        return moveCharacter(this, 0);
    }
 
});

/*------------------- 
a character entity
-------------------------------- */
game.character2 = me.ObjectEntity.extend({

    movement : 6,
    off_x : 0,
    off_y : 0,
    char_name : "Dude",
    hp: 80,
    cur_hp: 80,
    str: 10,
    mag: 10,
    skl: 10,
    spd: 10,
    luk: 10,
    def: 10,
    res: 10,
    player_one: true,
    weapon1: "Bronze Sword",
    weapon2: "Bronze Axe",
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings); 
        this.setVelocity(0, 0);
        showTiles(this,1);
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
        updateOnHover(this);
        return moveCharacter(this, 1);
    }
 
});

game.character9 = me.ObjectEntity.extend({

    movement : 6,
    off_x : 0,
    off_y : 0,
    char_name : "Catherine :3",
    hp: 80,
    cur_hp: 80,
    str: 20,
    mag: 20,
    skl: 20,
    spd: 20,
    luk: 20,
    def: 20,
    res: 20,
    player_one: false,
    weapon1: "Slap",
    weapon2: "Whine",
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings); 
        this.setVelocity(0, 0);
        showTiles(this, 2);
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
				updateOnHover(this);
        return moveCharacter(this,2);
    }
 
});