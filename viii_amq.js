
// Paste into brower console
// Tested with firefox
// AMQ uses jquery so might as well go all in with it?

// Not sure if using tag id's or .$ references on global objects is 
// more resilient to change. I'll find out when stuff breaks.
// I just expect things to break. Its fine.

// Namespacing my global js with 'viii'. 
// Probably could use an object or something but, eh, keeping it simple.

/*
 * Global amq objects:
 * quiz
 * gameChat
 * options
 *  
 */ 

 // probably is some way to find the logged in player's username...
var viii_userName = "linkviii";

var viii_isAttached;

function viii_insertStyle() {
	$("#viii-style").remove();
	
	const backgroundSrc = "url( https://raw.githubusercontent.com/GNOME/gnome-backgrounds/master/backgrounds/adwaita-night.jpg )";

	let text = ["#gameContainer { background-image: " + backgroundSrc + "; background-size: cover; }",
		"#gameChatPage > .col-xs-9 { background-image: " + backgroundSrc + "; background-size: cover;}",
		".gcUserName { color: springgreen; }",
		".viii-yes { color: green; }",
		".viii-no { color: red; }",
	].join("\n");
	
	let style = document.createElement("style");
	style.id = "viii-style";
	style.textContent = text;

	document.head.appendChild(style);

}

t00_nameFromAvatarElem = function( elem ) {
    return elem.id.substr(9);
}

// Probably better ways to do this but I guess it works...
function viii_isCorrect(username) {
	let avatarElems = document.getElementsByClassName("qpAvatarContainer");

	let playerNum;
	let playerNames = [];
	for(playerNum = 0; playerNum < avatarElems.length; playerNum += 1) {
		playerNames.push( t00_nameFromAvatarElem(avatarElems[playerNum]) );
	}
	
	for(playerNum = 0; playerNum < avatarElems.length; playerNum += 1) {
		const name = playerNames[playerNum];
		if (name === username) {
			const correct = avatarElems[playerNum].getElementsByClassName("qpAvatarAnswerContainer")[0].classList.contains("rightAnswer");
			//const answer = avatarElems[playerNum].getElementsByClassName("qpAvatarAnswerText")[0].innerText;
			return  correct ? "viii-yes" : "viii-no";
		}
	}
	
	return "";
}

function viii_logAnsInChat() {
	
	// For local messages it seems AMQ just injects html.
	// No reason not to do that I guess. 
	let correctClass = viii_isCorrect(viii_userName);

	let count = $("#qpCurrentSongCount").text();
	let total = $("#qpTotalSongCount").text();
	let progress = '<span class="' + correctClass + '" >' + count + '</span> / ' + total;
	let anime = $("#qpAnimeName").text();
	
	let type = $("#qpSongType").text();
	let song = $("#qpSongName").text();
	let artist = $("#qpSongArtist").text();
	let linkSrc = $("#qpSongVideoLink")[0].href;
	let linkTag = '<a href="' + linkSrc + '" target="_blank"> [+] </a>';

	let a = progress + ": " + anime + " " + linkTag;
	let b = type + ": " + song + " <b>[by]</b> " + artist;
	
	gameChat.systemMessage(a, b);
	
	// TODO check for last song and report score.
}

/**
 * Watching qpInfoHider for when results shown.
 */
function viii_getWatched() {
	const id = "#qpInfoHider";
	const changeSelector = id + ".hide";
	return [$(id).parent(), changeSelector];
}

function viii_parseKeys(e) {
	let key = e.keyCode ? e.keyCode : e.which;
	
	// Probably a better way to go about this but, it works.
	let map = {'tab':9, 'enter':13, ',':188, '.':190, '/':191};
	
	if (key === map['tab']) {
		const active = document.activeElement.id;
		if (active === "qpAnswerInput" || quiz.$input[0].disabled) {
			$("#gcInput")[0].click();
			$("#gcInput").focus();
		} else {
			quiz.$input[0].click();
			quiz.$input.focus();
		}
	}

	if (e.ctrlKey) {
		//let keyName = String.fromCharCode(e.which).toLowerCase(); // some lie... 
		//console.log(key + ": " + keyName);

		switch (key) {
		case map['enter']:
			if (lobby.inLobby) {
				lobby.fireMainButtonEvent();
			} else {
				skipController.toggle();				
			}
			break;
		case map['/']:
			quiz.$input.val('');
			break;
		case map[',']:
			
		break;

		}
	}
}

function viii_attatch() {
	if (viii_isAttached) viii_off();
	viii_isAttached = true;
	let [theWatched, onThe] = viii_getWatched();
	theWatched.on("DOMSubtreeModified", onThe, viii_logAnsInChat);
	
	window.onkeyup = viii_parseKeys;

	// Open settings modal dialog on click of gear instead of hovering over it and then clicking "settings"
	$("#menuBarOptionContainer")[0].onclick = function() { $("#settingModal").modal(); }; 

	//
	viii_insertStyle();
}

function viii_off() {
	viii_isAttached = false;

	const theWatched = viii_getWatched()[0];
	theWatched.off("DOMSubtreeModified");
	
	window.onkeyup = null;
	$("#menuBarOptionContainer")[0].onclick = null;

	$("#viii-style").remove();
}



viii_attatch();