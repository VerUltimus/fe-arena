/*------------------- 
a character entity
-------------------------------- */

game.character1 = me.ObjectEntity.extend({

    id: 0,
    off_x : 0,
    off_y : 0,
    unit_name : "Gurl",
    stats: new Stats(80,20,20,60,60,60,20,20,6),
    cur_hp: 80,
    player_one: true,
    skills: [],
    weapons: [new Weapon("Bronze Sword", 1, false, 3, 100, 0, [1], 50, 0, 0),
              new Weapon("Bronze Axe", 3, false, 4, 80, 0, [1,2], 50, 0, 0)],
    equipped: null,
 
    init: function(x, y, settings) {
        this.parent(x, y, settings); 
        this.setVelocity(0, 0);
        showTiles(this,this.id);
        initBattle(this);
    },

    update: function() {
        updateOnHover(this);
        updateWeapon(this, this.id);
        return moveCharacter(this, this.id);
    }
 
});

game.character2 = me.ObjectEntity.extend({

    id: 1,
    off_x : 0,
    off_y : 0,
    unit_name : "Dude",
    stats: new Stats(80,10,10,10,10,10,10,10,5),
    cur_hp: 80,
    player_one: true,
    weapons: [new Weapon("Bronze Sword", 1, false, 3, 100, 0, [1], 50, 0, 0),
              new Weapon("Bronze Axe", 3, false, 4, 80, 0, [1], 50, 0, 0)],
    equipped: null,
  
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings); 
        this.setVelocity(0, 0);
        showTiles(this,this.id);
    },
 
    update: function() {
        updateOnHover(this);
        return moveCharacter(this, this.id);
    }
 
});

game.character9 = me.ObjectEntity.extend({

    id: 2,
    off_x : 0,
    off_y : 0,
    unit_name : "Catherine :3 - best girlfriend",
    stats: new Stats(80,99,20,99,99,20,20,20,8),
    cur_hp: 80,
    player_one: false,
    weapons: [new Weapon("Catherine embrace", 1, false, 3, 100, 0, [1], 50, 0, 0),
              new Weapon("Catherine pout", 3, false, 4, 80, 0, [1,2,3,4], 50, 0, 0)],
    equipped: null,
 
    init: function(x, y, settings) {
        this.parent(x, y, settings); 
        this.setVelocity(0, 0);
        showTiles(this, this.id);
    },

    update: function() {
		updateOnHover(this);
        return moveCharacter(this,this.id);
    }
 
});