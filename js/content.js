const ENEMY_TYPES = {
  PLUSH_ZOMBIE: {
    w: 22, h: 24, hp: 20, speed: 0.8, color: '#8B4513', score: 50, damage: 10, shootRange: 0, chaseRange: 150,
    draw(e, sx, sy) {
      ctx.save(); ctx.translate(sx + 11, sy + 12);
      if (e.dir === -1) ctx.scale(-1, 1);
      ctx.fillStyle = '#8B4513';
      ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(0, -16, 8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(-8, -22, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(8, -22, 4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#f00'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-5,-18); ctx.lineTo(-2,-15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-2,-18); ctx.lineTo(-5,-15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(2,-18); ctx.lineTo(5,-15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(5,-18); ctx.lineTo(2,-15); ctx.stroke();
      const arm = Math.sin(e.frame * 0.3) * 20;
      ctx.fillStyle = '#8B4513';
      ctx.save(); ctx.rotate(arm * Math.PI / 180); ctx.fillRect(10,-4,12,5); ctx.restore();
      ctx.save(); ctx.rotate(-arm * Math.PI / 180); ctx.fillRect(-22,-4,12,5); ctx.restore();
      ctx.restore();
    }
  },
  DOLL_FLYING: {
    w: 18, h: 20, hp: 15, speed: 1.2, color: '#ff88cc', score: 70, damage: 12, shootRange: 180, chaseRange: 250, flying: true,
    draw(e, sx, sy) {
      ctx.save(); ctx.translate(sx + 9, sy + 10);
      if (e.dir === -1) ctx.scale(-1, 1);
      const fl = Math.sin(e.frame * 0.2) * 4;
      ctx.fillStyle = '#ff88cc';
      ctx.fillRect(-7, 2, 14, 10);
      ctx.beginPath(); ctx.moveTo(-9,12); ctx.lineTo(0,6); ctx.lineTo(9,12); ctx.fill();
      ctx.fillRect(-5, -4, 10, 8);
      ctx.fillStyle = '#ffe0cc';
      ctx.beginPath(); ctx.arc(0,-10,7,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#ff0066';
      ctx.beginPath(); ctx.moveTo(-8,-16); ctx.lineTo(0,-12); ctx.lineTo(-8,-8); ctx.fill();
      ctx.beginPath(); ctx.moveTo(8,-16); ctx.lineTo(0,-12); ctx.lineTo(8,-8); ctx.fill();
      ctx.fillStyle = '#ff0000';
      ctx.beginPath(); ctx.arc(-3,-11,2,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(3,-11,2,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.arc(-3,-11,1,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(3,-11,1,0,Math.PI*2); ctx.fill();
      ctx.globalAlpha = 0.3; ctx.fillStyle = '#ff88cc';
      ctx.beginPath(); ctx.ellipse(0, 14 + fl, 8, 3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
  },
  BEAR_ZOMBIE: {
    w: 32, h: 36, hp: 50, speed: 0.5, color: '#654321', score: 150, damage: 20, shootRange: 0, chaseRange: 200,
    draw(e, sx, sy) {
      ctx.save(); ctx.translate(sx + 16, sy + 18);
      if (e.dir === -1) ctx.scale(-1, 1);
      ctx.fillStyle = '#654321';
      ctx.beginPath(); ctx.arc(0, 2, 14, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(0, -16, 12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(-12,-22,6,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(12,-22,6,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#8B6543';
      ctx.beginPath(); ctx.arc(0,-12,5,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = '#f00'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-6,-18); ctx.lineTo(-3,-15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-3,-18); ctx.lineTo(-6,-15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(3,-18); ctx.lineTo(6,-15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(6,-18); ctx.lineTo(3,-15); ctx.stroke();
      ctx.fillStyle = '#654321';
      ctx.fillRect(-24,-4,12,8); ctx.fillRect(12,-4,12,8);
      ctx.restore();
    }
  },
  VOODOO_DOLL: {
    w: 20, h: 28, hp: 35, speed: 1.0, color: '#cc44cc', score: 120, damage: 14, shootRange: 200, chaseRange: 300,
    draw(e, sx, sy) {
      ctx.save(); ctx.translate(sx + 10, sy + 14);
      if (e.dir === -1) ctx.scale(-1, 1);
      ctx.fillStyle = '#cc44cc';
      ctx.fillRect(-6, 0, 12, 14);
      ctx.beginPath(); ctx.arc(0,-8,8,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = '#660066'; ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath(); ctx.moveTo(-6, i * 3); ctx.lineTo(6, i * 3); ctx.stroke();
      }
      ctx.fillStyle = '#220022';
      ctx.fillRect(-4,-11,3,3); ctx.fillRect(1,-11,3,3);
      ctx.fillStyle = '#ff8800';
      ctx.fillRect(-8,-4,4,2); ctx.fillRect(4,-4,4,2);
      ctx.restore();
    }
  },
  RED_DOLL: {
    w: 18, h: 22, hp: 60, speed: 1.0, color: '#ff2222', score: 200, damage: 18, shootRange: 0, chaseRange: 300, charger: true,
    draw(e, sx, sy) {
      ctx.save(); ctx.translate(sx + 9, sy + 11);
      if (e.dir === -1) ctx.scale(-1, 1);
      ctx.fillStyle = '#ff2222';
      ctx.fillRect(-7,-3,14,12);
      ctx.beginPath(); ctx.arc(0,-11,7,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#aa0000';
      ctx.fillRect(-5,-14,4,4); ctx.fillRect(1,-14,4,4);
      ctx.fillStyle = '#fff';
      ctx.fillRect(-4,-13,2,2); ctx.fillRect(2,-13,2,2);
      ctx.fillRect(-7,2,14,3);
      ctx.restore();
    }
  },
  ELECTRO_HAZARD: {
    w: 32, h: 8, hp: 999, speed: 0, color: '#22d3ee', score: 0, damage: 15, shootRange: 0, chaseRange: 0,
    draw(e, sx, sy) {
      ctx.fillStyle = '#22d3ee';
      ctx.fillRect(sx, sy, 32, 8);
      ctx.fillStyle = '#fff';
      if (Math.sin(e.frame * 0.5) > 0) ctx.fillRect(sx + 4, sy + 2, 24, 4);
    }
  },
  SIGNAL_WITCH: {
    w: 24, h: 36, hp: 53, speed: 1.15, color: '#7df9ff', score: 160, damage: 17, shootRange: 240, chaseRange: 270, flying: true,
    draw(e, sx, sy) {
      ctx.save(); ctx.translate(sx + 12, sy + 18);
      if (e.dir === -1) ctx.scale(-1, 1);
      const pulse = 0.5 + Math.sin(e.frame * 0.35) * 0.5;
      ctx.globalAlpha = 0.24 + pulse * 0.22;
      ctx.fillStyle = '#7df9ff';
      ctx.beginPath(); ctx.ellipse(0, 8, 14, 6, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#253746';
      ctx.fillRect(-7, -6, 14, 18);
      ctx.fillStyle = '#8af5ff';
      ctx.fillRect(-5, -20, 10, 8);
      ctx.fillStyle = '#dffcff';
      ctx.fillRect(-5, -17, 2, 2); ctx.fillRect(3, -17, 2, 2);
      ctx.fillStyle = '#22d3ee';
      ctx.fillRect(-10, -6, 3, 15); ctx.fillRect(7, -6, 3, 15);
      ctx.strokeStyle = '#66e6ff'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-10, -9); ctx.lineTo(-17, -24); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(10, -9); ctx.lineTo(17, -24); ctx.stroke();
      ctx.fillStyle = '#ff5ec4';
      ctx.fillRect(-2, 12, 4, 7);
      ctx.fillStyle = '#3b4a56';
      ctx.fillRect(-4, 18, 3, 8); ctx.fillRect(1, 18, 3, 8);
      ctx.restore();
    }
  },
  BROKEN_COMMUTER: {
    w: 20, h: 30, hp: 51, speed: 1.28, color: '#8aa6b8', score: 145, damage: 16, shootRange: 0, chaseRange: 260,
    draw(e, sx, sy) {
      ctx.save(); ctx.translate(sx + 10, sy + 15);
      if (e.dir === -1) ctx.scale(-1, 1);
      const sway = Math.sin(e.frame * 0.35) * 2;
      ctx.fillStyle = '#33414d';
      ctx.fillRect(-6, -1, 12, 16);
      ctx.fillStyle = '#b6c7d4';
      ctx.beginPath(); ctx.arc(0, -10, 8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#1a2630';
      ctx.fillRect(-3, -13, 2, 2); ctx.fillRect(1, -13, 2, 2);
      ctx.fillStyle = '#22d3ee';
      ctx.fillRect(-1, -7, 2, 4);
      ctx.fillStyle = '#556674';
      ctx.fillRect(-10, 2 + sway, 6, 4); ctx.fillRect(4, 1 - sway, 6, 4);
      ctx.fillRect(-5, 15, 4, 10); ctx.fillRect(1, 15, 4, 10);
      ctx.restore();
    }
  },
  RAIL_DRONE: {
    w: 18, h: 18, hp: 38, speed: 1.0, color: '#66ddff', score: 130, damage: 15, shootRange: 230, chaseRange: 250, flying: true,
    draw(e, sx, sy) {
      ctx.save(); ctx.translate(sx + 9, sy + 9);
      const spin = Math.sin(e.frame * 0.4) * 2;
      ctx.fillStyle = '#25313a';
      ctx.beginPath(); ctx.arc(0, 0, 9, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#7df9ff'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#d8fbff';
      ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#4cc9f0';
      ctx.beginPath(); ctx.moveTo(-12, -2 - spin); ctx.lineTo(-5, -1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(12, 2 + spin); ctx.lineTo(5, 1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-2 - spin, -12); ctx.lineTo(-1, -5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(2 + spin, 12); ctx.lineTo(1, 5); ctx.stroke();
      ctx.restore();
    }
  },
  SPARK_RAT: {
    w: 22, h: 24, hp: 38, speed: 1.9, color: '#9be7ff', score: 120, damage: 13, shootRange: 0, chaseRange: 210,
    draw(e, sx, sy) {
      ctx.save(); ctx.translate(sx + 11, sy + 12);
      if (e.dir === -1) ctx.scale(-1, 1);
      const crack = Math.sin(e.frame * 0.6) * 2;
      ctx.fillStyle = '#2f3d47';
      ctx.fillRect(-9, -4, 15, 11);
      ctx.fillStyle = '#9be7ff';
      ctx.fillRect(-4, -2, 5, 3);
      ctx.fillRect(4, -7, 7, 5);
      ctx.fillStyle = '#dffcff';
      ctx.fillRect(7, -5, 2, 2);
      ctx.strokeStyle = '#22d3ee'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-10, 3); ctx.lineTo(-15, -3 - crack); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-5, 6); ctx.lineTo(-12, 11 + crack); ctx.stroke();
      ctx.fillStyle = '#5a6c79';
      ctx.fillRect(-4, 7, 3, 9); ctx.fillRect(2, 7, 3, 9);
      ctx.restore();
    }
  },
  CANDLE_SKULL: {
    w: 20, h: 24, hp: 28, speed: 0.95, color: '#ffd166', score: 110, damage: 14, shootRange: 200, chaseRange: 230,
    draw(e, sx, sy) {
      ctx.save(); ctx.translate(sx + 10, sy + 12);
      if (e.dir === -1) ctx.scale(-1, 1);
      const flick = Math.sin(e.frame * 0.5) * 2;
      ctx.fillStyle = '#ece7da'; ctx.fillRect(-6, -2, 12, 12);
      ctx.fillStyle = '#000'; ctx.fillRect(-3, 1, 2, 2); ctx.fillRect(1, 1, 2, 2); ctx.fillRect(-1, 5, 2, 2);
      ctx.fillStyle = '#7a5a34'; ctx.fillRect(-4, 10, 8, 8);
      ctx.fillStyle = '#ffe7a8'; ctx.fillRect(-2, -8, 4, 6);
      ctx.fillStyle = '#ff9f1c'; ctx.fillRect(-2, -12 + flick, 4, 5);
      ctx.fillStyle = '#ffcf5a'; ctx.fillRect(-1, -14 + flick, 2, 3);
      ctx.restore();
    }
  }
};

function makeEnemy(type, x, y) {
  const t = ENEMY_TYPES[type];
  return { type, x, y, w: t.w, h: t.h, hp: t.hp, maxHp: t.hp, vx: 0, vy: 0, dir: -1, active: false, dead: false, fade: 0, shootCd: 30 + Math.random() * 40, frame: 0, frameTimer: 0 };
}

function buildLevel(i) {
  currentLevel = LEVELS[i];
  platforms = [];
  enemies = [];
  bullets = [];
  pickups = [];
  particles = [];
  boss = null;
  bossArenaLocked = false;
  bossDefeated = false;
  camera.x = 0;
  flashText = '';
  flashTimer = 0;
  score = 0;
  levelTimer = 0;
  checkpointX = 80;

  for (let x = 0; x < currentLevel.width; x += 32) {
    platforms.push({ x, y: GROUND_Y, w: 32, h: 40, color: '#3a2a1a' });
  }

  const addPlatform = (x, y, w, color = '#4a3a2a') => platforms.push({ x, y, w, h: 14, color });
  const addEnemy = (type, x, y) => enemies.push(makeEnemy(type, x, y));
  const groundY = type => GROUND_Y - ENEMY_TYPES[type].h;

  if (i === 0) {
    const fixedPlatforms = [
      [180, 256, 96], [380, 220, 72], [620, 240, 96], [900, 206, 80], [1160, 246, 96], [1400, 216, 72],
      [1660, 236, 96], [1920, 202, 80], [2200, 248, 96], [2480, 214, 72], [2760, 234, 96], [3020, 200, 80],
      [3300, 242, 96], [3560, 210, 72], [3840, 246, 96], [4100, 214, 72], [4380, 236, 96], [4640, 204, 80],
      [4920, 244, 96], [5180, 210, 72], [5460, 232, 96]
    ];
    for (const [x, y, w] of fixedPlatforms) addPlatform(x, y, w);
    hostages = [
      { x: 404, y: 220, type: 'muscular', reward: 'life', freed: false, deco: 'candle' },
      { x: 928, y: 206, type: 'whale', reward: 'ammo', freed: false, deco: 'crate' },
      { x: 1948, y: 202, type: 'muscular', reward: 'life', freed: false, deco: 'candle' },
      { x: 3048, y: 200, type: 'azure', reward: 'companion', freed: false, deco: 'altar' },
      { x: 3584, y: 210, type: 'whale', reward: 'glitter', freed: false, deco: 'crate' },
      { x: 5204, y: 210, type: 'muscular', reward: 'ammo', freed: false, deco: 'candle' }
    ];
    if (!player.hasAzure) azure.active = false;
    [
      ['PLUSH_ZOMBIE', 300, groundY('PLUSH_ZOMBIE')], ['DOLL_FLYING', 560, 162], ['VOODOO_DOLL', 860, groundY('VOODOO_DOLL')],
      ['PLUSH_ZOMBIE', 1200, groundY('PLUSH_ZOMBIE')], ['BEAR_ZOMBIE', 1540, groundY('BEAR_ZOMBIE')], ['DOLL_FLYING', 1860, 148],
      ['RED_DOLL', 2180, groundY('RED_DOLL')], ['VOODOO_DOLL', 2520, groundY('VOODOO_DOLL')], ['PLUSH_ZOMBIE', 2860, groundY('PLUSH_ZOMBIE')],
      ['DOLL_FLYING', 3180, 152], ['BEAR_ZOMBIE', 3440, groundY('BEAR_ZOMBIE')], ['PLUSH_ZOMBIE', 3920, groundY('PLUSH_ZOMBIE')],
      ['VOODOO_DOLL', 4260, groundY('VOODOO_DOLL')], ['DOLL_FLYING', 4580, 154], ['RED_DOLL', 4960, groundY('RED_DOLL')], ['BEAR_ZOMBIE', 5320, groundY('BEAR_ZOMBIE')]
    ].forEach(([t,x,y]) => addEnemy(t,x,y));
    pickups = [
      { type: 'heal', reward: 'life', x: 520, y: 186, taken: false },
      { type: 'super', reward: 'glitter', x: 1290, y: 184, taken: false },
      { type: 'heal', reward: 'life', x: 2060, y: 184, taken: false },
      { type: 'super', reward: 'ammo', x: 2940, y: 176, taken: false },
      { type: 'heal', reward: 'life', x: 3500, y: 178, taken: false },
      { type: 'super', reward: 'glitter', x: 4420, y: 182, taken: false },
      { type: 'heal', reward: 'life', x: 5250, y: 176, taken: false }
    ];
  } else if (i === 1) {
    const metroPlatforms = [
      [220, 268, 84], [430, 236, 72], [640, 252, 84], [840, 222, 70],
      [1060, 244, 92], [1240, 210, 64], [1450, 230, 76], [1660, 196, 86],
      [1890, 246, 96], [2100, 218, 74], [2320, 190, 82], [2520, 232, 96],
      [2740, 204, 64], [2960, 224, 84], [3170, 186, 76], [3380, 244, 96], [3600, 216, 74]
    ];
    for (const [x, y, w] of metroPlatforms) addPlatform(x, y, w, '#3f4858');
    // Add Electric Hazard traps
    for (let i = 0; i < 5; i++) {
        addEnemy('ELECTRO_HAZARD', 500 + i * 800, GROUND_Y - 8);
    }
    hostages = [
      { x: 670, y: 252, type: 'whale', reward: 'ammo', freed: false, deco: 'crate' },
      { x: 1691, y: 196, type: 'muscular', reward: 'life', freed: false, deco: 'candle' },
      { x: 3196, y: 186, type: 'whale', reward: 'glitter', freed: false, deco: 'crate' }
    ];
    azure.active = player.hasAzure;
    [
      ['BROKEN_COMMUTER', 310, groundY('BROKEN_COMMUTER')],
      ['RAIL_DRONE', 520, 198],
      ['RAIL_DRONE', 680, 186],
      ['SIGNAL_WITCH', 760, groundY('SIGNAL_WITCH')],
      ['SPARK_RAT', 980, groundY('SPARK_RAT')],
      ['SIGNAL_WITCH', 1160, 184],
      ['RAIL_DRONE', 1320, 154],
      ['BROKEN_COMMUTER', 1540, groundY('BROKEN_COMMUTER')],
      ['RAIL_DRONE', 1760, 194],
      ['BROKEN_COMMUTER', 1980, groundY('BROKEN_COMMUTER')],
      ['SIGNAL_WITCH', 2140, 188],
      ['SPARK_RAT', 2400, groundY('SPARK_RAT')],
      ['RAIL_DRONE', 2600, 172],
      ['SIGNAL_WITCH', 2780, 158],
      ['BROKEN_COMMUTER', 2860, groundY('BROKEN_COMMUTER')],
      ['RED_DOLL', 3080, groundY('RED_DOLL')],
      ['RAIL_DRONE', 3200, 182],
      ['SIGNAL_WITCH', 3340, groundY('SIGNAL_WITCH')],
      ['RAIL_DRONE', 3540, 148],
      ['SIGNAL_WITCH', 3640, 138],
      ['SPARK_RAT', 3720, groundY('SPARK_RAT')]
    ].forEach(([t,x,y]) => addEnemy(t,x,y));
    pickups = [
      { type: 'super', reward: 'glitter', x: 450, y: 200, taken: false },
      { type: 'heal', reward: 'life', x: 1080, y: 208, taken: false },
      { type: 'super', reward: 'ammo', x: 1700, y: 160, taken: false },
      { type: 'heal', reward: 'life', x: 2360, y: 156, taken: false },
      { type: 'super', reward: 'glitter', x: 3000, y: 170, taken: false },
      { type: 'heal', reward: 'life', x: 3460, y: 210, taken: false }
    ];
    enemies.forEach((e, idx) => {
      if (e.type === 'ELECTRO_HAZARD') return;
      e.h += 14;
      e.y -= 14;
      e.baseY = e.y;
      e.metroAggro = true;
      e.metroSpeed = 0.72 + (idx % 2) * 0.08;
      e.metroRange = 34 + (idx % 3) * 10;
      e.metroDir = idx % 2 === 0 ? -1 : 1;
      e.hoverAmp = 1.5 + (idx % 3) * 0.7;
      e.hoverSeed = idx * 0.85;
    });

  } else {
    const roofPlatforms = [
      [240, 258, 86], [420, 224, 64], [620, 192, 68], [860, 240, 80],
      [1070, 206, 72], [1290, 172, 64], [1510, 226, 84], [1760, 188, 70],
      [2010, 150, 66], [2250, 214, 80], [2490, 178, 64], [2720, 234, 86],
      [2980, 198, 70], [3240, 160, 64], [3500, 214, 82], [3760, 182, 68], [4010, 236, 90]
    ];
    for (const [x, y, w] of roofPlatforms) addPlatform(x, y, w, '#5b4332');
    hostages = [
      { x: 642, y: 192, type: 'muscular', reward: 'life', freed: false, deco: 'candle' },
      { x: 2031, y: 150, type: 'whale', reward: 'ammo', freed: false, deco: 'crate' },
      { x: 3260, y: 160, type: 'muscular', reward: 'glitter', freed: false, deco: 'candle' }
    ];
    azure.active = player.hasAzure;
    [
      ['DOLL_FLYING', 360, 176],
      ['CANDLE_SKULL', 540, groundY('CANDLE_SKULL')],
      ['VOODOO_DOLL', 900, groundY('VOODOO_DOLL')],
      ['DOLL_FLYING', 1180, 142],
      ['RED_DOLL', 1440, groundY('RED_DOLL')],
      ['CANDLE_SKULL', 1670, groundY('CANDLE_SKULL')],
      ['DOLL_FLYING', 1880, 132],
      ['BEAR_ZOMBIE', 2320, groundY('BEAR_ZOMBIE')],
      ['VOODOO_DOLL', 2560, groundY('VOODOO_DOLL')],
      ['DOLL_FLYING', 2820, 148],
      ['RED_DOLL', 3060, groundY('RED_DOLL')],
      ['CANDLE_SKULL', 3320, groundY('CANDLE_SKULL')],
      ['DOLL_FLYING', 3560, 138],
      ['VOODOO_DOLL', 3820, groundY('VOODOO_DOLL')],
      ['DOLL_FLYING', 4080, 130]
    ].forEach(([t,x,y]) => addEnemy(t,x,y));
    pickups = [
      { type: 'super', reward: 'glitter', x: 438, y: 188, taken: false },
      { type: 'heal', reward: 'life', x: 1110, y: 172, taken: false },
      { type: 'super', reward: 'ammo', x: 1780, y: 154, taken: false },
      { type: 'heal', reward: 'life', x: 2508, y: 140, taken: false },
      { type: 'super', reward: 'glitter', x: 3260, y: 124, taken: false },
      { type: 'heal', reward: 'life', x: 4040, y: 192, taken: false }
    ];
  }

  resetPlayer(true);
  if (player.hasAzure) {
    azure.active = true;
    azure.x = Math.max(0, player.x - 34);
    azure.y = GROUND_Y - azure.h;
    azure.prevY = azure.y;
    azure.vx = 0;
    azure.vy = 0;
    azure.onGround = true;
  }
}

function startLevel(i) {
  resetTransientRuntime();
  campaignCleared = false;
  const freshRun = gameState === STATE.TITLE || gameState === STATE.GAMEOVER;
  if (freshRun && i === 0) { specialWeaponUnlocked = false; specialWeaponType = null; player.hasAzure = false; azure.active = false; }
  else if (player.hasAzure) { azure.active = true; }
  initAudio();
  startBGMusic();
  levelIndex = i;
  buildLevel(i);
  player.stageKills = 0;
  player.stageHostages = 0;
  player.shotsFired = 0;
  introTimer = 110;
  gameState = STATE.INTRO;
}

function spawnBoss() {
  if (boss) return;
  bossArenaLocked = true;
  checkpointX = currentLevel.bossTrigger - 140;
  flashText = currentLevel.bossName;
  flashTimer = 130;
  if (levelIndex === 0) {
    boss = {
      kind: 'drakoptero', x: 5960, y: 96, w: 156, h: 104, hp: 760, maxHp: 760,
      phase: 1, active: true, dead: false, vx: 1.8, vy: 0, dir: -1,
      attackTimer: 0, attackType: 0, frame: 0, frameTimer: 0,
      rotorAngle: 0, deathTimer: 0, rewardDropped: false, enragedFlash: 0, dashTimer: 0
    };
    bossIntroTimer = 150;
    startBossMusic();
  }
  if (levelIndex === 1) {
    boss = {
      kind: 'metro_titan', x: currentLevel.width - 196, y: GROUND_Y - 118, w: 92, h: 118,
      hp: 920, maxHp: 920, cooldown: 34, phase: 1, vy: 0, vx: 0, dir: -1,
      attackTimer: 76, attackType: 0, dashTimer: 0, jumpCd: 72, onGround: true, enragedFlash: 0, rewardDropped: false
    };
    flashText = 'METRO TITAN';
    flashTimer = 110;
    bossIntroTimer = 150;
    startBossMusic();
  }
  if (levelIndex === 2) {
    boss = { kind: 'heli', x: currentLevel.width - 180, y: 150, w: 114, h: 44, hp: 340, maxHp: 340, cooldown: 38, phase: 1, t: 0 };
    sfxCheckpoint();
  }
}
