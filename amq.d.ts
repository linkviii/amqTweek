declare function $(_: any): JQuery;

/* AMQ globals: */

/** Name of logged in user. */
var selfName: string;

/** Instance of GameChat */
var gameChat: GameChat;

/** @type {} */
var lobby: Lobby;

/** @type {} */
var quiz: Quiz;

declare class GameChat {
    // $CHAT_TEXTAREA_CONTAINER: r;
    // $PLAYER_ONLY_MESSAGE: r;
    // $QUEUE_BUTTON: r;
    // $QUEUE_COUNT: r;
    // $QUEUE_JOIN_BUTTON_TEXT: r;
    // $QUEUE_LIST: r;
    // $QUEUE_LIST_BUTTON: r;
    // $QUEUE_TAB: r;
    // $SCROLLABLE_CONTAINERS: r;
    // $SPECTATE_BUTTON: r;
    // $SPECTATE_HOST_ICON: r;
    // $chatInputField: r;
    // $chatMessageContainer: r;
    // $chatView: r;
    // $contentContainer: r;
    // $cooldownBar: r;
    // $cooldownBarContainer: r;
    // $gameChatButton: r;
    // $spectateListButton: r;
    // $spectatorCounter: r;
    // $spectatorList: r;
    // $spectatorView: r;
    // $teamChatSwitchContainer: r;
    // $view: r;
    CHAT_COOLDOWN_LENGTH: number;
    COOLDOWN_POPOVER_DISPLAY_TIME: number;
    MAX_CHAT_MESSAGES: number;
    MAX_MESSAGE_LENGTH: number;
    MINIMUM_LEVEL_TO_CHAT_IN_ANNI_ROOM: number;
    MINIMUM_LEVEL_TO_CHAT_IN_SLOW_MODE: number;
    MOD_BAN_MESSAGE_COMMAND_REGEX: RegExp;
    MOD_BAN_MESSAGE_LENGTH: number;
    MOD_CLEAR_BAN_MESSAGE_REGEX: RegExp;
    MOD_INSTANT_FLAG_TYPES: Object;
    SPAM_COOLDOWN: number;
    // _$CHAT_MENU: r;
    _PLAYER_COMMANDS_TEMPLATE: string;
    _QUEUE_ENTRY_TEMPLATE: string;
    _TABS: Object;
    _answerResultsListener: Listener;
    _chatUpdateListener: Listener;
    _deleteChatMessageListener: Listener;
    _deleteChatMessagesListener: Listener;
    _deletePlayerMessagesListener: Listener;
    _emoteOnlyChangeListener: Listener;
    _forceSpectatorListner: Listener;
    _hostPromotionListner: Listener;
    _jamModWarningListener: Listener;
    _kickedFromGameListner: Listener;
    _newMessageListner: Listener;
    _newQueueEntryListener: Listener;
    _newSpectatorListner: Listener;
    _newSystemMessageListner: Listener;
    _pauseTriggerListener: Listener;
    _playerLateJoinListener: Listener;
    _playerLeaveListner: Listener;
    _playerLeftQueueListener: Listener;
    _playerNameChangeListner: Listener;
    _playerRejoiningListener: Listener;
    _settingChangeListener: Listener;
    _spectatorChangeToPlayer: Listener;
    _spectatorLeftListner: Listener;
    _spectatorNameChangeListner: Listener;
    _unpauseTriggerListener: Listener;
    addPlayerToQueue: function;
    addSpectator: function;
    atSelfRegex: RegExp;
    banMessage: function;
    bindSpectatorClickFunctions: function;
    chatMessage: function;
    clearBannedMessages: function;
    closeView: function;
    constructor();
    currentMessageCount: number;
    currentTab: number;
    deletePlayersMessagesInChat: function;
    disableHostOptions: function;
    displayBossMode: function;
    displayEmoteOnlyMessage: function;
    displayJoinLeaveMessages: boolean;
    displaySlowModeMessage: function;
    emoteBubler: EmoteBubler;
    emoteSelectorWrapper: EmoteSelectorInputWrapper;
    enableHostOptions: function;
    focus: function;
    getTeamChatToggleSwitchActive: function;
    handleJamModTimeout: function;
    hideBossMode: function;
    insertEmoji: function;
    insertMsg: function;
    insertText: function;
    isShown: function;
    jamChatMode: boolean;
    jamModWarningLog: Object;
    joinLeaveQueue: function;
    kickSpectator: function;
    lastChatCursorPosition: number;
    lastMessageCooldown: number;
    lastMessageInfo: null;
    messageContainsNonEmotes: function;
    messageRepeated: function;
    noEmoteMode: boolean;
    onlyEmoteMode: null;
    open: boolean;
    openView: function;
    playerMsgBadgeTemplate: string;
    playerMsgTemplate: string;
    playerOnlyMode: boolean;
    queueMap: Object;
    removePlayerFromQueue: function;
    removeSpectator: function;
    removeTwoOldestMessages: function;
    resetQueue: function;
    resetView: function;
    sendMessage: function;
    serverMsgTemplate: string;
    setPlayerOnlyMode: function;
    setQueueButtonState: function;
    setSpectatorButtonState: function;
    setup: function;
    slowModeActive: boolean;
    spectatorListItemTemplate: string;
    spectators: Array;
    systemMessage: function;
    teamChatSwitch: Switch;
    toggleQueueTab: function;
    toggleShowTeamChatSwitch: function;
    updateChatScroll: function;
    updateNameInChat: function;
    updateSpectatorNameFontSize: function;
    viewChat: function;
    viewQueue: function;
    viewSpectators: function;
}

