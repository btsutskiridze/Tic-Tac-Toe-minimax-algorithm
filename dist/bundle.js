/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Game_1 = __importDefault(__webpack_require__(/*! ./modules/Game */ "./src/modules/Game.ts"));
const display_1 = __webpack_require__(/*! ./modules/helpers/display */ "./src/modules/helpers/display.ts");
const xBtn = document.getElementById('x');
const oBtn = document.getElementById('o');
xBtn === null || xBtn === void 0 ? void 0 : xBtn.addEventListener('click', () => {
    var _a;
    (_a = document.getElementById('popup')) === null || _a === void 0 ? void 0 : _a.remove();
    const game = new Game_1.default('O', 'X');
    (0, display_1.visualize)();
    game.start();
});
oBtn === null || oBtn === void 0 ? void 0 : oBtn.addEventListener('click', () => {
    var _a;
    (_a = document.getElementById('popup')) === null || _a === void 0 ? void 0 : _a.remove();
    const game = new Game_1.default('X', 'O');
    (0, display_1.visualize)();
    game.start();
});


/***/ }),

/***/ "./src/modules/Game.ts":
/*!*****************************!*\
  !*** ./src/modules/Game.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const check_result_1 = __webpack_require__(/*! ./helpers/check-result */ "./src/modules/helpers/check-result.ts");
const display_1 = __webpack_require__(/*! ./helpers/display */ "./src/modules/helpers/display.ts");
const minimax_1 = __webpack_require__(/*! ./helpers/minimax */ "./src/modules/helpers/minimax.ts");
class Game {
    constructor(ai, human) {
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        this.currentPlayer = 'X';
        Game.AI = ai;
        Game.HUMAN = human;
    }
    start() {
        if (this.currentPlayer == Game.AI)
            this.computerMove();
        (0, display_1.humanClickWatcher)(this);
    }
    playerMove(row, col) {
        if (this.board[row][col] == '') {
            this.board[row][col] = this.currentPlayer;
            (0, display_1.addSvg)(row.toString() + col.toString(), Game.HUMAN);
            this.handleMove(Game.HUMAN);
        }
    }
    computerMove() {
        let move = (0, minimax_1.bestMove)(this.board);
        this.board[move.i][move.j] = Game.AI;
        (0, display_1.addSvg)(move.i.toString() + move.j.toString(), Game.AI);
        this.handleMove(Game.AI);
    }
    handleMove(player) {
        let winner = (0, check_result_1.checkWinner)(this.board);
        if (winner == null) {
            this.setPlayer();
            if (player == Game.HUMAN)
                this.computerMove();
            return;
        }
        (0, display_1.displayResult)(winner);
        this.playAgain();
    }
    setPlayer() {
        this.currentPlayer = this.currentPlayer == 'X' ? 'O' : 'X';
    }
    resetGame() {
        var _a;
        (_a = document.getElementById('popup')) === null || _a === void 0 ? void 0 : _a.remove();
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        this.currentPlayer = 'X';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.getElementById(i.toString() + j.toString());
                if (cell) {
                    cell.innerHTML = ``;
                }
            }
        }
    }
    playAgain() {
        const btn = document.getElementById('play-again');
        btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', () => {
            this.resetGame();
            this.start();
        });
    }
}
exports["default"] = Game;


/***/ }),

/***/ "./src/modules/helpers/check-result.ts":
/*!*********************************************!*\
  !*** ./src/modules/helpers/check-result.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.openSpotsCount = exports.checkWinner = void 0;
const checkWinner = (board) => {
    let winner = null;
    for (let i = 0; i < 3; i++) {
        //column checks
        if (board[i][0] == board[i][1] && board[i][0] == board[i][2] && board[i][0] !== '') {
            winner = board[i][0];
        }
    }
    for (let i = 0; i < 3; i++) {
        //row checks
        if (board[0][i] == board[1][i] && board[0][i] == board[2][i] && board[0][i] !== '') {
            winner = board[0][i];
        }
    }
    if (board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] !== '') {
        winner = board[0][0];
    }
    if (board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] !== '') {
        winner = board[0][2];
    }
    if (winner === null && (0, exports.openSpotsCount)(board) === 0)
        return 'tie';
    else
        return winner;
};
exports.checkWinner = checkWinner;
const openSpotsCount = (board) => {
    let freeSpaces = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                freeSpaces++;
            }
        }
    }
    return freeSpaces;
};
exports.openSpotsCount = openSpotsCount;


/***/ }),

