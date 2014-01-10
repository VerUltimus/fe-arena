/*------------------- 
a character entity
-------------------------------- */

game.character1 = me.ObjectEntity.extend({

    movement : 6,
    off_x : 0,
    off_y : 0,
    char_name : "Gurl",
    str: 20,
    mag: 20,
    skl: 20,
    spd: 20,
    luk: 20,
    def: 20,
    res: 20,
    bottom_side: true,
    weapon1: "Bronze Sword",
    weapon2: "Bronze Axe",
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings); 

        this.setVelocity(0, 0);

        me.input.registerPointerEvent('click', this.collisionBox, function() {
            if (game.data.moving.indexOf(true) < 0) {
                for (var i = -(game.data.movement[0]); i <= game.data.movement[0]; i++) {
                    var k = Math.abs(i);
                    var cx = game.data.location_x[0]/32;
                    var cy = game.data.location_y[0]/32;
                    for (var j = k - game.data.movement[0]; j <= game.data.movement[0] - k; j++) {
                        var hx = cx + i;
                        var hy = cy + j;
                        if ((hx >= 0)&&(hx <= 19)&&(hy >= 0)&&(hy <= 14)) {
                            var corner = (Math.abs(i) + Math.abs(j)) == game.data.movement[0];
                            if (corner) {
                                for (m in game.data.range[0]) {
                                    var l = game.data.range[0][m];
                                    if (i <= 0 && j <= 0) {
                                        for (var n = 0; n <= l; n++) {
                                            if ((hx - n) >= 0 && (hy - (l - n)) >= 0) {
                                                game.data.highlight_x.push(hx - n);
                                                game.data.highlight_y.push(hy - l + n);
                                                me.game.currentLevel.getLayerByName("map_layer").setTile(hx-n,hy-l+n,2);
                                            }
                                        }
                                    } else if (i <= 0 && j >= 0) {
                                        for (var n = 0; n <= l; n++) {
                                            if ((hx - n) >= 0 && (hy + (l - n)) <= 14) {
                                                game.data.highlight_x.push(hx - n);
                                                game.data.highlight_y.push(hy + l - n);
                                                me.game.currentLevel.getLayerByName("map_layer").setTile(hx-n,hy+l-n,2);
                                            }
                                        }
                                    } else if (i >= 0 && j <= 0) {
                                        for (var n = 0; n <= l; n++) {
                                            if ((hx + n) <= 19 && (hy - (l - n)) >= 0) {
                                                game.data.highlight_x.push(hx + n);
                                                game.data.highlight_y.push(hy - l+ n);
                                                me.game.currentLevel.getLayerByName("map_layer").setTile(hx+n,hy-l+n,2);
                                            }
                                        }
                                    } else if (i >= 0 && j >= 0) {
                                        for (var n = 0; n <= l; n++) {
                                            if ((hx + n) <= 19 && (hy + (l - n)) <= 14) {
                                                game.data.highlight_x.push(hx + n);
                                                game.data.highlight_y.push(hy + l - n);
                                                me.game.currentLevel.getLayerByName("map_layer").setTile(hx+n,hy+l-n,2);
                                            }
                                        }
                                    }
                                }
                            }
                            game.data.highlight_x.push(hx);
                            game.data.highlight_y.push(hy);
                            me.game.currentLevel.getLayerByName("map_layer").setTile(hx,hy,3);
                        }
                    }
                }
                game.data.moving[0] = true;
                this.off_x = 0;
                this.off_y = 0;
                game.data.update_plz[0] = true;
            } else if (game.data.moving[0]) {
                while (game.data.highlight_x.length > 0) {
                    me.game.currentLevel.getLayerByName("map_layer").setTile(game.data.highlight_x.pop(),game.data.highlight_y.pop(), 1);
                }
                game.data.moving[0] = false;
                game.data.update_plz[0] = true;
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
            $("#name").html(this.char_name);

            // Calculating and displaying stats
            $("#str").html(this.str.toString());
            $("#mag").html(this.mag.toString());
            $("#skl").html(this.skl.toString());
            $("#spd").html(this.spd.toString());
            $("#luk").html(this.luk.toString());
            $("#res").html(this.res.toString());
            $("#def").html(this.def.toString());
            $("#hit").html(((this.skl * 3 + this.luk) / 2).toString());
            $("#avo").html(((this.spd * 3 + this.luk) / 2).toString());
            $("#crt").html((this.skl / 2).toString());

            // Displaying and selecting weapons
            var weaponString = "";

            if (this.bottom_side) {
                weaponString = "<input type=\"radio\" name=\"equip\" value=\"sword\">" + this.weapon1 + "<br>" 
                    + "<input type=\"radio\" name=\"equip\" value=\"axe\">" + this.weapon2 + "<br>";
            } else {
                weaponString = this.weapon1 + "<br>";
                weaponString = this.weapon2 + "<br>";
            }

            $("#weapon").html(weaponString);
        }

        if (game.data.moving[0] && me.input.keyStatus("click")) {

            var tot_x = x + this.off_x - this.pos.x/32;
            var tot_y = y + this.off_y - this.pos.y/32;
            if (Math.abs(tot_x)+Math.abs(tot_y) <= game.data.movement[0]) {
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
                }
            }
            return true;
        } else if (game.data.update_plz[0]) {
            game.data.update_plz[0] = false;
            return true;
        } else if (!game.data.moving[0]) {
            this.off_x = 0;
            this.off_y = 0;
            //return true;
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
    char_name : "Dude",
    str: 10,
    mag: 10,
    skl: 10,
    spd: 10,
    luk: 10,
    def: 10,
    res: 10,
    bottom_side: false,
    weapon1: "Bronze Sword",
    weapon2: "Bronze Axe",
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings); 

        this.setVelocity(0, 0);

        me.input.registerPointerEvent('click', this.collisionBox, function() {
            if (game.data.moving.indexOf(true) < 0) {
                for (var i = -(game.data.movement[1]); i <= game.data.movement[1]; i++) {
                    var k = Math.abs(i);
                    var cx = game.data.location_x[1]/32;
                    var cy = game.data.location_y[1]/32;
                    for (var j = k - game.data.movement[1]; j <= game.data.movement[1] - k; j++) {
                        var hx = cx + i;
                        var hy = cy + j;
                        if ((hx >= 0)&&(hx <= 19)&&(hy >= 0)&&(hy <= 14)) {
                            var corner = (Math.abs(i) + Math.abs(j)) == game.data.movement[1];
                            if (corner) {
                                for (m in game.data.range[1]) {
                                    var l = game.data.range[1][m];
                                    if (i <= 0 && j <= 0) {
                                        for (var n = 0; n <= l; n++) {
                                            if ((hx - n) >= 0 && (hy - (l - n)) >= 0) {
                                                game.data.highlight_x.push(hx - n);
                                                game.data.highlight_y.push(hy - l + n);
                                                me.game.currentLevel.getLayerByName("map_layer").setTile(hx-n,hy-l+n,2);
                                            }
                                        }
                                    } else if (i <= 0 && j >= 0) {
                                        for (var n = 0; n <= l; n++) {
                                            if ((hx - n) >= 0 && (hy + (l - n)) <= 14) {
                                                game.data.highlight_x.push(hx - n);
                                                game.data.highlight_y.push(hy + l - n);
                                                me.game.currentLevel.getLayerByName("map_layer").setTile(hx-n,hy+l-n,2);
                                            }
                                        }
                                    } else if (i >= 0 && j <= 0) {
                                        for (var n = 0; n <= l; n++) {
                                            if ((hx + n) <= 19 && (hy - (l - n)) >= 0) {
                                                game.data.highlight_x.push(hx + n);
                                                game.data.highlight_y.push(hy - l+ n);
                                                me.game.currentLevel.getLayerByName("map_layer").setTile(hx+n,hy-l+n,2);
                                            }
                                        }
                                    } else if (i >= 0 && j >= 0) {
                                        for (var n = 0; n <= l; n++) {
                                            if ((hx + n) <= 19 && (hy + (l - n)) <= 14) {
                                                game.data.highlight_x.push(hx + n);
                                                game.data.highlight_y.push(hy + l - n);
                                                me.game.currentLevel.getLayerByName("map_layer").setTile(hx+n,hy+l-n,2);
                                            }
                                        }
                                    }
                                }
                            }
                            game.data.highlight_x.push(hx);
                            game.data.highlight_y.push(hy);
                            me.game.currentLevel.getLayerByName("map_layer").setTile(hx,hy,3);
                        }
                    }
                }
                game.data.moving[1] = true;
                this.off_x = 0;
                this.off_y = 0;
                game.data.update_plz[1] = true;
            } else if (game.data.moving[1]) {
                while (game.data.highlight_x.length > 0) {
                    me.game.currentLevel.getLayerByName("map_layer").setTile(game.data.highlight_x.pop(),game.data.highlight_y.pop(), 1);
                }
                game.data.moving[1] = false;
                game.data.update_plz[1] = true;
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
            $("#name").html(this.char_name);

            // Calculating and displaying stats
            $("#str").html(this.str.toString());
            $("#mag").html(this.mag.toString());
            $("#skl").html(this.skl.toString());
            $("#spd").html(this.spd.toString());
            $("#luk").html(this.luk.toString());
            $("#res").html(this.res.toString());
            $("#def").html(this.def.toString());
            $("#hit").html(((this.skl * 3 + this.luk) / 2).toString());
            $("#avo").html(((this.spd * 3 + this.luk) / 2).toString());
            $("#crt").html((this.skl / 2).toString());

            // Displaying and selecting weapons
            var weaponString = "";

            if (this.bottom_side) {
                weaponString = "<input type=\"radio\" name=\"equip\" value=\"sword\">" + this.weapon1 + "<br>" 
                    + "<input type=\"radio\" name=\"equip\" value=\"axe\">" + this.weapon2 + "<br>";
            } else {
                weaponString = this.weapon1 + "<br>" + this.weapon2 + "<br>";
            }

            $("#weapon").html(weaponString);
        }

        if (game.data.moving[1] && me.input.keyStatus("click")) {

            var tot_x = x + this.off_x - this.pos.x/32;
            var tot_y = y + this.off_y - this.pos.y/32;
            if (Math.abs(tot_x)+Math.abs(tot_y) <= game.data.movement[1]) {
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
                }
            }
            return true;
        } else if (game.data.update_plz[1]) {
            game.data.update_plz[1] = false;
            return true;
        } else if (!game.data.moving[1]) {
            this.off_x = 0;
            this.off_y = 0;
        }
        return false;
    }
 
});

