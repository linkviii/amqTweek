	//TODO     
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

	var viii_roundsPlayed;

	// Enable level 2 enhancments which may be frowned on
	// mutation observer, $input
	var viii_lvl2 = false;

	var viii_record = false;

	var viii_song_list = [];

	/** Wrap str with my span I can hide ? */
	function viii_tag(str) {
		return '<span class="viii-tag">' + str + '</span>';
	}

	function viii_systemMsg(a, b) {
		a = viii_tag(a);
		if (b !== '') b = viii_tag(b);

		// TODO: just directly add to the list
		gameChat.systemMessage(a, b);
	}

	function viii_insertStyle() {
		$("#viii-style").remove();

		// https://github.com/GNOME/gnome-backgrounds/tree/main/backgrounds
		//const backgroundSrc = "url( https://raw.githubusercontent.com/GNOME/gnome-backgrounds/mainline/backgrounds/adwaita-night.jpg )";
		//const backgroundSrc = "url( https://raw.githubusercontent.com/GNOME/gnome-backgrounds/master/backgrounds/adwaita-night.jpg )";
		//const backgroundSrc = "url( https://raw.githubusercontent.com/GNOME/gnome-backgrounds/master/backgrounds/adwaita-night.png )";
		//const backgroundSrc = "url( https://raw.githubusercontent.com/GNOME/gnome-backgrounds/main/backgrounds/adwaita-d.jpg )";
		const backgroundSrc = "url( https://github.com/GNOME/gnome-backgrounds/raw/591da8c220b2bd071b057e6a6112d53f21ccaaf8/backgrounds/adwaita-d.jpg )";

		const stupidface = "url( https://i.imgur.com/YkF6ke3.png )";

		const amqGrey = "#424242";

		let text = [
			// game page background
			"#gameContainer { background-image: " + backgroundSrc + "; background-size: cover; }",
			"#gameChatPage > .col-xs-9 { background-image: " + backgroundSrc + "; background-size: cover;}",
			// Chat colors
			".gcUserName { color: springgreen; }",
			".viii-yes { color: green; }",
			".viii-no { color: red; }",
			".viii-round { color: cyan }",
			// Box backgrounds
			".floatingContainer { background-color: transparent; box-shadow: none; }",
			// Countdown / hide answer box
			".qpVideoOverlay  { background-image: " + stupidface + "; background-size: cover;}",
			// Countdown text
			"#qpHiderText { display: inline; border-radius: 20px; padding: 5px; background-color: rgba(0, 0, 0, 0.48); } ",
			// Song name+artist cover. Transparent color text to hide the "?"
			"#qpInfoHider { background-image: " + stupidface + "; background-size: contain; color: transparent; }",
			// Box above the video
			"#qpAnimeNameHider  { background-image: " + stupidface + "; background-size: cover; color: transparent; }",
			// 👍👎
			".qpSingleRateContainer { background: transparent; border: azure 2px solid; }",
			// Restore background for avatar's answer
			".qpAvatarAnswerContainer {background-color: " + amqGrey + "; }",  
			".lobbyAvatarTeamSelector {background-color: " + amqGrey + "; }", 
			".popoutMessage {background-color: " + amqGrey + "; }",
			".playerProfileContainer {background-color: " + amqGrey + "; }", 		
			//
			
			// Make the user score box not overlap with the answer
			".qpAvatarStatusOuterContainer { position: unset; transform: unset; width: unset; ; display: inline; overflow: unset; }",
			".qpAvatarStatusInnerContainer { position: unset; transform: unset; width: unset; ; display: inline; }",
			// Make the glow more noticable
			".lbReady .lobbyAvatarImgContainer { box-shadow: 0px 0px 10px 2px rgb(134, 204, 255); }",
			//
			".qpAvatarStatus, .qpAvatarStatusBar { "
			+ "position: unset; "
			+ "text-align: center; "
			// Negative margin allows floats to overlap
			+ "margin-left: -100px; float: right; "
			+ "width: unset; height: unset; border-radius: 20px; "
			+ " }",
			// Make text box sit inside the status box. 
			".qpAvatarStatusBar {transform: translateX(10px) translateY(35px); min-width: 31px; min-height: 31px; opacity: unset; }",
			".qpAvatarStatus    {transform: translateX(12px) translateY(37px); min-width: 26px; min-height: 26px; background-color: #2e51a2; }",
			// Default is blue against blue.
			".qpAvatarStatusBar.completed, .qpAvatarStatusBar.looted { background-color: white; }",
			// bd7efd Default appears purpleish but is actually just sort of transparent white on blue
			".qpAvatarStatusBar.planning {background-color: #b873ff; }",
			
		].join("\n");
		// + "background-color: " + amqGrey + "; color: #09baffdb;"

		let style = document.createElement("style");
		style.id = "viii-style";
		style.textContent = text;

		document.head.appendChild(style);

	}

	t00_nameFromAvatarElem = function (elem) {
		return elem.id.substr(9);
	}

	function viii_nameFromAvatarElm(elm) {

		let name = elm.getElementsByClassName("qpAvatarName")[0];
		return name.innerText;
	}

	// Probably better ways to do this but I guess it works...
	function viii_isCorrect(username) {
		let avatarElems = document.getElementsByClassName("qpAvatarContainer");

		let playerNum;
		let playerNames = [];
		for (playerNum = 0; playerNum < avatarElems.length; playerNum += 1) {
			playerNames.push(viii_nameFromAvatarElm(avatarElems[playerNum]));
		}

		for (playerNum = 0; playerNum < avatarElems.length; playerNum += 1) {
			const name = playerNames[playerNum];
			if (name === username) {
				const correct = avatarElems[playerNum].getElementsByClassName("qpAvatarAnswerText")[0].classList.contains("rightAnswer");
				return correct ? "viii-yes" : "viii-no";
			}
		}

		return "";
	}


	function viii_getScore(username) {
		let avatarElems = document.getElementsByClassName("qpAvatarContainer");

		let playerNum;
		let playerNames = [];
		for (playerNum = 0; playerNum < avatarElems.length; playerNum += 1) {
			playerNames.push(viii_nameFromAvatarElm(avatarElems[playerNum]));
		}

		for (playerNum = 0; playerNum < avatarElems.length; playerNum += 1) {
			const name = playerNames[playerNum];
			if (name === username) {
				const correct = avatarElems[playerNum].getElementsByClassName("qpAvatarPointText")[0]

				return correct.textContent;
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

		viii_systemMsg(a, b);

		if (viii_record) {
			let obj = {
				type: type,
				song: song,
				artist: artist,
				linkSrc: linkSrc,
				anime: anime
			};
			viii_song_list.push(obj);
		}

		//  Check for last song and report score.
		if (parseInt(count) == parseInt(total)) {
			let score = viii_getScore("linkviii");
			viii_roundsPlayed++;
			let a = '<span class="viii-round">Round ' + viii_roundsPlayed + '</span>';
			let b = score + ' / ' + count;
			if (parseInt(score) === 0) {
				b = '';
			}

			viii_systemMsg(a, b);
		}
	}

	/**
	 * Watching qpInfoHider for when results shown.
	 */
	function viii_getWatched() {
		const id = "#qpInfoHider";
		const changeSelector = id + ".hide";
		return [$(id).parent(), changeSelector];
	}

	var viii_keymap = {
		'tab': 9, 'enter': 13,
		',': 188, '.': 190, '/': 191, "'": 222,
		'a': 65, 'b': 66, 's': 83, 'h': 72, 'm': 77, 'f': 70, 'd': 68,
		'up': 38, 'down': 40, 'left': 37, 'right': 39
	};

	var viii_debug_input = false;

	function viii_parseKeysUp(e) {
		let key = e.keyCode ? e.keyCode : e.which;

		let target = $(e.target);
		let focusedTag = $(document.activeElement).get(0).tagName.toLowerCase();
		let inputFocused = focusedTag === "textarea" || focusedTag === "input";

		// Ignore quick search
		if (!inputFocused) {
			switch (key) {
				case viii_keymap["."]:
				case viii_keymap["/"]:
				case viii_keymap["'"]:
				case viii_keymap['a']:
					e.preventDefault();

			}
			return;
		}

		// Probably a better way to go about this but, it works.


		if (viii_lvl2) if (key === viii_keymap['tab']) {
			const active = document.activeElement.id;
			if (active === "qpAnswerInput" || $("#qpAnswerInput")[0].disabled) {
				$("#gcInput")[0].click();
				$("#gcInput").focus();
			} else {
				$("#qpAnswerInput")[0].click();
				$("#qpAnswerInput").focus();
			}
		}

		if (e.ctrlKey) {
			let keyName = String.fromCharCode(e.which).toLowerCase(); // some lie... 
			if (viii_debug_input) {
				console.log(key + ": " + keyName);
			}


			switch (key) {
				case viii_keymap['enter']:
					console.log(e)
					if (lobby.inLobby) {
						lobby.fireMainButtonEvent();
					} else {
						quiz.skipClicked()
					}
					break;
				case viii_keymap['/']:
					if (viii_lvl2) $("#qpAnswerInput").val('');
					break;
				case viii_keymap[',']:
					$('#qpVolumeIcon')[0].click()
					e.preventDefault();
					break;
				case viii_keymap['b']:
					e.preventDefault();
					if (viii_lvl2) $("#qpAnswerInput").val('BOKUMACHI');
					break;
				case viii_keymap['s']:
					e.preventDefault();
					break;
				case viii_keymap['h']:
					$("#gcMessageContainer > li:has(.viii-tag)").toggle();
					break;
				case viii_keymap['m']:
					e.preventDefault();
					$('#qpVolumeIcon')[0].click()
					break;

				case viii_keymap['d']:
				case viii_keymap['f']:
					e.preventDefault();
					break;



			}
		}
	}

	function viii_parseKeysDown(e) {
		let key = e.keyCode ? e.keyCode : e.which;

		let target = $(e.target);
		let focusedTag = $(document.activeElement).get(0).tagName.toLowerCase();
		let inputFocused = focusedTag === "textarea" || focusedTag === "input";

		// Ignore quick search
		if (!inputFocused) {
			switch (key) {
				case viii_keymap["."]:
				case viii_keymap["/"]:
				case viii_keymap["'"]:
				case viii_keymap['a']:
					e.preventDefault();

			}
			return;
		}

		if (e.ctrlKey) {

			switch (key) {
				//case viii_keymap['enter']:
				case viii_keymap['d']:
				case viii_keymap['/']:
				case viii_keymap[',']:
				case viii_keymap['b']:
				case viii_keymap['h']:
				case viii_keymap['s']:
				case viii_keymap['m']:
				case viii_keymap['f']:

					e.preventDefault();
					break;


			}
		}
	}

	function viii_attatch() {
		// Attempt to reset modifications before adding more.
		if (viii_isAttached) viii_off();

		viii_isAttached = true;
		let [theWatched, onThe] = viii_getWatched();
		if (viii_lvl2) theWatched.on("DOMSubtreeModified", onThe, viii_logAnsInChat);

		window.onkeyup = viii_parseKeysUp;
		window.onkeydown = viii_parseKeysDown;

		// Open settings modal dialog on click of gear instead of hovering over it and then clicking "settings"
		$("#menuBarOptionContainer")[0].onclick = function () { $("#settingModal").modal(); };

		//
		viii_insertStyle();

		if (viii_roundsPlayed === undefined) viii_roundsPlayed = -1;
	}

	function viii_off() {
		viii_isAttached = false;

		const theWatched = viii_getWatched()[0];
		theWatched.off("DOMSubtreeModified");

		window.onkeyup = null;
		window.onkeydown = null;
		$("#menuBarOptionContainer")[0].onclick = null;

		$("#viii-style").remove();
	}

	function viii_go2() {
		viii_lvl2 = true;
		viii_attatch();
	}


	viii_attatch();