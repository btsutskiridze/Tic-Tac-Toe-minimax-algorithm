import Game from '../Game';

export const humanClickWatcher = (game: Game): void => {
  const cells = document.querySelectorAll('.cells');
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      game.playerMove(parseInt(cell.id[0]), parseInt(cell.id[1]));
    });
  });
};

export const visualize = (): void => {
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

export const displayResult = (symbol: string): void => {
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

export const addSvg = (id: string, symbol: string) => {
  const cell = document.getElementById(id);
  if (cell) {
    cell.innerHTML = `<img src="./icons/${symbol}.svg" alt="${symbol}.svg" />`;
  }
};
