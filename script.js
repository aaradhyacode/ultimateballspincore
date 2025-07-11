window.onload = () => {
  const bgCanvas = document.getElementById('bgCanvas');
  const bgCtx = bgCanvas.getContext('2d');

  const startScreen = document.getElementById('startScreen');
  const singlePlayerBtn = document.getElementById('singlePlayerBtn');
  const multiPlayerBtn = document.getElementById('multiPlayerBtn');
  const modeSelect = document.getElementById('mode');

  singlePlayerBtn.addEventListener('click', () => {
    modeSelect.value = 'single';
    mode = 'single';
    startScreen.style.display = 'none';
    modeSelect.style.display = 'none';
    resetGame();
    
    if (!musicEnabled) {
    backgroundMusic.play().catch(e => console.log('Music play failed:', e));
    musicBtn.textContent = 'Pause Music';
    musicEnabled = true;
  }
  });

  multiPlayerBtn.addEventListener('click', () => {
    modeSelect.value = 'multi';
    mode = 'multi';
    startScreen.style.display = 'none';
    modeSelect.style.display = 'none';
    resetGame();
    
      if (!musicEnabled) {
    backgroundMusic.play().catch(e => console.log('Music play failed:', e));
    musicBtn.textContent = 'Pause Music';
    musicEnabled = true;
  }
  });

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

function adjustCanvasWidth() {
  const gameWrapper = document.getElementById('gameWrapper');
  const gameCanvas = document.getElementById('gameCanvas');
  const wrapperWidth = gameWrapper.offsetWidth;

  if (wrapperWidth < 750) {
    gameCanvas.style.width = '400px';
    gameCanvas.style.top = '5px';
  } else if (wrapperWidth < 1300) {
    gameCanvas.style.width = '550px';
    gameCanvas.style.top = '6px';
  } else if (wrapperWidth < 2900) {
    gameCanvas.style.width = '880px';
    gameCanvas.style.top = '30px';
  } else {
    gameCanvas.style.width = '880px'; 
    gameCanvas.style.top = '30px';
  }
}

adjustCanvasWidth();
window.addEventListener('resize', adjustCanvasWidth);

function adjustGreenButton() {
  const gameWrapper = document.getElementById('gameWrapper');
  const controlButtons = document.querySelectorAll('#controls button:not(#settingsBtn):not(#skinBtn)');
  const wrapperWidth = gameWrapper.offsetWidth;

  let padding = '8px 13px';
  let fontSize = '16px';

  if (wrapperWidth < 750) {
    padding = '8px 12px';
    fontSize = '13px';
  } else if (wrapperWidth < 1300) {
    padding = '8px 13px';
    fontSize = '16px';
  } else if (wrapperWidth < 2900) {
    padding = '10px 23px';
    fontSize = '20px';
  }

  controlButtons.forEach(btn => {
    btn.style.padding = padding;
    btn.style.fontSize = fontSize;
  });
}

  adjustGreenButton();
  window.addEventListener('resize', adjustGreenButton);

function adjustDifficultySize() {
  const gameWrapper = document.getElementById('gameWrapper');
  const difficultySelect = document.getElementById('difficulty');
  if (!difficultySelect) return;

  const wrapperWidth = gameWrapper.offsetWidth;
  let padding = '8px 13px';
  let fontSize = '16px';

  if (wrapperWidth < 750) {
    padding = '8px 11px';
    fontSize = '13px';
  } else if (wrapperWidth < 1300) {
    padding = '8px 13px';
    fontSize = '16px';
  } else if (wrapperWidth < 2900) {
    padding = '10px 18px';
    fontSize = '20px';
  }

  difficultySelect.style.padding = padding;
  difficultySelect.style.fontSize = fontSize;
}

adjustDifficultySize();
window.addEventListener('resize', adjustDifficultySize);

function updateSkinButtonStyle() {
  const gameWrapper = document.getElementById('gameWrapper');
  const skinButton = document.getElementById('skinBtn');

  if (!gameWrapper || !skinButton) return;

  const wrapperWidth = gameWrapper.offsetWidth;

  let padding = '10px 18px';
  let fontSize = '16px';

  if (wrapperWidth < 750) {
    padding = '8px 11px';
    fontSize = '13px';
  } else if (wrapperWidth < 1300) {
    padding = '10px 18px';
    fontSize = '16px';
  } else if (wrapperWidth < 2900) {
    padding = '12px 18px';
    fontSize = '20px';
  }

  skinButton.style.padding = padding;
  skinButton.style.fontSize = fontSize;
  
    skinBtn.style.background = skin.startsWith('gradient') ? getGradientStyle(skin) : skin;
    skinBtn.style.color = 'black';
    skinBtn.style.border = '2px solid black';
    skinBtn.style.borderRadius = '8px';
    skinBtn.style.fontWeight = 'bold';
}

updateSkinButtonStyle();
window.addEventListener('resize', updateSkinButtonStyle);
  
function adjustLayout() {
  const gameWrapper = document.getElementById('gameWrapper');
  const startScreenH1 = document.querySelector('#startScreen h1');
  const startScreenP = document.querySelector('#startScreen p');
  const labels = document.getElementById('label');
  const labelmess = document.getElementById('labelmess');
  const wrapperWidth = gameWrapper.offsetWidth;
  
  if (wrapperWidth < 750) {
    startScreenH1.style.fontSize = '32px';
    startScreenH1.style.marginBottom = '4px';
    startScreenP.style.fontSize = '20px';
    startScreenP.style.marginBottom = '3px';
  } else if (wrapperWidth < 1300) {
    startScreenH1.style.fontSize = '37px';
    startScreenH1.style.marginBottom = '5px';
    startScreenP.style.fontSize = '26px';
    startScreenP.style.marginBottom = '4px';
  } else {
    startScreenH1.style.fontSize = '46px';
    startScreenH1.style.marginBottom = '5px';
    startScreenP.style.fontSize = '32px';
    startScreenP.style.marginBottom = '3px';
  }

  if (wrapperWidth < 750) {
    label.style.fontSize = '24px';
  } else if (wrapperWidth < 1300) {
    label.style.fontSize = '27px';
  } else {
    label.style.fontSize = '36px';
  }
  
    if (wrapperWidth < 750) {
    labelmess.style.fontSize = '13px';
    labelmess.style.top = '75px';
  } else if (wrapperWidth < 1300) {
    labelmess.style.fontSize = '13px';
    labelmess.style.top = '90px';
  } else if (wrapperWidth < 2900) {
    labelmess.style.fontSize = '19px';
    labelmess.style.top = '120px';
  } else {
    labelmess.style.fontSize = '19px';
    labelmess.style.top = '120px';
  }
}

adjustLayout();
window.addEventListener('resize', adjustLayout);

function adjustPlayerLabels() {
  const gameWrapper = document.getElementById('gameWrapper');
  const wrapperWidth = gameWrapper.offsetWidth;

  const labelP1 = document.getElementById('labelP1');
  const player1Score = document.getElementById('player1Score');
  const labelP2 = document.getElementById('labelP2');
  const player2Score = document.getElementById('player2Score');

  let fontSize;
  let topPosition;
  
  let LabelP1_Position;
  let Player1_ScorePlace;
  
  let LabelP2_Position;
  let Player2_ScorePlace;

  if (wrapperWidth < 750) {
    fontSize = '13px';
    topPosition = '128px';
    LabelP1_Position = '-120px';
    Player1_ScorePlace = '-65px';
    LabelP2_Position = '-90px';
    Player2_ScorePlace = '-140px';
  } else if (wrapperWidth < 1300) {
    fontSize = '15px';
    topPosition = '142px';
  } else if (wrapperWidth < 2900) {
    fontSize = '20px';
    topPosition = '195px';
    LabelP1_Position = '-180px';
    Player2_ScorePlace = '-205px';
  } else {
    fontSize = '20px';
    topPosition = '195px';
    LabelP1_Position = '-180px';
    Player2_ScorePlace = '-205px';
  }

  labelP1.style.fontSize = fontSize;
  player1Score.style.fontSize = fontSize;
  labelP2.style.fontSize = fontSize;
  player2Score.style.fontSize = fontSize;

  labelP1.style.top = topPosition;
  player1Score.style.top = topPosition;
  labelP2.style.top = topPosition;
  player2Score.style.top = topPosition;

  labelP1.style.left = LabelP1_Position;
  player1Score.style.left = Player1_ScorePlace;
  labelP2.style.right = LabelP2_Position;
  player2Score.style.right = Player2_ScorePlace;
}
  
adjustPlayerLabels();
window.addEventListener('resize', adjustPlayerLabels);

function adjustSettingsButton() {
  const gameWrapper = document.getElementById('gameWrapper');
  const controls = document.getElementById('controls');
  if (!gameWrapper || !controls) return;

  let settingsBtn = document.getElementById('settingsBtn');

  if (!settingsBtn) {
    settingsBtn = document.createElement('button');
    settingsBtn.id = 'settingsBtn';
    settingsBtn.textContent = '⚙️';
    settingsBtn.style.position = 'absolute';
    settingsBtn.style.padding = '10px 10px';
    settingsBtn.style.marginLeft = '10px';
    settingsBtn.style.zIndex = '10';
    settingsBtn.style.background = 'transparent';
    settingsBtn.style.border = 'none';
    settingsBtn.style.boxShadow = 'none';
    controls.appendChild(settingsBtn);
  }

  const wrapperWidth = gameWrapper.offsetWidth;
  let top = '10px';
  let right = '10px';
  let fontSize = '22px';

  if (wrapperWidth < 750) {
    top = '10px';
    right = '10px';
    fontSize = '20px';
  } else if (wrapperWidth < 1300) {
    top = '12px';
    right = '12px';
    fontSize = '24px';
  } else if (wrapperWidth < 2900) {
    top = '15px';
    right = '15px';
    fontSize = '30px';
  }

  settingsBtn.style.top = top;
  settingsBtn.style.right = right;
  settingsBtn.style.fontSize = fontSize;
}

adjustSettingsButton();
window.addEventListener('resize', adjustSettingsButton);

  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const difficultySelect = document.getElementById('difficulty');
  const labelP1 = document.getElementById('labelP1');
  const labelP2 = document.getElementById('labelP2');
  const player1ScoreSpan = document.getElementById('player1Score');
  const player2ScoreSpan = document.getElementById('player2Score');
const modePopup = document.createElement('div');
Object.assign(modePopup.style, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#222',
  color: '#e3b900',
  padding: '20px 30px',
  borderRadius: '10px',
  display: 'none',
  zIndex: 10000,
  boxShadow: '0 0 15px rgba(0,0,0,0.7)',
  textAlign: 'center'
});
modePopup.innerHTML = `<h2>Select Mode</h2>`;
['single', 'multi'].forEach(m => {
  const btn = document.createElement('button');
  btn.textContent = m === 'single' ? 'Single Player' : 'Multiplayer';
  btn.style.margin = '10px';
  btn.style.padding = '10px 20px';
  btn.style.fontWeight = 'bold';
  btn.style.cursor = 'pointer';
  btn.addEventListener('click', () => {
    mode = m;
    modeSelect.value = m;
    skin = '#ffffff';
    updateScoreLabels();
    updateSkinButtonStyle();
    modePopup.style.display = 'none';
    resetGame();
  });
  modePopup.appendChild(btn);
});
document.getElementById('gameWrapper').appendChild(modePopup);

