import Game from '../Game';
import { checkWinner } from './check-result';

export function bestMove(board: string[][]): { i: number; j: number } {
  let bestScore = -Infinity;
  let move: any;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        board[i][j] = Game.AI;
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

function minimax(board: string[][], depth: number, isMaximizing: boolean): number {
  let result: string | null = checkWinner(board);
  if (result == Game.AI) return 1;
  if (result == Game.HUMAN) return -1;
  if (result == 'tie') return 0;

  if (isMaximizing) {
    let bestScore: number = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = Game.AI;
          let score = minimax(board, depth + 1, false);
          board[i][j] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore: number = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = Game.HUMAN;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
