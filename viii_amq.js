
// Paste into brower console
// Tested with firefox

var viii_is_attached;
function logAnsInChat() {
	
	let count = $("#qpCurrentSongCount").text() + " / " + $("#qpTotalSongCount").text();
	let anime = $("#qpAnimeName").text();
	let a = count + ": " + anime;
	let type = $("#qpSongType").text();
	let song = $("#qpSongName").text();
	let artist = $("#qpSongArtist").text();
	let b = type + ": " + song + " |by| " + artist;
	
	gameChat.systemMessage(a, b);
	
}

/**
 * Watching qpInfoHider for when results shown.
 */
function viii_get_watched() {
	const id = "#qpInfoHider";
	const changeSelector = id + ".hide";
	return [$(id).parent(), changeSelector];
}

function viii_parse_keys(e) {
	let key = e.keyCode ? e.keyCode : e.which;
	
	
	let map = {'tab':9, 'enter':13, ',':188, '.':190, '/':191};
	
	if (key === map['tab']) {
		const active = document.activeElement.id;
		if (active === "qpAnswerInput" || quiz.$input[0].disabled) {
			$("#gcInput").focus();
		} else {
			quiz.$input.focus();
		}
	}

	if (e.ctrlKey) {
		//let keyName = String.fromCharCode(e.which).toLowerCase(); // some lie... 
		//console.log(key + ": " + keyName);

		switch (key) {
		case map['enter']:
			skipController.toggle();				
			break;
		case map['/']:
			quiz.$input.val('');
			break;

		}
	}
}

function viii_attatch() {
	if (viii_is_attached) viii_off();
	viii_is_attached = true;
	let [theWatched, onThe] = viii_get_watched();
	theWatched.on("DOMSubtreeModified", onThe, logAnsInChat );
	
	window.onkeyup = viii_parse_keys;
}

function viii_off() {
	viii_is_attached = false;
	const theWatched = viii_get_watched()[0];
	theWatched.off("DOMSubtreeModified");
	
	window.onkeyup = null;
}



viii_attatch();