const difficultyPopup = document.createElement('div');
Object.assign(difficultyPopup.style, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#222',
  width: '400px',
  height: '180px',
  color: '#e3b900',
  padding: '20px 30px',
  borderRadius: '10px',
  display: 'none',
  zIndex: 10000,
  boxShadow: '0 0 15px rgba(0,0,0,0.7)',
  textAlign: 'center'
});
difficultyPopup.innerHTML = `<h2>Select Difficulty</h2>`;
['easy', 'medium', 'hard', 'super', 'extreme', 'captain', 'boss'].forEach(diff => {
  const btn = document.createElement('button');
  btn.textContent = diff.charAt(0).toUpperCase() + diff.slice(1);
  btn.style.margin = '6px';
  btn.style.padding = '8px 18px';
  btn.style.fontWeight = 'bold';
  btn.style.cursor = 'pointer';
  btn.addEventListener('click', () => {
    difficulty = diff;
    difficultySelect.value = diff;
    difficultyPopup.style.display = 'none';
    resetGame();
  });
  difficultyPopup.appendChild(btn);
});
document.getElementById('gameWrapper').appendChild(difficultyPopup);

let popupJustOpened = false;

function adjustDifficultyPopup() {
  const gameWrapper = document.getElementById('gameWrapper');
  const wrapperWidth = gameWrapper.offsetWidth;

  let popupStyle = {};
  let buttonPadding = '';

  if (wrapperWidth < 750) {
    popupStyle = {
      width: '340px',
      height: '150px',
      fontSize: '14px',
      padding: '15px 20px'
    };
    buttonPadding = '6px 12px';
  } else if (wrapperWidth < 1300) {
    popupStyle = {
      width: '370px',
      height: '170px',
      fontSize: '15px',
      padding: '18px 25px'
    };
    buttonPadding = '7px 14px';
  } else if (wrapperWidth < 2900) {
    popupStyle = {
      width: '400px',
      height: '180px',
      fontSize: '16px',
      padding: '20px 30px'
    };
    buttonPadding = '8px 18px';
  } else {
    popupStyle = {
      width: '400px',
      height: '180px',
      fontSize: '16px',
      padding: '20px 30px'
    };
    buttonPadding = '8px 18px';
  }

  Object.assign(difficultyPopup.style, popupStyle);

  const buttons = difficultyPopup.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.style.padding = buttonPadding;
  });
}

