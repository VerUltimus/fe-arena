/*--------------------------------------------------------

Handling Category 4 Skills-Attribute Bonuses On Character Load

---------------------------------------------------------*/

function updateStat(stats, amount) {
	stats.str += amount;
	stats.mag += amount;
	stats.skl += amount;
	stats.spd += amount;
	stats.luk += amount;
	stats.def += amount;
	stats.res += amount;
}

function updateAttribute(char) {
	for (var i = 0; i < char.skills.length; i++) {
		if (char.skills[i].category == 4) {
			if (char.skills[i].subcategory == 1) {
				switch (char.skills[i].id) {
					// All Stats +2
					case 1:
						updateStat(char.stats, 2);
						break;
					// Limit Breaker
					case 2: 
						updateStat(char.stats, 10);
						break;
					default: 
						break;
				}
			}
			else if (char.skills[i].subcategory == 2) {
				switch (char.skills[i].id) {
					// HP
					case 1:
						char.hp += 5; break;
					// Str
					case 2: 
						char.str += 2; break;
					// Mag
					case 3:
						char.mag += 2; break;
					// Skl
					case 4: 
						char.skl += 2; break;
					// Spd
					case 5:
						char.spd += 2; break;
					// Def
					case 6: 
						char.def += 2; break;
					// Res
					case 7:
						char.res += 2; break;
					// Res10
					case 8: 
						char.res += 10; break;
					// Mov
					case 9: 
						char.mov += 1; break;
					default:
						break;
				}
			}
		}
	}
}