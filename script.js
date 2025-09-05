window.onload = () => {
  const bgCanvas = document.getElementById('bgCanvas');
  const bgCtx = bgCanvas.getContext('2d');

  const startScreen = 
document.getElementById('startScreen');
  const singlePlayerBtn = document.getElementById('singlePlayerBtn');
  const multiPlayerBtn = document.getElementById('multiPlayerBtn');
  const modeSelect = document.getElementById('mode');

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const controlsScreen = document.createElement('div');
  controlsScreen.id = 'controlsScreen';
  Object.assign(controlsScreen.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    background: '#222',
    color: '#bf2113',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    fontFamily: "'Margarine', sans-serif",
    fontSize: '22px',
    textAlign: 'center'
  });
  controlsScreen.innerHTML = `
    <div style="padding:56px 48px;">
      <span id="controlsXBtn" style="
        position:absolute;
        top:10px; right:20px;
        font-size:34px;
        color:#888;
        cursor:pointer;
        font-weight:bold;
        z-index:10;
        transition:color .2s;
      ">&times;</span>
      <h2 style="color:#1b6fcf;margin-bottom:16px;">How to Play</h2>
    
      <div id="mobile" style="background:#f0f0f010;padding:8px;border-radius:8px;margin-bottom:14px;">
        <b>Mobile:</b>
        <div style="color:#fed700;">Drag the paddle to move<br></div>
      </div>
    
      <div id="device" style="background:#f0f0f010;padding:8px;border-radius:8px;margin-bottom:10px;">
      <div style="margin-bottom:5px;"> <b>Desktop:</b></div>
     
      <div style="background:#dedede10;padding:8px;border-radius:8px;margin-bottom:12px;color:#fed700;">Player 1:<br> '<b>W</b>' to move paddle up<br> '<b>S</b>' to move paddle down</div>
      <div style="background:#dedede10;padding:8px;border-radius:8px;margin-bottom:1px;color:#fed700;">Player 2:<br> '<b>Arrow Up</b>' to move paddle up<br> &nbsp;&nbsp;'<b>Arrow Down</b>' to move paddle down&nbsp;&nbsp;</div>
    </div>
    
    <button id="controlsCloseBtn" style="margin-top:13px;padding:10px 24px;background:#3658ec;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:bold;font-size:19px;">Got It</button>
  </div>
`;
document.body.appendChild(controlsScreen);
controlsScreen.style.display = 'none';

let controlsScreenDismissed = localStorage.getItem('controlsScreenDismissed') === 'true';

function showControlsScreen(callback) {
  if (controlsScreenDismissed) {
    if (callback) callback();
    return;
  }
  controlsScreen.style.display = 'flex';

  const closeBtn = document.getElementById('controlsCloseBtn');
  if (closeBtn) {
    closeBtn.onclick = () => {
      controlsScreen.style.display = 'none';
      localStorage.setItem('controlsScreenDismissed', 'true');
      controlsScreenDismissed = true;
      clickSound.play();
      if (callback) callback();
    };
  }

  const xBtn = document.getElementById('controlsXBtn');
  if (xBtn) {
    xBtn.onclick = () => {
      controlsScreen.style.display = 'none';
      clickSound.play();
    };
    xBtn.onmouseenter = () => { xBtn.style.color = "#ea2222"; }
    xBtn.onmouseleave = () => { xBtn.style.color = "#888"; }
  }
}

function updateControlsScreen() {
  const controlsScreen = document.getElementById('controlsScreen');
  if (!controlsScreen) return;
  const gameWrapper = document.getElementById('gameWrapper');
  const wrapperWidth = gameWrapper.offsetWidth;

  const title = controlsScreen.querySelector('h2');
  const closeBtn = document.getElementById('controlsCloseBtn');
  const mobile = document.getElementById('mobile');
  const device = document.getElementById('device');
  const xBtn = document.getElementById('controlsXBtn');

  if (wrapperWidth < 750) {
    title.style.fontSize = '20px';
    title.style.marginBottom = '6px';
    mobile.style.fontSize = '14px';
    mobile.style.marginBottom = '6px';
    device.style.fontSize = '14px';
    closeBtn.style.fontSize = '16px';
    closeBtn.style.marginTop = '0px';
    closeBtn.style.padding = '6px 18px';
    xBtn.style.fontSize = '34px';
  } else if (wrapperWidth < 1300) {
    title.style.fontSize = '28px';
    title.style.marginBottom = '10px';
    mobile.style.fontSize = '17px';
    mobile.style.marginBottom = '8px';
    device.style.fontSize = '17px';
    closeBtn.style.fontSize = '17px';
    closeBtn.style.marginTop = '4px';
    closeBtn.style.padding = '8px 24px';
    xBtn.style.fontSize = '38px';
  } else if (wrapperWidth < 2900) {
    title.style.fontSize = '38px';
    title.style.marginBottom = '16px';
    mobile.style.fontSize = '24px';
    mobile.style.marginBottom = '15px';
    device.style.fontSize = '24px';
    closeBtn.style.fontSize = '22px';
    closeBtn.style.marginTop = '18px';
    closeBtn.style.padding = '12px 32px';
    xBtn.style.fontSize = '44px';
  }
}

