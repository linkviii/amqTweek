// @ts-check
// ==UserScript==
// @name         viii.idk.js
// @namespace    http://tampermonkey.net/
// @version      2024-08-18
// @description  try to take over the world!
// @author       You
// @match        https://animemusicquiz.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=animemusicquiz.com
// @grant        unsafeWindow
// ==/UserScript==


'use strict';
// <reference path="./JQuery.d.ts"/>
/// <reference path="./amq.d.ts"/>

/* AMQ globals: */

/** @type {string} Name of logged in user. */
var selfName;

/** Instance of GameChat */
var gameChat;

/** @type {Lobby} */
var lobby;

/** @type {Quiz} */
var quiz;

/* ---------------------------------------------------- */


/* Var will let me copy paste this script into the console */
var viii = {};
unsafeWindow.viii = viii;

// -------------------------

viii.roundsPlayed = 0;

viii.chatModsHidden = false;

viii.lvl2 = false;
// -------------------------

/** Wrap str with my span I can hide ? */
viii.viiiTag = function (str) {
	return `<span class="viii-tag">${str}</span>`;
};


viii.systemMsg = function (a, b) {
	a = viii.viiiTag(a);
	if (b !== '') b = viii.viiiTag(b);

	// TODO: just directly add to the list
	gameChat.systemMessage(a, b);
	if (viii.chatModsHidden) {
		$("#gcMessageContainer > li:has(.viii-tag):last-of-type").hide();
	}
};

// -------------------------

viii.insertStyle = function () {
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
		".qpAvatarImageContainer.floatingContainer { background: transparent; }",
		//".floatingContainer { background-color: transparent; box-shadow: none; }",
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
		//".qpAvatarAnswerContainer {background-color: " + amqGrey + "; }",
		//".lobbyAvatarTeamSelector {background-color: " + amqGrey + "; }",
		//".popoutMessage {background-color: " + amqGrey + "; }",
		//".playerProfileContainer {background-color: " + amqGrey + "; }",
		//

		// Make the user score box not overlap with the answer
		".qpAvatarStatusOuterContainer { position: unset; transform: unset; width: unset; ; display: inline; overflow: unset; }",
		".qpAvatarStatusInnerContainer { position: unset; transform: unset; width: unset; ; display: inline; }",
		//".qpAvatarStatus {color: white;}",
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
		//
		".awesomplete {font-family: monospace;}",
		// Make text box sit inside the status box. 
		".qpAvatarAnswerContainer {top: -29px;} ",
		".qpAvatarStatusBar {transform: translateX(10px) translateY(-32px); min-width: 31px; min-height: 31px; opacity: unset; }",
		".qpAvatarStatus    {transform: translateX(12px) translateY(-30px); min-width: 26px; min-height: 26px; background-color: #2e51a2; }",
		// Default is blue against blue.
		".qpAvatarStatusBar.completed, .qpAvatarStatusBar.looted { background-color: white; }",
		// bd7efd Default appears purpleish but is actually just sort of transparent white on blue
		".qpAvatarStatusBar.planning {background-color: #b873ff; }",
		//
		// Make the skip song button always to the left of the answer box
		//		`#qpSkipContainer.highlight #qpVoteSkip,
		//		#qpSkipContainer:hover #qpVoteSkip,
		//		#qpSkipContainer.votePreview #qpVoteSkip,
		//		#qpSkipContainer.preDisable #qpVoteSkip,
		//		#qpVoteSkip,
		//		#qpVoteState,
		//		#qpSkipContainer:hover,
		//		#qpSkipContainer:hover #qpVoteState,
		//		#qpSkipContainer.votePreview>#qpVoteStateContainer>#qpVoteState,
		//		#qpSkipContainer.preDisable>#qpVoteStateContainer>#qpVoteState {
		//			transform: unset;
		//			transition: unset;
		//		}
		//		
		//		#qpSkipContainer {
		//			overflow: visible;
		//			transform: unset;
		//			left: -114px;
		//			width: 114px;
		//		}
		//		
		//		#qpVoteStateContainer {
		//			overflow: visible;
		//		}`,
		//

	].join("\n");
	// + "background-color: " + amqGrey + "; color: #09baffdb;"

	let style = document.createElement("style");
	style.id = "viii-style";
	style.textContent = text;

	document.head.appendChild(style);

	// Remove slant style
	//$("#qpVoteSkip").removeClass("leftRightButtonTop");
	//$("#qpVoteState").on("click", () => quiz.skipClicked());

};

