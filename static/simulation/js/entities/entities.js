/*------------------- 
a character entity
-------------------------------- */

game.character1 = me.ObjectEntity.extend({

    id: 0,
    movement : 6,
    off_x : 0,
    off_y : 0,
    char_name : "Gurl",
    hp: 80,
    cur_hp: 80,
    str: 20,
    mag: 20,
    skl: 60,
    spd: 60,
    luk: 60,
    def: 20,
    res: 20,
    player_one: true,
    weapons: [new Weapon("Bronze Sword", 1, false, 3, 100, 0, 1, 50),
              new Weapon("Bronze Axe", 3, false, 4, 80, 0, 1, 50)],
    equipped: null,
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings); 
        this.setVelocity(0, 0);
        showTiles(this,this.id);
        initBattle(this);
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
        updateOnHover(this);
        updateWeapon(this);
        return moveCharacter(this, this.id);
    }
 
});

/*------------------- 
a character entity
-------------------------------- */
game.character2 = me.ObjectEntity.extend({

    id: 1,
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
    weapons: [new Weapon("Bronze Sword", 1, false, 3, 100, 0, 1, 50),
              new Weapon("Bronze Axe", 3, false, 4, 80, 0, 1, 50)],
    equipped: null,
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings); 
        this.setVelocity(0, 0);
        showTiles(this,this.id);
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
        updateOnHover(this);
        return moveCharacter(this, this.id);
    }
 
});

game.character9 = me.ObjectEntity.extend({

    id: 2,
    movement : 6,
    off_x : 0,
    off_y : 0,
    char_name : "Catherine :3 - best girlfriend",
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
    weapons: [new Weapon("Catherine embrace", 1, false, 3, 100, 0, 1, 50),
              new Weapon("Catherine pout", 3, false, 4, 80, 0, 1, 50)],
    equipped: null,
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings); 
        this.setVelocity(0, 0);
        showTiles(this, this.id);
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
		updateOnHover(this);
        return moveCharacter(this,this.id);
    }
 
});