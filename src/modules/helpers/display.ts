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
