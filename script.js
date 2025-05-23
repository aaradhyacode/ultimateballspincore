window.onload = () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const difficultySelect = document.getElementById('difficulty');
  const modeSelect = document.getElementById('mode');
  const skinSelect = document.getElementById('skin');
  const labelP1 = document.getElementById('labelP1');
  const labelP2 = document.getElementById('labelP2');
  const player1ScoreSpan = document.getElementById('player1Score');
  const player2ScoreSpan = document.getElementById('player2Score');

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  let gameInterval;
  let running = false;

  const PADDLE_WIDTH = 12;
  const PADDLE_HEIGHT = 92;
  const PADDLE_SPEED = 7;
  const BALL_SIZE = 12;

  let player1Score = 0;
  let player2Score = 0;
  let difficulty = 'easy';
  let mode = 'single';
  let skin = '#ffffff';

  const paddle1 = { x: 20, y: HEIGHT / 2 - PADDLE_HEIGHT / 2, color: '#ff1800' };
  const paddle2 = { x: WIDTH - 32, y: HEIGHT / 2 - PADDLE_HEIGHT / 2, color: '#008ceb' };

  const ball = {
    x: WIDTH / 2,
    y: HEIGHT / 2,
    size: BALL_SIZE,
    speedX: 4,
    speedY: 4,
  };

  const paddleSound = new Audio('https://www.soundjay.com/buttons/button-24.mp3');
  const wallSound = new Audio('https://www.soundjay.com/buttons/button-50.mp3');
  const scoreSound = new Audio('https://www.soundjay.com/buttons/button-10.mp3');

  const keysPressed = {};

  function updateScoreLabels() {
    if (mode === 'single') {
      labelP1.textContent = 'Player score';
      labelP2.textContent = 'CPU score';
    } else {
      labelP1.textContent = 'Player 1 score';
      labelP2.textContent = 'Player 2 score';
    }
  }

  function resetBall() {
    ball.x = WIDTH / 2;
    ball.y = HEIGHT / 2;
    let speed = getBallSpeed();
    ball.speedX = Math.random() > 0.5 ? speed : -speed;
    ball.speedY = (Math.random() - 0.5) * speed;
  }

  function getBallSpeed() {
    switch (difficulty) {
      case 'easy': return 4;
      case 'medium': return 5;
      case 'hard': return 6;
      case 'super': return 7;
      case 'extreme': return 9;
      default: return 4;
    }
  }

  function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 8;
    ctx.fillRect(x, y, w, h);
    ctx.shadowBlur = 0;
  }

  function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawRect(paddle1.x, paddle1.y, PADDLE_WIDTH, PADDLE_HEIGHT, paddle1.color);
    drawRect(paddle2.x, paddle2.y, PADDLE_WIDTH, PADDLE_HEIGHT, paddle2.color);
    drawCircle(ball.x, ball.y, ball.size, skin);
  }

  function update() {
    // Paddle 1
    if (keysPressed['w']) paddle1.y -= PADDLE_SPEED;
    if (keysPressed['s']) paddle1.y += PADDLE_SPEED;

    // Paddle 2
    if (mode === 'multi') {
      if (keysPressed['arrowup']) paddle2.y -= PADDLE_SPEED;
      if (keysPressed['arrowdown']) paddle2.y += PADDLE_SPEED;
    }

    // Touch-based paddles (position already adjusted via intervals)

    paddle1.y = Math.min(Math.max(0, paddle1.y), HEIGHT - PADDLE_HEIGHT);
    paddle2.y = Math.min(Math.max(0, paddle2.y), HEIGHT - PADDLE_HEIGHT);

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y - ball.size <= 0 || ball.y + ball.size >= HEIGHT) {
      ball.speedY *= -1;
      wallSound.play();
    }

    if (ball.speedX < 0 && paddleCollision(paddle1)) {
      ball.x = paddle1.x + PADDLE_WIDTH + ball.size / 2;
      ball.speedX *= -1.05;
      ball.speedY += (ball.y - (paddle1.y + PADDLE_HEIGHT / 2)) * 0.3;
      paddleSound.play();
    } else if (ball.speedX > 0 && paddleCollision(paddle2)) {
      ball.x = paddle2.x - ball.size / 2;
      ball.speedX *= -1.05;
      ball.speedY += (ball.y - (paddle2.y + PADDLE_HEIGHT / 2)) * 0.3;
      paddleSound.play();
    }

    if (ball.x + ball.size < 0) {
      player2Score++;
      scoreSound.play();
      resetBall();
    } else if (ball.x - ball.size > WIDTH) {
      player1Score++;
      scoreSound.play();
      resetBall();
    }

    if (mode === 'single') {
      const targetY = ball.y - PADDLE_HEIGHT / 2;
      if (paddle2.y < targetY) paddle2.y += PADDLE_SPEED;
      else if (paddle2.y > targetY) paddle2.y -= PADDLE_SPEED;
    }

    player1ScoreSpan.textContent = player1Score;
    player2ScoreSpan.textContent = player2Score;
  }

  function paddleCollision(paddle) {
    return (
      ball.y + ball.size > paddle.y &&
      ball.y - ball.size < paddle.y + PADDLE_HEIGHT &&
      ball.x - ball.size < paddle.x + PADDLE_WIDTH &&
      ball.x + ball.size > paddle.x
    );
  }

  function gameLoop() {
    update();
    draw();
  }

  function startGame() {
    if (!running) {
      gameInterval = setInterval(gameLoop, 1000 / 60);
      running = true;
    }
  }

  function stopGame() {
    clearInterval(gameInterval);
    running = false;
  }

  function resetGame() {
    stopGame();
    player1Score = 0;
    player2Score = 0;
    updateScoreLabels();
    resetBall();
    paddle1.y = HEIGHT / 2 - PADDLE_HEIGHT / 2;
    paddle2.y = HEIGHT / 2 - PADDLE_HEIGHT / 2;
    draw();
    player1ScoreSpan.textContent = '0';
    player2ScoreSpan.textContent = '0';
  }

  // Key controls
  document.addEventListener('keydown', e => {
  const key = e.key.toLowerCase();

  // Prevent scrolling for arrow keys
  if (["arrowup", "arrowdown", " "].includes(key)) {
    e.preventDefault();
  }

  keysPressed[key] = true;
});

  document.addEventListener('keyup', e => {
    keysPressed[e.key.toLowerCase()] = false;
  });

  // Touch controls
  let p1Interval, p2Interval;
  const touchHold = (id, action) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener('touchstart', () => {
      action();
      const interval = setInterval(action, 16);
      if (id.includes('p1')) p1Interval = interval;
      else p2Interval = interval;
    });

    btn.addEventListener('touchend', () => {
      clearInterval(p1Interval);
      clearInterval(p2Interval);
    });
  };

  touchHold('p1-up', () => { paddle1.y -= PADDLE_SPEED; });
  touchHold('p1-down', () => { paddle1.y += PADDLE_SPEED; });
  touchHold('p2-up', () => { if (mode === 'multi') paddle2.y -= PADDLE_SPEED; });
  touchHold('p2-down', () => { if (mode === 'multi') paddle2.y += PADDLE_SPEED; });

  function isMobileDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.userAgent.toLowerCase().includes("mobile")
    );
  }

  if (isMobileDevice()) {
    document.getElementById('touch-controls').style.display = 'flex';
  }

  // Button handlers
  startBtn.addEventListener('click', startGame);
  resetBtn.addEventListener('click', resetGame);

  difficultySelect.addEventListener('change', () => {
    difficulty = difficultySelect.value;
    resetGame();
  });

  modeSelect.addEventListener('change', () => {
    mode = modeSelect.value;
    updateScoreLabels();
    resetGame();
  });

  skinSelect.addEventListener('change', () => {
    skin = skinSelect.value;
    resetGame();
  });

  difficulty = difficultySelect.value;
  mode = modeSelect.value;
  skin = skinSelect.value;
  updateScoreLabels();
  resetGame();
};
