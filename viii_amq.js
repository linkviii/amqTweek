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
/*
viii.style_ = function () {
	const styleId = "viii-style-"
	$("#" + styleId).remove();

	let text = [
		``,
	].join("\n");

	let style = document.createElement("style");
	style.id = styleId;
	style.textContent = text;

	document.head.appendChild(style);

}
*/

viii.styleGeneral = function () {
	const styleId = "viii-style-general";
	$("#" + styleId).remove();

	// https://github.com/GNOME/gnome-backgrounds/tree/main/backgrounds
	const backgroundSrc = "url( https://github.com/GNOME/gnome-backgrounds/raw/591da8c220b2bd071b057e6a6112d53f21ccaaf8/backgrounds/adwaita-d.jpg )";
	// A wonderfully stupid face
	const accentBackground = "url( https://i.imgur.com/YkF6ke3.png )";

	const amqGrey = "#424242";

	let text = [
		``,
		// game page background
		`#gameContainer { 
			background-image: ${backgroundSrc}; 
			background-size: cover; 
		}`,
		// What did this one apply to?
		`#gameChatPage > .col-xs-9 { 
			background-image: ${backgroundSrc}; 
			background-size: cover;
		}`,
		// Chat colors
		// .gcUserName would override all color styles. This selects only the default name color.
		`[class="gcUserName clickAble"] { color: springgreen; }`,
		`.viii-yes { color: green; }`,
		`.viii-no { color: red; }`,
		`.viii-round { color: cyan; }`,
		// Song History table
		`.shSongTable tr.correctGuess { background-color: #153e15; }`,
		// Box backgrounds
		// TODO: Opt into transparent instead of default
		// `.qpAvatarImageContainer.floatingContainer { background: transparent; }`,
		//".floatingContainer { background-color: transparent; box-shadow: none; }",
		// Countdown / hide answer box
		`.qpVideoOverlay  { background-image: ${accentBackground}; background-size: cover;}`,
		// Countdown text
		`#qpHiderText { display: inline; border-radius: 20px; padding: 5px; background-color: rgba(0, 0, 0, 0.48); } `,
		// Song name+artist cover. Transparent color text to hide the "?"
		`#qpInfoHider { background-image: ${accentBackground}; background-size: contain; color: transparent; }`,
		// Box above the video
		`#qpAnimeNameHider  { background-image: ${accentBackground}; background-size: cover; color: transparent; }`,
		// 👍👎
		`.qpSingleRateContainer { background: transparent; border: azure 2px solid; }`,
		// Quiz maker
		`.cqcSongBlock .cqcBlockMainContainer { background: black }`,
		`.cqcSongAnimeInfo {
			text-decoration: underline dotted gray;
		}`,
		`.cqcSongNameInfo {
			margin-left: 20px;
		}`,
		`.cqcRuleBlock.selected {
			box-shadow: 0 0 10px 4px rgb(247, 255, 0);
		}`,

	].join("\n");

	let style = document.createElement("style");
	style.id = styleId;
	style.textContent = text;

	document.head.appendChild(style);

	/* Broken code to move skip button */
	// Remove slant style
	//$("#qpVoteSkip").removeClass("leftRightButtonTop");
	//$("#qpVoteState").on("click", () => quiz.skipClicked());
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


};
// viii.styleGeneral();

// ----------------
// ----------------
// ----------------