adjustDifficultyPopup();
window.addEventListener('resize', adjustDifficultyPopup);

function showModePopup(e) {
  if (startScreen.style.display === 'none') {
    e.preventDefault();
    modePopup.style.display = 'block';
  }
}

function showDifficultyPopup(e) {
  if (startScreen.style.display === 'none') {
    e.preventDefault();
    difficultyPopup.style.display = 'block';
    adjustDifficultyPopup();
    popupJustOpened = true;

    setTimeout(() => {
      popupJustOpened = false;
    }, 200);
  }
}

modeSelect.addEventListener('mousedown', showModePopup);
modeSelect.addEventListener('focus', showModePopup);

difficultySelect.addEventListener('mousedown', showDifficultyPopup);
difficultySelect.addEventListener('focus', showDifficultyPopup);

document.addEventListener('click', (event) => {
  if (!modePopup.contains(event.target) && event.target !== modeSelect) {
    modePopup.style.display = 'none';
  }
  if (!difficultyPopup.contains(event.target) && event.target !== difficultySelect && !popupJustOpened) {
    difficultyPopup.style.display = 'none';
  }
});

  const skinColors = ['#ffffff', '#ffff00', '#00ff00', '#763bf5', '#ff0000', '#ff00ff', '#009dff', '#ffa500',
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
  document.getElementById('gameWrapper').appendChild(unlockPopup);

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

  const settingsPopup = document.createElement('div');
settingsPopup.textContent = 'Settings';
Object.assign(settingsPopup.style, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#222',
  fontWeight: 'bold',
  color: '#e3b900',
  fontSize: '24px',
  padding: '20px 30px',
  borderRadius: '12px',
  zIndex: 9999,
  boxShadow: '0 0 12px rgba(0,0,0,0.6)',
  display: 'none',
  textAlign: 'center',
  flexDirection: 'column',
  alignItems: 'center',
});
document.getElementById('gameWrapper').appendChild(settingsPopup);
  
  const settingsOverlay = document.createElement('div');
