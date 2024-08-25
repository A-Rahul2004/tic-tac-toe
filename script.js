let cells = document.querySelectorAll(".cell");
let textDiv = document.querySelector(".text");

const pickCell = (() => {
  i = 0;
  return (cell) => {
    if (cell.textContent !== "") return;
    cell.textContent = i % 2 == 0 ? "X" : "O";
    textDiv.textContent = `${i % 2 == 1 ? "X" : "O"} to play`;
    checkWin();
    i++;
    if (i == 9) endGame();
  };
})();

const checkWin = () => {
  let values = Array.from(cells, (cell) => cell.textContent);
  for (let i = 0; i < 9; i += 3) {
    let row = values.slice(i, i + 3);
    if (row.every((text) => text === "X") || row.every((text) => text === "O"))
      endGame(row[0]);
  }
  for (let i = 0; i < 3; i++) {
    let column = [values[i], values[i + 3], values[i + 6]];
    if (
      column.every((text) => text === "X") ||
      column.every((text) => text === "O")
    )
      endGame(column[0]);
  }
  [
    [values[0], values[4], values[8]],
    [values[2], values[4], values[6]],
  ].forEach((diag) => {
    if (
      diag.every((text) => text === "X") ||
      diag.every((text) => text === "O")
    )
      endGame(values[4]);
  });
};

const endGame = (winner) => {
  cells.forEach((cell) => cell.classList.add("over"));
  if (winner === undefined) {
    textDiv.textContent = "It's a draw!";
  } else {
    textDiv.textContent = `${winner} Wins!`;
  }
};

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    cell.classList.add("select");
    pickCell(cell);
  });
});
