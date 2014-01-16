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
	
	init: function(char) {
        this.attacker = char;
    },

    setTarget: function(char) {
        this.target = char;
        this.calculate();
    },

    reset: function() {
        this.target = null;
        $("#att_double").html("");
        $("#att_weapon").html("");

        $("#att_dmg").html("");
        $("#att_name").html("");
        $("#att_hp").html("");
        $("#att_acc").html("");
        $("#att_crit").html("");

        $("#tar_double").html("");
        $("#tar_weapon").html("");

        $("#tar_dmg").html("");
        $("#tar_name").html("");
        $("#tar_hp").html("");
        $("#tar_acc").html("");
        $("#tar_crit").html("");
    },

    display: function() {

        if (this.att_double) {$("#att_double").html("Yes");}
        else {$("#att_double").html("No");}

        if (this.attacker.equipped != null) {$("#att_weapon").html(this.attacker.equipped.name);}
        else {$("#att_weapon").html("None");}

        $("#att_dmg").html(this.att_dmg.toString());
        $("#att_name").html(this.attacker.unit_name);
        $("#att_hp").html(this.attacker.cur_hp.toString());
        $("#att_acc").html(this.att_acc.toString());
        $("#att_crit").html(this.att_crit.toString());

        if (this.tar_double) {$("#tar_double").html("Yes");}
        else {$("#tar_double").html("No");}

        if (this.target.equipped != null) {$("#tar_weapon").html(this.target.equipped.name);}
        else {$("#tar_weapon").html("None");}

        $("#tar_dmg").html(this.tar_dmg.toString());
        $("#tar_name").html(this.target.unit_name);
        $("#tar_hp").html(this.target.cur_hp.toString());
        $("#tar_acc").html(this.tar_acc.toString());
        $("#tar_crit").html(this.tar_crit.toString());

    },

    calculate_heal: function() {
        this.att_dmg = -1 * (this.attacker.equipped.heal_factor * this.attacker.stats.mag + this.attacker.equipped.heal_constant);
        this.att_double = false;
        this.att_acc = 100;
        this.att_crit = 0;

        this.tar_dmg = 0;
        this.tar_double = false;
        this.att_acc = 0;
        this.att_crit = 0;
    },

    calculate_damage: function() {
        this.att_dmg = 0;
        this.att_double = doubl(this.attacker.stats, this.target.stats);
        this.att_acc = fit_to_range(hit(this.attacker.stats) - avo(this.target.stats));
        this.att_crit = fit_to_range(crit(this.attacker.stats) - dodge(this.target.stats));

        this.tar_dmg = 0;
        this.tar_double = doubl(this.target.stats, this.attacker.stats);
        this.tar_acc = fit_to_range(hit(this.target.stats) - avo(this.attacker.stats));
        this.tar_crit = fit_to_range(crit(this.target.stats) - dodge(this.attacker.stats));

        if (this.attacker.equipped != null) {
            this.att_acc = fit_to_range(this.attacker.equipped.hit + this.att_acc);
            this.att_crit = fit_to_range(this.attacker.equipped.crit + this.att_crit);

            // Magic calculation
            if (this.attacker.equipped.magic) { 
                this.att_dmg = this.attacker.stats.mag - this.target.stats.res;
            }
            // Physical calculation
            else {
                this.att_dmg = this.attacker.stats.str - this.target.stats.def;
            }
            this.att_dmg += this.attacker.equipped.mt;
        }

        if (this.target.equipped != null) {
            this.tar_acc = fit_to_range(this.target.equipped.hit + this.tar_acc);
            this.tar_crit = fit_to_range(this.target.equipped.crit + this.tar_crit);
            
            // Magic calculation
            if (this.target.equipped.magic) { 
                this.tar_dmg = this.target.stats.mag - this.attacker.stats.res;
            }
            // Physical calculation
            else {
                this.tar_dmg = this.target.stats.str - this.attacker.stats.def;
            }
            this.tar_dmg += this.target.equipped.mt;
        }
    },

    calculate: function() {
        if (this.attacker != null && this.target != null) {

            if (this.attacker.equipped != null && this.attacker.equipped.category == 5) {
                this.calculate_heal();
            }
            else {
                this.calculate_damage();
            }


            this.display();
        }
    },

    // Simulate a single attack and returns true if target was killed
    attack: function(att, tar, dmg, acc, crit) {

        // Generate a number in between 0 and 99 for hit checking
        var p_hit = Math.floor((Math.random()*100));
        console.log("Generated: " + p_hit.toString() + " Accuracy: " + acc);
        if (p_hit < acc) {
            // Generate a number in between 0 and 99 for crit checking
            var p_crit = Math.floor((Math.random()*100));

            if (p_crit < crit) {
                tar.cur_hp -= 3 * dmg;
                console.log("Crit! " + att.unit_name + " hit " + tar.unit_name + " for " + (3 * dmg) + " damage");
            } else {
                tar.cur_hp -= dmg;
                console.log(att.unit_name + " hit " + tar.unit_name + " for " + dmg + " damage");
            }

            // Handle overflow for healing
            if (tar.cur_hp > tar.stats.hp) {
                tar.cur_hp = tar.stats.hp;
            }

            return (tar.cur_hp <= 0);
        }

        else {
            console.log(att.unit_name + " missed!");
            return false;
        }
    },

    initial: function() {
        return this.attack(this.attacker, this.target, this.att_dmg, this.att_acc, this.att_crit);
    },

    retaliate: function() {
        return this.attack(this.target, this.attacker, this.tar_dmg, this.tar_acc, this.tar_crit);
    },

    // Simulates the battle
    simulate: function() {
        // Attacker initiates
        if (this.attacker != null && this.target != null) {
            // Target retaliates
            if (!this.initial()) {
                // Checking for doubles
                if (!this.retaliate() && this.att_double) {
                    if (!this.initial() && this.tar_double) {
                        this.retaliate();
                    }
                } else if (this.tar_double) {
                    this.retaliate();
                }
            }
        }
    }
};