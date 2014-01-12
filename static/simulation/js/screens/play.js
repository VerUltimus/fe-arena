game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {

		me.levelDirector.loadLevel("map_prototype");
		//me.sys.preRender = false;
				// reset the score
		game.data.moving = [false , false,false];
		game.data.location_x = [384,288,320];
		game.data.location_y = [256,288,320];
		game.data.update_plz = [false,false,false];
		game.data.highlight_x = [];
		game.data.highlight_y = [];
		game.data.movement = [6,5,8];
		game.data.range = [[1,2],[2],[2,3]];
		game.data.turn = 0;
		game.data.waited = [false,false,false];
		game.data.moved = [false,false,false];
		game.data.show_menu = false;
		game.data.teams = [0,0,1];
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
