/*--------------------------------------------------------

Handling Category 5 Skills-Pre Battle Calculation Bonuses

---------------------------------------------------------*/

// Checks for effects on turns
function checkTurn(battle, skill, turn, attacking) {
	switch (skill.id) {

	}
}

// No-condition skills
function checkStatic(battle, skill, attacking) {
	switch (skill.id) {
		// Gamble
		case 1:
			if (attacking) {
				battle.att_acc = fit_to_range(battle.att_acc - 5);
				battle.att_crit = fit_to_range(battle.att_crit + 10);
			} else {
				battle.tar_acc = fit_to_range(battle.tar_acc - 5);
				battle.tar_crit = fit_to_range(battle.tar_crit + 10);
			}
			break;
		// Hit Rate +20
		case 2: 
			if (attacking) {
				battle.att_acc = fit_to_range(battle.att_acc + 20);
			} else {
				battle.tar_acc = fit_to_range(battle.tar_acc + 20);
			}
			break;
		// Zeal
		case 3:
			if (attacking) {
				battle.att_crit = fit_to_range(battle.att_crit + 5);
			} else {
				battle.tar_crit = fit_to_range(battle.tar_crit + 5);
			}
			break;
		// Avoid +10
		case 4:
			if (attacking) {
				battle.tar_acc = fit_to_range(battle.tar_acc - 10);
			} else {
				battle.att_acc = fit_to_range(battle.att_acc - 10);
			}
			break;
		default:
			break;
	}
}

// Breaker skills
function checkBreaker(battle, skill, weapon, attacking) {
	// Sword, Lance, Axe, Bow, Tome, in that order
	if (skill.id == weapon.category) {
		if (attacking) {
			battle.tar_acc = fit_to_range(battle.tar_acc - 50);
			battle.att_acc = fit_to_range(battle.att_acc + 50);
		} else {
			battle.tar_acc = fit_to_range(battle.tar_acc + 50);
			battle.att_acc = fit_to_range(battle.att_acc - 50);
		}
	}
}

// Checks for no allies (0), enemies (1), or units (2) depending on the value of check
function checkIsolated(char, check) {

}
// Checks for both attacker and target if they are in range of Charm, Anathema, Demoiselle, Hex, or Solidarity
function checkInRangeOf(battle) {

}

// Changes the parameters of a battle based on the attacker and target's category 5 skills
function updatePreBattle(battle) {

	checkInRangeOf(battle);

	// Checking attacker
	for (var i = 0; i < battle.attacker.skills.length; i++) {
		if (battle.attacker.skills[i].category == 5) {
			switch (battle.attacker.skills[i].subcategory) {
				case 1:
					checkTurn(battle, battle.attacker.skills[i], game.data.turn, true);
					break;
				case 2:
					checkStatic(battle, battle.attacker.skills[i], true);
					break;
				case 3:
					checkBreaker(battle, battle.attacker.skills[i], battle.target.equipped, true);
					break;
				default:
					break;
			}
		}
	}

	// Checking defender
	for (var i = 0; i < battle.target.skills.length; i++) {
		if (battle.target.skills[i].category == 5) {
			switch (battle.attacker.skills[i].subcategory) {
				case 1:
					checkTurn(battle, battle.target.skills[i], game.data.turn, false);
					break;
				case 2:
					checkStatic(battle, battle.target.skills[i], false);
					break;
				case 3:
					checkBreaker(battle, battle.target.skills[i], battle.attacker.equipped, false);
					break;
				default:
					break;	
			}
		}
	}
}