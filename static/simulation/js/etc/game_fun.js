function progressTurn() {
    if (game.data.turn === 0) {
        game.data.turn = 1;
        game.data.waited = [false,false,false];
        $("#turn").html("Player 2's Turn");
    }
    else {
        game.data.turn = 0;
        game.data.waited = [false,false,false];
        $("#turn").html("Player 1's Turn");
    }
}