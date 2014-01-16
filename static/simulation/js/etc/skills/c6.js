/*--------------------------------------------------------

Handling Category 6 Skills-Battle Procs

---------------------------------------------------------*/

// Returns a boolean array for offensive skills:
// [Lethality, Aether, Astra, Sol, Luna, Ignis, Vengeance]
function offArray(skills) {
	var procs = [false, false, false, false, false, false, false, false];
	for (var i = 0; i < skills.length; i++) {
		if (i.category == 6 && i.subcategory == 1) {
			procs[i.id - 1] = true;
		}
	}
	return procs;
}

// Returns a boolean array for defensive skills:
// [Aegis, Pavise, Miracle, Counter]
function defArray(skills) {
	var procs = [false, false, false, false];
	for (var i = 0; i < skills.length; i++) {
		if (i.category == 6 && i.subcategory == 2) {
			procs[i.id - 1] = true;
		}
	}
	return procs;
}

// Returns a boolean array for utility skills:
// [Vantage, Armsthrift, Rightful King, Healtouch]
function utilArray(skills) {
	var procs = [false, false, false];
	for (var i = 0; i < skills.length; i++) {
		if (i.category == 6 && i.subcategory == 3) {
			procs[i.id - 1] = true;
		}
	}
	return procs;
}

// Checks for procs on the attacker's offensive skills and
// Modifies the battle accordingly
function offenseCheck(att, tar, dmg, acc, crit, att_proc_mod, tar_proc_mod) {

	function sol() {
		return attack(att, tar, dmg, acc, crit, tar_proc_mod, true);
	}

	function normal(d) {
		return attack(att, tar, d, acc, crit, tar_proc_mod, false);
	}

	function luna() {
        // Magic calculation
        if (att.equipped.magic) { 
     		return normal(dmg + (tar.stats.res / 2));
        }
        // Physical calculation
        else {
          	return normal(dmg + (tar.stats.def / 2));   
        }
	}

	function ignis() {
		// Magic calculation
        if (att.equipped.magic) { 
     		return normal(dmg + (att.stats.str / 2));
        }
        // Physical calculation
        else {
          	return normal(dmg + (att.stats.mag / 2));   
        }
	}

	function vengeance() {
        return normal(dmg + ((att.stats.hp - att.cur_hp) / 2));
	}

	var triggers = new Array();
	var offense = offArray(att.skills);

	// RNG the skill triggers	
	for (var i = 0; i < offense.length; i++) {
		triggers[i] = Math.floor((Math.random()*100));
	}

	if (att.equipped == null) {
		return false;
	}

	// Lethality Check
	if (offense[0] && triggers[0] < (att.stats.skl / 4 + att_proc_mod)) {
		tar.cur_hp = 0;
		return true;
	}
	// Aether Check
	else if (offense[1] && triggers[1] < (att.stats.skl / 2 + att_proc_mod)) {
		return (sol() && luna());
	}
	// Astra Check
	else if (offense[2] && triggers[2] < (att.stats.skl / 2 + att_proc_mod)) {
		for (var i = 0; i < 5; i++) {
			if (normal(dmg)) {return true;}
		}
		return false;
	}
	// Sol Check
	else if (offense[3] && triggers[3] < (att.stats.skl + att_proc_mod)) {
		return sol();
	}
	// Luna Check
	else if (offense[4] && triggers[4] < (att.stats.skl + att_proc_mod)) {
		return luna();	
	}
	// Ignis Check
	else if (offense[5] && triggers[5] < (att.stats.skl + att_proc_mod)) {
		return ignis();
	}
	// Vengeance Check
	else if (offense[6] && triggers[6] < (att.stats.skl * 2 + att_proc_mod)) {
		return vengeance();
	}
	// No Procs
	else {
		return normal(dmg);
	}
}

// Checks for procs on the target's defensive skills
// Returns true if someone died
function defenseCheck(att, tar, dmg, tar_proc_mod) {
	var triggers = new Array();
	var defense = defArray(tar.skills);
	for (var i = 0; i < defense.length; i++) {
		triggers[i] = Math.floor((Math.random()*100));
	}

	var pavise_trigger = (att.equipped.category == 1 || att.equipped.category == 2 || att.equipped.category == 3 || att.equipped.category == 4);
	var aegis_trigger = (att.equipped.category == 5 || att.equipped.category == 6 || att.equipped.category == 7);

	// Aegis Check
	if (defense[0] && aegis_trigger && triggers[0] < (tar.stats.skl + tar_proc_mod)) {
		dmg /= 2;
	}
	// Pavise Check
	else if (defense[1] && pavise_trigger && triggers[1] < (tar.stats.skl + tar_proc_mod) && ) {
		dmg /= 2;
	}
	// Miracle Check
	if (defense[2] && triggers[2] < (tar.stats.luk + tar_proc_mod) && dmg > tar.cur_hp) {
		dmg = tar.cur_hp - 1;
	}

	tar.cur_hp -= dmg;

	// Counter Check
	if (defense[3] && tar.cur_hp > 0) {
		att.cur_hp -= dmg;
	}

	return dmg;
}