Object.assign(settingsOverlay.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.6)',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9998,
});
settingsOverlay.appendChild(settingsPopup);
document.getElementById('gameWrapper').appendChild(settingsOverlay);

  settingsOverlay.addEventListener('click', (e) => {
  if (e.target === settingsOverlay) {
    settingsOverlay.style.display = 'none';
  }
});

    const homeBtn = document.createElement('button');
homeBtn.textContent = 'Mode';
homeBtn.classList.add('settings-btn');
homeBtn.style.marginTop = '20px'; 
settingsPopup.appendChild(homeBtn);
  
  const lockedPopup = document.createElement('div');
  lockedPopup.id = 'lockedPopup';
  lockedPopup.textContent = 'Win a match with CPU to get the ball colour!';
  Object.assign(lockedPopup.style, {
    position: 'fixed', top: '30%', left: '50%',
    transform: 'translate(-50%, -50%)', background: '#06c98c', color: 'white',
    fontSize: '20px', padding: '15px 25px', borderRadius: '8px',
    display: 'none', zIndex: 9999, boxShadow: '0 0 12px rgba(0,0,0,0.6)',
    transition: 'opacity 0.5s ease, transform 0.5s ease'
  });
  document.getElementById('gameWrapper').appendChild(lockedPopup);

  function showLockedPopup() {
  lockedPopup.style.display = 'block';
  void lockedPopup.offsetWidth;
  lockedPopup.style.opacity = '1';
  lockedPopup.style.transform = 'translate(-50%, -50%)';
  setTimeout(() => {
    lockedPopup.style.opacity = '0';
    lockedPopup.style.transform = 'translate(-50%, -60%)';
  }, 1800);
  setTimeout(() => { lockedPopup.style.display = 'none'; }, 2200);
}

  const skinOverlay = document.createElement('div');
  Object.assign(skinOverlay.style, {
    position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
    background: 'rgba(0,0,0,0.6)', display: 'none', alignItems: 'center',
    justifyContent: 'center', zIndex: 9998,
  });

  const skinContainer = document.createElement('div');
  Object.assign(skinContainer.style, {
    background: '#222', padding: '20px', borderRadius: '12px',
    display: 'grid', gridTemplateColumns: 'repeat(4, 60px)', gap: '12px',
    maxHeight: '300px', maxWidth: '300px', overflowY: 'auto',
    boxShadow: '0 0 12px rgba(0,0,0,0.6)',
  });

  skinOverlay.appendChild(skinContainer);
  document.getElementById('gameWrapper').appendChild(skinOverlay);
  skinOverlay.addEventListener('click', (e) => {
    if (e.target === skinOverlay) skinOverlay.style.display = 'none';
  });

