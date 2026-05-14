window.addEventListener('error', function(ev){ window.__lastError = String(ev.error || ev.message || ev); });
window.addEventListener('unhandledrejection', function(ev){ window.__lastError = String(ev.reason || ev); });

const NATIVE_W = 640;
const NATIVE_H = 360;
const GROUND_Y = 320;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeGame() {
  const scale = Math.max(1, Math.floor(Math.min(window.innerWidth / NATIVE_W, window.innerHeight / NATIVE_H)));
  canvas.style.width = `${NATIVE_W * scale}px`;
  canvas.style.height = `${NATIVE_H * scale}px`;
}
window.addEventListener('resize', resizeGame);
resizeGame();

const Keys = Object.create(null);
const justPressed = Object.create(null);
window.addEventListener('keydown', e => {
  if (!Keys[e.code]) justPressed[e.code] = true;
  Keys[e.code] = true;
  initAudio();
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','Escape','Enter','KeyJ','KeyW','KeyM','Digit1','Digit2'].includes(e.code)) e.preventDefault();
});
window.addEventListener('keyup', e => { Keys[e.code] = false; });
window.addEventListener('blur', () => {
  clearManagedTimeouts();
  for (const k of Object.keys(Keys)) Keys[k] = false;
  for (const k of Object.keys(justPressed)) delete justPressed[k];
  if (gameState === STATE.PLAY) gameState = STATE.PAUSE;
});
function pressed(code) { if (justPressed[code]) { delete justPressed[code]; return true; } return false; }
function finishInputFrame() {
  for (const k of Object.keys(justPressed)) {
    if (justPressed[k] === true) justPressed[k] = 2;
    else delete justPressed[k];
  }
}


let audioCtx = null;
let bgMusicInterval = null;
let managedTimeouts = new Set();
function scheduleManagedTimeout(fn, delay) {
  const id = setTimeout(() => {
    managedTimeouts.delete(id);
    fn();
  }, delay);
  managedTimeouts.add(id);
  return id;
}
function clearManagedTimeouts() {
  for (const id of managedTimeouts) clearTimeout(id);
  managedTimeouts.clear();
}
const level1Melody = [262, 294, 330, 349, 392, 440, 494, 523];
let melodyIdx = 0;
function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}
function playTone(freq, dur, type='square', vol=0.15, detune=0) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
}
function sfxJump() { playTone(300, 0.1, 'sine', 0.2); playTone(500, 0.08, 'sine', 0.1); }
function sfxDoubleJump() { playTone(420, 0.09, 'sine', 0.18); playTone(620, 0.08, 'sine', 0.09); }
function sfxShoot() { playTone(800, 0.05, 'square', 0.1); }
function sfxSuperShot() { playTone(220, 0.08, 'sawtooth', 0.14); playTone(720, 0.1, 'triangle', 0.08); }
function sfxHit() { playTone(150, 0.15, 'sawtooth', 0.2); }
function sfxPickup() { playTone(600, 0.1, 'sine', 0.15); playTone(900, 0.1, 'sine', 0.1); }
function sfxDeath() { playTone(200, 0.3, 'sawtooth', 0.25); playTone(100, 0.4, 'sawtooth', 0.2); }
function sfxBossHit() { playTone(100, 0.1, 'square', 0.2); }
function sfxCheckpoint() { [500,700,900].forEach((f,i)=>scheduleManagedTimeout(()=>playTone(f,0.15,'sine',0.2),i*80)); }
function sfxWin() { [523,659,784,1047].forEach((f,i)=>scheduleManagedTimeout(()=>playTone(f,0.3,'sine',0.2),i*120)); }
function sfxFlamethrower() { playTone(200 + Math.random() * 100, 0.08, 'sawtooth', 0.15); }
function startBGMusic() {
  if (bgMusicInterval) return;
  bgMusicInterval = setInterval(() => {
    if (audioCtx) {
      playTone(level1Melody[melodyIdx % level1Melody.length], 0.2, 'triangle', 0.06);
      melodyIdx++;
    }
  }, 300);
}
function stopBGMusic() {
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval);
    bgMusicInterval = null;
  }
}
function startBossMusic() {
  stopBGMusic();
  let b = 0;
  bgMusicInterval = setInterval(() => {
    const notes = [150, 200, 250, 180, 300, 220];
    playTone(notes[b % notes.length], 0.15, 'square', 0.08);
    b++;
  }, 200);
}
canvas.addEventListener('mousedown', () => { initAudio(); });
canvas.addEventListener('pointerdown', () => { initAudio(); }, { passive: true });

const STATE = { TITLE: 0, INTRO: 1, PLAY: 2, PAUSE: 3, STATS: 4, WIN: 5, GAMEOVER: 6 };
let gameState = STATE.TITLE;
let titleTick = 0;
let introTimer = 0;
let flashText = '';
let flashTimer = 0;
let score = 0;
let levelIndex = 0;
let levelTimer = 0;
let currentLevel = null;
let levelClearMessage = '';
let statsTimer = 0;
let lastStageStats = null;
let campaignCleared = false;
function resetTransientRuntime() {
  clearManagedTimeouts();
  flashText = '';
  flashTimer = 0;
}

