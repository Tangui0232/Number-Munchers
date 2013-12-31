//Direction enum
var Direction = {};
Direction.UP = 0;
Direction.DOWN = 1;
Direction.LEFT = 2;
Direction.RIGHT = 3;

//board constant values
var BoardConsts = {};
BoardConsts.width = 8;
BoardConsts.height = 8;

//game constant values
var GameConsts = {};
GameConsts.numLives = 3;
GameConsts.muncherStartX = Math.floor(BoardConsts.width/2);
GameConsts.muncherStartY = Math.floor(BoardConsts.height/2);

//keycodes constant values
var KeyCodes = {};
KeyCodes.W = 87;
KeyCodes.A = 65;
KeyCodes.S = 83;
KeyCodes.D = 68;
KeyCodes.SPACE = 32;
KeyCodes.UP = 38;
KeyCodes.LEFT = 37;
KeyCodes.DOWN = 40;
KeyCodes.RIGHT = 39;

//main object, spawns a game that hold everything
var game = function(board_filler_function) {
	var lives = GameConsts.numLives;
	var current_level = 0;
	var current_muncher = new muncher(GameConsts.muncherStartX, GameConsts.muncherStartY);
	var troggles;
	var board;

	var new_level = function() {
		current_level ++;

		board = board_filler_function(current_level, BoardConsts.width, BoardConsts.height);
		troggles = [];

		//create troggle creator function
		//not sure how we want to determine when / how many troggles to create yet
	};
};

//troggle class
var troggle = function(x, y, movetime) {
	var move_listeners = {};
	var current_move_index = 0;

	this.addMoveListener = function(listener) {
		move_listeners[current_move_index] = listener;
		current_move_index ++;

		return current_move index - 1;
	};

	this.removeMoveListener = function(index) {
		delete move_listeners[index];
	};

	var sendMoveEvent = function() {
		for (var i = 0; i < current_move_index; i ++) {
			if (typeof move_listeners[index] != "undefined") {
				move_listeners[index](this);
			}
		}
	};

	//add worker to run this function every movetime? or just setInterval
	this.update = function() {
		//move in random direction?
		var direction = Math.floor(Math.random() * 4);

		switch (direction) {
		case Direction.UP:
			if (y < BoardConsts.height) {
				y ++;
			} else {
				y = 0;
			}

			sendMoveEvent();
			break;

		case Direction.LEFT:
			if (x > 0) {
				x --;
			} else {
				x = BoardConsts.width;
			}

			sendMoveEvent();
			break;

		case Direction.DOWN:
			if (y > 0) {
				y --;
			} else {
				y = BoardConsts.height;
			}

			sendMoveEvent();
			break;

		case Direction.RIGHT:
			if (x < BoardConsts.width) {
				x ++;
			} else {
				x = 0;
			}

			sendMoveEvent();
			break;
		}
	};

	this.get_x() {
		return x;
	};

	this.get_y() {
		return y;
	};
};

//muncher class
var muncher = function(x, y) {
	var move_listeners = {};
	var current_move_index = 0;

	var eat_listeners = {};
	var current_eat_index = 0;

	this.addMoveListener = function(listener) {
		move_listeners[current_move_index] = listener;
		current_move_index ++;

		return current_move_index - 1;
	};

	this.removeMoveListener = function(index) {
		delete move_listeners[index];
	};

	this.addEatListener = function(listener) {
		eat_listeners[current_eat_index] = listener;
		current_eat_index ++;

		return current_eat_index - 1;
	};

	this.removeEatListener = function(index) {
		delete eat_listeners[index];
	};

	var sendMoveEvent = function() {
		for (var i = 0; i < current_move_index; i ++) {
			if (typeof move_listeners[index] != "undefined") {
				move_listeners[index](this);
			}
		}
	};

	var sendEatEvent = function() {
		for (var i = 0; i < current_eat_index; i ++) {
			if (typeof eat_listeners[index] != "undefined") {
				eat_listeners[index](this);
			}
		}
	};

	var keyboard_listener = window.addEventListener('keydown', function(e) {
		switch (e.keyCode) {
		case KeyCodes.W:
		case KeyCodes.UP:
			if (y < BoardConsts.height) {
				y ++;
			} else {
				y = 0;
			}

			sendMoveEvent();
			break;

		case KeyCodes.A:
		case KeyCodes.LEFT:
			if (x > 0) {
				x --;
			} else {
				x = BoardConsts.width;
			}

			sendMoveEvent();
			break;

		case KeyCodes.S:
		case KeyCodes.DOWN:
			if (y > 0) {
				y --;
			} else {
				y = BoardConsts.height;
			}

			sendMoveEvent();
			break;

		case KeyCodes.D:
		case KeyCodes.RIGHT:
			if (x < BoardConsts.width) {
				x ++;
			} else {
				x = 0;
			}

			sendMoveEvent();
			break;

		case KeyCodes.SPACE:
			sendEatEvent();

			break;
		}
	});

	this.get_x() {
		return x;
	};

	this.get_y() {
		return y;
	};

	this.destroy = function() {
		window.removeEventListener(keyboard_listener);
	};
};
