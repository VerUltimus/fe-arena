
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		moving : [false , false, false],
        attacking : false,
        location_x : [384,288,320],
        location_y : [256,288,320],
        update_plz : [false,false,false],
        highlight_x : [],
        highlight_y : [],
        movement : [6,5,8],
        range : [[1,2],[2],[2,3]],
        turn: 0,
        waited : [false, false, false],
        moved : [false,false,false],
        show_menu : false,
        teams : [0,0,1],
        battle : battle
	},
	
	
    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init("screen", 640, 480, true, 1.25)) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
		
		// add "#debug" to the URL to enable the debug Panel
		if (document.location.hash === "#debug") {
			window.onReady(function () {
				me.plugin.register.defer(debugPanel, "debug");
			});
		}

        // Initialize the audio.
        me.audio.init("mp3");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
     
        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },



    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.entityPool.add("unit1", game.character1);
        me.entityPool.add("unit2", game.character2);
        me.entityPool.add("unit9", game.character9);
        // enable the keyboard
        me.input.bindKey(me.input.KEY.X, "click", true);
        // map the left button click on the X key
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.X);


        // Start the game.
        me.state.change(me.state.PLAY);
        $("#turn").html("Player 1's Turn");
    }

};
