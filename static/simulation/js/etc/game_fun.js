function progressTurn() {
    if (game.data.turn === 0) {
        game.data.turn = 1;
        $("#turn").html("Player 2's Turn");
    }
    else {
        game.data.turn = 0;
        $("#turn").html("Player 1's Turn");
    }
}