game.character9 = me.ObjectEntity.extend({

    movement : 6,
    off_x : 0,
    off_y : 0,
    char_name : "Catherine :3",
    str: 20,
    mag: 20,
    skl: 20,
    spd: 20,
    luk: 20,
    def: 20,
    res: 20,
    bottom_side: true,
    weapon1: "Slap",
    weapon2: "Whine",
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings); 

        this.setVelocity(0, 0);

        me.input.registerPointerEvent('click', this.collisionBox, function() {
            if (game.data.moving.indexOf(true) < 0) {
                for (var i = -(game.data.movement[2]); i <= game.data.movement[2]; i++) {
                    var k = Math.abs(i);
                    var cx = game.data.location_x[2]/32;
                    var cy = game.data.location_y[2]/32;
                    for (var j = k - game.data.movement[2]; j <= game.data.movement[2] - k; j++) {
                        var hx = cx + i;
                        var hy = cy + j;
                        if ((hx >= 0)&&(hx <= 19)&&(hy >= 0)&&(hy <= 14)) {
                            var corner = (Math.abs(i) + Math.abs(j)) == game.data.movement[2];
                            if (corner) {
                                for (m in game.data.range[2]) {
                                    var l = game.data.range[2][m];
                                    if (i <= 0 && j <= 0) {
                                        for (var n = 0; n <= l; n++) {
                                            if ((hx - n) >= 0 && (hy - (l - n)) >= 0) {
                                                game.data.highlight_x.push(hx - n);
                                                game.data.highlight_y.push(hy - l + n);
                                                me.game.currentLevel.getLayerByName("map_layer").setTile(hx-n,hy-l+n,2);
                                            }
                                        }
                                    } else if (i <= 0 && j >= 0) {
                                        for (var n = 0; n <= l; n++) {
                                            if ((hx - n) >= 0 && (hy + (l - n)) <= 14) {
                                                game.data.highlight_x.push(hx - n);
                                                game.data.highlight_y.push(hy + l - n);
                                                me.game.currentLevel.getLayerByName("map_layer").setTile(hx-n,hy+l-n,2);
                                            }
                                        }
                                    } else if (i >= 0 && j <= 0) {
                                        for (var n = 0; n <= l; n++) {
                                            if ((hx + n) <= 19 && (hy - (l - n)) >= 0) {
                                                game.data.highlight_x.push(hx + n);
                                                game.data.highlight_y.push(hy - l+ n);
                                                me.game.currentLevel.getLayerByName("map_layer").setTile(hx+n,hy-l+n,2);
                                            }
                                        }
                                    } else if (i >= 0 && j >= 0) {
                                        for (var n = 0; n <= l; n++) {
                                            if ((hx + n) <= 19 && (hy + (l - n)) <= 14) {
                                                game.data.highlight_x.push(hx + n);
                                                game.data.highlight_y.push(hy + l - n);
                                                me.game.currentLevel.getLayerByName("map_layer").setTile(hx+n,hy+l-n,2);
                                            }
                                        }
                                    }
                                }
                            }
                            game.data.highlight_x.push(hx);
                            game.data.highlight_y.push(hy);
                            me.game.currentLevel.getLayerByName("map_layer").setTile(hx,hy,3);
                        }
                    }
                }
                game.data.moving[2] = true;
                this.off_x = 0;
                this.off_y = 0;
                game.data.update_plz[2] = true;
            } else if (game.data.moving[2]) {
                while (game.data.highlight_x.length > 0) {
                    me.game.currentLevel.getLayerByName("map_layer").setTile(game.data.highlight_x.pop(),game.data.highlight_y.pop(), 1);
                }
                game.data.moving[2] = false;
                game.data.update_plz[2] = true;
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
            $("#name").html(this.char_name);

            // Calculating and displaying stats
            $("#str").html(this.str.toString());
            $("#mag").html(this.mag.toString());
            $("#skl").html(this.skl.toString());
            $("#spd").html(this.spd.toString());
            $("#luk").html(this.luk.toString());
            $("#res").html(this.res.toString());
            $("#def").html(this.def.toString());
            $("#hit").html(((this.skl * 3 + this.luk) / 2).toString());
            $("#avo").html(((this.spd * 3 + this.luk) / 2).toString());
            $("#crt").html((this.skl / 2).toString());

            // Displaying and selecting weapons
            var weaponString = "";

            if (this.bottom_side) {
                weaponString = "<input type=\"radio\" name=\"equip\" value=\"sword\">" + this.weapon1 + "<br>" 
                    + "<input type=\"radio\" name=\"equip\" value=\"axe\">" + this.weapon2 + "<br>";
            } else {
                weaponString = this.weapon1 + "<br>";
                weaponString = this.weapon2 + "<br>";
            }

            $("#weapon").html(weaponString);
        }

        if (game.data.moving[2] && me.input.keyStatus("click")) {

            var tot_x = x + this.off_x - this.pos.x/32;
            var tot_y = y + this.off_y - this.pos.y/32;
            if (Math.abs(tot_x)+Math.abs(tot_y) <= game.data.movement[2]) {
                var x1 = game.data.location_x.slice(0,0);
                var x2 = game.data.location_x.slice(1);
                var y1 = game.data.location_y.slice(0,0);
                var y2 = game.data.location_y.slice(1);
                var x_removed = x1.concat(x2);
                var y_removed = y1.concat(y2);
                if ((x_removed.indexOf(x*32) < 0) || (y_removed.indexOf(y*32) < 0)) {
                    game.data.location_x[2] = x*32;
                    game.data.location_y[2] = y*32;
                    this.pos.x = x*32;
                    this.pos.y = y*32;
                    this.off_x = tot_x;
                    this.off_y = tot_y;
                    console.log("moved");
                }
            }
            return true;
        } else if (game.data.update_plz[2]) {
            game.data.update_plz[2] = false;
            return true;
        } else if (!game.data.moving[2]) {
            this.off_x = 0;
            this.off_y = 0;
            //return true;
        }
        return false;
    }
 
});