// -------------------------

viii.nameFromAvatarElm = function (elm) {

	let name = elm.getElementsByClassName("qpAvatarName")[0];
	return name.innerText;
};


// Probably better ways to do this but I guess it works...
viii.isCorrect = function (username) {
	let avatarElems = document.getElementsByClassName("qpAvatarContainer");

	let playerNum;
	let playerNames = [];
	for (playerNum = 0; playerNum < avatarElems.length; playerNum += 1) {
		playerNames.push(viii.nameFromAvatarElm(avatarElems[playerNum]));
	}

	for (playerNum = 0; playerNum < avatarElems.length; playerNum += 1) {
		const name = playerNames[playerNum];
		if (name === username) {
			const correct = avatarElems[playerNum].getElementsByClassName("qpAvatarAnswerText")[0].classList.contains("rightAnswer");
			return correct ? "viii-yes" : "viii-no";
		}
	}

	return "";
};

viii.getScore = function () {

	// Guess this would work too?
	// $(".qpScoreBoardEntry").find(".qpsPlayerName.self ").
	const table = $(".qpScoreBoardEntry");
	for (let data of table) {
		// @ts-ignore
		const username = data.querySelector(".qpsPlayerName ").textContent;
		if (username !== window.selfName)
			continue;
		// @ts-ignore
		const score = data.querySelector(".qpsPlayerScore").textContent;
		return String(score);
	}


	//----

	return "";
};

// -------------------------
viii.logAnsInChat = function () {

	// For local messages it seems AMQ just injects html.
	// No reason not to do that I guess. 
	let correctClass = viii.isCorrect(window.selfName);

	let count = $("#qpCurrentSongCount").text();
	let total = $("#qpTotalSongCount").text();
	let progress = '<span class="' + correctClass + '" >' + count + '</span> / ' + total;
	let anime = $("#qpAnimeName").text();

	let type = $("#qpSongType").text();
	let song = $("#qpSongName").text();
	let artist = $("#qpSongArtist").text();
	// @ts-ignore
	let linkSrc = $("#qpSongVideoLink")[0].href;
	let linkTag = '<a href="' + linkSrc + '" target="_blank"> [+] </a>';

	let a = progress + ": " + anime + " " + linkTag;
	let b = type + ": " + song + " <b>[by]</b> " + artist;

	viii.systemMsg(a, b);

	// if (viii.record) {
	// 	let obj = {
	// 		type: type,
	// 		song: song,
	// 		artist: artist,
	// 		linkSrc: linkSrc,
	// 		anime: anime
	// 	};
	// 	viii.song_list.push(obj);
	// }

	// TODO look for a round end event. This is broken with lives
	//  Check for last song and report score.
	if (parseInt(count) == parseInt(total)) {
		// TODO score need not be the same as songs correct
		let score = viii.getScore();
		viii.roundsPlayed++;
		let a = '<span class="viii-round">Round ' + viii.roundsPlayed + '</span>';
		let b = score + ' / ' + count;
		if (parseInt(score) === 0) {
			b = '';
		}

		viii.systemMsg(a, b);
	}
};

/**
 * Watching qpInfoHider for when results shown.
 */
viii.getWatched = function () {
	const id = "#qpInfoHider";
	const changeSelector = id + ".hide";
	return [$(id).parent(), changeSelector];
};
// -------------------------
viii.keymap = {
	'tab': 9, 'enter': 13,
	',': 188, '.': 190, '/': 191, "'": 222,
	'a': 65, 'b': 66, 's': 83, 'h': 72, 'm': 77, 'f': 70, 'd': 68,
	'up': 38, 'down': 40, 'left': 37, 'right': 39
};

viii.debug_input = false;