function updateSkinOverlay() {
  skinContainer.innerHTML = '';
  skinColors.forEach((color, i) => {
    const btn = document.createElement('button');
    const isLocked = (mode === 'single' && i > unlockedSkins);
    const colorRef = color;

    btn.style.background = color.startsWith('gradient') ? getGradientStyle(color) : color;
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.style.border = '2px solid gray';
    btn.style.borderRadius = '50%';
    btn.style.cursor = 'pointer';

    if (isLocked) {
      btn.innerHTML = '🔒';
      btn.style.opacity = '0.6';
      btn.style.pointerEvents = 'auto';
      btn.setAttribute('data-locked', 'true');
    }

    btn.dataset.locked = isLocked ? 'true' : 'false';

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('Button clicked. Locked:', btn.dataset.locked);

      if (btn.dataset.locked === 'true') {
        console.log("Calling showLockedPopup");
        showLockedPopup();
      } else {
        skin = colorRef;
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
  paddleSound.volume = 0.4;
  const wallSound = new Audio('https://www.soundjay.com/buttons/button-50.mp3');
  wallSound.volume = 0.7;
  const scoreSound = new Audio('https://www.soundjay.com/buttons/button-10.mp3');
  scoreSound.volume = 0.2;

  const clickSound = new Audio('https://www.soundjay.com/buttons/button-20.mp3');
  clickSound.volume = 0.6;

  const backgroundMusic = new Audio('https://www.soundjay.com/free-music/cautious-path-01.mp3');
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.9;

  const musicBtn = document.createElement('button');
  musicBtn.textContent = 'Play Music';
  musicBtn.classList.add('settings-btn');
settingsPopup.appendChild(musicBtn);

  let musicEnabled = false;
  musicBtn.addEventListener('click', () => {
    musicEnabled = !musicEnabled;
    if (musicEnabled) {
      backgroundMusic.play();
      musicBtn.textContent = 'Pause Music';
      settingsOverlay.style.display = 'none';
    } else {
      backgroundMusic.pause();
      musicBtn.textContent = 'Play Music';
      settingsOverlay.style.display = 'none';
    }
  });

  const keysPressed = {};

  function updateScoreLabels() {
    labelP1.textContent = mode === 'single' ? 'Player 1 score:' : 'Player 1 score:';
    labelP2.textContent = mode === 'single' ? 'CPU score:' : 'Player 2 score:';
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
          message = '🎉 You Won! 🎉';
          if (unlockedSkins < skinColors.length - 1) {
            unlockedSkins++;
            localStorage.setItem('unlockedSkins', unlockedSkins);
            showUnlockPopup();
          }
        } else {
          message = 'CPU Won';
        }
      } else {
        message = player1Score >= 10 ? '🎉 Player 1 Wins! 🎉' : '🎉 Player 2 Wins! 🎉';
      }

      updateSkinButtonStyle();
      document.getElementById('popupMessage').textContent = message;
      document.getElementById('winPopup').classList.remove('hidden');
    }
  }

  function update() {
if (mode === 'single') {
  if (keysPressed['w'] || keysPressed['arrowup']) paddle1.y -= PADDLE_SPEED;
  if (keysPressed['s'] || keysPressed['arrowdown']) paddle1.y += PADDLE_SPEED;
} else {
  // Player 1
  if (keysPressed['w']) paddle1.y -= PADDLE_SPEED;
  if (keysPressed['s']) paddle1.y += PADDLE_SPEED;
  // Player 2
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

  function addClickSoundToElement(id) {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('click', () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  }
}
  
  addClickSoundToElement('startBtn');
  addClickSoundToElement('resetBtn');
  addClickSoundToElement('skinBtn');
  addClickSoundToElement('settingsBtn');
  addClickSoundToElement('singlePlayerBtn');
  addClickSoundToElement('multiPlayerBtn');
  
  ['difficulty', 'mode'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('mousedown', () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  }
});

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

   settingsBtn.addEventListener('click', () => {
  settingsPopup.style.display = 'flex';
  settingsOverlay.style.display = 'flex';
});

document.addEventListener('click', (event) => {
  const isSettings = event.target === settingsPopup || event.target === settingsBtn;
  if (!isSettings) {
    settingsPopup.style.display = 'block';
  }
});
    
   document.addEventListener('click', (event) => {
  const isInsidePopup = settingsPopup.contains(event.target);
  const isSettingsButton = settingsBtn.contains(event.target);

  if (!isInsidePopup && !isSettingsButton) {
    settingsPopup.style.display = 'none';
    settingsOverlay.style.display = 'none';
  }
});

homeBtn.addEventListener('click', () => {
  settingsPopup.style.display = 'none';
  settingsOverlay.style.display = 'none';
  startScreen.style.display = 'flex';
  skin = '#ffffff';
  resetGame();
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