declare class Lobby {
    // $battleRoyalRuleModal: r;
    // $lastManRuleModal: r;
    // $rankedRuleModal: r;
    // $roomId: r;
    // $roomName: r;
    // $ruleButton: r;
    // $shuffleTeamButton: r;
    // $view: r;
    ANSWERING_MODES: Object;
    RULE_DESCRIPED_GAME_MODES: Array;
    _avatarChangeListener: Listener;
    _forceSpectatorListner: Listener;
    _gameClosedListner: Listener;
    _gameStartListner: Listener;
    _hostPromotionListner: Listener;
    _joinTeamListener: Listener;
    _nameChangeListner: Listener;
    _newPlayerListner: Listener;
    _playerAnswerModeChangeListener: Listener;
    _playerLeaveListner: Listener;
    _readyChangeListner: Listener;
    _settingListener: Listener;
    _shuffleTeamsListener: Listener;
    _spectatorChangeToPlayer: Listener;
    _spectatorLeftListener: Listener;
    _spectatorNameChangeListner: Listener;
    addPlayer: function;
    canJoin: any;
    changeGameSettings: function;
    changeToSpectator: function;
    checkAutoDisplayRuleModal: function;
    closeView: function;
    constructor();
    fireMainButtonEvent: function;
    getPlayerByName: function;
    inLobby: boolean;
    inputModeSelector: LobbyInputModeSelector;
    isHost: any;
    joinBlockedMessage: any;
    kickPlayer: function;
    leave: function;
    lobbyAvatarContainer: LobbyAvatarContainer;
    mainButton: LobbyMainButton;
    numberOfPlayers: any;
    numberOfPlayersReady: any;
    openView: function;
    ownGamePlayerId: null;
    playerCounter: LobbyPlayerCounter;
    players: Object;
    promoteHost: function;
    removePlayer: function;
    ruleModal: LobbyRuleModal;
    setNewHost: function;
    setPlayerTeam: function;
    setupLobby: function;
    showRules: function;
    shuffleTeams: function;
    soloMode: boolean;
    toggleRuleButton: function;
    updateMainButton: function;
    updatePlayerCounter: function;
    viewSettings: function;
}

declare class Quiz {