/***/ "./src/modules/helpers/display.ts":
/*!****************************************!*\
  !*** ./src/modules/helpers/display.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addSvg = exports.displayResult = exports.visualize = exports.humanClickWatcher = void 0;
const humanClickWatcher = (game) => {
    const cells = document.querySelectorAll('.cells');
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            game.playerMove(parseInt(cell.id[0]), parseInt(cell.id[1]));
        });
    });
};
exports.humanClickWatcher = humanClickWatcher;
const visualize = () => {
    const container = document.getElementById('inner');
    if (container) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                container.innerHTML += `
        <div id="${i}${j}" class="cells bg-gray-700  grid place-items-center">
        </div>
      `;
            }
        }
    }
};
exports.visualize = visualize;
const displayResult = (symbol) => {
    const container = document.getElementById('container');
    if (container) {
        container.innerHTML += `
    <section id="popup" class="absolute flex flex-col items-center justify-center gap-3 bg-gray-800 w-64 h-30 rounded-xl p-4">
      <h1 class="text-4xl text-blue-400">
        ${symbol == 'X' || symbol == 'O' ? `Winner is <span class="text-blue-300 font-bold">${symbol}</span>` : 'It is a tie'}
      </h1>
      <button id="play-again" class="text-lg bg-gray-200 rounded-xl px-6 py-1 text-black">Play again</button>
    </section>
    `;
    }
};
exports.displayResult = displayResult;
const addSvg = (id, symbol) => {
    const cell = document.getElementById(id);
    if (cell) {
        cell.innerHTML = `<img src="./src/icons/${symbol}.svg" alt="${symbol}" />`;
    }
};
exports.addSvg = addSvg;


/***/ }),

