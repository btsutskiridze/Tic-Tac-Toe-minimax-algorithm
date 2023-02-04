import { checkWinner } from './helpers/check-result';
import { displayResult, addSvg, humanClickWatcher } from './helpers/display';
import { bestMove } from './helpers/minimax';

class Game {
  private board: string[][];
  private currentPlayer: string;
  public static AI: string;
  public static HUMAN: string;

  constructor(ai: string, human: string) {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.currentPlayer = 'X';
    Game.AI = ai;
    Game.HUMAN = human;
  }

  public start(): void {
    if (this.currentPlayer == Game.AI) this.computerMove();
    humanClickWatcher(this);
  }

  public playerMove(row: number, col: number): void {
    if (this.board[row][col] == '') {
      this.board[row][col] = this.currentPlayer;
      addSvg(row.toString() + col.toString(), Game.HUMAN);

      this.handleMove(Game.HUMAN);
    }
  }
  public computerMove(): void {
    let move = bestMove(this.board);
    this.board[move.i][move.j] = Game.AI;
    addSvg(move.i.toString() + move.j.toString(), Game.AI);

    this.handleMove(Game.AI);
  }

  private handleMove(player: string): void {
    let winner = checkWinner(this.board);
    if (winner == null) {
      this.setPlayer();
      if (player == Game.HUMAN) this.computerMove();
      return;
    }
    displayResult(winner);
    this.playAgain();
  }

  private setPlayer(): void {
    this.currentPlayer = this.currentPlayer == 'X' ? 'O' : 'X';
  }

  private resetGame() {
    document.getElementById('popup')?.remove();
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

  private playAgain() {
    const btn = document.getElementById('play-again');

    btn?.addEventListener('click', () => {
      this.resetGame();
      this.start();
    });
  }
}
export default Game;
