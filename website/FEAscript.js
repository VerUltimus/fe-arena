
function on(el){
	if (el == 'teams_build'){
			document.getElementById('navigation').style.display = "none";
			document.getElementById('your_stats').style.display = "none";
			document.getElementById('edit_teams').style.display ="block";
		}
	else {
		document.getElementById('home_page').style.display = "none"; 
	}
		document.getElementById(el).style.display = "block";

 }


function off(el){
	document.getElementById(el).style.display = "none"; 
	if (el == 'teams_build'){
		document.getElementById('navigation').style.display = "block";
			document.getElementById('your_stats').style.display = "block";
			document.getElementById('edit_teams').style.display ="none";
	}
		document.getElementById('home_page').style.display = "block"; 
}
