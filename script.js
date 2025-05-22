let currentPlayer = 1;
let board = [];
let gameOver = false;

function createBoard() {
  const rows = parseInt(document.getElementById('rows').value);
  const cols = parseInt(document.getElementById('cols').value);
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  board = [];
  gameOver = false;
  currentPlayer = 1;
  updateTurn();

  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;

      if (r === 0 && c === 0) {
        cell.classList.add('bitter'); // bitter block (lose block)
      }

      cell.addEventListener('click', handleClick);
      boardDiv.appendChild(cell);
      row.push(cell);
    }
    board.push(row);
    boardDiv.appendChild(document.createElement('br'));
  }
}

function handleClick(e) {
  if (gameOver) return;

  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);

  if (board[row][col].classList.contains('eaten')) return;

  for (let r = row; r < board.length; r++) {
    for (let c = col; c < board[0].length; c++) {
      board[r][c].classList.add('eaten');
    }
  }

  if (row === 0 && col === 0) {
    document.getElementById('turnDisplay').innerText = `Player ${currentPlayer} ate the bitter block! Player ${3 - currentPlayer} wins!`;
    gameOver = true;
    return;
  }

  currentPlayer = 3 - currentPlayer;
  updateTurn();
}

function updateTurn() {
  document.getElementById('turnDisplay').innerText = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  createBoard();
}
