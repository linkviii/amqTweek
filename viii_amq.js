
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


var viii_isAttached;
function viii_logAnsInChat() {
	
	// For local messages it seems AMQ just injects html.
	// No reason not to do that I guess. 

	let count = $("#qpCurrentSongCount").text() + " / " + $("#qpTotalSongCount").text();
	let anime = $("#qpAnimeName").text();
	
	let type = $("#qpSongType").text();
	let song = $("#qpSongName").text();
	let artist = $("#qpSongArtist").text();
	let linkSrc = $("#qpSongVideoLink")[0].href;
	let linkTag = '<a href="' + linkSrc + '" target="_blank"> [+] </a>';

	let a = count + ": " + anime + " " + linkTag;
	let b = type + ": " + song + " <b>[by]</b> " + artist;
	
	gameChat.systemMessage(a, b);
	
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
}

function viii_off() {
	viii_isAttached = false;
	const theWatched = viii_getWatched()[0];
	theWatched.off("DOMSubtreeModified");
	
	window.onkeyup = null;
	$("#menuBarOptionContainer")[0].onclick = null
}



viii_attatch();