/***/ "./src/modules/helpers/minimax.ts":
/*!****************************************!*\
  !*** ./src/modules/helpers/minimax.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bestMove = void 0;
const Game_1 = __importDefault(__webpack_require__(/*! ../Game */ "./src/modules/Game.ts"));
const check_result_1 = __webpack_require__(/*! ./check-result */ "./src/modules/helpers/check-result.ts");
function bestMove(board) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                board[i][j] = Game_1.default.AI;
                let score = minimax(board, 0, false);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    return move;
}
exports.bestMove = bestMove;
function minimax(board, depth, isMaximizing) {
    let result = (0, check_result_1.checkWinner)(board);
    if (result == Game_1.default.AI)
        return 1;
    if (result == Game_1.default.HUMAN)
        return -1;
    if (result == 'tie')
        return 0;
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = Game_1.default.AI;
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = Game_1.default.HUMAN;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CLDRCQUE0QixPQUFPO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CLDRCQUE0QixPQUFPO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMvREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RpYy10YWMtdG9lLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS8uL3NyYy9tb2R1bGVzL0dhbWUudHMiLCJ3ZWJwYWNrOi8vdGljLXRhYy10b2UvLi9zcmMvbW9kdWxlcy9oZWxwZXJzL2NoZWNrLXJlc3VsdC50cyIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS8uL3NyYy9tb2R1bGVzL2hlbHBlcnMvZGlzcGxheS50cyIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS8uL3NyYy9tb2R1bGVzL2hlbHBlcnMvbWluaW1heC50cyIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RpYy10YWMtdG9lL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBHYW1lXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vbW9kdWxlcy9HYW1lXCIpKTtcbmNvbnN0IGRpc3BsYXlfMSA9IHJlcXVpcmUoXCIuL21vZHVsZXMvaGVscGVycy9kaXNwbGF5XCIpO1xuY29uc3QgeEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Jyk7XG5jb25zdCBvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ28nKTtcbnhCdG4gPT09IG51bGwgfHwgeEJ0biA9PT0gdm9pZCAwID8gdm9pZCAwIDogeEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgKF9hID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmUoKTtcbiAgICBjb25zdCBnYW1lID0gbmV3IEdhbWVfMS5kZWZhdWx0KCdPJywgJ1gnKTtcbiAgICAoMCwgZGlzcGxheV8xLnZpc3VhbGl6ZSkoKTtcbiAgICBnYW1lLnN0YXJ0KCk7XG59KTtcbm9CdG4gPT09IG51bGwgfHwgb0J0biA9PT0gdm9pZCAwID8gdm9pZCAwIDogb0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgKF9hID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmUoKTtcbiAgICBjb25zdCBnYW1lID0gbmV3IEdhbWVfMS5kZWZhdWx0KCdYJywgJ08nKTtcbiAgICAoMCwgZGlzcGxheV8xLnZpc3VhbGl6ZSkoKTtcbiAgICBnYW1lLnN0YXJ0KCk7XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2hlY2tfcmVzdWx0XzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2NoZWNrLXJlc3VsdFwiKTtcbmNvbnN0IGRpc3BsYXlfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZGlzcGxheVwiKTtcbmNvbnN0IG1pbmltYXhfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvbWluaW1heFwiKTtcbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKGFpLCBodW1hbikge1xuICAgICAgICB0aGlzLmJvYXJkID0gW1xuICAgICAgICAgICAgWycnLCAnJywgJyddLFxuICAgICAgICAgICAgWycnLCAnJywgJyddLFxuICAgICAgICAgICAgWycnLCAnJywgJyddLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSAnWCc7XG4gICAgICAgIEdhbWUuQUkgPSBhaTtcbiAgICAgICAgR2FtZS5IVU1BTiA9IGh1bWFuO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PSBHYW1lLkFJKVxuICAgICAgICAgICAgdGhpcy5jb21wdXRlck1vdmUoKTtcbiAgICAgICAgKDAsIGRpc3BsYXlfMS5odW1hbkNsaWNrV2F0Y2hlcikodGhpcyk7XG4gICAgfVxuICAgIHBsYXllck1vdmUocm93LCBjb2wpIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbcm93XVtjb2xdID09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IHRoaXMuY3VycmVudFBsYXllcjtcbiAgICAgICAgICAgICgwLCBkaXNwbGF5XzEuYWRkU3ZnKShyb3cudG9TdHJpbmcoKSArIGNvbC50b1N0cmluZygpLCBHYW1lLkhVTUFOKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZShHYW1lLkhVTUFOKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wdXRlck1vdmUoKSB7XG4gICAgICAgIGxldCBtb3ZlID0gKDAsIG1pbmltYXhfMS5iZXN0TW92ZSkodGhpcy5ib2FyZCk7XG4gICAgICAgIHRoaXMuYm9hcmRbbW92ZS5pXVttb3ZlLmpdID0gR2FtZS5BSTtcbiAgICAgICAgKDAsIGRpc3BsYXlfMS5hZGRTdmcpKG1vdmUuaS50b1N0cmluZygpICsgbW92ZS5qLnRvU3RyaW5nKCksIEdhbWUuQUkpO1xuICAgICAgICB0aGlzLmhhbmRsZU1vdmUoR2FtZS5BSSk7XG4gICAgfVxuICAgIGhhbmRsZU1vdmUocGxheWVyKSB7XG4gICAgICAgIGxldCB3aW5uZXIgPSAoMCwgY2hlY2tfcmVzdWx0XzEuY2hlY2tXaW5uZXIpKHRoaXMuYm9hcmQpO1xuICAgICAgICBpZiAod2lubmVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGxheWVyKCk7XG4gICAgICAgICAgICBpZiAocGxheWVyID09IEdhbWUuSFVNQU4pXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wdXRlck1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAoMCwgZGlzcGxheV8xLmRpc3BsYXlSZXN1bHQpKHdpbm5lcik7XG4gICAgICAgIHRoaXMucGxheUFnYWluKCk7XG4gICAgfVxuICAgIHNldFBsYXllcigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID0gdGhpcy5jdXJyZW50UGxheWVyID09ICdYJyA/ICdPJyA6ICdYJztcbiAgICB9XG4gICAgcmVzZXRHYW1lKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIChfYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cCcpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBbXG4gICAgICAgICAgICBbJycsICcnLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnLCAnJ10sXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9ICdYJztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMzsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGkudG9TdHJpbmcoKSArIGoudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5pbm5lckhUTUwgPSBgYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGxheUFnYWluKCkge1xuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1hZ2FpbicpO1xuICAgICAgICBidG4gPT09IG51bGwgfHwgYnRuID09PSB2b2lkIDAgPyB2b2lkIDAgOiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0R2FtZSgpO1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBHYW1lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm9wZW5TcG90c0NvdW50ID0gZXhwb3J0cy5jaGVja1dpbm5lciA9IHZvaWQgMDtcbmNvbnN0IGNoZWNrV2lubmVyID0gKGJvYXJkKSA9PiB7XG4gICAgbGV0IHdpbm5lciA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgLy9jb2x1bW4gY2hlY2tzXG4gICAgICAgIGlmIChib2FyZFtpXVswXSA9PSBib2FyZFtpXVsxXSAmJiBib2FyZFtpXVswXSA9PSBib2FyZFtpXVsyXSAmJiBib2FyZFtpXVswXSAhPT0gJycpIHtcbiAgICAgICAgICAgIHdpbm5lciA9IGJvYXJkW2ldWzBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIC8vcm93IGNoZWNrc1xuICAgICAgICBpZiAoYm9hcmRbMF1baV0gPT0gYm9hcmRbMV1baV0gJiYgYm9hcmRbMF1baV0gPT0gYm9hcmRbMl1baV0gJiYgYm9hcmRbMF1baV0gIT09ICcnKSB7XG4gICAgICAgICAgICB3aW5uZXIgPSBib2FyZFswXVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoYm9hcmRbMF1bMF0gPT0gYm9hcmRbMV1bMV0gJiYgYm9hcmRbMF1bMF0gPT0gYm9hcmRbMl1bMl0gJiYgYm9hcmRbMF1bMF0gIT09ICcnKSB7XG4gICAgICAgIHdpbm5lciA9IGJvYXJkWzBdWzBdO1xuICAgIH1cbiAgICBpZiAoYm9hcmRbMF1bMl0gPT0gYm9hcmRbMV1bMV0gJiYgYm9hcmRbMF1bMl0gPT0gYm9hcmRbMl1bMF0gJiYgYm9hcmRbMF1bMl0gIT09ICcnKSB7XG4gICAgICAgIHdpbm5lciA9IGJvYXJkWzBdWzJdO1xuICAgIH1cbiAgICBpZiAod2lubmVyID09PSBudWxsICYmICgwLCBleHBvcnRzLm9wZW5TcG90c0NvdW50KShib2FyZCkgPT09IDApXG4gICAgICAgIHJldHVybiAndGllJztcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiB3aW5uZXI7XG59O1xuZXhwb3J0cy5jaGVja1dpbm5lciA9IGNoZWNrV2lubmVyO1xuY29uc3Qgb3BlblNwb3RzQ291bnQgPSAoYm9hcmQpID0+IHtcbiAgICBsZXQgZnJlZVNwYWNlcyA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PSAnJykge1xuICAgICAgICAgICAgICAgIGZyZWVTcGFjZXMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnJlZVNwYWNlcztcbn07XG5leHBvcnRzLm9wZW5TcG90c0NvdW50ID0gb3BlblNwb3RzQ291bnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYWRkU3ZnID0gZXhwb3J0cy5kaXNwbGF5UmVzdWx0ID0gZXhwb3J0cy52aXN1YWxpemUgPSBleHBvcnRzLmh1bWFuQ2xpY2tXYXRjaGVyID0gdm9pZCAwO1xuY29uc3QgaHVtYW5DbGlja1dhdGNoZXIgPSAoZ2FtZSkgPT4ge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzJyk7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZ2FtZS5wbGF5ZXJNb3ZlKHBhcnNlSW50KGNlbGwuaWRbMF0pLCBwYXJzZUludChjZWxsLmlkWzFdKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuaHVtYW5DbGlja1dhdGNoZXIgPSBodW1hbkNsaWNrV2F0Y2hlcjtcbmNvbnN0IHZpc3VhbGl6ZSA9ICgpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5uZXInKTtcbiAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGlkPVwiJHtpfSR7an1cIiBjbGFzcz1cImNlbGxzIGJnLWdyYXktNzAwICBncmlkIHBsYWNlLWl0ZW1zLWNlbnRlclwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0cy52aXN1YWxpemUgPSB2aXN1YWxpemU7XG5jb25zdCBkaXNwbGF5UmVzdWx0ID0gKHN5bWJvbCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcbiAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxuICAgIDxzZWN0aW9uIGlkPVwicG9wdXBcIiBjbGFzcz1cImFic29sdXRlIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0zIGJnLWdyYXktODAwIHctNjQgaC0zMCByb3VuZGVkLXhsIHAtNFwiPlxuICAgICAgPGgxIGNsYXNzPVwidGV4dC00eGwgdGV4dC1ibHVlLTQwMFwiPlxuICAgICAgICAke3N5bWJvbCA9PSAnWCcgfHwgc3ltYm9sID09ICdPJyA/IGBXaW5uZXIgaXMgPHNwYW4gY2xhc3M9XCJ0ZXh0LWJsdWUtMzAwIGZvbnQtYm9sZFwiPiR7c3ltYm9sfTwvc3Bhbj5gIDogJ0l0IGlzIGEgdGllJ31cbiAgICAgIDwvaDE+XG4gICAgICA8YnV0dG9uIGlkPVwicGxheS1hZ2FpblwiIGNsYXNzPVwidGV4dC1sZyBiZy1ncmF5LTIwMCByb3VuZGVkLXhsIHB4LTYgcHktMSB0ZXh0LWJsYWNrXCI+UGxheSBhZ2FpbjwvYnV0dG9uPlxuICAgIDwvc2VjdGlvbj5cbiAgICBgO1xuICAgIH1cbn07XG5leHBvcnRzLmRpc3BsYXlSZXN1bHQgPSBkaXNwbGF5UmVzdWx0O1xuY29uc3QgYWRkU3ZnID0gKGlkLCBzeW1ib2wpID0+IHtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmIChjZWxsKSB7XG4gICAgICAgIGNlbGwuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiLi9zcmMvaWNvbnMvJHtzeW1ib2x9LnN2Z1wiIGFsdD1cIiR7c3ltYm9sfVwiIC8+YDtcbiAgICB9XG59O1xuZXhwb3J0cy5hZGRTdmcgPSBhZGRTdmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYmVzdE1vdmUgPSB2b2lkIDA7XG5jb25zdCBHYW1lXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0dhbWVcIikpO1xuY29uc3QgY2hlY2tfcmVzdWx0XzEgPSByZXF1aXJlKFwiLi9jaGVjay1yZXN1bHRcIik7XG5mdW5jdGlvbiBiZXN0TW92ZShib2FyZCkge1xuICAgIGxldCBiZXN0U2NvcmUgPSAtSW5maW5pdHk7XG4gICAgbGV0IG1vdmU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PSAnJykge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gR2FtZV8xLmRlZmF1bHQuQUk7XG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gbWluaW1heChib2FyZCwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlID4gYmVzdFNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RTY29yZSA9IHNjb3JlO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlID0geyBpLCBqIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb3ZlO1xufVxuZXhwb3J0cy5iZXN0TW92ZSA9IGJlc3RNb3ZlO1xuZnVuY3Rpb24gbWluaW1heChib2FyZCwgZGVwdGgsIGlzTWF4aW1pemluZykge1xuICAgIGxldCByZXN1bHQgPSAoMCwgY2hlY2tfcmVzdWx0XzEuY2hlY2tXaW5uZXIpKGJvYXJkKTtcbiAgICBpZiAocmVzdWx0ID09IEdhbWVfMS5kZWZhdWx0LkFJKVxuICAgICAgICByZXR1cm4gMTtcbiAgICBpZiAocmVzdWx0ID09IEdhbWVfMS5kZWZhdWx0LkhVTUFOKVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgaWYgKHJlc3VsdCA9PSAndGllJylcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgaWYgKGlzTWF4aW1pemluZykge1xuICAgICAgICBsZXQgYmVzdFNjb3JlID0gLUluZmluaXR5O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV1bal0gPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmRbaV1bal0gPSBHYW1lXzEuZGVmYXVsdC5BSTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gbWluaW1heChib2FyZCwgZGVwdGggKyAxLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RTY29yZSA9IE1hdGgubWF4KHNjb3JlLCBiZXN0U2NvcmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmVzdFNjb3JlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGV0IGJlc3RTY29yZSA9IEluZmluaXR5O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV1bal0gPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmRbaV1bal0gPSBHYW1lXzEuZGVmYXVsdC5IVU1BTjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gbWluaW1heChib2FyZCwgZGVwdGggKyAxLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmRbaV1bal0gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgYmVzdFNjb3JlID0gTWF0aC5taW4oc2NvcmUsIGJlc3RTY29yZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZXN0U2NvcmU7XG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==