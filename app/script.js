const board = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const rows = 20;
const cols = 20;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = 'RIGHT';
let score = 0;
let gameInterval;

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
}

function draw() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.className = 'cell');

  snake.forEach(segment => {
    const index = segment.y * cols + segment.x;
    cells[index].classList.add('snake');
  });

  const foodIndex = food.y * cols + food.x;
  cells[foodIndex].classList.add('food');
}

function move() {
  const head = { ...snake[0] };

  if (direction === 'UP') head.y--;
  if (direction === 'DOWN') head.y++;
  if (direction === 'LEFT') head.x--;
  if (direction === 'RIGHT') head.x++;

  // Infinite wall wraparound logic
  if (head.x < 0) head.x = cols - 1;
  if (head.x >= cols) head.x = 0;
  if (head.y < 0) head.y = rows - 1;
  if (head.y >= rows) head.y = 0;

  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    clearInterval(gameInterval);
    alert('Game Over! 🐍 Final Score: ' + score);
    location.reload();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreDisplay.textContent = 'Score: ' + score;
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
  };
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
  if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// ✅ THIS is the crucial part to fix the issue
window.onload = () => {
  startGame();
};

function startGame() {
  createBoard();
  draw();
  gameInterval = setInterval(move, 150);
}
