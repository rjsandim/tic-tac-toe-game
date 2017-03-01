/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Board_1 = __webpack_require__(1);
	var board = new Board_1.Board();
	board.boostrap();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Position_1 = __webpack_require__(2);
	var Blank_1 = __webpack_require__(3);
	var Leaf_1 = __webpack_require__(4);
	var Fire_1 = __webpack_require__(5);
	var Player_1 = __webpack_require__(6);
	var Board = (function () {
	    function Board() {
	        this.player = new Player_1.Player(new Leaf_1.Leaf(), new Fire_1.Fire());
	        this.positions = new Position_1.Position(3);
	        this.positions.fillAllWith(new Blank_1.Blank());
	    }
	    Board.prototype.boostrap = function () {
	        this.renderAll();
	        this.onClick();
	    };
	    Board.prototype.renderAll = function () {
	        var rows = $('.board').find('.row');
	        var _self = this;
	        rows.each(function (i) {
	            $(this).children('div').each(function (j) {
	                $(this).attr('data-x', i);
	                $(this).attr('data-y', j);
	                $(this).empty().append(_self.positions.getAt(i, j).render());
	            });
	        });
	    };
	    Board.prototype.onClick = function () {
	        var _self = this;
	        $('.btn').click(function () {
	            var movement = _self.nextPlayerMakeAMove($(this));
	            _self.save(movement);
	            var winner = _self.positions.thereIsAWinner();
	            if (typeof (winner) !== "boolean") {
	                //noinspection TypeScriptUnresolvedFunction
	                swal('Winner!', winner.getName());
	            }
	        });
	    };
	    Board.prototype.nextPlayerMakeAMove = function (element) {
	        var parent = element.parent();
	        var x = parent.data('x');
	        var y = parent.data('y');
	        var turn = this.player.toggle();
	        this.positions.put(x, y, turn);
	        this.renderAt(parent);
	        return { x: x, y: y, player: turn };
	    };
	    Board.prototype.renderAt = function (element) {
	        var x = element.data('x');
	        var y = element.data('y');
	        console.log(this.positions.getAt(x, y));
	        element.empty().append(this.positions.getAt(x, y).render());
	    };
	    Board.prototype.save = function (movement) {
	        console.log(movement);
	    };
	    return Board;
	}());
	exports.Board = Board;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Blank_1 = __webpack_require__(3);
	var Position = (function () {
	    function Position(size) {
	        this.size = size;
	        this.values = {};
	    }
	    Position.prototype.fillAllWith = function (type) {
	        for (var i = 0; i < this.size; i++) {
	            for (var j = 0; j < this.size; j++) {
	                this.put(i, j, type);
	            }
	        }
	    };
	    Position.prototype.put = function (x, y, type) {
	        this.values[x.toString() + y.toString()] = type;
	    };
	    Position.prototype.getAt = function (x, y) {
	        return this.values[x.toString() + y.toString()];
	    };
	    Position.prototype.thereIsAWinner = function () {
	        var winner = this.checkRows();
	        if (winner !== false) {
	            return winner;
	        }
	        winner = this.checkCols();
	        if (winner !== false) {
	            return winner;
	        }
	        return this.checkDiagonals();
	    };
	    Position.prototype.checkRows = function () {
	        for (var i = 0; i < this.size; i++) {
	            var positions = [];
	            for (var j = 0; j < this.size; j++) {
	                positions.push(i.toString() + j.toString());
	            }
	            var result = this.check(positions);
	            if (result !== false)
	                return result;
	        }
	        return false;
	    };
	    Position.prototype.checkCols = function () {
	        for (var i = 0; i < this.size; i++) {
	            var positions = [];
	            for (var j = 0; j < this.size; j++) {
	                positions.push(j.toString() + i.toString());
	            }
	            var result = this.check(positions);
	            if (result !== false)
	                return result;
	        }
	        return false;
	    };
	    Position.prototype.checkDiagonals = function () {
	        var diagonals = {
	            first: ['00', '11', '22'],
	            second: ['02', '11', '20']
	        };
	        var result = this.check(diagonals.first);
	        if (result !== false)
	            return result;
	        return this.check(diagonals.second);
	    };
	    Position.prototype.check = function (positions) {
	        var hasWinner = true;
	        var firstValue = this.values[positions[0]];
	        for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
	            var position = positions_1[_i];
	            var value = this.values[position];
	            if (firstValue != value || value instanceof Blank_1.Blank) {
	                hasWinner = false;
	            }
	        }
	        if (hasWinner)
	            return firstValue;
	        return false;
	    };
	    return Position;
	}());
	exports.Position = Position;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Blank = (function () {
	    function Blank() {
	    }
	    Blank.prototype.getName = function () {
	        return 'None';
	    };
	    Blank.prototype.render = function () {
	        return '<span class="col-xs-12 btn btn-default gi-8x"aria-hidden="true">&nbsp;</span>';
	    };
	    return Blank;
	}());
	exports.Blank = Blank;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Leaf = (function () {
	    function Leaf() {
	    }
	    Leaf.prototype.getName = function () {
	        return 'Leaf';
	    };
	    Leaf.prototype.render = function () {
	        return '<span class="col-xs-12 btn btn-success glyphicon glyphicon-leaf gi-8x" aria-hidden="true"></span>';
	    };
	    return Leaf;
	}());
	exports.Leaf = Leaf;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Fire = (function () {
	    function Fire() {
	    }
	    Fire.prototype.getName = function () {
	        return 'Fire';
	    };
	    Fire.prototype.render = function () {
	        return '<span class="col-xs-12 btn btn-danger glyphicon glyphicon-fire gi-8x" aria-hidden="true"></span>';
	    };
	    return Fire;
	}());
	exports.Fire = Fire;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Player = (function () {
	    function Player(one, two) {
	        this.one = one;
	        this.two = two;
	        this.lastPlayer = null;
	    }
	    Player.prototype.toggle = function () {
	        if (this.lastPlayer == null) {
	            this.lastPlayer = this.randomPlayer();
	            return this.lastPlayer;
	        }
	        this.lastPlayer = this.lastPlayer == this.one ? this.two : this.one;
	        return this.lastPlayer;
	    };
	    Player.prototype.randomPlayer = function () {
	        var random = Math.floor(Math.random() * 2) + 1;
	        if (random == 1) {
	            return this.one;
	        }
	        return this.two;
	    };
	    return Player;
	}());
	exports.Player = Player;


/***/ }
/******/ ]);