const LEVELS = [
  { num: 1, name: 'AVENUE IN FIAMME', theme: 'Ingresso morbido, salvataggi e unlock di Azure', tip: 'Livello introduttivo: alterna strada, piattaforme basse e boss set-piece.', skyA: '#200020', skyB: '#3a0a45', skyC: '#120012', bossName: 'DRAKOPTERO', width: 7000, bossTrigger: 5750 },
  { num: 2, name: 'METRO DISTRUTTA', theme: 'Stazione fantasma, neon rotti e tunnel industriali', tip: 'Scenario sotterraneo: lampi elettrici, pilastri, binari e rottami metallici.', skyA: '#061018', skyB: '#0d2338', skyC: '#02070d', bossName: 'VOID MECHA', width: 4600, bossTrigger: 3940 }
];

const camera = { x: 0 };
let platforms = [];
let enemies = [];
let bullets = [];
let pickups = [];
let particles = [];
let boss = null;
let bossArenaLocked = false;
let bossDefeated = false;
let checkpointX = 80;
let bossIntroTimer = 0;
let specialWeaponUnlocked = false;
let hostages = [];
let checkpoints = [];
const azure = { x: 0, y: 240, w: 18, h: 30, dir: 1, active: false, shootCooldown: 0, bob: 0, vx: 0, vy: 0, onGround: false, prevY: 0, frame: 0, frameTimer: 0, stunned: 0 };

const player = {
  x: 80, y: 0, w: 22, h: 34,
  vx: 0, vy: 0, dir: 1,
  hp: 100, maxHp: 100,
  inv: 0,
  onGround: false,
  coyote: 0,
  jumpBuffer: 0,
  jumpsLeft: 2,
  shootCd: 0,
  superEnergy: 300,
  superMax: 300,
  superShots: 3,
  stageKills: 0,
  stageHostages: 0,
  shotsFired: 0,
  frame: 0,
  frameTimer: 0,
  lives: 3,
  respawning: 0,
  runTapTimer: 0,
  runTapDir: 0,
  runModeDir: 0
};

function resetPlayer(full = true) {
  player.x = checkpointX;
  player.y = GROUND_Y - player.h;
  player.vx = 0;
  player.vy = 0;
  player.dir = 1;
  player.onGround = true;
  player.coyote = 0;
  player.jumpBuffer = 0;
  player.jumpsLeft = 2;
  player.shootCd = 0;
  player.inv = 0;
  player.frame = 0;
  player.frameTimer = 0;
  player.respawning = 0;
  player.runTapTimer = 0;
  player.runTapDir = 0;
  player.runModeDir = 0;
  if (full) {
    player.hp = player.maxHp;
    player.lives = 3;
    player.superEnergy = player.superMax;
    player.superShots = 3;
    player.stageKills = 0;
    player.stageHostages = 0;
    player.shotsFired = 0;
    if (!player.hasAzure) azure.active = false;
  }
}

function spawnParticles(x, y, color, count = 8, speed = 1, opts = {}) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = (1 + Math.random() * 2) * speed;
    particles.push({
      x, y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s - (opts.floaty ? 0.4 : 1),
      life: 1,
      decay: opts.decay || (0.03 + Math.random() * 0.03),
      color,
      size: opts.size || (2 + Math.random() * 2),
      glow: opts.glow || 0,
      shape: opts.shape || 'square',
      twinkle: !!opts.twinkle
    });
  }
}
function updateParticles() {
  particles = particles.filter(p => p.life > 0);
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.shape === 'spark' ? 0.03 : 0.08;
    p.life -= p.decay;
  }
}
function drawParticles() {
  for (const p of particles) {
    const sx = p.x - camera.x;
    if (sx < -24 || sx > NATIVE_W + 24) continue;
    ctx.save();
    ctx.globalAlpha = p.twinkle ? p.life * (0.55 + Math.sin((p.x + p.y + Date.now() * 0.02)) * 0.45) : p.life;
    ctx.fillStyle = p.color;
    if (p.glow) { ctx.shadowColor = p.color; ctx.shadowBlur = p.glow; }
    if (p.shape === 'circle') {
      ctx.beginPath(); ctx.arc(sx, p.y, p.size * 0.5, 0, Math.PI * 2); ctx.fill();
    } else if (p.shape === 'spark') {
      ctx.fillRect(sx, p.y, p.size * 1.8, Math.max(1, p.size * 0.45));
    } else {
      ctx.fillRect(sx, p.y, p.size, p.size);
    }
    ctx.restore();
  }
}

function overlaps(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function spawnBullet(x, y, dir, opts = {}) {
  bullets.push({
    x, y,
    vx: (opts.speed || 7) * dir,
    vy: opts.vy || 0,
    damage: opts.damage || 8,
    size: opts.size || 5,
    life: opts.life || 60,
    enemy: !!opts.enemy,
    super: !!opts.super,
    color: opts.color || '#88ffff'
  });
}
function updateBullets() {
  bullets = bullets.filter(b => b.life > 0);
  for (const b of bullets) {
    b.x += b.vx;
    b.y += b.vy;
    b.life--;
    if (b.x < -40 || b.x > currentLevel.width + 60 || b.y < -50 || b.y > NATIVE_H + 50) b.life = 0;
  }
}
function drawBullets() {
  for (const b of bullets) {
    const sx = b.x - camera.x;
    if (sx < -30 || sx > NATIVE_W + 30) continue;
    ctx.save();
    ctx.fillStyle = b.color;
    if (b.super) {
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 8;
      ctx.fillRect(sx - b.size / 2, b.y - b.size / 2, b.size + 5, b.size + 2);
      ctx.fillStyle = '#fff7aa';
      ctx.fillRect(sx + b.size, b.y - 1, 3, 3);
    } else {
      ctx.fillRect(sx - b.size / 2, b.y - b.size / 2, b.size, b.size);
    }
    ctx.restore();
  }
}
