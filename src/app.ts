import Game from './modules/Game';
import { visualize } from './modules/helpers/display';

const xBtn = document.getElementById('x');
const oBtn = document.getElementById('o');

xBtn?.addEventListener('click', () => {
  document.getElementById('popup')?.remove();
  const game = new Game('O', 'X');
  visualize();
  game.start();
});

oBtn?.addEventListener('click', () => {
  document.getElementById('popup')?.remove();
  const game = new Game('X', 'O');
  visualize();
  game.start();
});
