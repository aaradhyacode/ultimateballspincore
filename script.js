window.onload = () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const difficultySelect = document.getElementById('difficulty');
  const modeSelect = document.getElementById('mode');
  const labelP1 = document.getElementById('labelP1');
  const labelP2 = document.getElementById('labelP2');
  const player1ScoreSpan = document.getElementById('player1Score');
  const player2ScoreSpan = document.getElementById('player2Score');

  // Skin colors and initial state
  const skinColors = ['#ffffff', '#ffff00', '#00ff00', '#0000ff', '#ff0000', '#ff00ff', '#00ffff', '#ffa500', 'linear-gradient(45deg, #ff0000, #ffff00)', 'linear-gradient(45deg, #0000ff, #800080)',
    'linear-gradient(45deg, #ffff00, #00ff00)', 'linear-gradient(45deg, #800080, #ff00ff)',
    'linear-gradient(45deg, #00ffff, #0000ff)', 'linear-gradient(45deg, #00a2ff, #f0f9ff)', 'linear-gradient(45deg, #e00211, #6e04bf)', 'linear-gradient(45deg, #2e4dab, #145414)', 'linear-gradient(45deg, #ff0000, #0000ff, #ffffff)', 'linear-gradient(45deg, #108a03, #a4d0f5, #ff9900)', 'linear-gradient(45deg, #ff0000, #fff700, #00ff08, #0077ff, #6200ff, #ff00bf)', 'linear-gradient(45deg, #C0C0C0, #FFD700)'
  ];
  
  let unlockedSkins = parseInt(localStorage.getItem('unlockedSkins')) || 0;
  let skin = '#ffffff';

  // Add color select button
  const skinBtn = document.createElement('button');
  skinBtn.id = 'skinBtn';
  skinBtn.textContent = 'Ball Color';
  document.getElementById('controls').appendChild(skinBtn);

  function updateSkinButtonStyle() {
    skinBtn.style.background = skin;
    skinBtn.style.color = 'Black';
    skinBtn.style.border = '2px solid black';
    skinBtn.style.padding = '10px 18px';
    skinBtn.style.borderRadius = '8px';
    skinBtn.style.fontWeight = 'bold';
  }

  // Unlock popup
  const unlockPopup = document.createElement('div');
  unlockPopup.id = 'unlockPopup';
  unlockPopup.textContent = 'New Colour Unlocked!';
  Object.assign(unlockPopup.style, {
    position: 'fixed',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#222',
    color: 'white',
    fontSize: '22px',
    padding: '20px 30px',
    borderRadius: '10px',
    display: 'none',
    zIndex: 9999,
    boxShadow: '0 0 15px rgba(0,0,0,0.5)',
    transition: 'opacity 0.5s ease, transform 0.5s ease'
  });
  document.body.appendChild(unlockPopup);

  function showUnlockPopup() {
    unlockPopup.style.display = 'block';
    unlockPopup.style.opacity = '1';
    unlockPopup.style.transform = 'translate(-50%, -50%)';
    setTimeout(() => {
      unlockPopup.style.opacity = '0';
      unlockPopup.style.transform = 'translate(-50%, -60%)';
    }, 1800);
    setTimeout(() => {
      unlockPopup.style.display = 'none';
    }, 2200);
  }

  // Locked color notice
// Locked Skin Popup
const lockedPopup = document.createElement('div');
lockedPopup.id = 'lockedPopup';
lockedPopup.textContent = 'You can get the skin after winning a match with CPU!';
Object.assign(lockedPopup.style, {
  position: 'fixed',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#222',
  color: 'white',
  fontSize: '20px',
  padding: '15px 25px',
  borderRadius: '8px',
  display: 'none',
  zIndex: 9999,
  boxShadow: '0 0 12px rgba(0,0,0,0.6)',
  transition: 'opacity 0.5s ease, transform 0.5s ease'
});
document.body.appendChild(lockedPopup);

// Overlay for color selection
const skinOverlay = document.createElement('div');
Object.assign(skinOverlay.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.8)',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9998,
});

// Inner container for grid
const skinContainer = document.createElement('div');
Object.assign(skinContainer.style, {
  background: '#333',
  padding: '20px',
  borderRadius: '12px',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 60px)',
  gap: '12px',
  maxHeight: '300px',
  maxWidth: '300px',
  overflowY: 'auto',
  boxShadow: '0 0 12px rgba(0,0,0,0.6)',
});

