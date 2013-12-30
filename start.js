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

var game = function() {

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
	};

	this.removeMoveListener = function(index) {
		delete move_listeners[index];
	};

	this.addEatListener = function(listener) {
		eat_listeners[current_eat_index] = listener;
		current_eat_index ++;
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

	this.destroy = function() {
		window.removeEventListener(keyboard_listener);
	};
};
