export const checkWinner = (board: string[][]): string | null => {
  let winner: string | null = null;
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

  if (winner === null && openSpotsCount(board) === 0) return 'tie';
  else return winner;
};

export const openSpotsCount = (board: string[][]): number => {
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
