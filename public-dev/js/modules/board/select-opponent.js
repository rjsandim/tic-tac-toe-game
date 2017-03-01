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
	var Board_1 = __webpack_require__(1);
	var board = new Board_1.Board();
	board.boostrap();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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
	            if (_self.positions.thereIsAWinner())
	                alert('Winner is: ');
	            else
	                _self.nextPlayerMakeAMove($(this));
	        });
	    };
	    Board.prototype.nextPlayerMakeAMove = function (element) {
	        var parent = element.parent();
	        var x = parent.data('x');
	        var y = parent.data('y');
	        var turn = this.player.toggle();
	        this.positions.put(x, y, turn);
	        this.renderAt(parent);
	    };
	    Board.prototype.renderAt = function (element) {
	        var x = element.data('x');
	        var y = element.data('y');
	        console.log(this.positions.getAt(x, y));
	        element.empty().append(this.positions.getAt(x, y).render());
	    };
	    return Board;
	}());
	exports.Board = Board;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
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
	        console.log('thereisawinner');
	        if (this.checkRows()) {
	            return true;
	        }
	        if (this.checkCols()) {
	            return true;
	        }
	        return this.checkDiagonals();
	    };
	    Position.prototype.checkRows = function () {
	        console.log('checkRows');
	        for (var i = 0; i < this.size; i++) {
	            var equals = true;
	            var value = this.values[i + "0"];
	            console.log(value);
	            for (var j = 1; j < this.size; j++) {
	                if (value != this.values[i.toString() + j.toString()]) {
	                    equals = false;
	                }
	                console.log(typeof value);
	            }
	            if (equals && typeof value !== 'Blank') {
	                return true;
	            }
	        }
	        return false;
	    };
	    Position.prototype.checkCols = function () {
	        return false;
	    };
	    Position.prototype.checkDiagonals = function () {
	        return false;
	    };
	    return Position;
	}());
	exports.Position = Position;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var Blank = (function () {
	    function Blank() {
	    }
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
	var Leaf = (function () {
	    function Leaf() {
	    }
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
	var Fire = (function () {
	    function Fire() {
	    }
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
	var Player = (function () {
	    function Player(one, two) {
	        this.one = one;
	        this.two = two;
	        this.lastPlayer = null;
	    }
	    Player.prototype.toggle = function () {
	        console.log(this.lastPlayer);
	        if (this.lastPlayer == null) {
	            this.lastPlayer = this.randomPlayer();
	            return this.lastPlayer;
	        }
	        if (this.lastPlayer == this.one) {
	            this.lastPlayer = this.two;
	        }
	        else {
	            this.lastPlayer = this.one;
	        }
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