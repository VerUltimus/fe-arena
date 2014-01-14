/* open in general */
function on(el){

	if (el == 'teams_build'){
		openBuild();
	}
	else if (el == 'battle'){
		document.getElementById("battle_tab").style.display ="inline-block";
		document.getElementById("close_battle").style.display = "inline-block";
		document.getElementById('home_page').style.display = "none";
	}
	else {
		document.getElementById("watch_tab").style.display ="inline-block";
		document.getElementById("close_watch").style.display ="inline-block";
		document.getElementById('home_page').style.display = "none"
	}
	document.getElementById(el).style.display ="block";
	document.getElementById('background').style.display="block";
}

/* close in general*/
function off(el){
	document.getElementById(el).style.display = "none"; 
	if (el == 'teams_build'){
		closeBuild();
	}
	else if (el == "battle"){
		document.getElementById("battle_tab").style.display ="none";
		document.getElementById("close_battle").style.display = "none";
	}
	else {
		document.getElementById("watch_tab").style.display ="none";
		document.getElementById("close_watch").style.display ="none";
	}
		document.getElementById('home_page').style.display = "block"; 
}

/* array of elements for team building tab*/
var builderArray = ["your_stats", "navigation", "close_builder", "teams_build", "builder_tab"];

/*opens team builder*/
function openBuild(){
	for (var i = 0; i < 2; i++){
		document.getElementById(builderArray[i]).style.display = "none";
	}
	for (var j = 2; j < builderArray.length; j++){
		document.getElementById(builderArray[j]).style.display = "inline-block"
	}
	document.getElementById('edit_teams').style.display ="block";
	document.getElementById('your_teams_box').style.marginLeft = "500px";
}

/*closes team builder*/
function closeBuild(){
	for (var i = 0; i < 2; i++){
		document.getElementById(builderArray[i]).style.display = "block";
	}
	for (var j = 2; j < builderArray.length; j++){
		document.getElementById(builderArray[j]).style.display = "none"
	}
	document.getElementById('edit_teams').style.display ="none";
	document.getElementById('your_teams_box').style.marginLeft = "40px";
}

/*tab switching*/
function switchTab(){
	/*to do*/
}

