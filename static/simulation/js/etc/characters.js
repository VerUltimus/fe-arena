/*------------------- 
Helper functions
-------------------------------- */

// Init battle when user clicks on a character 
function initBattle(char) {
    me.input.registerPointerEvent('click', char.collisionBox, function() {
        game.data.battle.init(char);
    });
}

//menu for after a character moves
function menu(index) {
	var locx = game.data.location_x[index] + 32;
	var locy = game.data.location_y[index];
	if (game.data.location_x[index] >= 576) {
	        locx = game.data.location_x[index] - 64;
	}
	if (game.data.location_y[index] >= 416) {
	        locy = 416;
	}
	me.game.add((new atk_button(locx,locy)), 4);
	me.game.add((new wait_button(locx,locy+32)), 4);
	me.game.add((new back_button(locx,locy+64)), 4);
}

// Fills the left side panel with character information when the mouse hovers over
function updateOnHover(char) {
	var x = (Math.floor(me.input.mouse.pos.x / 32));
	var y = (Math.floor(me.input.mouse.pos.y / 32));

	if (char.pos.x / 32 === x && char.pos.y / 32 === y) {

		game.data.hovered_over = char.id;

		$("#name").html(char.unit_name);
		$("#hp").html(char.cur_hp.toString() + "/" + char.stats.hp.toString());

		// Calculating and displaying stats
		$("#str").html(char.stats.str.toString());
		$("#mag").html(char.stats.mag.toString());
		$("#skl").html(char.stats.skl.toString());
		$("#spd").html(char.stats.spd.toString());
		$("#luk").html(char.stats.luk.toString());
		$("#res").html(char.stats.res.toString());
		$("#def").html(char.stats.def.toString());
		$("#hit").html(hit(char.stats).toString());
		$("#avo").html(avo(char.stats).toString());
		$("#crt").html(crit(char.stats).toString());

		// Displaying and selecting weapons
		var weaponString = "";

		for (var i = 0; i < char.weapons.length; i++) {
			if (char.player_one) {
				

				// Check if this weapon is equipped
				if (char.equipped != null && char.equipped === char.weapons[i]) {
					weaponString += "<input type=\"radio\" id=\""+ i + "\" name=\"equip\" value=\"" + i + "\" checked>" + char.weapons[i].name + "<br>";	
				} else {
					weaponString += "<input type=\"radio\" id=\""+ i + "\" name=\"equip\" value=\"" + i + "\">" + char.weapons[i].name + "<br>";	
				}
			}
			else {
				weaponString += char.weapons[i].name + "<br>";
			}
		}

		$("#weapon").html(weaponString);

		// Update the pre-battle box if someone is attacking
		var isTargeted = (me.game.currentLevel.getLayerByName("map_layer").getTileId(x * 32,y * 32) == 2);
		if (!char.player_one && game.data.attacking && isTargeted) {
			game.data.battle.setTarget(char);
		}
	}
}

// Updates the weapon if was selected
function updateWeapon(char, i) {
   	if (game.data.hovered_over === char.id) {
    	var index = $('input[name=equip]:checked').val();
      	if (typeof index != 'undefined') {
        	char.equipped = char.weapons[index];
        	game.data.weap_range[i] = char.equipped.range;
      	}
  	}
}

// Moves a character to a tile selected via click
function moveCharacter(char, index) {
    if (game.data.go_back[index]) {
        game.data.go_back[index] = false;
        char.pos.x = game.data.back_x;
        char.pos.y = game.data.back_y;
        game.data.location_x[index] = game.data.back_x;
        game.data.location_y[index] = game.data.back_y;
        return true;
    } else if (game.data.show_menu || game.data.waited[index]) {
        return true;
    } else if (game.data.moving[index] && me.input.keyStatus("click")) {

        var x = (Math.floor(me.input.mouse.pos.x / 32));
        var y = (Math.floor(me.input.mouse.pos.y / 32));
        var tot_x = x + char.off_x - char.pos.x/32;
        var tot_y = y + char.off_y - char.pos.y/32;

        if (Math.abs(tot_x)+Math.abs(tot_y) <= game.data.movement[index]) {

            var x1 = game.data.location_x.slice(0,0);
            var x2 = game.data.location_x.slice(1);
            var y1 = game.data.location_y.slice(0,0);
            var y2 = game.data.location_y.slice(1);
            var x_removed = x1.concat(x2);
            var y_removed = y1.concat(y2);
            if ((x_removed.indexOf(x*32) < 0) || (y_removed.indexOf(y*32) < 0)) {
                game.data.location_x[index] = x*32;
                game.data.location_y[index] = y*32;
                char.pos.x = x*32;
                char.pos.y = y*32;
                char.off_x = tot_x;
                char.off_y = tot_y;
            }
        }
        return true;

    } 

    else if (game.data.update_plz[index]) {
        game.data.update_plz[index] = false;
        return true;
    } 

    else if (!game.data.moving[index]) {
        char.off_x = 0;
        char.off_y = 0;
    }

    return false;
}

