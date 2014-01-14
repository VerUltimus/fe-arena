/*--------------------------------------------------------

Buttons.js holds all of the buttons used in menus

---------------------------------------------------------*/

var atk_button = me.GUI_Object.extend({
    init: function(x,y) {
        settings = {}
        settings.image = "atk_button";
        settings.spritewidth = 0;
        settings.spriteheight = 0;
        this.parent(x,y,settings);
        game.data.buttons.push(this);
    },

    onClick: function(event) {
        var i = game.data.moved.indexOf(true);
        for (m in game.data.buttons) {
                me.game.remove(game.data.buttons[m]);
        }
        var locx = game.data.location_x[i];
        var locy = game.data.location_y[i];
        game.data.buttons = [];
        me.game.add((new menu_back_button(locx,locy)), 4);
        locx = game.data.location_x[i]/32;
        locy = game.data.location_y[i]/32;
        if (game.data.weap_range[i] != []) {
            for (m in game.data.weap_range[i]) {
                var l = game.data.weap_range[i][m];
                console.log(l);
                for (var x = -l; x <= l; x++) {
                    var y1 = l - Math.abs(x);
                    var y2 = Math.abs(x) - l;
                    var hx = locx + x;
                    var hy1 = locy + y1;
                    var hy2 = locy + y2;
                    if (hx >= 0 && hx <= 19 && hy1 <= 14) {
                        game.data.highlight_x.push(hx);
                        game.data.highlight_y.push(hy1);
                        me.game.currentLevel.getLayerByName("map_layer").setTile(hx,hy1,2);
                    }
                    if (hx >= 0 && hx <= 19 && hy2 >= 0) {
                        game.data.highlight_x.push(hx);
                        game.data.highlight_y.push(hy2);
                        me.game.currentLevel.getLayerByName("map_layer").setTile(hx,hy2,2);
                    }
                }
            }
        }
        game.data.update_plz[i] = true;
        game.data.attacking = true;
    }
});

var menu_back_button = me.GUI_Object.extend({
    init: function(x,y) {
   		settings = {}
   		settings.image = "menu_back_button";
   		settings.spritewidth = 0;
   		settings.spriteheight = 0;
   		this.parent(x,y,settings);
   		game.data.buttons.push(this);
    },

    onClick: function(event) {
        var i = game.data.moved.indexOf(true);
        for (m in game.data.buttons) {
            me.game.remove(game.data.buttons[m]);
        }
        game.data.buttons = [];
        while (game.data.highlight_x.length > 0) {
            me.game.currentLevel.getLayerByName("map_layer").setTile(game.data.highlight_x.pop(),game.data.highlight_y.pop(), 1);
        }
        menu(i);
        game.data.update_plz[i] = true;
        game.data.attacking = false;
        game.data.battle.reset();
    }
});

var wait_button = me.GUI_Object.extend({
    init: function(x,y) {
        settings = {}
        settings.image = "wait_button";
        settings.spritewidth = 0;
        settings.spriteheight = 0;
        this.parent(x,y,settings);
        game.data.buttons.push(this);
    },

    onClick: function(event) {
        var i = game.data.moved.indexOf(true);
        game.data.moved[i] = false;
        game.data.waited[i] = true;
        for (m in game.data.buttons) {
                me.game.remove(game.data.buttons[m]);
        }
        game.data.buttons = [];
        game.data.show_menu = false;
        game.data.update_plz[i] = true;
    }
});

var back_button = me.GUI_Object.extend({
    init: function(x,y) {
        settings = {}
        settings.image = "back_button";
        settings.spritewidth = 0;
        settings.spriteheight = 0;
        this.parent(x,y,settings);
        game.data.buttons.push(this);
    },

    onClick: function(event) {
        var i = game.data.moved.indexOf(true);
        game.data.moved[i] = false;
        game.data.show_menu = false;
        game.data.go_back[i] = true;
        for (m in game.data.buttons) {
            me.game.remove(game.data.buttons[m]);
        }
        game.data.buttons = [];
        game.data.update_plz[i] = true;
    }
});