function decrease_use(unit, armsthrift) {
	if (!armsthrift || (Math.floor((Math.random()*100)) >= 2 * att.stats.luk)) {
		att.equipped.uses -= 1;
	}
}

function heal(att, tar, dmg, healtouch, armsthrift) {

	decrease_use(att, armsthrift);

	// Healtouch Check
	if (healtouch) {
		tar.cur_hp -= (dmg + 5);
	}
	else {
		tar.cur_hp -= dmg;
	}

	// Handle overflow for healing
    if (tar.cur_hp > tar.stats.hp) {
        tar.cur_hp = tar.stats.hp;
    }
}

// Simulate a single attack and returns true if either character was killed
function attack(att, tar, dmg, acc, crit, tar_proc_mod, sol_active) {

	// Generate a number in between 0 and 99 for hit checking
    var p_hit = Math.floor((Math.random()*100));
    if (p_hit < acc) {
    	// Generate a number in between 0 and 99 for crit checking
    	var p_crit = Math.floor((Math.random()*100));

    	var d = (p_crit < crit ? 3 * dmg : dmg);

    	var result = defense_check(att, tar, d, tar_proc_mod);

    	if (att.cur_hp > 0 && sol_active) {
    		att.cur_hp += result / 2;
    	}

    	return (tar.cur_hp <= 0 || att.cur_hp <= 0);
    }
    else {
    	return false;
    }
},

initial: function(battle, att_arms, att_proc_mod, tar_proc_mod) {
	decrease_use(battle.attacker, att_arms);
	return offenseCheck(battle.attacker, battle.target, battle.att_dmg, battle.att_acc, battle.att_crit, att_proc_mod, tar_proc_mod);
},

retaliate: function(battle, tar_arms, tar_proc_mod, att_proc_mod) {
	decrease_use(battle.target, tar_arms);
    return offenseCheck(battle.target, battle.attacker, battle.tar_dmg, battle.tar_acc, battle.tar_crit, tar_proc_mod, att_proc_mod);
},

// Simulates the battle
simulate: function(battle) {

	var att_util = utilArray(att.skills);
	var tar_util = utilArray(tar.skills);
	var att_proc = (att_util[2] ? 10 : 0);
	var tar_proc = (tar_util[2] ? 10 : 0);

	// Check for healing
	if (battle.att_dmg < 0) {
		heal(battle.attacker, battle.target, battle.att_dmg, att_util[3], att_util[1]);
	}

	else if (battle.attacker != null && battle.target != null) {

		// Check for Vantage
		if (tar_util[0] && tar.cur_hp <= tar.stats.hp / 2) {
			// Target attacks first
			if (!retaliate(battle, tar_util[1], tar_proc, att_proc)) {
				// Attacker attacks
				var result = initial(battle, att_util[1], att_proc, tar_proc);

				// Checking for doubles
				if (!result && battle.att_double) {
					if (!initial(battle, att_util[1], att_proc, tar_proc) && battle.tar_double) {
						retaliate(battle, tar_util[1], tar_proc, att_proc);	
					}
				}
				else if (!result && battle.tar_double) {
					retaliate(battle, tar_util[1], tar_proc, att_proc);
				}
			}
		}

		// No Vantage
		else {
        	// Attacker initiates
        	if (!initial(battle, att_util[1], att_proc, tar_proc)) {
        		// Target hits back
        		var result = retaliate(battle, tar_util[1], tar_proc, att_proc);

            	// Checking for doubles
            	if (!result && battle.att_double) {
	                if (!initial(battle, att_util[1], att_proc, tar_proc) && this.tar_double) {
    	                retaliate(battle, tar_util[1], tar_proc, att_proc);	
        	        }
            	} else if (!result && battle.tar_double) {
                	retaliate(battle, tar_util[1], tar_proc, att_proc);	
            }
        }
        }
    }
}