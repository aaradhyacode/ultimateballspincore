// Spin Dash Arena - Full Final Code with Multi-Touch Support
window.onload = () => {
  const startScreen = document.getElementById('startScreen');
  const singlePlayerBtn = document.getElementById('singlePlayerBtn');
  const multiPlayerBtn = document.getElementById('multiPlayerBtn');
  const modeSelect = document.getElementById('mode');

  singlePlayerBtn.addEventListener('click', () => {
    modeSelect.value = 'single';
    startScreen.style.display = 'none';
    resetGame();
  });

  multiPlayerBtn.addEventListener('click', () => {
    modeSelect.value = 'multi';
    startScreen.style.display = 'none';
    resetGame();
  });

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const difficultySelect = document.getElementById('difficulty');
  const labelP1 = document.getElementById('labelP1');
  const labelP2 = document.getElementById('labelP2');
  const player1ScoreSpan = document.getElementById('player1Score');
  const player2ScoreSpan = document.getElementById('player2Score');

  const skinColors = ['#ffffff', '#ffff00', '#00ff00', '#0000ff', '#ff0000', '#ff00ff', '#00ffff', '#ffa500',
    'gradient1', 'gradient2', 'gradient3', 'gradient4',
    'gradient5', 'gradient6', 'gradient7', 'gradient8',
    'gradient9', 'gradient10', 'gradient11', 'gradient12'
  ];

  let unlockedSkins = parseInt(localStorage.getItem('unlockedSkins')) || 0;
  let skin = '#ffffff';

  const skinBtn = document.createElement('button');
  skinBtn.id = 'skinBtn';
  skinBtn.textContent = 'Ball Skin';
  document.getElementById('controls').appendChild(skinBtn);

  function getGradientStyle(name) {
    switch (name) {
      case 'gradient1': return 'linear-gradient(45deg, #ff0000, #ffff00)';
      case 'gradient2': return 'linear-gradient(45deg, #0000ff, #800080)';
      case 'gradient3': return 'linear-gradient(45deg, #ffff00, #00ff00)';
      case 'gradient4': return 'linear-gradient(45deg, #800080, #ff00ff)';
      case 'gradient5': return 'linear-gradient(45deg, #00ffff, #0000ff)';
      case 'gradient6': return 'linear-gradient(45deg, #00a2ff, #f0f9ff)';
      case 'gradient7': return 'linear-gradient(45deg, #e00211, #6e04bf)';
      case 'gradient8': return 'linear-gradient(45deg, #2e4dab, #145414)';
      case 'gradient9': return 'linear-gradient(45deg, #ff0000, #0000ff, #ffffff)';
      case 'gradient10': return 'linear-gradient(45deg, #108a03, #a4d0f5, #ff9900)';
      case 'gradient11': return 'linear-gradient(45deg, #ff0000, #fff700, #00ff08, #0077ff, #6200ff, #ff00bf)';
      case 'gradient12': return 'linear-gradient(45deg, #C0C0C0, #FFD700)';
      default: return name;
    }
  }

  function updateSkinButtonStyle() {
    skinBtn.style.background = skin.startsWith('gradient') ? getGradientStyle(skin) : skin;
    skinBtn.style.color = 'black';
    skinBtn.style.border = '2px solid black';
    skinBtn.style.padding = '10px 18px';
    skinBtn.style.borderRadius = '8px';
    skinBtn.style.fontWeight = 'bold';
  }

  const unlockPopup = document.createElement('div');
  unlockPopup.id = 'unlockPopup';
  unlockPopup.textContent = 'New Colour Unlocked!';
  Object.assign(unlockPopup.style, {
    position: 'fixed', top: '30%', left: '50%',
    transform: 'translate(-50%, -50%)', background: '#222', color: 'white',
    fontSize: '22px', padding: '20px 30px', borderRadius: '10px',
    display: 'none', zIndex: 9999, boxShadow: '0 0 15px rgba(0,0,0,0.5)',
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
    setTimeout(() => { unlockPopup.style.display = 'none'; }, 2200);
  }

  const lockedPopup = document.createElement('div');
  lockedPopup.id = 'lockedPopup';
  lockedPopup.textContent = 'You can get the skin after winning a match with CPU!';
  Object.assign(lockedPopup.style, {
    position: 'fixed', top: '30%', left: '50%',
    transform: 'translate(-50%, -50%)', background: '#222', color: 'white',
    fontSize: '20px', padding: '15px 25px', borderRadius: '8px',
    display: 'none', zIndex: 9999, boxShadow: '0 0 12px rgba(0,0,0,0.6)',
    transition: 'opacity 0.5s ease, transform 0.5s ease'
  });
  document.body.appendChild(lockedPopup);

  const skinOverlay = document.createElement('div');
  Object.assign(skinOverlay.style, {
    position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
    background: 'rgba(0,0,0,0.8)', display: 'none', alignItems: 'center',
    justifyContent: 'center', zIndex: 9998,
  });

  const skinContainer = document.createElement('div');
  Object.assign(skinContainer.style, {
    background: '#333', padding: '20px', borderRadius: '12px',
    display: 'grid', gridTemplateColumns: 'repeat(4, 60px)', gap: '12px',
    maxHeight: '300px', maxWidth: '300px', overflowY: 'auto',
    boxShadow: '0 0 12px rgba(0,0,0,0.6)',
  });

  skinOverlay.appendChild(skinContainer);
  document.body.appendChild(skinOverlay);

  skinOverlay.addEventListener('click', (e) => {
    if (e.target === skinOverlay) skinOverlay.style.display = 'none';
  });

  function updateSkinOverlay() {
    skinContainer.innerHTML = '';
    skinColors.forEach((color, i) => {
      const btn = document.createElement('button');
      btn.style.background = color.startsWith('gradient') ? getGradientStyle(color) : color;
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
          lockedPopup.style.display = 'block';
          lockedPopup.style.opacity = '1';
          lockedPopup.style.transform = 'translate(-50%, -50%)';
          setTimeout(() => {
            lockedPopup.style.opacity = '0';
            lockedPopup.style.transform = 'translate(-50%, -60%)';
          }, 1500);
          setTimeout(() => { lockedPopup.style.display = 'none'; }, 2000);
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

  const ball = { x: WIDTH / 2, y: HEIGHT / 2, size: BALL_SIZE, speedX: 4, speedY: 4 };

  const paddleSound = new Audio('https://www.soundjay.com/buttons/button-24.mp3');
  paddleSound.volume = 0.2;
  const wallSound = new Audio('https://www.soundjay.com/buttons/button-50.mp3');
  wallSound.volume = 0.4;
  const scoreSound = new Audio('https://www.soundjay.com/buttons/button-10.mp3');
  scoreSound.volume = 0.3;

  const backgroundMusic = new Audio('https://www.soundjay.com/free-music/cautious-path-01.mp3');
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.6;

  const musicBtn = document.createElement('button');
  musicBtn.textContent = 'Toggle Music';
  document.getElementById('controls').appendChild(musicBtn);

  let musicEnabled = false;
  musicBtn.addEventListener('click', () => {
    musicEnabled = !musicEnabled;
    if (musicEnabled) {
      backgroundMusic.play();
      musicBtn.textContent = 'Pause Music';
    } else {
      backgroundMusic.pause();
      musicBtn.textContent = 'Play Music';
    }
  });

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
      case 'captain': return 14;
      case 'boss': return 15;
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
    if (color.startsWith('gradient')) {
      let gradient = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
      switch (color) {
        case 'gradient1': gradient.addColorStop(0, '#ff0000'); gradient.addColorStop(1, '#ffff00'); break;
        case 'gradient2': gradient.addColorStop(0, '#0000ff'); gradient.addColorStop(1, '#800080'); break;
        case 'gradient3': gradient.addColorStop(0, '#ffff00'); gradient.addColorStop(1, '#00ff00'); break;
        case 'gradient4': gradient.addColorStop(0, '#800080'); gradient.addColorStop(1, '#ff00ff'); break;
        case 'gradient5': gradient.addColorStop(0, '#00ffff'); gradient.addColorStop(1, '#0000ff'); break;
        case 'gradient6': gradient.addColorStop(0, '#00a2ff'); gradient.addColorStop(1, '#f0f9ff'); break;
        case 'gradient7': gradient.addColorStop(0, '#e00211'); gradient.addColorStop(1, '#6e04bf'); break;
        case 'gradient8': gradient.addColorStop(0, '#2e4dab'); gradient.addColorStop(1, '#145414'); break;
        case 'gradient9': gradient.addColorStop(0, '#ff0000'); gradient.addColorStop(0.5, '#0000ff'); gradient.addColorStop(1, '#ffffff'); break;
        case 'gradient10': gradient.addColorStop(0, '#108a03'); gradient.addColorStop(0.5, '#a4d0f5'); gradient.addColorStop(1, '#ff9900'); break;
        case 'gradient11': gradient.addColorStop(0, '#ff0000'); gradient.addColorStop(0.2, '#fff700'); gradient.addColorStop(0.4, '#00ff08'); gradient.addColorStop(0.6, '#0077ff'); gradient.addColorStop(0.8, '#6200ff'); gradient.addColorStop(1, '#ff00bf'); break;
        case 'gradient12': gradient.addColorStop(0, '#C0C0C0'); gradient.addColorStop(1, '#FFD700'); break;
      }
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = color;
    }

    ctx.shadowColor = ctx.fillStyle;
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
    return (ball.y + ball.size > paddle.y && ball.y - ball.size < paddle.y + PADDLE_HEIGHT &&
            ball.x - ball.size < paddle.x + PADDLE_WIDTH && ball.x + ball.size > paddle.x);
  }

  function checkWinCondition() {
    if (player1Score >= 10 || player2Score >= 10) {
      stopGame();
      let message = '';

      if (mode === 'single') {
        if (player1Score >= 10) {
          message = '🎉You Won!🎉';
          if (unlockedSkins < skinColors.length - 1) {
            unlockedSkins++;
            localStorage.setItem('unlockedSkins', unlockedSkins);
            showUnlockPopup();
          }
        } else {
          message = 'CPU Won';
        }
      } else {
        message = player1Score >= 10 ? '🎉Player 1 Wins!🎉' : '🎉Player 2 Wins!🎉';
      }

      updateSkinButtonStyle();
      document.getElementById('popupMessage').textContent = message;
      document.getElementById('winPopup').classList.remove('hidden');
    }
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
      const factor = { easy: 0.27, medium: 0.29, hard: 0.33, super: 0.38, extreme: 0.43, captain: 0.47, boss: 0.51 }[difficulty] || 0.29;
      if (paddle2.y < targetY) paddle2.y += PADDLE_SPEED * factor;
      else if (paddle2.y > targetY) paddle2.y -= PADDLE_SPEED * factor;
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
      backgroundMusic.play().catch(e => console.log('Music play failed:', e));
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

  // Multi-Touch Paddle Support
  function setupTouchControls() {
    const activeTouches = {};
    canvas.addEventListener('touchstart', (e) => {
      const rect = canvas.getBoundingClientRect();
      for (let touch of e.changedTouches) {
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        const id = touch.identifier;
        if (x < canvas.width / 2) activeTouches[id] = { paddle: paddle1, offsetY: y - paddle1.y };
        else if (mode === 'multi') activeTouches[id] = { paddle: paddle2, offsetY: y - paddle2.y };
      }
    });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      for (let touch of e.changedTouches) {
        const data = activeTouches[touch.identifier];
        if (data) {
          const y = touch.clientY - rect.top;
          data.paddle.y = y - data.offsetY;
          data.paddle.y = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, data.paddle.y));
        }
      }
    });
    canvas.addEventListener('touchend', (e) => {
      for (let touch of e.changedTouches) delete activeTouches[touch.identifier];
    });
    canvas.addEventListener('touchcancel', (e) => {
      for (let touch of e.changedTouches) delete activeTouches[touch.identifier];
    });
  }
  setupTouchControls();

  document.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (["arrowup", "arrowdown", " "].includes(key)) e.preventDefault();
    keysPressed[key] = true;
  });

  document.addEventListener('keyup', e => {
    keysPressed[e.key.toLowerCase()] = false;
  });

  startBtn.addEventListener('click', startGame);
  resetBtn.addEventListener('click', resetGame);

  difficultySelect.addEventListener('change', () => {
    difficulty = difficultySelect.value;
    resetGame();
  });

  modeSelect.addEventListener('change', () => {
    mode = modeSelect.value;
    skin = '#ffffff';
    updateScoreLabels();
    updateSkinButtonStyle();
    resetGame();
  });


  document.getElementById('popupReset').addEventListener('click', () => {
    document.getElementById('winPopup').classList.add('hidden');
    resetGame();
  });

  updateScoreLabels();
  updateSkinButtonStyle();
  resetGame();
};