// Shows blue and red tiles for a character on the first click
function showTiles(char, index) {
    me.input.registerPointerEvent('click', char.collisionBox, function() {
        var menuing = game.data.moved.indexOf(true) >= 0;
        var isTargeted = (me.game.currentLevel.getLayerByName("map_layer").getTileId(char.pos.x,char.pos.y) == 2);
        if (game.data.attacking && game.data.turn != game.data.teams[index] && isTargeted) {
            var i = game.data.moved.indexOf(true);
            game.data.moved[i] = false;
            game.data.waited[i] = true;
            game.data.attacking = false;
            for (m in game.data.buttons) {
                    me.game.remove(game.data.buttons[m]);
            }
            while (game.data.highlight_x.length > 0) {
                    me.game.currentLevel.getLayerByName("map_layer").setTile(game.data.highlight_x.pop(),game.data.highlight_y.pop(), 1);
            }
            game.data.buttons = [];
            game.data.update_plz[i] = true;
            game.data.show_menu = false;
            console.log("simulating battle");
            game.data.battle.simulate();
            game.data.battle.reset();
        } else if ((game.data.moving.indexOf(true) < 0) && !game.data.waited[index] && !menuing && (game.data.teams[index] === game.data.turn)) {
            //game.data.battle.init(char);
            game.data.back_x = game.data.location_x[index];
            game.data.back_y = game.data.location_y[index];

            for (var i = -(game.data.movement[index]); i <= game.data.movement[index]; i++) {

                var k = Math.abs(i);
                var cx = game.data.location_x[index]/32;
                var cy = game.data.location_y[index]/32;

                for (var j = k - game.data.movement[index]; j <= game.data.movement[index] - k; j++) {

                    var hx = cx + i;
                    var hy = cy + j;

                    if ((hx >= 0)&&(hx <= 19)&&(hy >= 0)&&(hy <= 14)) {

                        var corner = (Math.abs(i) + Math.abs(j)) == game.data.movement[index];

                        if (corner) {
                            for (m in game.data.range[index]) {

                                var l = game.data.range[index][m];

                                if (i <= 0 && j <= 0) {
                                    for (var n = 0; n <= l; n++) {
                                        if ((hx - n) >= 0 && (hy - (l - n)) >= 0) {
                                            game.data.highlight_x.push(hx - n);
                                            game.data.highlight_y.push(hy - l + n);
                                            me.game.currentLevel.getLayerByName("map_layer").setTile(hx-n,hy-l+n,2);
                                        }
                                    }
                                } 

                                else if (i <= 0 && j >= 0) {
                                    for (var n = 0; n <= l; n++) {
                                        if ((hx - n) >= 0 && (hy + (l - n)) <= 14) {
                                            game.data.highlight_x.push(hx - n);
                                            game.data.highlight_y.push(hy + l - n);
                                            me.game.currentLevel.getLayerByName("map_layer").setTile(hx-n,hy+l-n,2);
                                        }
                                    }
                                } 

                                else if (i >= 0 && j <= 0) {
                                    for (var n = 0; n <= l; n++) {
                                        if ((hx + n) <= 19 && (hy - (l - n)) >= 0) {
                                            game.data.highlight_x.push(hx + n);
                                            game.data.highlight_y.push(hy - l+ n);
                                            me.game.currentLevel.getLayerByName("map_layer").setTile(hx+n,hy-l+n,2);
                                        }
                                    }
                                } 

                                else if (i >= 0 && j >= 0) {
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
        game.data.moving[index] = true;
        char.off_x = 0;
        char.off_y = 0;
        game.data.update_plz[index] = true;
        } 

        else if (game.data.moving[index]) {
            while (game.data.highlight_x.length > 0) {
                me.game.currentLevel.getLayerByName("map_layer").setTile(game.data.highlight_x.pop(),game.data.highlight_y.pop(), 1);
            }

            game.data.moving[index] = false;
            game.data.moved[index] = true;
            game.data.show_menu = true;
            menu(index);
            game.data.update_plz[index] = true;
        }
    });
}