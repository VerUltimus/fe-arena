var battle = {

    attacker: null,
    target: null,

    att_dmg: 0,
    att_double: false,
    att_acc: 0,
    att_crit: 0,

    tar_dmg: 0,
    tar_double: false,
    tar_acc: 0,
    tar_crit: 0,

    calculate: function() {
        if (this.attacker != null && this.target != null) {
            // Perform calculations for dmg depending on phys/mag
            this.att_dmg = 10;
            this.tar_dmg = 10;

            this.att_double = (this.attacker.spd - this.target.spd >= 5);
            this.att_acc = ((this.attacker.skl * 3 + this.attacker.luk) - (this.target.spd * 3 + this.target.luk)) / 2;
            if (this.att_acc < 0) {
                this.att_acc = 0
            }
            this.att_crit = (this.attacker.skl / 2) - this.target.luk;
            if (this.att_crit < 0) {
                this.att_crit = 0
            }

            this.tar_double = (this.target.spd - this.attacker.spd >= 5);
            this.tar_acc = ((this.target.skl * 3 + this.target.luk) - (this.attacker.spd * 3 + this.attacker.luk)) / 2;
            if (this.tar_acc < 0) {
                this.tar_acc = 0
            }
            this.tar_crit = (this.target.skl / 2) - this.attacker.luk;
            if (this.tar_crit < 0) {
                this.tar_crit = 0
            }

            // Display all the stuffs
            if (this.att_double) {$("#att_double").html("Yes");}
            else {$("#att_double").html("No");}

            $("#att_dmg").html(this.att_dmg.toString());
            $("#att_name").html(this.attacker.char_name);
            $("#att_hp").html(this.attacker.cur_hp.toString());
            $("#att_weapon").html("To be implemented");
            $("#att_acc").html(this.att_acc.toString());
            $("#att_crit").html(this.att_crit.toString());

            if (this.tar_double) {$("#tar_double").html("Yes");}
            else {$("#tar_double").html("No");}

            $("#tar_dmg").html(this.tar_dmg.toString());
            $("#tar_name").html(this.target.char_name);
            $("#tar_hp").html(this.target.cur_hp.toString());
            $("#tar_weapon").html("To be implemented");
            $("#tar_acc").html(this.tar_acc.toString());
            $("#tar_crit").html(this.tar_crit.toString());

        }
    },

	
	init: function(char) {
        this.attacker = char;
    },

    setTarget: function(char) {
        this.target = char;
        this.calculate();
    },

    reset: function() {
        this.attacker = null;
        this.target = null;
    },

    attack: function(dmg, acc, crit) {

        // Generate a number in between 0 and 99 for hit checking
        var p_hit = Math.floor((Math.random()*100));
        if (p_hit < hit) {
            // Generate a number in between 0 and 99 for crit checking
            var p_crit = Math.floor((Math.random()*100));

            // Damage modifier
            var d = dmg;
            if (p_crit < crit) {
                d = 3 * dmg;
            }

            return d;
        }

        else {
            return -1; // signals a miss
        }
    },

    // Simulate a single attack and returns:
    // 0: If kill
    // 1: If missed
    // 2: If hit but didn't kill
    attack: function(att, tar, dmg, acc, crit) {

        // Generate a number in between 0 and 99 for hit checking
        var p_hit = Math.floor((Math.random()*100));
        console.log("Generated: " + p_hit.toString() + " Accuracy: " + acc);
        if (p_hit < acc) {
            // Generate a number in between 0 and 99 for crit checking
            var p_crit = Math.floor((Math.random()*100));

            if (p_crit < crit) {
                tar.cur_hp -= 3 * dmg;
                console.log("Crit! " + att.char_name + " hit " + tar.char_name + " for " + (3 * dmg) + " damage");
            } else {
                tar.cur_hp -= dmg;
                console.log(att.char_name + " hit " + tar.char_name + " for " + dmg + " damage");
            }

            if (tar.cur_hp <= 0) {
                return 0;
            } else {
                return 2;
            }
        }

        else {
            return 1;
        }
    },

    // Simulates the battle and returns:
    // -1: If error
    // 0: If neither attacker nor target dies
    // 1: If attacker dies
    // 2: If target dies
    simulate: function() {
        if (this.attacker != null && this.target != null) {
            // Attacker hits first
            var initial = this.attack(this.attacker, this.target, this.att_dmg, this.att_acc, this.att_crit);
            console.log(this.target.cur_hp);
            // Target hits back if still alive
            if (initial > 0) {

                var retaliate = this.attack(this.target, this.attacker, this.tar_dmg, this.tar_acc, this.tar_crit);

                // Attacker doubles if still alive and can double
                if (retaliate > 0 && this.att_double) {

                    initial = this.attack(this.attacker, this.target, this.att_dmg, this.att_acc, this.att_crit);

                    if (initial > 0 && this.tar_double) {
                        // Target doubles if can
                        retaliate = this.attack(this.target, this.attacker, this.tar_dmg, this.tar_acc, this.tar_crit);
                        if (retaliate === 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else if (initial === 0) {
                        return 2;
                    } else {
                        return 0;
                    }

                } else if (retaliate === 0) {
                    return 1;
                } else if (this.tar_double) {
                    // Target doubles if can
                    retaliate = this.attack(this.target, this.attacker, this.tar_dmg, this.tar_acc, this.tar_crit);
                    if (retaliate === 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                } else {
                    return 0;
                }
            } else {
                return 2;
            }

        } else {
            return -1;
        }
    }
};