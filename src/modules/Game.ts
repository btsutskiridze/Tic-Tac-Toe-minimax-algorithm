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
}
export default Game;
