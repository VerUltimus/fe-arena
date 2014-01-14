/*--------------------------------------------------------

Definitions.js holds all of the classes needed by the game

---------------------------------------------------------*/

// For character stats
function Stats(hp, str, mag, skl, spd, luk, def, res, mov) {

	this.hp = hp;
	this.str = str;
	this.mag = mag;
	this.skl = skl;
	this.spd = spd;
	this.luk = luk;
	this.def = def;
	this.res = res;
	this.mov = mov;

}

// For weapon stats
function Weapon(name, category, magic, mt, hit, crit, range, uses) {

	this.name = name;
	this.category = category;
	this.magic = magic;
	this.mt = mt;
	this.hit = hit;
	this.crit = crit;
	this.range = range;
	this.uses = uses;
	
}

// Calculation Formulas
function doubl(att, tar) {
	return (att.spd - tar.spd >= 5);
}

function hit(stats) {
	return (stats.skl * 3 + stats.luk) / 2;
}

function avo(stats) {
	return (stats.spd * 3 + stats.luk) / 2;
}

function crit(stats) {
	return (stats.skl / 2);
}

function dodge(stats) {
	return stats.luk;
}

function fit_to_range(stat) {
	return ((stat < 0) ? 0 : ((stat > 100) ? 100 : stat));
}