viii.styleWatchStatus = function () {
	const styleId = "viii-style-watch-status";
	$("#" + styleId).remove();

	let text = [
		// Make the user score box not overlap with the answer
		`.qpAvatarStatusOuterContainer { 
			position: unset; 
			transform: unset; 
			width: unset;  
			display: inline; 
			overflow: unset; 
		}`,
		`.qpAvatarStatusInnerContainer { 
			position: unset; 
			transform: unset; 
			width: unset;  
			display: inline; 
		}`,
		// 
		`.qpSingleRateContainer { 
			background: transparent; 
			border: azure 2px solid; 
		}`,

		// Make text box sit inside the status box. 
		`.qpAvatarAnswerContainer {
			top: -29px;
		} `,
		`.qpAvatarStatusBar {
			transform: translateX(10px) translateY(-32px); 
			min-width: 31px; 
			min-height: 31px; 
			opacity: unset; 
		}`,
		`.qpAvatarStatus {
			transform: translateX(12px) translateY(-30px); 
			min-width: 26px; 
			min-height: 26px; 
			background-color: #2e51a2; 
		}`,
		// Default is blue against blue.
		`.qpAvatarStatusBar.completed, .qpAvatarStatusBar.looted { 
			background-color: white; 
		}`,
		// bd7efd Default appears purpleish but is actually just sort of transparent white on blue
		`.qpAvatarStatusBar.planning {
			background-color: #b873ff; 
		}`,
		// Negative margin allows floats to overlap
		`.qpAvatarStatus, .qpAvatarStatusBar { 
			position: unset; 
			text-align: center; 
			margin-left: -100px; 
			float: right; 
			width: unset; 
			height: unset; 
			border-radius: 20px;  
		}`,
	].join("\n");

	let style = document.createElement("style");
	style.id = styleId;
	style.textContent = text;

	document.head.appendChild(style);

};
// viii.styleWatchStatus();


// --------------------------
// --------------------------
// --------------------------


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
		if (username !== selfName)
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
	let correctClass = viii.isCorrect(selfName);

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
				$("#qpAnswerInput").val('');
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
	let declare = "";
	if (thing.constructor?.name) {
		declare = `declare class ${thing.constructor.name} `;

	}
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

	return "\n\n" + `${declare} { \n\n` + txt.join("\n") + "\n}\n\n";
};

// -------------------------

viii.attach = function () {
	// Attempt to reset modifications before adding more.
	if (viii.isAttached) viii.off();

	viii.isAttached = true;
	let [theWatched, onThe] = viii.getWatched();
	// @ts-ignore
	theWatched.on("DOMSubtreeModified", onThe, viii.logAnsInChat);

	onkeyup = viii.parseKeysUp;
	onkeydown = viii.parseKeysDown;

	// Open settings modal dialog on click of gear instead of hovering over it and then clicking "settings"
	$("#menuBarOptionContainer")[0].onclick = function () {
		// @ts-ignore
		$("#settingModal").modal();
	};

	//
	// viii.insertStyle();
	viii.styleWatchStatus();
	viii.styleGeneral();

	if (viii.roundsPlayed === undefined) viii.roundsPlayed = -1;
};


viii.bannerBuy = function () {
	// @ts-ignore
	let avatarList = document.getElementById("swContentAvatarContainer").querySelectorAll(".swAvatarTile");
	for (let avatar of avatarList) {
		let banner = avatar.querySelector(".swAvatarTileFooter");

		// @ts-ignore
		banner.onclick = () => {
			// Focus this avatar
			// @ts-ignore
			banner.parentElement.click();
			// Click "Unlock" on the right
			// @ts-ignore
			document.getElementById("swRightColumnActionButtonText").click();
			// XXX Actually click buy
			// @ts-ignore
			document.getElementById("swPriceBuyButton").click();
		};
	}
};

// -------------------------



viii.hello = function () {
	console.log("viii's script loaded.");
};


viii.idk1 = function () {
	console.log(selfName);
	console.log(lobby);
	console.log(selfName);
	console.log(lobby);
};

viii.idk2 = () => {
	console.log(selfName);
	console.log(lobby);
	console.log(selfName);
	console.log(lobby);
};


// ----------------------------------------------------------------------------------------------

viii.hello();

if (document.getElementById("startPage")) {

} else {

	let loadInterval = setInterval(() => {
		console.log("Waiting for amq to load");
		if ($("#loadingScreen").hasClass("hidden")) {
			clearInterval(loadInterval);
			viii.attach();
		}
	}, 500);
}