viii.parseKeysUp = function (e) {
	let key = e.keyCode ? e.keyCode : e.which;

	let target = $(e.target);
	// @ts-ignore
	let focusedTag = $(document.activeElement).get(0).tagName.toLowerCase();
	let inputFocused = focusedTag === "textarea" || focusedTag === "input";

	// Ignore quick search
	if (!inputFocused) {
		switch (key) {
			case viii.keymap["."]:
			case viii.keymap["/"]:
			case viii.keymap["'"]:
			case viii.keymap['a']:
				e.preventDefault();

		}
		// return;
	}

	// Probably a better way to go about this but, it works.


	if (false && viii.lvl2) if (key === viii.keymap['tab']) {
		// @ts-ignore
		const active = document.activeElement.id;
		// @ts-ignore
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
		if (viii.debug_input) {
			console.log(key + ": " + keyName);
		}


		switch (key) {
			case viii.keymap['enter']:
				console.log(e);
				if (lobby.inLobby) {
					lobby.fireMainButtonEvent();
				} else {
					quiz.skipClicked();
				}
				break;
			case viii.keymap['/']:
				if (viii.lvl2) $("#qpAnswerInput").val('');
				break;
			case viii.keymap['m']:
			case viii.keymap[',']:
				$('#qpVolumeIcon')[0].click();
				e.preventDefault();
				break;
			case viii.keymap['b']:
				e.preventDefault();

				break;
			case viii.keymap['s']:
				e.preventDefault();
				break;
			case viii.keymap['h']:
				// toggle(true) → .show()
				$("#gcMessageContainer > li:has(.viii-tag)").toggle(viii.hideChatThings);
				viii.hideChatThings = !viii.hideChatThings;
				break;

			case viii.keymap['d']:
			case viii.keymap['f']:
				e.preventDefault();
				break;



		}
	}
};

viii.parseKeysDown = function (e) {
	let key = e.keyCode ? e.keyCode : e.which;

	let target = $(e.target);
	// @ts-ignore
	let focusedTag = $(document.activeElement).get(0).tagName.toLowerCase();
	let inputFocused = focusedTag === "textarea" || focusedTag === "input";

	// Ignore quick search
	if (!inputFocused) {
		switch (key) {
			case viii.keymap["."]:
			case viii.keymap["/"]:
			case viii.keymap['h']:
			case viii.keymap["'"]:
			case viii.keymap['a']:
				e.preventDefault();

		}
		return;
	}

	if (e.ctrlKey) {

		switch (key) {
			//case viii.keymap['enter']:
			case viii.keymap['d']:
			case viii.keymap['/']:
			case viii.keymap[',']:
			case viii.keymap['b']:
			case viii.keymap['h']:
			case viii.keymap['s']:
			case viii.keymap['m']:
			case viii.keymap['f']:

				e.preventDefault();
				break;


		}
	}
};
// -------------------------

viii.typeof = function (thing) {
	if (thing === null) {
		return "null";
	}
	if (thing === undefined) {
		return "undefined";
	}
	let typename = typeof thing;
	if ("object" === typename) {
		if (thing.constructor.name) {
			typename = thing.constructor.name;
		}
	}
	return typename;
};

viii.dumpTypes = function (thing) {
	let proto = Object.getPrototypeOf(thing);
	// props.push(...Object.getOwnPropertyNames(proto));

	const dump = (thing) => {
		let props = Object.getOwnPropertyNames(thing);
		let desc = Object.getOwnPropertyDescriptors(thing);
		let txt = props.map((name) => {
			if (name === "constructor") return "constructor();";
			let typename = "";
			if (desc[name].get) {
				typename = "any";
			} else {
				typename = viii.typeof(thing[name]);
			}
			return `${name}: ${typename};`;
		});
		return txt;
	};

	let txt = dump(thing);
	txt.push(...dump(proto));
	txt = txt.sort();

	return "\n" + txt.join("\n") + "\n";
};

// -------------------------

viii.attatch = function () {
	// Attempt to reset modifications before adding more.
	if (viii.isAttached) viii.off();

	viii.isAttached = true;
	let [theWatched, onThe] = viii.getWatched();
	if (viii.lvl2) {
		// @ts-ignore
		theWatched.on("DOMSubtreeModified", onThe, viii.logAnsInChat);
	}

	window.onkeyup = viii.parseKeysUp;
	window.onkeydown = viii.parseKeysDown;

	// Open settings modal dialog on click of gear instead of hovering over it and then clicking "settings"
	$("#menuBarOptionContainer")[0].onclick = function () {
		// @ts-ignore
		$("#settingModal").modal();
	};

	//
	viii.insertStyle();

	if (viii.roundsPlayed === undefined) viii.roundsPlayed = -1;
};
// -------------------------



viii.hello = function () {
	console.log("viii's script loaded.");
};

viii.idk = function () {
	console.log(selfName);
};



viii.hello();
let loadInterval = setInterval(() => {
    if ($("#loadingScreen").hasClass("hidden")) {
        clearInterval(loadInterval);
        viii.attatch();
    }
}, 500);