    // $inputContainer: r;
    // $nexusTargetLayer: r;
    // $startReturnToLobbyButton: r;
    // $videoOverflowContainer: r;
    // $view: r;
    CURRENT_BUFFER_FOCUS_PHASES: Array;
    NEXUS_DELAYED_EVENT_DELAY: number;
    NO_JAM_THEME_DISPlAY_PHASES: Array;
    QUIZ_STATES: Object;
    SCORE_TYPE_IDS: Object;
    SHOW_SELECTION_IDS: Object;
    SHOW_TIMER_PHASES: Array;
    SKIP_PHASES: Array;
    TEAM_ANSWER_IN_CHAT_STATES: Object;
    _bossLifeChangeListener: Listener;
    _bossMultipleChoiceListener: Listener;
    _bossResultListener: Listener;
    _bossSongCountChangeListener: Listener;
    _bossUpdateQueueListener: Listener;
    _endResultListner: Listener;
    _errorListener: Listener;
    _extraGuessTimeListener: Listener;
    _groupSlotMap: Object;
    _guessPhaseOverListner: Listener;
    _guessTimeChangeListener: Listener;
    _jamGameRestartingListener: Listener;
    _jamVoteStartedListener: Listener;
    _lateJoinTriggeredListener: Listener;
    _messageFlagBanListener: Listener;
    _messageFlagWarnedListener: Listener;
    _modMessageFlagListener: Listener;
    _nameChangeListner: Listener;
    _nameHintListener: Listener;
    _newBossListener: Listener;
    _nextVideoInfoListener: Listener;
    _nexusGameEventsListener: Listener;
    _noPlayersListner: Listener;
    _noSongsListner: Listener;
    _pauseTriggerListener: Listener;
    _peekAnswersListener: Listener;
    _playNextSongListner: Listener;
    _playerAnswerListener: Listener;
    _playerAnswerListner: Listener;
    _playerHiddenListener: Listener;
    _playerHintUsedListener: Listener;
    _playerLateJoinListener: Listener;
    _playerLeaveListner: Listener;
    _playerRejoiningListener: Listener;
    _quizOverListner: Listener;
    _quizreadyListner: Listener;
    _removePlayerListener: Listener;
    _resultListner: Listener;
    _returnVoteResultListener: Listener;
    _returnVoteStartListner: Listener;
    _sendFeedbackListner: Listener;
    _skipMessageListener: Listener;
    _skipNextPhaseListener: Listener;
    _skippingVideoListener: Listener;
    _songHintListener: Listener;
    _spectatorLeftListener: Listener;
    _teamMemberAnswerListener: Listener;
    _unpauseTriggerListener: Listener;
    _waitingForBufferingListner: Listener;
    _xpCreditGainListner: Listener;
    addLateJoinPlayer: function;
    amqAwardsOverlay: AmqAwardsOverlay;
    answerInput: QuizAnswerInput;
    avatarAssetHandler: QuizAvatarAssetHandler;
    avatarContainer: QuizAvatarContainer;
    bossModeDisplay: BossModeDisplay;
    clearAbilityTarget: function;
    clearSwapIcons: function;
    closeView: function;
    constructor();
    currentAbilityTarget: null;
    displayAbilityTarget: function;
    displayListNumber: function;
    eventQueue: QuizEventQueue;
    flaggedMessageContainer: FlaggedMessageContainer;
    getNexusTarget: function;
    groupSlotMap: any;
    handleAutoHide: function;
    handleNewNexusCharacterClick: function;
    handleNexusEvent: function;
    handleNoEmotePoint: function;
    handlePlayerOnlyChatPoint: function;
    hintController: QuizHintController;
    inQuiz: boolean;
    infoContainer: QuizInfoContainer;
    inputFocused: boolean;
    isHost: boolean;
    jamThemeDisplay: JamThemeDisplay;
    jamVoteController: JamVoteController;
    lateJoinButton: StandardButton;
    leave: function;
    nexusAttackOrderContainer: QuizNexusAttackOrderContainer;
    nexusEventLog: Array;
    onLastSong: boolean;
    openView: function;
    ownGroupSlot: any;
    pauseButton: PauseButton;
    promoteHost: function;
    resetMultipleChoice: boolean;
    returnVoteController: ReturnVoteController;
    scoreboard: QuizScoreboard;
    selectAvatarGroup: function;
    setInputInFocus: function;
    settingUpFirstSong: boolean;
    setup: function;
    setupQuiz: function;
    skipClicked: function;
    skipController: QuizSkipController;
    soloMode: boolean;
    sortNexusEvents: function;
    startReturnLobbyVote: function;
    targetingPlayerId: null;
    updateEnemyTarget: function;
    updateSwapTarget: function;
    videoOverlay: VideoOverlay;
    videoReady: function;
    videoTimerBar: TimerBar;
    viewSettings: function;
}