skinOverlay.appendChild(skinContainer); document.body.appendChild(skinOverlay);

  // Close overlay on outside click
  skinOverlay.addEventListener('click', (e) => {
    if (e.target === skinOverlay) {
      skinOverlay.style.display = 'none';
    }
  });

  // Show overlay with buttons
  function updateSkinOverlay() {
 skinContainer.innerHTML = '';
skinColors.forEach((color, i) => {
  const btn = document.createElement('button');
  btn.style.background = color.includes('gradient') ? color : color;
  btn.style.width = '50px';
  btn.style.height = '50px';
  btn.style.border = '2px solid gray';
  btn.style.borderRadius = '50%';
  btn.style.cursor = 'pointer';
  btn.disabled = mode === 'single' && i > unlockedSkins;
  if (btn.disabled) btn.innerHTML = '🔒';

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (btn.disabled) {
      showLockedPopup();
    } else {
      skin = color;
      skinOverlay.style.display = 'none';
      updateSkinButtonStyle();
      resetGame();
    }
  });

  skinContainer.appendChild(btn);
});
  }

  skinBtn.addEventListener('click', () => {
    updateSkinOverlay();
    skinOverlay.style.display = 'flex';
  });

  updateSkinButtonStyle();
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
  let difficulty = difficultySelect.value;
  let mode = modeSelect.value;

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
    labelP1.textContent = mode === 'single' ? 'Player score' : 'Player 1 score';
    labelP2.textContent = mode === 'single' ? 'CPU score' : 'Player 2 score';
  }

  function getBallSpeed() {
    switch (difficulty) {
      case 'easy': return 7;
      case 'medium': return 8;
      case 'hard': return 9;
      case 'super': return 11;
      case 'extreme': return 12;
      case 'boss': return 14;
      default: return 8;
    }
  }

  function resetBall() {
    const speed = getBallSpeed();
    ball.x = WIDTH / 2;
    ball.y = HEIGHT / 2;
    ball.speedX = Math.random() > 0.5 ? speed : -speed;
    ball.speedY = (Math.random() - 0.5) * speed;
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

  function paddleCollision(paddle) {
    return (
      ball.y + ball.size > paddle.y &&
      ball.y - ball.size < paddle.y + PADDLE_HEIGHT &&
      ball.x - ball.size < paddle.x + PADDLE_WIDTH &&
      ball.x + ball.size > paddle.x
    );
  }

  function checkWinCondition() {
    if (player1Score >= 10 || player2Score >= 10) {
      stopGame();
      let message = '';

      if (mode === 'single') {
        if (player1Score >= 10) {
          message = 'You Won!';
          if (unlockedSkins < skinColors.length - 1) {
            unlockedSkins++;
            localStorage.setItem('unlockedSkins', unlockedSkins);
            showUnlockPopup();
          }
        } else {
          message = 'CPU Won!';
        }
      } else {
        message = player1Score >= 10 ? 'Player 1 Won!' : 'Player 2 Won!';
      }

      updateSkinButtonStyle();
      document.getElementById('popupMessage').textContent = message;
      document.getElementById('winPopup').classList.remove('hidden');
    }
  }

  function showLockedPopup() {
  lockedPopup.style.display = 'block';
  lockedPopup.style.opacity = '1';
  lockedPopup.style.transform = 'translate(-50%, -50%)';
  setTimeout(() => {
    lockedPopup.style.opacity = '0';
    lockedPopup.style.transform = 'translate(-50%, -60%)';
  }, 1500);
  setTimeout(() => {
    lockedPopup.style.display = 'none';
  }, 2000);
}

  function update() {
    if (keysPressed['w']) paddle1.y -= PADDLE_SPEED;
    if (keysPressed['s']) paddle1.y += PADDLE_SPEED;

    if (mode === 'multi') {
      if (keysPressed['arrowup']) paddle2.y -= PADDLE_SPEED;
      if (keysPressed['arrowdown']) paddle2.y += PADDLE_SPEED;
    }

    paddle1.y = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, paddle1.y));
    paddle2.y = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, paddle2.y));

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y - ball.size <= 0 || ball.y + ball.size >= HEIGHT) {
      ball.speedY *= -1;
      wallSound.play();
    }

    if (ball.speedX < 0 && paddleCollision(paddle1)) {
      ball.speedX = Math.abs(getBallSpeed());
      ball.speedY = (Math.random() - 0.5) * getBallSpeed();
      paddleSound.play();
    } else if (ball.speedX > 0 && paddleCollision(paddle2)) {
      ball.speedX = -Math.abs(getBallSpeed());
      ball.speedY = (Math.random() - 0.5) * getBallSpeed();
      paddleSound.play();
    }

    if (ball.x + ball.size < 0) {
      player2Score++;
      scoreSound.play();
      resetBall();
      checkWinCondition();
    } else if (ball.x - ball.size > WIDTH) {
      player1Score++;
      scoreSound.play();
      resetBall();
      checkWinCondition();
    }

    if (mode === 'single') {
      const targetY = ball.y - PADDLE_HEIGHT / 2;
      const cpuDifficultyFactor = {
        easy: 0.27,
        medium: 0.29,
        hard: 0.32,
        super: 0.38,
        extreme: 0.41,
        boss: 0.43,
      }[difficulty] || 0.29;

      if (paddle2.y < targetY) paddle2.y += PADDLE_SPEED * cpuDifficultyFactor;
      else if (paddle2.y > targetY) paddle2.y -= PADDLE_SPEED * cpuDifficultyFactor;
    }

    player1ScoreSpan.textContent = player1Score;
    player2ScoreSpan.textContent = player2Score;
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
    updateSkinButtonStyle();
  }

  // Key controls
  document.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (["arrowup", "arrowdown", " "].includes(key)) e.preventDefault();
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

  // Show touch controls on mobile
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.userAgent.toLowerCase().includes("mobile")) {
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
    updateSkinButtonStyle();
    resetGame();
  });

  document.getElementById('popupReset').addEventListener('click', () => {
    document.getElementById('winPopup').classList.add('hidden');
    resetGame();
  });

  // Initial setup
  updateScoreLabels();
  updateSkinButtonStyle();
  resetGame();
};
