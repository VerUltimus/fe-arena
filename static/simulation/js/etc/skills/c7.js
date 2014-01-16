/*--------------------------------------------------------

Handling Category 7 Skills-Post Battle Bonuses

---------------------------------------------------------*/

function updatePostBattle(battle) {

	// Checking attacker
	for (var i = 0; i < battle.attacker.skills.length; i++) {
		if (battle.attacker.skills[i].category == 7 && battle.target.cur_hp == 0) {
			switch (battle.attacker.skills[i].id) {
				// Lifetaker
				case 1:
					battle.attacker.cur_hp = (battle.attacker.stats.hp / 2) + battle.attacker.cur_hp;
					if (battle.attacker.cur_hp > battle.attacker.stats.hp) {
						battle.attacker.cur_hp = battle.attacker.stats.hp;
					}
					break;
				// Galeforce
				case 2:
					break;
				default:
					break;
			}
		}
	}
}