updateControlsScreen();
window.addEventListener('resize', updateControlsScreen);

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
    padding = '11px 23px';
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
    startScreenP.style.marginBottom = '6px';
  } else {
    startScreenH1.style.fontSize = '46px';
    startScreenH1.style.marginBottom = '5px';
    startScreenP.style.fontSize = '32px';
    startScreenP.style.marginBottom = '6px';
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
    settingsBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="black" stroke-width="4" fill="none">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="100%" stop-color="#cccccc" />
          </linearGradient>
          <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#888" flood-opacity="0.5"/>
          </filter>
        </defs>
        <path fill="url(#grad)" filter="url(#innerShadow)" fill-rule="evenodd" d="
          M52 32c0-.9-.1-1.8-.3-2.6l5.1-4a1 1 0 0 0 .2-1.3l-4.9-8.5a1 1 0 0 0-1.2-.4l-6 2.4a20.6 20.6 0 0 0-4.6-2.6l-1-6.3A1 1 0 0 0 38.3 8h-12.6a1 1 0 0 0-1 .8l-1 6.3a20.6 20.6 0 0 0-4.6 2.6l-6-2.4a1 1 0 0 0-1.2.4l-4.9 8.5a1 1 0 0 0 .2 1.3l5.1 4a19.8 19.8 0 0 0 0 5.2l-5.1 4a1 1 0 0 0-.2 1.3l4.9 8.5a1 1 0 0 0 1.2.4l6-2.4a20.6 20.6 0 0 0 4.6 2.6l1 6.3a1 1 0 0 0 1 .8h12.6a1 1 0 0 0 1-.8l1-6.3a20.6 20.6 0 0 0 4.6-2.6l6 2.4a1 1 0 0 0 1.2-.4l4.9-8.5a1 1 0 0 0-.2-1.3l-5.1-4c.2-.8.3-1.7.3-2.6z
          M32 25
          a7 7 0 1 1 0 14
          a7 7 0 0 1 0-14z
        "/>
      </svg>
    `;
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
    top = '12px';
    right = '12px';
    fontSize = '35px';
  } else if (wrapperWidth < 1300) {
    top = '12px';
    right = '12px';
    fontSize = '37px';
  } else if (wrapperWidth < 2900) {
    top = '15px';
    right = '15px';
    fontSize = '45px';
  }

  settingsBtn.style.top = top;
  settingsBtn.style.right = right;

  const svg = settingsBtn.querySelector('svg');
  if (svg) {
    svg.style.width = fontSize;
    svg.style.height = fontSize;
  }
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
  transform: 'translate(-50%, -50%) scale(0)',
  background: '#222',
  width: '400px',
  height: '180px',
  color: '#e3b900',
  padding: '20px 30px',
  borderRadius: '10px',
  border: '2px solid gray',
  display: 'none',
  zIndex: 10000,
  boxShadow: '0 0 15px rgba(0,0,0,0.7)',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
});
difficultyPopup.innerHTML = `<h2>Choose Difficulty:</h2>`;
const difficultyTitle = difficultyPopup.querySelector('h2');
difficultyTitle.style.marginBottom = '6px';
difficultyTitle.style.marginTop = '18px'; 
difficultyTitle.style.color = '#e3b900';
  
  const speedTitle = document.createElement('h3');
  speedTitle.style.marginTop = '25px';
  speedTitle.style.marginBottom = '6px';
  speedTitle.style.color = '#629df5';
  speedTitle.textContent = 'Ball Speed';
  difficultyPopup.appendChild(speedTitle);

let selectedDifficultyBtn = null;

  const normalContainer = document.createElement('div');
normalContainer.style.textAlign = 'center';
normalContainer.style.marginBottom = '10px';
difficultyPopup.appendChild(normalContainer);
  
const normalBtn = document.createElement('button');
normalBtn.textContent = 'Casual';
normalBtn.style.margin = '6px';
normalBtn.style.padding = '8px 18px';
normalBtn.style.fontWeight = 'bold';
normalBtn.style.cursor = 'pointer';
normalBtn.addEventListener('click', () => {
  difficulty = 'normal';
  difficultySelect.value = 'normal';
  difficultyPopup.style.display = 'none';
  clickSound.play();
  resetGame();
  if (selectedDifficultyBtn) selectedDifficultyBtn.classList.remove('selected-button');
  normalBtn.classList.add('selected-button');
  selectedDifficultyBtn = normalBtn;
});
normalContainer.appendChild(normalBtn);

const customizeBtn = document.createElement('button');
customizeBtn.textContent = 'Customize';
customizeBtn.style.margin = '6px';
customizeBtn.style.padding = '8px 18px';
customizeBtn.style.fontWeight = 'bold';
customizeBtn.style.cursor = 'pointer';
customizeBtn.addEventListener('click', () => {
  difficultyPopup.style.display = 'none';
  customSpeedPopup.style.display = 'block';
  setTimeout(() => {
    customSpeedPopup.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 10);
  clickSound.play();
});
normalContainer.appendChild(customizeBtn);

const customSpeedPopup = document.createElement('div');
Object.assign(customSpeedPopup.style, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(0)',
  background: '#222',
  width: '400px',
  height: '180px',
  padding: '20px 30px',
  borderRadius: '10px',
  border: '2px solid gray',
  zIndex: 10001,
  color: '#e3b900',
  display: 'none',
  transition: 'transform 0.3s ease',
  textAlign: 'center'
});
customSpeedPopup.innerHTML = `<h2>Select the Ball Speed</h2>`;
document.body.appendChild(customSpeedPopup);

['easy', 'medium', 'hard', 'super', 'extreme', 'boss'].forEach(diff => {
  const btn = document.createElement('button');
  btn.textContent = diff.charAt(0).toUpperCase() + diff.slice(1);
  btn.style.margin = '6px';
  btn.style.padding = '8px 18px';
  btn.style.fontWeight = 'bold';
  btn.style.cursor = 'pointer';

  btn.addEventListener('click', () => {
    difficulty = diff;
    difficultySelect.value = diff;
    customSpeedPopup.style.transform = 'translate(-50%, -50%) scale(0)';
    setTimeout(() => {
      customSpeedPopup.style.display = 'none';
    }, 300);
    clickSound.play();
    resetGame();
  });

  customSpeedPopup.appendChild(btn);
});

document.addEventListener('click', (e) => {
  if (customSpeedPopup.style.display === 'block' && !customSpeedPopup.contains(e.target) && e.target !== customizeBtn) {
    customSpeedPopup.style.display = 'none';
  }
});

customSpeedPopup.addEventListener('click', (e) => {
  if (e.target === customSpeedPopup) {
    customSpeedPopup.style.display = 'none';
  }
});

document.body.appendChild(customSpeedPopup);
document.getElementById('gameWrapper').appendChild(difficultyPopup);

const modeTitle = document.createElement('h3');
  modeTitle.style.marginTop = '25px';
  modeTitle.style.marginBottom = '6px';
  modeTitle.style.color = '#629df5';
  modeTitle.textContent = 'Game Type';
  difficultyPopup.appendChild(modeTitle);
  
let selectedGameTypeBtn = null;

['classic', 'action'].forEach(type => {
  const btn = document.createElement('button');
  btn.textContent = type === 'classic' ? 'Classic Mode' : 'Action Mode';
  btn.style.margin = '6px';
  btn.style.padding = '6px 16px';
  btn.style.fontWeight = 'bold';
  btn.style.cursor = 'pointer';

  btn.addEventListener('click', () => {
    gameType = type;
    difficultyPopup.style.display = 'none';
    clickSound.play();
    resetGame();

    if (selectedGameTypeBtn) {
      selectedGameTypeBtn.classList.remove('selected-button');
    }

    btn.classList.add('selected-button');
    selectedGameTypeBtn = btn;
  });

  difficultyPopup.appendChild(btn);
});

let popupJustOpened = false;

function adjustDifficultyPopup() {
  const gameWrapper = document.getElementById('gameWrapper');
  const wrapperWidth = gameWrapper.offsetWidth;

  let popupStyle = {};
  let buttonPadding = '';

  if (wrapperWidth < 750) {
    popupStyle = {
      width: '340px',
      height: '250px',
      fontSize: '14px',
      padding: '15px 20px'
    };
    buttonPadding = '6px 12px';
  } else if (wrapperWidth < 1300) {
    popupStyle = {
      width: '370px',
      height: '270px',
      fontSize: '15px',
      padding: '18px 25px'
    };
    buttonPadding = '7px 14px';
  } else if (wrapperWidth < 2900) {
    popupStyle = {
      width: '430px',
      height: '270px',
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
      difficultyPopup.style.transform = 'translate(-50%, -50%) scale(1)';
      popupJustOpened = false;
    }, 10);
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
    difficultyPopup.style.transform = 'translate(-50%, -50%) scale(0)';
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
    position: 'fixed',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#222',
    color: 'white',
    fontSize: '22px',
    padding: '20px 30px',
    borderRadius: '10px',
    border: '2px solid gray',
    display: 'none',
    zIndex: 9999,
    boxShadow: '0 0 15px rgba(0,0,0,0.5)',
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
  transform: 'translate(-50%, -50%) scale(0)',
  background: '#222',
  fontWeight: 'bold',
  color: '#e3b900',
  fontSize: '24px',
  padding: '20px 30px',
  borderRadius: '12px',
  border: '2px solid gray',
  zIndex: 8888,
  boxShadow: '0 0 12px rgba(0,0,0,0.6)',
  display: 'none',
  textAlign: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.3s ease',
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
  zIndex: 8887,
});
settingsOverlay.appendChild(settingsPopup);
document.getElementById('gameWrapper').appendChild(settingsOverlay);

  settingsOverlay.addEventListener('click', (e) => {
  if (e.target === settingsOverlay) {
    settingsOverlay.style.display = 'none';
  }
});

const container = document.createElement('div');
container.id = 'helpBtnContainer';
const helpBtn = document.createElement('button');
helpBtn.id = 'helpBtn';
helpBtn.innerHTML = '<span class="background-circle"></span><span class="center-circle">';
const triangle = document.createElement('span');
triangle.className = 'triangle';

Object.assign(helpBtn.style, {
  position: 'fixed',
  top: '70px',
  right: '25px',
  zIndex: '10',
  background: 'none',
  borderRadius: '50%',
  border: '3px solid white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
  padding: '17px 17px',
  fontSize: '24px',
  cursor: 'pointer',
  overflow: 'hidden',
});
container.appendChild(helpBtn);
container.appendChild(triangle);
document.body.appendChild(container);

function updateHelpBtnPosition() {
  const gameWrapper = document.getElementById('gameWrapper');
  const wrapperWidth = gameWrapper.offsetWidth;
  const triangle = document.querySelector('.triangle');
  const circle = document.querySelector('.center-circle');

  if (wrapperWidth < 750) {
    helpBtn.style.top = '70px';
    helpBtn.style.right = '28px';
    helpBtn.style.padding = '16px 16px';
    triangle.style.right = '10px';
    triangle.style.top = '2px';
    circle.style.width = '6px';
    circle.style.width = '6px';
  } else if (wrapperWidth < 1300) {
    helpBtn.style.top = '72px';
    helpBtn.style.right = '28px';
    helpBtn.style.padding = '17px 17px';
    triangle.style.right = '11px';
    triangle.style.top = '4px';
    circle.style.width = '6px';
    circle.style.width = '6px';
  } else if (wrapperWidth < 2900) {
    helpBtn.style.top = '86px';
    helpBtn.style.right = '32px';
    helpBtn.style.padding = '20px 20px';
    triangle.style.right = '18px';
    triangle.style.top = '18px';
    circle.style.width = '7px';
    circle.style.width = '7px';
  } else {
    helpBtn.style.top = '88px';
    helpBtn.style.right = '34px';
    helpBtn.style.padding = '22px 22px';
    triangle.style.right = '20px';
    triangle.style.top = '20px';
    circle.style.width = '7px';
    circle.style.width = '7px';
  }
}

updateHelpBtnPosition();
window.addEventListener('resize', updateHelpBtnPosition);

const helpOverlay = document.createElement('div');
Object.assign(helpOverlay.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.6)',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
});
document.body.appendChild(helpOverlay);

const helpPopup = document.createElement('div');
Object.assign(helpPopup.style, {
  backgroundColor: '#222',
  color: '#e3b900',
  borderRadius: '1px',
  border: 'none',
  transform: 'scale(0)',
  transition: 'transform 0.3s ease',
  padding: '20px 30px',
  width: 'auto',
  height: 'auto',
  boxShadow: '0 0 18px rgba(0,0,0,0.8)',
  fontFamily: "'Margarine', sans-serif",
  fontWeight: 'bold',
  fontSize: '18px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
});
helpOverlay.appendChild(helpPopup);

const waveContainer = document.createElement('div');
waveContainer.style.position = 'absolute';
waveContainer.style.top = '0';
waveContainer.style.left = '0';
waveContainer.style.width = '100%';
waveContainer.style.height = '100%';
waveContainer.style.zIndex = '1';
waveContainer.style.pointerEvents = 'none';
helpPopup.appendChild(waveContainer);

const contentContainer = document.createElement('div');
contentContainer.style.position = 'relative';
contentContainer.style.zIndex = '2';
helpPopup.appendChild(contentContainer);
  
const mainDiv = document.createElement('div');
mainDiv.className = 'main';
Object.assign(mainDiv.style, {
  position: 'relative',
  zIndex: 1,
});
helpPopup.appendChild(mainDiv);

let animating = false;
helpPopup.addEventListener('click', function(e) {
  if (animating) return;
  animating = true;

  const rect = helpPopup.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  [40, 33.5, 27, 20.5, 14, 7.5, 1].forEach((scale) => {
      const wave = document.createElement('div');
      wave.className = 'wave';
      wave.style.left = x + 'px';
      wave.style.top = y + 'px';
      wave.style.width = 12 * scale + 'px';
      wave.style.height = 12 * scale + 'px';
      wave.style.position = 'absolute';
      wave.style.zIndex = 1;
      wave.style.transform = 'translate(-50%, -50%) scale(0)';
      wave.style.animation = 'ripple 3.5s ease-in forwards';
      waveContainer.appendChild(wave);

      setTimeout(() => wave.remove(), 3500);
  });

  setTimeout(() => {
     animating = false;
  }, 3000);
});
  
function resizeContentContainer() {
  const gameWrapper = document.getElementById('gameWrapper');
  const rect = gameWrapper.getBoundingClientRect();
  contentContainer.style.position = 'relative';
  contentContainer.style.width = rect.width + 'px';
  contentContainer.style.height = rect.height + 'px';
  contentContainer.style.display = 'flex';
  contentContainer.style.flexDirection = 'column';
  contentContainer.style.justifyContent = 'center';
  contentContainer.style.alignItems = 'center';
  contentContainer.style.textAlign = 'center';
  contentContainer.style.boxSizing = 'border-box';
  contentContainer.style.zIndex = 2;
}

resizeContentContainer();
window.addEventListener('resize', resizeContentContainer);

const SPIN_COOLDOWN_MS = 20 * 60 * 60 * 1000;

let cooldownActive = false;

let cooldownTimerInterval = null;

const wheelHtml = `
  <div class="help-demo-wrapper" style="position: relative; width: 200px; margin: 0 auto 12px;">
    <div class="container help-demo" style="position: relative;">
      <div class="one">Ball</div>
      <div class="two">Oops!</div>
      <div class="three">Paddle</div>
      <div class="four">Oops!</div>
      <div class="five">Ball</div>
      <div class="six">Oops!</div>
      <span class="mid-item"></span>
    </div>
    <div class="stopper"></div>
  </div>
  <button id="spin-demo">SPIN</button>
`;

const wheelCSS = `
  .help-demo-wrapper {
    position: relative;
    width: 200px;
    margin: 0 auto 12px;
    transform: scale(1.5);
    transform-origin: center center;
  }
  .help-demo {
    height: 200px;
    width: 200px;
    background: #4ed4c6;
    position: relative;
    border-radius: 50%;
    margin-top: 15px;
    overflow: hidden;
    box-shadow: 0 0 10px grey;
    transition: transform 3s ease;
    transform-origin: 50% 50%;
  }
  .help-demo div {
    height: 50%;
    width: 110px;
    clip-path: polygon(100% 0, 50% 100%, -5% 0);
    position: absolute;
    left: 50%;
    transform-origin: bottom center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 1000;
    font-family: monospace;
    letter-spacing: 3px;
    color: #008276;
    writing-mode: vertical-rl;
  }
  .help-demo .one {background: #baf4ee; transform: translateX(-50%) rotate(0deg);}
  .help-demo .two {background: #4ed4c6; transform: translateX(-50%) rotate(60deg);}
  .help-demo .three {background: #baf4ee; transform: translateX(-50%) rotate(120deg);}
  .help-demo .four {background: #4ed4c6; transform: translateX(-50%) rotate(180deg);}
  .help-demo .five {background: #baf4ee; transform: translateX(-50%) rotate(240deg);}
  .help-demo .six {background: #4ed4c6; transform: translateX(-50%) rotate(300deg);}
  .help-demo .mid-item {
    height: 15px;
    width: 15px;
    background: #008276;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .stopper {
    height: 27px;
    width: 22px;
    background: #ffd600;
    position: absolute;
    left: 50%;
    top: 3px;
    transform: translateX(-50%);
    clip-path: polygon(100% 0, 50% 100%, -5% 0);
    z-index: 1000;
    transform-origin: center;
    transform: translateX(-50%) scale(1.5);
  }
  #spin-demo {
    height: 36px;
    width: 100px;
    background: #4ed4c6;
    margin: 12px auto 0;
    border: 1px solid #fff;
    font-size: 18px;
    font-weight: 900;
    color: #fff;
    letter-spacing: 3px;
    cursor: pointer;
    box-shadow: 0 3px 8px grey;
    border-radius: 6px;
    user-select: none;
    transition: all 0.3s cubic-bezier(.4,2,.7,1);
  }
  #spin-demo:hover {
    background: #3dbd3f;
  }
  #spin-demo.cooldown {
    font-size: 17px !important;
    width: 180px !important;
    background: #aaa;
    color: #fff;
    pointer-events: auto;
  }
  #spin-demo.cooldown:hover {
    background: #777;
  }
`;

function updateSpinnerLayout() {
  const gameWrapper = document.getElementById('gameWrapper');
  const wrapperWidth = gameWrapper.offsetWidth;

  const helpDemoWrapper = document.querySelector('.help-demo-wrapper');
  const spinBtn = document.getElementById('spin-demo');
  const luckySpinText = helpPopup.querySelector('#luckySpinText');
  const prizeText = helpPopup.querySelector('#prizeText');
  const helpPopupCloseBtn = helpPopup.querySelector('#helpPopupCloseBtn');

    if (!spinBtn || !helpDemoWrapper || !luckySpinText || !prizeText || !helpPopupCloseBtn) return;
    
  if (wrapperWidth < 750) {
    helpDemoWrapper.style.transform = 'scale(0.75)';
    spinBtn.style.marginTop = '-22px';
    spinBtn.style.width = '98px';
    spinBtn.style.height = '35px';
    spinBtn.style.fontSize = '17px';
    luckySpinText.style.fontSize = '18px';
    prizeText.style.marginBottom = '-8px';
    prizeText.style.fontSize = '14px';
    helpPopupCloseBtn.style.top = '12px';
    helpPopupCloseBtn.style.right = '12px';
    helpPopupCloseBtn.style.fontSize = '30px';
    helpPopupCloseBtn.style.padding = '0.5px 10px';
  } else if (wrapperWidth < 1300) {
    helpDemoWrapper.style.transform = 'scale(1)';
    spinBtn.style.marginTop = '12px';
    spinBtn.style.width = '100px';
    spinBtn.style.height = '36px';
    spinBtn.style.fontSize = '20px';
    luckySpinText.style.fontSize = '22px';
    prizeText.style.marginBottom = '12px';
    prizeText.style.fontSize = '16px';
    helpPopupCloseBtn.style.top = '15px';
    helpPopupCloseBtn.style.right = '15px';
    helpPopupCloseBtn.style.fontSize = '32px';
    helpPopupCloseBtn.style.padding = '0.5px 10px';
  } else if (wrapperWidth < 2900) {
    helpDemoWrapper.style.transform = 'scale(1.25)';
    spinBtn.style.marginTop = '44px';
    spinBtn.style.width = '100px';
    spinBtn.style.height = '36px';
    spinBtn.style.fontSize = '20px';
    luckySpinText.style.fontSize = '22px';
    prizeText.style.marginBottom = '45px';
    prizeText.style.fontSize = '16px';
    helpPopupCloseBtn.style.top = '22px';
    helpPopupCloseBtn.style.right = '22px';
    helpPopupCloseBtn.style.fontSize = '40px';
    helpPopupCloseBtn.style.padding = '0.5px 12px';
  } else {
    helpDemoWrapper.style.transform = 'scale(1.5)';
    spinBtn.style.marginTop = '46px';
    spinBtn.style.width = '105px';
    spinBtn.style.height = '38px';
    spinBtn.style.fontSize = '18px';
    luckySpinText.style.fontSize = '24px';
    prizeText.style.marginBottom = '47px';
    prizeText.style.fontSize = '18px';
    helpPopupCloseBtn.style.top = '25px';
    helpPopupCloseBtn.style.right = '25px';
    helpPopupCloseBtn.style.fontSize = '42px';
    helpPopupCloseBtn.style.padding = '0.5px 12px';
  }
}
updateSpinnerLayout();
window.addEventListener('resize', updateSpinnerLayout);

function simplePopupMessage(text, bgColor = '#b93232', duration = 1700) {
  let popup = document.getElementById('simplePopupMessage');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'simplePopupMessage';
    Object.assign(popup.style, {
      position: 'fixed',
      top: '60%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: bgColor,
      color: '#fff',
      fontWeight: '700',
      fontSize: '18px',
      padding: '12px 24px',
      borderRadius: '8px',
      border: '2px solid gray',
      boxShadow: '0 0 15px rgba(0,0,0,0.8)',
      zIndex: '99999',
      opacity: '0',
      transition: 'opacity 0.3s ease-in-out',
      userSelect: 'none',
      pointerEvents: 'auto',
      maxWidth: '90vw',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      display: 'none',
    });
    document.body.appendChild(popup);
  }

  popup.textContent = text;
  popup.style.backgroundColor = bgColor;
  popup.style.display = 'block';
  requestAnimationFrame(() => {
    popup.style.opacity = '1';
  });

  clearTimeout(popup._timeout);
  popup._timeout = setTimeout(() => {
    popup.style.opacity = '0';
    setTimeout(() => {
      popup.style.display = 'none';
    }, 300);
  }, duration);
}

function updateCooldownTimer(spinBtn) {
  if (cooldownTimerInterval) {
    clearTimeout(cooldownTimerInterval);
    cooldownTimerInterval = null;
  }

  const lastSpin = localStorage.getItem('lastSpinTime');
  if (!lastSpin) {
    cooldownActive = false;
    spinBtn.classList.remove('cooldown');
    spinBtn.textContent = 'SPIN';
    spinBtn.disabled = false;
    helpBtn.classList.add('pulse');
    return;
  }

  const lastSpinTime = parseInt(lastSpin, 10);
  const now = Date.now();
  const millisLeft = lastSpinTime + SPIN_COOLDOWN_MS - now;
  if (millisLeft <= 0) {
    // Cooldown expired
    cooldownActive = false;
    spinBtn.classList.remove('cooldown');
    spinBtn.textContent = 'SPIN';
    spinBtn.disabled = false;
    helpBtn.classList.add('pulse');
    return;
  }

  cooldownActive = true;
  spinBtn.classList.add('cooldown');
  spinBtn.disabled = false;
  helpBtn.classList.remove('pulse');

  const hours = Math.floor(millisLeft / 3600000);
  const mins = Math.floor((millisLeft % 3600000) / 60000);
  const secs = Math.floor((millisLeft % 60000) / 1000);
  spinBtn.textContent = `${hours}h ${mins}m ${secs}s`;

  cooldownTimerInterval = setTimeout(() => {
    updateCooldownTimer(spinBtn);
  }, 1000);
}

function getRotationDegrees(element) {
  const style = window.getComputedStyle(element);
  const transform = style.getPropertyValue('transform') || style.getPropertyValue('-webkit-transform');
  if (transform === 'none') return 0;

  const values = transform.split('(')[1].split(')')[0].split(',');
  const a = parseFloat(values[0]);
  const b = parseFloat(values[1]);
  let angle = Math.atan2(b, a) * (180 / Math.PI);
  if (angle < 0) angle += 360;
  return angle;
}

function unlockNextPaddleSkin() { console.log('Unlocked paddle skin'); }
function unlockNextBallSkin() { console.log('Unlocked ball skin'); }

helpBtn.addEventListener('click', () => {
  contentContainer.innerHTML = `
    <style>${wheelCSS}</style>
    <div id="luckySpinText" style="margin-bottom: 3px; font-weight: bold; font-size: 20px;">
      Lucky Spin
    </div>
    <div id="prizeText" style="margin-bottom: 12px; font-weight: normal; font-size: 16px; line-height: 1.4;">
      Recieve a Prize <b>Daily</b>!
    </div>
    ${wheelHtml}
    <div id="mainButtons" style="margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
      <button id="helpPopupCloseBtn" style="position: absolute; top: 15px; right: 15px; background-color: #444; padding: 0.5px 10px; border-radius: 7px; border: none; color: #e3b900; font-size: 32px; cursor: pointer; font-weight: bold; z-index: 10001; boxShadow: 0 0 5px rgba(0,0,0,0.3); transition: background-color 0.3s ease;">×</button>
      <button id="popupPaddleSkinBtn" style="padding: 10px 16px; background: #008ceb; border: none; border-radius: 6px; color: white; font-weight: 700; cursor: pointer; font-size: 14px;">Paddle Skin</button>
      <button id="popupSpecialBallBtn" style="padding: 10px 16px; background: #ff1800; border: none; border-radius: 6px; color: white; font-weight: 700; cursor: pointer; font-size: 14px;">Special Ball Skin</button>
    </div>
    <div id="playerSelectButtons" style="margin-top: 20px; display: none; gap: 10px; justify-content: center; flex-wrap: wrap;">
      <button id="popupPaddle1ColorBtn" style="padding: 10px 16px; background: #ff6f6f; border: none; border-radius: 6px; color: white; font-weight: 700; cursor: pointer; font-size: 14px;">Player 1 Paddle Skin</button>
      <button id="popupPaddle2ColorBtn" style="padding: 10px 16px; background: #6060ff; border: none; border-radius: 6px; color: white; font-weight: 700; cursor: pointer; font-size: 14px;">Player 2 Paddle Skin</button>
    </div>
  `;
  helpPopup.style.display = 'flex';
  helpPopup.style.transform = 'scale(0)';
  helpOverlay.style.display = 'flex';
  updateSpinnerLayout();
  requestAnimationFrame(() => {
    helpPopup.style.transform = 'scale(1)';
  });
  clickSound.play();

  const mainButtons = helpPopup.querySelector('#mainButtons');
  const playerSelectButtons = helpPopup.querySelector('#playerSelectButtons');
  const paddleSkinBtn = helpPopup.querySelector('#popupPaddleSkinBtn');
  const specialBallBtn = helpPopup.querySelector('#popupSpecialBallBtn');
  const paddle1ColorBtn = helpPopup.querySelector('#popupPaddle1ColorBtn');
  const paddle2ColorBtn = helpPopup.querySelector('#popupPaddle2ColorBtn');
  const popupPaddleBtn = helpPopup.querySelector('#popupPaddleSkinBtn');
  const closeBtn = helpPopup.querySelector('#helpPopupCloseBtn');
  
  popupPaddleBtn.addEventListener('click', () => {
    helpPopup.style.display = 'none';
    helpOverlay.style.display = 'flex';
    playerSelectOverlay.style.display = 'block';
    playerSelectOverlay.style.transform = 'translate(-50%, -50%) scale(0)';
    requestAnimationFrame(() => {
      playerSelectOverlay.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    clickSound.play();
  });

  paddleSkinBtn.addEventListener('click', () => {
    mainButtons.style.display = 'none';
    playerSelectButtons.style.display = 'flex';
    clickSound.play();
  });

  specialBallBtn.addEventListener('click', () => {
    ballSkinOverlay.style.display = 'flex';
    helpPopup.style.display = 'none';
    helpOverlay.style.display = 'none';
    clickSound.play();
  });

  paddle1ColorBtn.addEventListener('click', () => {
    paddleToChange = 'paddle1';
    paddleSkinOverlay.style.display = 'none';
    playerSelectOverlay.style.display = 'none';
    helpPopup.style.display = 'none';
    helpOverlay.style.display = 'none';
    clickSound.play();
  });

  paddle2ColorBtn.addEventListener('click', () => {
    paddleToChange = 'paddle2';
    paddleSkinOverlay.style.display = 'none';
    playerSelectOverlay.style.display = 'none';
    helpPopup.style.display = 'none';
    helpOverlay.style.display = 'none';
    clickSound.play();
  });
  
  closeBtn.addEventListener('click', () => {
    helpPopup.style.display = 'none';
    helpPopup.style.transform = 'scale(0)';
    helpOverlay.style.display = 'none';
    clickSound.play();
  });

  closeBtn.addEventListener('mouseenter', () => {
    closeBtn.style.backgroundColor = '#333';
  });

  closeBtn.addEventListener('mouseleave', () => {
    closeBtn.style.backgroundColor = '#444';
  });

  const spinBtn = helpPopup.querySelector('#spin-demo');
  const wheel = helpPopup.querySelector('.help-demo');
  const stopper = helpPopup.querySelector('.stopper');

  updateCooldownTimer(spinBtn);

  spinBtn.addEventListener('click', (e) => {
    if (cooldownActive) {
      simplePopupMessage('You can spin the wheel when the countdown ends!', '#b93232');
      e.preventDefault();
      clickSound.play();
      return;
    }
    
    localStorage.setItem('lastSpinTime', Date.now().toString());
    updateCooldownTimer(spinBtn);

    helpBtn.classList.remove('pulse');

    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
    void wheel.offsetWidth;

    const totalSpin = 22 * 360 + Math.floor(Math.random() * 360);

    wheel.style.transition = 'transform 12s ease';
    wheel.style.transform = `rotate(${totalSpin}deg)`;
    clickSound.play();

    setTimeout(() => {
      const wheelRotation = getRotationDegrees(wheel);

      const wheelRect = wheel.getBoundingClientRect();
      const stopperRect = stopper.getBoundingClientRect();

      const wheelCenterX = wheelRect.left + wheelRect.width / 2;
      const wheelCenterY = wheelRect.top + wheelRect.height / 2;

      const pointerX = stopperRect.left + stopperRect.width / 2;
      const pointerY = stopperRect.top + stopperRect.height;

      let pointerAngle = Math.atan2(pointerY - wheelCenterY, pointerX - wheelCenterX) * (180 / Math.PI);
      pointerAngle = (pointerAngle + 360) % 360;

      let relativeAngle = (pointerAngle - wheelRotation + 360) % 360;

      const SLICE_COUNT = 6;
      const SLICE_DEG = 360 / SLICE_COUNT;
      const sliceIndex = Math.floor(relativeAngle / SLICE_DEG);

      if (sliceIndex === 0) {
        unlockNextPaddleSkin();
        simplePopupMessage('Paddle Skin Unlocked!', '#228822');
        winSound.play();
      } else if (sliceIndex === 4 || sliceIndex === 2) {
        unlockNextBallSkin();
        simplePopupMessage('Special Ball Skin Unlocked!', '#228822');
        winSound.play();
      } else {
        simplePopupMessage('Oops! Try Again Later', '#aa2222');
      }
    }, 12200);
  });
});

helpOverlay.addEventListener('click', (e) => {
  if (e.target === helpOverlay) {
    helpPopup.style.display = 'none';
    helpPopup.style.transform = 'scale(0)';
    helpOverlay.style.display = 'none';
    playerSelectOverlay.style.display = 'none';
    cooldownActive = cooldownActive; 
    clickSound.play();
  }
});

function checkCooldownAndPulse() {
  const lastSpin = localStorage.getItem('lastSpinTime');
  const now = Date.now();
  const millisLeft = lastSpin ? parseInt(lastSpin, 10) + SPIN_COOLDOWN_MS - now : 0;

  if (!lastSpin || millisLeft <= 0) {
    helpBtn.classList.add('pulse');
  } else {
    helpBtn.classList.remove('pulse');
  }
}
checkCooldownAndPulse();

    const homeBtn = document.createElement('button');
homeBtn.textContent = 'Mode';
homeBtn.classList.add('settings-btn');
homeBtn.style.marginTop = '20px'; 
settingsPopup.appendChild(homeBtn);
  
  const lockedPopup = document.createElement('div');
  lockedPopup.id = 'lockedPopup';
  lockedPopup.textContent = 'Win a match with CPU to get the ball colour!';
  Object.assign(lockedPopup.style, {
    position: 'fixed',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#06c98c', color: 'white',
    fontSize: '20px',
    padding: '15px 25px',
    borderRadius: '8px',
    border: '2px solid gray',
    display: 'none',
    zIndex: 9999,
    boxShadow: '0 0 12px rgba(0,0,0,0.6)',
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

  const skinContainer = document.createElement('div');
  Object.assign(skinContainer.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    background: '#222',
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid gray',
    transform: 'translate(-50%, -50%) scale(0)',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 55px)',
    gap: '12px',
    maxHeight: '300px',
    maxWidth: '350px',
    overflowY: 'auto',
    boxShadow: '0 0 12px rgba(0,0,0,0.6)',
    alignItems: 'center',
    transition: 'transform 0.3s ease',
  });

  skinOverlay.appendChild(skinContainer);

  document.getElementById('gameWrapper').appendChild(skinOverlay);
  
  skinOverlay.addEventListener('click', (e) => {
    if (e.target === skinOverlay) { 
      skinOverlay.style.display = 'none';
      skinContainer.style.transform = 'translate(-50%, -50%) scale(0)';
      setTimeout(() => {
        skinOverlay.style.display = 'none';
      }, 300);
    }                     
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
      btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24">' +
   // Black shackle (behind)
  '<path d="M8 10V7a4 4 0 018 0v3" fill="none" stroke="#000" stroke-width="5"/>' +

  // Silver semicircle rod (shackle)
  '<path d="M8 10V7a4 4 0 018 0v3" fill="none" stroke="#C0C0C0" stroke-width="2"/>' +

  // Main lock body (gold)
  '<rect x="5" y="10" width="14" height="10" rx="1" fill="#FFD700" stroke="#000" stroke-width="1.5"/>' +
'</svg>';
      btn.style.display = 'flex';
      btn.style.justifyContent = 'center';
      btn.style.alignItems = 'center';
      btn.style.opacity = '0.48';
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
        lockSound.play();
      } else {
        skin = colorRef;
        skinOverlay.style.display = 'none';
        clickSound.play();
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
    setTimeout(() => {
      skinContainer.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 10);

  });

  updateSkinButtonStyle();

  const lockedSpinPopup = document.createElement('div');
lockedSpinPopup.id = 'lockedPopup';
lockedSpinPopup.textContent = 'Spin the wheel to unlock the skin!';
Object.assign(lockedSpinPopup.style, {
  position: 'fixed',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#06c98c', color: 'white',
  fontSize: '20px',
  padding: '15px 25px',
  borderRadius: '8px',
  border: '2px solid gray',
  display: 'none',
  zIndex: 9999,
  boxShadow: '0 0 12px rgba(0,0,0,0.6)',
  transition: 'opacity 0.5s ease, transform 0.5s ease'
});
document.getElementById('gameWrapper').appendChild(lockedSpinPopup);

function showLockedSpinPopup() {
  lockedSpinPopup.style.display = 'block';
  void lockedSpinPopup.offsetWidth;
  lockedSpinPopup.style.opacity = '1';
  lockedSpinPopup.style.transform = 'translate(-50%, -50%)';
  setTimeout(() => {
    lockedSpinPopup.style.opacity = '0';
    lockedSpinPopup.style.transform = 'translate(-50%, -60%)';
  }, 1800);
  setTimeout(() => { lockedSpinPopup.style.display = 'none'; }, 2200);
}

  function resetUnlockedPaddleSkins() {
  unlockedPaddleSkins = 2;
  localStorage.setItem('unlockedPaddleSkins', unlockedPaddleSkins);
  updatePaddleSkinChoices();
  console.log('Paddle skins reset to default unlocks.');
}

const paddleSkins = [
  '#ff1800',
  '#008ceb',
  '#ffaa00',
  '#00ffaa',
  '#ff00aa',
  'paddleGradient1',
  'paddleGradient2',
  'paddleGradient3',
  'paddleGradient4',
  'paddleGradient5',
];

let unlockedPaddleSkins = parseInt(localStorage.getItem('unlockedPaddleSkins')) || 2;

const playerSelectOverlay = document.createElement('div');
Object.assign(playerSelectOverlay.style, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(0)',
  background: '#222',
  color: '#fff',
  padding: '20px',
  borderRadius: '10px',
  border: '2px solid gold',
  zIndex: 9999,
  display: 'none',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
});
  playerSelectOverlay.innerHTML = `
  <div style="font-size: 22px; margin-bottom: 20px;">Select Paddle to Customize</div>
  <button id="popupPaddle1Btn" style="
    padding: 10px 18px; background: #ff6f6f; border: none; border-radius: 6px; color: white; font-weight: 700; cursor: pointer; font-size: 16px; margin-right: 10px;">
    Player 1 Color
  </button>
  <button id="popupPaddle2Btn" style="
    padding: 10px 18px; background: #6060ff; border: none; border-radius: 6px; color: white; font-weight: 700; cursor: pointer; font-size: 16px;">
    Player 2 Color
  </button>
  <div style="margin-top: 20px; font-size: 14px; color: #aaa; font-weight: normal;">Click outside to cancel</div>
`;

document.body.appendChild(playerSelectOverlay);

playerSelectOverlay.addEventListener('click', (e) => {
  if (e.target === playerSelectOverlay) {
    playerSelectOverlay.style.display = 'block';
  }
});
const popupPaddle1Btn = playerSelectOverlay.querySelector('#popupPaddle1Btn');
const popupPaddle2Btn = playerSelectOverlay.querySelector('#popupPaddle2Btn');

popupPaddle1Btn.addEventListener('click', () => {
  paddleToChange = 'paddle1';
  paddleSkinOverlay.style.display = 'flex';
  playerSelectOverlay.style.display = 'none';
  helpOverlay.style.display = 'none';
  clickSound.play();
});

popupPaddle2Btn.addEventListener('click', () => {
  paddleToChange = 'paddle2';
  paddleSkinOverlay.style.display = 'flex';
  playerSelectOverlay.style.display = 'none';
  helpOverlay.style.display = 'none';
  clickSound.play();
});

const paddleSkinOverlay = document.createElement('div');
Object.assign(paddleSkinOverlay.style, {
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
  
const paddleSkinContainer = document.createElement('div');
Object.assign(paddleSkinContainer.style, {
  background: '#222',
  padding: '20px',
  borderRadius: '12px',
  border: '2px solid gray',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 55px)',
  gap: '12px',
  maxHeight: '300px',
  maxWidth: '350px',
  overflowY: 'auto',
  boxShadow: '0 0 12px rgba(0,0,0,0.6)',
});
paddleSkinOverlay.appendChild(paddleSkinContainer);
document.body.appendChild(paddleSkinOverlay);

paddleSkinOverlay.addEventListener('click', e => {
  if (e.target === paddleSkinOverlay) paddleSkinOverlay.style.display = 'none';
});

function createPreviewGradientCanvas(pSkin) {
  const previewCanvas = document.createElement('canvas');
  previewCanvas.width = 50;
  previewCanvas.height = 90;
  const pCtx = previewCanvas.getContext('2d');

  const grad = pCtx.createLinearGradient(0, 0, 0, 90);
  switch (pSkin) {
    case 'paddleGradient1':
      grad.addColorStop(0, '#ff7e5f');
      grad.addColorStop(1, '#feb47b');
      break;
    case 'paddleGradient2':
      grad.addColorStop(0, '#6a11cb');
      grad.addColorStop(1, '#2575fc');
      break;
    case 'paddleGradient3':
      grad.addColorStop(0, '#43cea2');
      grad.addColorStop(1, '#185a9d');
      break;
    case 'paddleGradient4':
      grad.addColorStop(0, '#119e7d');
      grad.addColorStop(1, '#bd1e1e');
      break;
    case 'paddleGradient5':
      grad.addColorStop(0, '#00809d');
      grad.addColorStop(1, '#d3af37');
      break;
  }
  pCtx.fillStyle = grad;
  pCtx.fillRect(0, 0, 50, 90);
  return previewCanvas.toDataURL();
}

function updatePaddleSkinChoices() {
  paddleSkinContainer.innerHTML = '';
  paddleSkins.forEach((pSkin, index) => {
    const skinDiv = document.createElement('div');
    skinDiv.style.width = '50px';
    skinDiv.style.height = '90px';
    skinDiv.style.borderRadius = '8px';
    skinDiv.style.cursor = 'pointer';
    skinDiv.style.position = 'relative';
    skinDiv.title = `Skin ${index + 1}`;

    if (pSkin.startsWith('paddleGradient')) {
      skinDiv.style.backgroundImage = `url(${createPreviewGradientCanvas(pSkin)})`;
      skinDiv.style.backgroundSize = 'cover';
    } else {
      skinDiv.style.background = pSkin;
    }

    if (index < unlockedPaddleSkins) {
      skinDiv.addEventListener('click', () => {
        if (paddleToChange === 'paddle1') paddle1.color = pSkin;
        else if (paddleToChange === 'paddle2') paddle2.color = pSkin;
        draw();
        paddleSkinOverlay.style.display = 'none';
        clickSound.play();
      });
    } else {
      const lockIcon = document.createElement('div');
      lockIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24">' +
   // Black shackle (behind)
  '<path d="M8 10V7a4 4 0 018 0v3" fill="none" stroke="#000" stroke-width="5"/>' +

  // Silver semicircle rod (shackle)
  '<path d="M8 10V7a4 4 0 018 0v3" fill="none" stroke="#C0C0C0" stroke-width="2"/>' +

  // Main lock body (gold)
  '<rect x="5" y="10" width="14" height="10" rx="1" fill="#FFD700" stroke="#000" stroke-width="1.5"/>' +
'</svg>';
      Object.assign(lockIcon.style, {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        color: 'gold',
        fontSize: '30px',
        fontWeight: 'bold',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        pointerEvents: 'none',
      });
      skinDiv.appendChild(lockIcon);
      skinDiv.style.filter = 'grayscale(.8) brightness(.7)';
      skinDiv.addEventListener('click', e => {
        e.stopPropagation();
        showLockedSpinPopup();
        lockSound.play();
      });
    }

    paddleSkinContainer.appendChild(skinDiv);
  });
}
updatePaddleSkinChoices();

let paddleToChange = null;

  function unlockNextPaddleSkin() {
  if (unlockedPaddleSkins < paddleSkins.length) {
    unlockedPaddleSkins += 1;
    localStorage.setItem('unlockedPaddleSkins', unlockedPaddleSkins);
    updatePaddleSkinChoices();
  }
}

function resetUnlockedBallSkins() {
  unlockedBallSkins = 1;
  localStorage.setItem('unlockedBallSkins', unlockedBallSkins);
  updateBallSkinChoices();
  console.log('Ball skins reset to default unlocks.');
}
  
const specialBallSkins = [
  '#efefef',
  'starRed',
  'starClassic',
  'starBlue',
  'starGold',
  'starGlow',
  'starRing',
];

let unlockedBallSkins = parseInt(localStorage.getItem('unlockedBallSkins')) || 1;

function drawStarRed(ctx, x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.shadowColor = '#f44';
  ctx.shadowBlur = 12;
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = 'gold';
  drawStar(ctx, x, y, 5, r * 0.65, r * 0.3);
  ctx.restore();
}

function drawStarBallClassic(ctx, x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = '#0eb578';
  ctx.shadowColor = '#4da158';
  ctx.shadowBlur = 12;
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#0e83b5';
  drawStar(ctx, x, y, 5, r * 0.65, r * 0.3);
  ctx.restore();
}

function drawStarBallBlue(ctx, x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = '#0077cc';
  ctx.shadowColor = '#005599';
  ctx.shadowBlur = 15;
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = 'white';
  drawStar(ctx, x, y, 5, r * 0.65, r * 0.3);
  ctx.restore();
}

function drawStarBallGold(ctx, x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = 'gold';
  ctx.shadowColor = '#b8860b';
  ctx.shadowBlur = 10;
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = 'black';
  drawStar(ctx, x, y, 5, r * 0.65, r * 0.3);
  ctx.restore();
}

function drawStarBallGlow(ctx, x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.shadowColor = '#ff0';
  ctx.shadowBlur = 10;
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#666';
  drawStar(ctx, x, y, 5, r * 0.65, r * 0.3);
  ctx.restore();
}

function drawStarBallRing(ctx, x, y, r) {
  ctx.save();
  
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.shadowBlur = 0;
  ctx.fill();

  ctx.beginPath();
  ctx.lineWidth = r * 0.2;
  ctx.strokeStyle = '#777';
  ctx.arc(x, y, r - ctx.lineWidth/2, 0, 2*Math.PI);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.lineWidth = r * 0.15;
  ctx.strokeStyle = 'gold';
  ctx.shadowBlur = 20;
  ctx.shadowColor = '#c9ac06';
  ctx.arc(x, y, r - ctx.lineWidth/2, 0, 2*Math.PI);
  ctx.stroke();
  
  ctx.fillStyle = 'maroon';
  drawStar(ctx, x, y, 5, r * 0.65, r * 0.3);
  ctx.restore();
}

  function drawStarRedPreview(ctx, x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = 'gold';
  drawStar(ctx, x, y, 5, r * 0.65, r * 0.3);
  ctx.restore();
}

function drawStarBallClassicPreview(ctx, x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = '#0eb578';
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#0e83b5';
  drawStar(ctx, x, y, 5, r * 0.65, r * 0.3);
  ctx.restore();
}

function drawStarBallBluePreview(ctx, x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = '#0077cc';
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = 'white';
  drawStar(ctx, x, y, 5, r * 0.65, r * 0.3);
  ctx.restore();
}

function drawStarBallGoldPreview(ctx, x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = 'gold';
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = 'black';
  drawStar(ctx, x, y, 5, r * 0.65, r * 0.3);
  ctx.restore();
}

function drawStarBallGlowPreview(ctx, x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#666';
  drawStar(ctx, x, y, 5, r * 0.65, r * 0.3);
  ctx.restore();
}

function drawStarBallRingPreview(ctx, x, y, r) {
  ctx.save();
  
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.shadowBlur = 0;
  ctx.fill();

  ctx.beginPath();
  ctx.lineWidth = r * 0.2;
  ctx.strokeStyle = '#777';
  ctx.arc(x, y, r - ctx.lineWidth/2, 0, 2*Math.PI);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.lineWidth = r * 0.15;
  ctx.strokeStyle = 'gold';
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';
  ctx.arc(x, y, r - ctx.lineWidth/2, 0, 2*Math.PI);
  ctx.stroke();
  
  ctx.fillStyle = 'maroon';
  drawStar(ctx, x, y, 5, r * 0.65, r * 0.3);
  ctx.restore();
}
  
const ballSkinOverlay = document.createElement('div');
Object.assign(ballSkinOverlay.style, {
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
  
const ballSkinContainer = document.createElement('div');
Object.assign(ballSkinContainer.style, {
  background: '#222',
  padding: '20px',
  borderRadius: '12px',
  border: '2px solid gray',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 55px)',
  gap: '12px',
  maxHeight: '300px',
  maxWidth: '350px',
  overflowY: 'auto',
  boxShadow: '0 0 12px rgba(0,0,0,0.6)',
});
ballSkinOverlay.appendChild(ballSkinContainer);
document.body.appendChild(ballSkinOverlay);

ballSkinOverlay.addEventListener('click', e => {
  if (e.target === ballSkinOverlay) {
    ballSkinOverlay.style.display = 'none';
  }
});

  function createBallSkinPreview(pSkin) {
  if (pSkin.startsWith('specialGradient')) {
    const previewCanvas = document.createElement('canvas');
    previewCanvas.width = 50;
    previewCanvas.height = 50;
    const pCtx = previewCanvas.getContext('2d');
    const grad = pCtx.createLinearGradient(0, 0, 50, 50);
    switch (pSkin) {
      case 'specialGradient1':
        grad.addColorStop(0, '#f953c6');
        grad.addColorStop(1, '#b91d73');
        break;
      case 'specialGradient2':
        grad.addColorStop(0, '#43cea2');
        grad.addColorStop(1, '#185a9d');
        break;
      case 'specialGradient3':
        grad.addColorStop(0, '#ff6e7f');
        grad.addColorStop(1, '#bfe9ff');
        break;
    }
    pCtx.fillStyle = grad;
    pCtx.beginPath();
    pCtx.arc(25, 25, 22, 0, Math.PI * 2);
    pCtx.fill();
    return previewCanvas.toDataURL();
  }
  return null;
}

function updateBallSkinChoices() {
  ballSkinContainer.innerHTML = '';
  specialBallSkins.forEach((pSkin, index) => {
    const skinDiv = document.createElement('div');
    skinDiv.style.width = '50px';
    skinDiv.style.height = '50px';
    skinDiv.style.borderRadius = '50%';
    skinDiv.style.cursor = 'pointer';
    skinDiv.style.position = 'relative';
    skinDiv.title = `Skin ${index + 1}`;

    const previewCanvas = document.createElement('canvas');
    previewCanvas.width = 50;
    previewCanvas.height = 50;
    const pCtx = previewCanvas.getContext('2d');

    switch(pSkin) {
      case 'starRed': drawStarRedPreview(pCtx, 25, 25, 22); break;
      case 'starClassic': drawStarBallClassicPreview(pCtx, 25, 25, 22); break;
      case 'starBlue': drawStarBallBluePreview(pCtx, 25, 25, 22); break;
      case 'starGold': drawStarBallGoldPreview(pCtx, 25, 25, 22); break;
      case 'starGlow': drawStarBallGlowPreview(pCtx, 25, 25, 22); break;
      case 'starRing': drawStarBallRingPreview(pCtx, 25, 25, 22); break;
      default:
        pCtx.fillStyle = pSkin;
        pCtx.beginPath();
        pCtx.arc(25, 25, 22, 0, Math.PI * 2);
        pCtx.fill();
    }

    skinDiv.style.background = 'transparent';
    skinDiv.appendChild(previewCanvas);

    if (index < unlockedBallSkins) {
      skinDiv.addEventListener('click', () => {
        skin = pSkin;
        draw();
        ballSkinOverlay.style.display = 'none';
        if (typeof clickSound !== 'undefined') clickSound.play();
      });
    } else {
      const lockIcon = document.createElement('div');
      lockIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24">' +
       '<path d="M8 10V7a4 4 0 018 0v3" fill="none" stroke="#000" stroke-width="5"/>' +
       '<path d="M8 10V7a4 4 0 018 0v3" fill="none" stroke="#C0C0C0" stroke-width="2"/>' +
       '<rect x="5" y="10" width="14" height="10" rx="1" fill="#FFD700" stroke="#000" stroke-width="1.5"/>' +
      '</svg>';
      Object.assign(lockIcon.style, {
        position: 'absolute', left: '0', top: '0', width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', borderRadius: '50%'
      });
      skinDiv.appendChild(lockIcon);
      skinDiv.style.filter = 'grayscale(.8) brightness(.7)';
      skinDiv.addEventListener('click', e => {
        e.stopPropagation();
        showLockedSpinPopup();
        lockSound.play();
      });
    }

    ballSkinContainer.appendChild(skinDiv);
  });
}
updateBallSkinChoices();

  function unlockNextBallSkin() {
  if (unlockedBallSkins < specialBallSkins.length) {
    unlockedBallSkins += 1;
    localStorage.setItem('unlockedBallSkins', unlockedBallSkins);
    updateBallSkinChoices();
  }
}

let audioUnlocked = false; 

function unlockAudio() {
  if (audioUnlocked) return;
  const context = new AudioContext();
  if (context.state === 'suspended') {
    context.resume();
  }
  const oscillator = context.createOscillator();
  oscillator.connect(context.destination);
  oscillator.start(0);
  oscillator.stop(context.currentTime + 0.01);
  
  audioUnlocked = true;
}

let countdownInterval = null;

function runCanvasCountdown(callback) {
  let count = 3;
  const beep = new Audio('https://www.soundjay.com/buttons/beep-07a.mp3');
  const goBeep = new Audio('https://www.soundjay.com/buttons/beep-09.mp3');

  beep.volume = 0.5;
  goBeep.volume = 0.5;

  function drawCountdown() {
    draw();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#e3b900';
    ctx.font = '120px "Margarine", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (count > 0) {
      ctx.fillText(count, canvas.width / 2, canvas.height / 2);
    } else {
      ctx.fillText('GO!', canvas.width / 2, canvas.height / 2);
    }
  }

  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }

  document.fonts.load('120px "Margarine"').then(() => {
    drawCountdown();
    beep.play(); // Initial beep for 3

    countdownInterval = setInterval(() => {
      count--;

      if (count === 0) {
        drawCountdown();

        goBeep.currentTime = 0;
        goBeep.play();

        setTimeout(() => {
          goBeep.pause();
          goBeep.currentTime = 0;
        }, 400); // Stop after 0.5 seconds

        clearInterval(countdownInterval);
        countdownInterval = null;

        setTimeout(() => {
          draw(); // Clear the screen
          callback();
        }, 800);
      } else {
        drawCountdown();
        beep.currentTime = 0;
        beep.play();
      }
    }, 1000);
  });
}

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

  const paddle1 = { x: 20, y: HEIGHT / 2 - PADDLE_HEIGHT / 2, color: paddleSkins[0] };
  const paddle2 = { x: WIDTH - 32, y: HEIGHT / 2 - PADDLE_HEIGHT / 2, color: paddleSkins[1] };
  
  let totalP1Points = parseInt(localStorage.getItem('totalP1Points')) || 0;
  let totalP2Points = parseInt(localStorage.getItem('totalP2Points')) || 0;

  const ball = { x: WIDTH / 2, y: HEIGHT / 2, size: BALL_SIZE, speedX: 4, speedY: 4 };

  const paddleSound = new Audio('https://www.soundjay.com/buttons/button-24.mp3');
  paddleSound.volume = 0.4;
  const wallSound = new Audio('https://www.soundjay.com/buttons/button-50.mp3');
  wallSound.volume = 0.7;
  const scoreSound = new Audio('https://www.soundjay.com/buttons/button-10.mp3');
  scoreSound.volume = 0.2;
  const winSound = new Audio('https://www.soundjay.com/misc/magic-chime-02.mp3');
  winSound.volume = 1;
  const lockSound = new Audio('https://www.soundjay.com/buttons/button-16a.mp3');
  lockSound.volume = 1;
  const clickSound = new Audio('https://www.soundjay.com/buttons/button-20.mp3');
  clickSound.volume = 0.6;

  const backgroundMusic = new Audio('https://www.soundjay.com/free-music/cautious-path-01.mp3');
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.9;
  backgroundMusic.preload = 'auto';
  backgroundMusic.load();

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
      backgroundMusic.currentTime = 0;
      backgroundMusic.play().catch(e => console.log('Music play failed:', e));
      musicEnabled = true;
      clickSound.play();
    } else {
      backgroundMusic.pause();
      musicBtn.textContent = 'Play Music';
      settingsOverlay.style.display = 'none';
      clickSound.play();
    }
  });

  const keysPressed = {};

  function updateScoreLabels() {
    labelP1.textContent = mode === 'single' ? 'Player 1 score:' : 'Player 1 score:';
    labelP2.textContent = mode === 'single' ? 'CPU score:' : 'Player 2 score:';
  }

  let normalBallSpeed = 6;
  
  function getBallSpeed() {
    switch (difficulty) {
      case 'normal': return normalBallSpeed;
      case 'easy': return 7;
      case 'medium': return 8;
      case 'hard': return 9;
      case 'super': return 10;
      case 'extreme': return 12;
      case 'boss': return 13;
      default: return 8;
    }
  }

  let ballPaused = false
  let gameType = 'classic'; // default
  let roundWallsActive = true;
  let roundWallsDisableTimeout = null;
  const actionWalls = [
    { x: 330, y: 100, r: 23 },
    { x: 330, y: 280, r: 23 },
    { x: WIDTH - 330, y: 280, r: 23 },
    { x: WIDTH - 330, y: 100, r: 23 },
    { x: WIDTH / 2, y: HEIGHT / 2, r: 33 }
];

function resetBall() {
  ballPaused = true;
  ball.x = WIDTH / 2;
  ball.y = HEIGHT / 2;
  ball.speedX = 0;
  ball.speedY = 0;

  if (gameType === 'action') {
    actionWalls.forEach(wall => {
      const dx = ball.x - wall.x;
      const dy = ball.y - wall.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDist = ball.size + wall.r + 2;

      if (distance < minDist) {
        const normX = dx / distance || 0;
        const normY = dy / distance || -1;

        ball.x = wall.x + normX * minDist;
        ball.y = wall.y + normY * minDist;
      }
    });
  }

  setTimeout(() => {
    const speed = getBallSpeed();
    ball.speedX = Math.random() > 0.5 ? speed : -speed;
    ball.speedY = (Math.random() - 0.5) * speed;
    ballPaused = false;
  }, 550);
}

function drawRect(x, y, width, height, color, radius = 3) {
  let fillStyle = color;
  if (color.startsWith('paddleGradient')) {
    const grad = ctx.createLinearGradient(x, y, x, y + height);
    switch (color) {
      case 'paddleGradient1':
        grad.addColorStop(0, '#ff7e5f');
        grad.addColorStop(1, '#feb47b');
        break;
      case 'paddleGradient2':
        grad.addColorStop(0, '#6a11cb');
        grad.addColorStop(1, '#2575fc');
        break;
      case 'paddleGradient3':
        grad.addColorStop(0, '#43cea2');
        grad.addColorStop(1, '#185a9d');
        break;
      case 'paddleGradient4':
        grad.addColorStop(0, '#00674f');
        grad.addColorStop(1, '#9c0e0e');
        break;
      case 'paddleGradient5':
        grad.addColorStop(0, '#00809d');
        grad.addColorStop(1, '#d3af37');
        break;
      default:
        console.warn('Unknown gradient:', color);
    }
    fillStyle = grad;
  }
  ctx.fillStyle = fillStyle;
  
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

function drawCircle(x, y, r, skin) {
  // Handle special custom designs
  if (skin === 'starRed') {
    drawStarRed(ctx, x, y, r);
    return;
  }
  if (skin === 'starClassic') {
    drawStarBallClassic(ctx, x, y, r);
    return;
  }
  if (skin === 'starBlue') {
    drawStarBallBlue(ctx, x, y, r);
    return;
  }
  if (skin === 'starGold') {
    drawStarBallGold(ctx, x, y, r);
    return;
  }
  if (skin === 'starGlow') {
    drawStarBallGlow(ctx, x, y, r);
    return;
  }
  if (skin === 'starRing') {
    drawStarBallRing(ctx, x, y, r);
    return;
  }
  
  let shadowColor = null;
  if (typeof skin === 'string' && skin.startsWith('gradient')) {
    let gradient = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
    switch (skin) {
      case 'gradient1':
        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(1, '#ffff00');
        shadowColor = '#ff0000'; break;
      case 'gradient2':
        gradient.addColorStop(0, '#0000ff');
        gradient.addColorStop(1, '#800080');
        shadowColor = '#8042fc'; break;
      case 'gradient3':
        gradient.addColorStop(0, '#ffff00');
        gradient.addColorStop(1, '#00ff00');
        shadowColor = '#00ff00'; break;
      case 'gradient4':
        gradient.addColorStop(0, '#800080');
        gradient.addColorStop(1, '#ff00ff');
        shadowColor = '#f71bf7'; break;
      case 'gradient5':
        gradient.addColorStop(0, '#00ffff');
        gradient.addColorStop(1, '#0000ff');
        shadowColor = '#00ffff'; break;
      case 'gradient6':
        gradient.addColorStop(0, '#00a2ff');
        gradient.addColorStop(1, '#f0f9ff');
        shadowColor = '#91d7ff'; break;
      case 'gradient7':
        gradient.addColorStop(0, '#e00211');
        gradient.addColorStop(1, '#6e04bf');
        shadowColor = '#e00211'; break;
      case 'gradient8':
        gradient.addColorStop(0, '#2e4dab');
        gradient.addColorStop(1, '#145414');
        shadowColor = '#47b0d1'; break;
      case 'gradient9':
        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(0.5, '#0000ff');
        gradient.addColorStop(1, '#ffffff');
        shadowColor = '#aa55aa'; break;
      case 'gradient10':
        gradient.addColorStop(0, '#108a03');
        gradient.addColorStop(0.5, '#a4d0f5');
        gradient.addColorStop(1, '#ff9900');
        shadowColor = '#adbf78'; break;
      case 'gradient11':
        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(0.2, '#fff700');
        gradient.addColorStop(0.4, '#00ff08');
        gradient.addColorStop(0.6, '#0077ff');
        gradient.addColorStop(0.8, '#6200ff');
        gradient.addColorStop(1, '#ff00bf');
        shadowColor = '#bf9ba8'; break;
      case 'gradient12':
        gradient.addColorStop(0, '#C0C0C0');
        gradient.addColorStop(1, '#FFD700');
        shadowColor = '#C0C0C0'; break;
      default:
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, 'gray');
        shadowColor = 'gray';
    }
    ctx.fillStyle = gradient;
  } else {
    // Plain color fallback
    ctx.fillStyle = skin;
    shadowColor = skin;
  }

  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

  function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawRect(paddle1.x, paddle1.y, PADDLE_WIDTH, PADDLE_HEIGHT, paddle1.color);
    drawRect(paddle2.x, paddle2.y, PADDLE_WIDTH, PADDLE_HEIGHT, paddle2.color);
    drawCircle(ball.x, ball.y, ball.size, skin);
if (gameType === 'action') {
  actionWalls.forEach(wall => {
        
    ctx.beginPath();
    ctx.arc(wall.x, wall.y, wall.r + 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#999';
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(wall.x, wall.y, wall.r, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#4b4d4b';
    ctx.beginPath();
    ctx.arc(wall.x, wall.y, wall.r -4, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#666';
    ctx.beginPath();
    ctx.arc(wall.x, wall.y, wall.r -4, Math.PI * 0.75, Math.PI * 1.75);
    ctx.fill();

    ctx.fillStyle = '#505250';
    ctx.beginPath();
    ctx.arc(wall.x, wall.y, wall.r -4,  Math.PI * 1.75, Math.PI * 0.75);
    ctx.fill();

    drawStar(ctx, wall.x, wall.y, 5, wall.r * 0.4, wall.r * 0.2, 'gold');
  });
}
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
          winSound.play();
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
        winSound.play();
      }

      updateSkinButtonStyle();
      unlockNextPaddleSkin();
      document.getElementById('popupMessage').textContent = message;
      document.getElementById('winPopup').classList.remove('hidden');
    }
  }

const scoreSummary = document.createElement('div');
scoreSummary.style.marginTop = '10px';
scoreSummary.style.color = 'gold';
scoreSummary.style.fontSize = '20px';
scoreSummary.style.lineHeight = '1.6';
scoreSummary.style.textAlign = 'center';

function updateScoreSummary() {
  scoreSummary.innerHTML = `
    <div class="highestscorebg">
      <strong>Total Multiplayer Score:</strong>
      <div class="score-line"><span>Player 1 :</span><span class="score-value">${totalP1Points}</span></div>
      <div class="score-line"><span>Player 2 :</span><span class="score-value">${totalP2Points}</span></div>
      <button id="resetScoreBtn" style="
          margin-top: 10px;
          background-color: #0257c7;
          border: 1px solid #333;
          border-radius: 5px;
          font-size: 12px;
          color: white;
          padding: 5px 12px;
          cursor: pointer;">Reset Score</button>
    </div>
  `;

  setTimeout(() => {
    document.getElementById('resetScoreBtn')?.addEventListener('click', showResetScorePopup);
  }, 0);
}
updateScoreSummary();
settingsPopup.appendChild(scoreSummary);

const resetScorePopup = document.createElement('div');
resetScorePopup.style.position = 'absolute';
resetScorePopup.style.width = '300px';
resetScorePopup.style.top = '50%';
resetScorePopup.style.left = '50%';
resetScorePopup.style.transform = 'translate(-50%, -50%)';
resetScorePopup.style.background = '#222';
resetScorePopup.style.color = '#fff';
resetScorePopup.style.padding = '20px';
resetScorePopup.style.border = '2px solid gold';
resetScorePopup.style.borderRadius = '10px';
resetScorePopup.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
resetScorePopup.style.zIndex = '8889';
resetScorePopup.style.textAlign = 'center';
resetScorePopup.style.display = 'none';
resetScorePopup.innerHTML = `
  <p style="margin-bottom: 15px; font-size: 20px;">Are you sure you want to reset the score?</p>
  <button id="confirmResetYes" style="margin-right: 10px; padding: 6px 14px; background: #3fd144; color: white; border: 1px solid white; border-radius: 4px; cursor: pointer;">Yes</button>
  <button id="confirmResetNo" style="padding: 6px 14px; background: #3fd144; color: white; border: 1px solid white; border-radius: 4px; cursor: pointer;">No</button>
`;

settingsPopup.appendChild(resetScorePopup);

function showResetScorePopup() {
  resetScorePopup.style.display = 'block';
  clickSound.play();
}
  
function hideResetScorePopup() {
  resetScorePopup.style.display = 'none';
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'confirmResetYes') {
    clickSound.play();
    totalP1Points = 0;
    totalP2Points = 0;
    localStorage.setItem('totalP1Points', '0');
    localStorage.setItem('totalP2Points', '0');
    updateScoreSummary();
    hideResetScorePopup();
  } else if (e.target.id === 'confirmResetNo') {
    clickSound.play();
    hideResetScorePopup();
  }
});

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
      if (mode === 'multi') {
        totalP2Points++;
        localStorage.setItem('totalP2Points', totalP2Points);
        updateScoreSummary();
      }
      if (difficulty === 'normal') {
  normalBallSpeed = 6;
}
      scoreSound.play();
      resetBall();
      checkWinCondition();
    } else if (ball.x - ball.size > WIDTH) {
      player1Score++;
      if (mode === 'multi') {
        totalP1Points++;
        localStorage.setItem('totalP1Points', totalP1Points);
        updateScoreSummary();
      }
      if (difficulty === 'normal') {
  normalBallSpeed = 6;
}
      scoreSound.play();
      resetBall();
      checkWinCondition();
    }

    if (mode === 'single') {
      const targetY = ball.y - PADDLE_HEIGHT / 2;
      const factor = { easy: 0.27, medium: 0.29, hard: 0.33, super: 0.38, extreme: 0.43, boss: 0.51 }[difficulty] || 0.29;
      if (paddle2.y < targetY) paddle2.y += PADDLE_SPEED * factor;
      else if (paddle2.y > targetY) paddle2.y -= PADDLE_SPEED * factor;
    }

    player1ScoreSpan.textContent = player1Score;
    player2ScoreSpan.textContent = player2Score;
    
    if (gameType === 'action') {
  actionWalls.forEach(wall => {
    const dx = ball.x - wall.x;
    const dy = ball.y - wall.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball.size + wall.r) {
      const normX = dx / distance;
      const normY = dy / distance;

      const dot = ball.speedX * normX + ball.speedY * normY;
      ball.speedX = ball.speedX - 2 * dot * normX;
      ball.speedY = ball.speedY - 2 * dot * normY;

      wallSound.play();

      ball.x = wall.x + (ball.size + wall.r + 1) * normX;
      ball.y = wall.y + (ball.size + wall.r + 1) * normY;
    }
  });
}
    
    if (difficulty === 'normal') {
  const acceleration = 0.008;
  normalBallSpeed += acceleration;
}

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
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    if (difficulty === 'normal') {
    normalBallSpeed = 6;
  }
    updateSkinButtonStyle();
  }

    singlePlayerBtn.addEventListener('click', () => {
    modeSelect.value = 'single';
    mode = 'single';
    startScreen.style.display = 'none';
    modeSelect.style.display = 'none';
    showControlsScreen(resetGame);
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
    showControlsScreen(resetGame);
    resetGame();
    
      if (!musicEnabled) {
    backgroundMusic.play().catch(e => console.log('Music play failed:', e));
    musicBtn.textContent = 'Pause Music';
    musicEnabled = true;
  }
  });
  
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
  settingsPopup.style.transform = 'translate(-50%, -50%) scale(0)';
  settingsOverlay.style.display = 'flex';
  requestAnimationFrame(() => {
    settingsPopup.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

document.addEventListener('click', (event) => {
  const isSettings = event.target === settingsPopup || event.target === settingsBtn;
  if (!isSettings) {
    settingsPopup.style.display = 'flex';
  }
});
    
   document.addEventListener('click', (event) => {
  const isInsidePopup = settingsPopup.contains(event.target);
  const isSettingsButton = settingsBtn.contains(event.target);

  if (!isInsidePopup && !isSettingsButton) {
    settingsPopup.style.display = 'none';
    settingsOverlay.style.display = 'none';
    hideResetScorePopup();
  }
});

homeBtn.addEventListener('click', () => {
  settingsPopup.style.display = 'none';
  settingsOverlay.style.display = 'none';
  clickSound.play();
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

  startBtn.addEventListener('click', () => {
    unlockAudio();
    stopGame();
    runCanvasCountdown(() => {
      startGame();
    });
  });

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
