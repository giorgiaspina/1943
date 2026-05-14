function drawBackground() {
  const g = ctx.createLinearGradient(0, 0, 0, NATIVE_H);
  g.addColorStop(0, currentLevel.skyA);
  g.addColorStop(0.58, currentLevel.skyB);
  g.addColorStop(1, currentLevel.skyC);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

  if (levelIndex === 1) {
    const metro = ctx.createLinearGradient(0, 0, 0, NATIVE_H);
    metro.addColorStop(0, '#0c1721');
    metro.addColorStop(0.52, '#142938');
    metro.addColorStop(1, '#0d151c');
    ctx.fillStyle = metro;
    ctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

    const ceiling = ctx.createLinearGradient(0, 0, 0, 52);
    ceiling.addColorStop(0, 'rgba(8,14,20,0.95)');
    ceiling.addColorStop(1, 'rgba(14,24,32,0.35)');
    ctx.fillStyle = ceiling;
    ctx.fillRect(0, 0, NATIVE_W, 52);

    ctx.fillStyle = 'rgba(20,30,38,0.82)';
    ctx.fillRect(0, 52, NATIVE_W, 106);

    ctx.strokeStyle = 'rgba(190,208,220,0.10)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      const offset = (camera.x * 0.02 + i * 132) % (NATIVE_W + 220) - 110;
      ctx.beginPath();
      ctx.ellipse(offset + 118, 138, 210, 72, 0, Math.PI, Math.PI * 2);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const offset = (camera.x * 0.02 + i * 132) % (NATIVE_W + 220) - 110;
      ctx.beginPath();
      ctx.ellipse(offset + 118, 138, 170, 44, 0, Math.PI, Math.PI * 2);
      ctx.stroke();
    }

    for (let i = 0; i < 5; i++) {
      const x = (i * 150 - camera.x * 0.03) % (NATIVE_W + 160) - 80;
      ctx.fillStyle = 'rgba(228,236,242,0.10)';
      ctx.fillRect(x, 86, 86, 6);
      ctx.fillStyle = 'rgba(86,190,232,0.10)';
      ctx.fillRect(x + 10, 90, 66, 2);
    }

    ctx.fillStyle = 'rgba(42,54,64,0.78)';
    ctx.fillRect(0, 158, NATIVE_W, 24);
    ctx.fillStyle = 'rgba(150,164,176,0.14)';
    ctx.fillRect(0, 162, NATIVE_W, 1);
    ctx.fillStyle = 'rgba(112,126,138,0.18)';
    for (let x = -(camera.x * 0.08) % 72; x < NATIVE_W + 72; x += 72) {
      ctx.fillRect(x, 170, 44, 4);
    }

    ctx.fillStyle = 'rgba(26,36,44,0.97)';
    ctx.fillRect(0, 184, NATIVE_W, 20);
    ctx.fillStyle = 'rgba(214,224,232,0.18)';
    ctx.fillRect(0, 188, NATIVE_W, 2);
    ctx.fillStyle = 'rgba(72,188,226,0.10)';
    ctx.fillRect(0, 191, NATIVE_W, 1);
    ctx.fillStyle = 'rgba(255,214,128,0.12)';
    ctx.fillRect(0, 194, NATIVE_W, 2);

    ctx.fillStyle = '#0f1c28';
    ctx.fillRect(0, GROUND_Y - 8, NATIVE_W, 12);
    ctx.fillStyle = '#182a38';
    ctx.fillRect(0, GROUND_Y + 4, NATIVE_W, NATIVE_H - GROUND_Y);

    for (let x = -(camera.x * 0.82) % 84; x < NATIVE_W + 84; x += 84) {
      ctx.fillStyle = '#243745';
      ctx.fillRect(x, GROUND_Y + 6, 84, 8);
      ctx.fillStyle = '#63c6e6';
      ctx.fillRect(x + 10, GROUND_Y + 8, 16, 2);
      ctx.fillRect(x + 58, GROUND_Y + 8, 16, 2);
    }
  } else if (levelIndex === 2) {
    for (let i = 0; i < 34; i++) {
      const x = (i * 97) % NATIVE_W;
      const y = (i * 53) % 150;
      const a = 0.35 + Math.sin(Date.now() * 0.003 + i) * 0.2;
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fillRect(x, y, 2, 2);
    }
    ctx.fillStyle = 'rgba(18,34,22,0.35)';
    for (let i = 0; i < 14; i++) {
      const x = (i * 240 - camera.x * 0.18) % (NATIVE_W + 180) - 90;
      const h = 86 + (i % 3) * 22;
      ctx.beginPath();
      ctx.moveTo(x, GROUND_Y); ctx.lineTo(x + 48, GROUND_Y - h); ctx.lineTo(x + 96, GROUND_Y); ctx.fill();
    }
    ctx.fillStyle = 'rgba(22,10,8,0.35)';
    for (let i = 0; i < 18; i++) {
      const x = (i * 220 - camera.x * 0.52) % (NATIVE_W + 180) - 90;
      const h = 30 + (i % 4) * 12;
      ctx.fillRect(x, GROUND_Y - h, 8, h);
      ctx.beginPath();
      ctx.moveTo(x + 4, GROUND_Y - h);
      ctx.lineTo(x - 18, GROUND_Y - h + 16);
      ctx.lineTo(x + 26, GROUND_Y - h + 16);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + 4, GROUND_Y - h - 12);
      ctx.lineTo(x - 14, GROUND_Y - h + 4);
      ctx.lineTo(x + 22, GROUND_Y - h + 4);
      ctx.fill();
    }
    ctx.fillStyle = '#1a0d00';
    ctx.fillRect(0, GROUND_Y, NATIVE_W, NATIVE_H - GROUND_Y);
    for (let x = -(camera.x * 0.8) % 32; x < NATIVE_W + 32; x += 32) {
      ctx.fillStyle = '#2d1a0f'; ctx.fillRect(x, GROUND_Y, 30, 40);
      ctx.fillStyle = '#3c2415'; ctx.fillRect(x + 2, GROUND_Y + 2, 26, 8);
    }
  } else {
    const moonX = 520 - camera.x * 0.05;
    ctx.save();
    ctx.fillStyle = '#ffffcc';
    ctx.shadowColor = '#ffffcc';
    ctx.shadowBlur = 20;
    ctx.beginPath(); ctx.arc(moonX, 60, 26, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    for (let i = 0; i < 36; i++) {
      const x = (i * 97) % NATIVE_W;
      const y = (i * 53) % 150;
      const a = 0.35 + Math.sin(Date.now() * 0.003 + i) * 0.2;
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fillRect(x, y, 2, 2);
    }

    ctx.fillStyle = 'rgba(24,6,42,0.42)';
    for (let i = 0; i < 22; i++) {
      const x = (i * 190 - camera.x * 0.1) % (NATIVE_W + 160) - 80;
      const y = 58 + (i % 5) * 12 + Math.sin(Date.now() * 0.0015 + i) * 3;
      ctx.beginPath();
      ctx.ellipse(x, y, 34 + (i % 3) * 10, 12 + (i % 2) * 3, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(18,0,36,0.76)';
    for (let i = 0; i < 16; i++) {
      const x = (i * 340 - camera.x * 0.18) % (NATIVE_W + 220) - 120;
      const h = 72 + (i % 3) * 22;
      ctx.fillRect(x, GROUND_Y - h, 40, h);
      ctx.beginPath(); ctx.moveTo(x - 8, GROUND_Y - h); ctx.lineTo(x + 20, GROUND_Y - h - 22); ctx.lineTo(x + 46, GROUND_Y - h); ctx.fill();
      ctx.fillRect(x + 8, GROUND_Y - h - 16, 4, 14);
      ctx.beginPath(); ctx.moveTo(x + 10, GROUND_Y - h - 16); ctx.lineTo(x + 4, GROUND_Y - h - 8); ctx.lineTo(x + 16, GROUND_Y - h - 8); ctx.fill();
    }

    ctx.fillStyle = 'rgba(22,10,8,0.35)';
    for (let i = 0; i < 18; i++) {
      const x = (i * 220 - camera.x * 0.52) % (NATIVE_W + 180) - 90;
      const h = 30 + (i % 4) * 12;
      ctx.fillRect(x, GROUND_Y - h, 8, h);
      ctx.beginPath();
      ctx.moveTo(x + 4, GROUND_Y - h);
      ctx.lineTo(x - 18, GROUND_Y - h + 16);
      ctx.lineTo(x + 26, GROUND_Y - h + 16);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + 4, GROUND_Y - h - 12);
      ctx.lineTo(x - 14, GROUND_Y - h + 4);
      ctx.lineTo(x + 22, GROUND_Y - h + 4);
      ctx.fill();
    }

    ctx.fillStyle = '#1a0d00';
    ctx.fillRect(0, GROUND_Y, NATIVE_W, NATIVE_H - GROUND_Y);
    for (let x = -(camera.x * 0.8) % 32; x < NATIVE_W + 32; x += 32) {
      ctx.fillStyle = '#2d1a0f'; ctx.fillRect(x, GROUND_Y, 30, 40);
      ctx.fillStyle = '#3c2415'; ctx.fillRect(x + 2, GROUND_Y + 2, 26, 8);
    }
    ctx.fillStyle = '#444';
    for (let i = 0; i < 12; i++) {
      const gx = (i * 160 - camera.x * 0.86) % (NATIVE_W + 80) - 20;
      ctx.fillRect(gx, GROUND_Y - 26, 16, 22);
      ctx.beginPath(); ctx.arc(gx + 8, GROUND_Y - 26, 8, Math.PI, 0); ctx.fill();
    }
  }

  if (!bossArenaLocked || boss) {
    const gateX = currentLevel.bossTrigger - camera.x;
    ctx.fillStyle = levelIndex === 1 ? '#66d9ff' : '#ffd700';
    ctx.fillRect(gateX, 238, 6, 82);
    ctx.fillRect(gateX + 6, 238, 24, 12);
  }
}



function drawForegroundProps() {
  if (levelIndex !== 1) return;
}

function drawPlatforms() {
  if (levelIndex === 1) {
    ctx.fillStyle = '#101922';
    for (let x = -(camera.x * 0.95) % 96; x < NATIVE_W + 96; x += 96) {
      ctx.fillRect(x, GROUND_Y + 2, 96, 6);
      ctx.fillStyle = '#24313b';
      ctx.fillRect(x + 8, GROUND_Y + 8, 80, 4);
      ctx.fillStyle = '#101922';
    }

    ctx.fillStyle = '#2d3942';
    for (let i = 0; i < 14; i++) {
      const x = (i * 180 - camera.x * 0.18) % (NATIVE_W + 200) - 100;
      ctx.fillRect(x, GROUND_Y - 16, 120, 16);
      ctx.fillStyle = '#4a5660';
      ctx.fillRect(x, GROUND_Y - 18, 120, 3);
      ctx.fillStyle = '#2d3942';
      ctx.fillRect(x + 12, GROUND_Y - 28, 18, 10);
      ctx.fillRect(x + 90, GROUND_Y - 28, 18, 10);
      ctx.fillStyle = '#67d6ff';
      ctx.fillRect(x + 18, GROUND_Y - 10, 14, 2);
      ctx.fillRect(x + 42, GROUND_Y - 10, 14, 2);
      ctx.fillRect(x + 66, GROUND_Y - 10, 14, 2);
      ctx.fillStyle = '#2d3942';
    }

    ctx.fillStyle = 'rgba(208, 228, 244, 0.98)';
    for (const p of platforms) {
      const sx = p.x - camera.x;
      if (sx + p.w < -40 || sx > NATIVE_W + 40) continue;
      if (p.y >= GROUND_Y) continue;
      ctx.fillStyle = 'rgba(208, 228, 244, 0.98)';
      ctx.fillRect(sx, p.y, p.w, p.h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(sx, p.y, p.w, 3);
      ctx.fillStyle = '#7ddfff';
      ctx.fillRect(sx, p.y + p.h - 2, p.w, 2);
      ctx.strokeStyle = 'rgba(40, 78, 110, 0.9)';
      ctx.lineWidth = 1;
      ctx.strokeRect(sx + 0.5, p.y + 0.5, p.w - 1, p.h - 1);
      if (p.w >= 72) {
        ctx.fillStyle = 'rgba(110, 214, 255, 0.95)';
        ctx.fillRect(sx + 6, p.y - 12, p.w - 12, 12);
        ctx.fillStyle = '#eafcff';
        ctx.fillRect(sx + 10, p.y - 8, p.w - 20, 3);
        ctx.strokeStyle = 'rgba(40, 78, 110, 0.8)';
        ctx.strokeRect(sx + 6.5, p.y - 11.5, p.w - 13, 11);
      }
    }

  } else {
    for (const p of platforms) {
      const sx = p.x - camera.x;
      if (sx + p.w < 0 || sx > NATIVE_W) continue;
      ctx.fillStyle = p.color;
      ctx.fillRect(sx, p.y, p.w, p.h);
      ctx.fillStyle = '#6a4a2a';
      ctx.fillRect(sx, p.y, p.w, 4);
    }
  }
}

function drawPlayer() {
  if (player.respawning > 0) return;
  if (player.inv > 0 && Math.floor(player.inv / 6) % 2 === 0) return;
  const sx = Math.round(player.x - camera.x);
  const sy = Math.round(player.y);
  const bob = player.onGround ? Math.sin(player.frame * Math.PI / 2) : 0;
  ctx.save();
  ctx.translate(sx + player.w / 2, sy + player.h / 2 + bob);
  if (player.dir === -1) ctx.scale(-1, 1);
  const leg = player.onGround ? Math.sin(player.frame * Math.PI / 2) * 3 : 0;
  ctx.fillStyle = '#1a1a6e'; ctx.fillRect(-5, 8, 8, 12 + leg); ctx.fillRect(1, 8, 8, 12 - leg);
  ctx.fillStyle = '#ff3366'; ctx.fillRect(-6, 18 + leg, 9, 5); ctx.fillRect(0, 18 - leg, 9, 5);
  ctx.fillStyle = '#1a1a6e'; ctx.fillRect(-8, 2, 16, 10);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(-8, 2, 16, 4);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(-7, -8, 14, 14);
  ctx.fillStyle = '#1a1a6e'; ctx.fillRect(-3, -8, 6, 6);
  ctx.fillStyle = '#ff69b4'; ctx.fillRect(-4, -6, 8, 5);
  ctx.fillStyle = '#ffccaa'; ctx.fillRect(-6, -20, 12, 13);
  ctx.fillStyle = '#000'; ctx.fillRect(-4, -17, 3, 3); ctx.fillRect(1, -17, 3, 3);
  ctx.fillStyle = '#fff'; ctx.fillRect(-3, -17, 1, 1); ctx.fillRect(2, -17, 1, 1);
  ctx.fillStyle = '#ff6699'; ctx.fillRect(-2, -12, 4, 2);
  ctx.fillStyle = '#ff69b4'; ctx.beginPath(); ctx.arc(-5, -22, 5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(5, -22, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillRect(-9, -20, 4, 32); ctx.fillRect(5, -20, 4, 30);
  ctx.fillStyle = '#ffd700'; ctx.fillRect(-5, -20, 10, 2);
  ctx.fillStyle = '#ff0000'; ctx.fillRect(-1, -22, 2, 3);
  if (Keys.Space || Keys.KeyJ) { ctx.fillStyle = '#ffccaa'; ctx.fillRect(5, -6, 10, 4); ctx.fillStyle = '#888'; ctx.fillRect(13, -8, 6, 6); }
  ctx.restore();
}

function drawEnemies() {
  for (const e of enemies) {
    if (!e.dead && levelIndex === 1 && e.metroAggro) {
      const dx = player.x - e.x;
      if (Math.abs(dx) < 220) {
        e.metroDir = dx < 0 ? -1 : 1;
      }
      e.x += e.metroSpeed * e.metroDir;
      if (e.spawnX == null) e.spawnX = e.x;
      if (e.x < e.spawnX - e.metroRange) {
        e.x = e.spawnX - e.metroRange;
        e.metroDir = 1;
      }
      if (e.x > e.spawnX + e.metroRange) {
        e.x = e.spawnX + e.metroRange;
        e.metroDir = -1;
      }
      e.y = e.baseY + Math.sin(Date.now() * 0.004 + (e.hoverSeed || 0)) * (e.hoverAmp || 0);
    }
    const sx = e.x - camera.x;
    if (sx < -70 || sx > NATIVE_W + 70) continue;
    if (e.dead) {
      ctx.save(); ctx.globalAlpha = e.fade / 24; ENEMY_TYPES[e.type].draw(e, sx, e.y); ctx.restore();
    } else {
      ENEMY_TYPES[e.type].draw(e, sx, e.y);
      const hpFrac = e.hp / e.maxHp;
      ctx.fillStyle = '#333'; ctx.fillRect(sx, e.y - 6, e.w, 3);
      ctx.fillStyle = hpFrac > 0.5 ? '#44ff44' : hpFrac > 0.25 ? '#ffaa00' : '#ff2222';
      ctx.fillRect(sx, e.y - 6, e.w * hpFrac, 3);
    }
  }
}

function drawBoss() {
  if (!boss) return;
  const sx = boss.x - camera.x;
  const sy = boss.y;

  if (boss.kind === 'drakoptero') {
    if (!boss.active || (boss.dead && boss.deathTimer <= 0)) return;
    ctx.save();
    if (boss.dead) ctx.globalAlpha = boss.deathTimer / 180;
    if (boss.phase >= 2) { ctx.shadowColor = boss.phase === 3 ? '#ff2200' : '#ff4400'; ctx.shadowBlur = boss.phase === 3 ? 22 : 14; }

    const bodyMain = boss.phase === 3 ? '#c51f00' : boss.phase === 2 ? '#cc2200' : '#2d6b2d';
    const bodyDark = boss.phase === 3 ? '#7a0900' : boss.phase === 2 ? '#8f1400' : '#1d5b1d';
    const wing = boss.phase === 3 ? '#661100' : boss.phase === 2 ? '#882200' : '#1a4d1a';
    const belly = boss.phase >= 2 ? '#ff8a3b' : '#6da64b';

    ctx.fillStyle = bodyMain;
    ctx.fillRect(sx + 30, sy + 24, 86, 52);
    ctx.fillStyle = belly;
    ctx.fillRect(sx + 42, sy + 52, 52, 18);

    ctx.fillStyle = bodyDark;
    for (let i = 0; i < 4; i++) ctx.fillRect(sx + 44 + i * 14, sy + 18 - (i % 2) * 4, 8, 8);

    ctx.beginPath();
    ctx.fillStyle = bodyMain;
    ctx.moveTo(sx + 112, sy + 42);
    ctx.lineTo(sx + 152, sy + 26);
    ctx.lineTo(sx + 146, sy + 44);
    ctx.lineTo(sx + 154, sy + 60);
    ctx.lineTo(sx + 118, sy + 56);
    ctx.fill();

    ctx.fillStyle = bodyDark;
    ctx.fillRect(sx + 2, sy + 34, 34, 28);
    ctx.fillRect(sx - 12, sy + 46, 18, 10);
    ctx.fillStyle = bodyMain;
    ctx.fillRect(sx + 8, sy + 28, 18, 14);

    ctx.fillStyle = '#ff0000';
    ctx.beginPath(); ctx.arc(sx + 14, sy + 40, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffff99';
    ctx.beginPath(); ctx.arc(sx + 14, sy + 40, 2.5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ddd';
    ctx.fillRect(sx - 10, sy + 54, 8, 2);
    ctx.fillRect(sx - 6, sy + 50, 6, 2);

    const wingFlap = Math.sin(boss.frame * 0.55) * 16;
    ctx.fillStyle = wing;
    ctx.beginPath();
    ctx.moveTo(sx + 52, sy + 24);
    ctx.lineTo(sx + 14, sy - 34 + wingFlap);
    ctx.lineTo(sx + 70, sy + 22);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(sx + 76, sy + 22);
    ctx.lineTo(sx + 110, sy - 26 + wingFlap * 0.9);
    ctx.lineTo(sx + 104, sy + 26);
    ctx.fill();

    ctx.fillStyle = '#888';
    ctx.fillRect(sx + 66, sy + 14, 12, 8);
    ctx.save();
    ctx.translate(sx + 72, sy + 18);
    ctx.rotate(boss.rotorAngle);
    ctx.fillStyle = '#bbb';
    ctx.fillRect(-42, -3, 84, 6);
    ctx.fillRect(-3, -42, 6, 84);
    ctx.fillStyle = '#999';
    ctx.fillRect(-28, -2, 56, 4);
    ctx.fillRect(-2, -28, 4, 56);
    ctx.restore();

    ctx.fillStyle = bodyDark;
    ctx.fillRect(sx + 42, sy + 74, 12, 18);
    ctx.fillRect(sx + 84, sy + 74, 12, 18);
    ctx.fillStyle = '#ddd';
    ctx.fillRect(sx + 44, sy + 90, 3, 6);
    ctx.fillRect(sx + 50, sy + 90, 3, 6);
    ctx.fillRect(sx + 86, sy + 90, 3, 6);
    ctx.fillRect(sx + 92, sy + 90, 3, 6);

    if (boss.phase >= 2) {
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = `rgba(255,${110 + Math.random() * 100},0,0.7)`;
        ctx.fillRect(sx + 36 + i * 14, sy + 76, 10, 10 + Math.random() * 10);
      }
    }

    if (boss.enragedFlash > 0) {
      ctx.save();
      ctx.globalAlpha = boss.enragedFlash / 45;
      ctx.strokeStyle = '#ffd166';
      ctx.lineWidth = 3;
      ctx.strokeRect(sx - 10, sy - 14, boss.w + 20, boss.h + 24);
      ctx.restore();
    }
    ctx.restore();

    if (!boss.dead) {
      const barW = 320, barH = 16;
      const bx = (NATIVE_W - barW) / 2, by = NATIVE_H - 32;
      ctx.fillStyle = '#111'; ctx.fillRect(bx - 3, by - 3, barW + 6, barH + 6);
      ctx.fillStyle = '#2b1111'; ctx.fillRect(bx, by, barW, barH);
      const frac = boss.hp / boss.maxHp;
      const barColor = frac > 0.55 ? '#ff4444' : frac > 0.25 ? '#ff8800' : '#ff2200';
      ctx.fillStyle = barColor; ctx.fillRect(bx, by, barW * frac, barH);
      ctx.fillStyle = '#ffd166'; ctx.fillRect(bx, by, 5, barH);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 10px monospace'; ctx.fillText(`DRAKOPTERO  FASE ${boss.phase}`, bx + 86, by - 4);
    }
    return;
  }

  if (boss.kind === 'metro_titan') {
    if (!boss.dead) {
      const barW = 320, barH = 16;
      const bx = (NATIVE_W - barW) / 2, by = NATIVE_H - 32;
      ctx.fillStyle = '#081018'; ctx.fillRect(bx - 3, by - 3, barW + 6, barH + 6);
      ctx.fillStyle = '#141f29'; ctx.fillRect(bx, by, barW, barH);
      const frac = boss.hp / boss.maxHp;
      const barColor = boss.phase === 1 ? '#22d3ee' : boss.phase === 2 ? '#4cc9f0' : '#ff5ec4';
      ctx.fillStyle = barColor; ctx.fillRect(bx, by, barW * frac, barH);
      ctx.fillStyle = '#dffcff'; ctx.fillRect(bx, by, 5, barH);
      ctx.strokeStyle = '#7df9ff'; ctx.strokeRect(bx, by, barW, barH);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 10px monospace'; ctx.fillText(`METRO TITAN  FASE ${boss.phase}`, bx + 82, by - 4);
    }
    ctx.save();
    if (boss.enragedFlash > 0) {
      ctx.shadowColor = boss.phase === 3 ? '#ff5ec4' : '#22d3ee';
      ctx.shadowBlur = boss.phase === 3 ? 20 : 12;
    }
    const shell = boss.phase === 3 ? '#4b1f44' : boss.phase === 2 ? '#243746' : '#2f3f4b';
    const plating = boss.phase === 3 ? '#7a2d74' : boss.phase === 2 ? '#4cc9f0' : '#7df9ff';
    const trim = boss.phase === 3 ? '#ff5ec4' : '#22d3ee';
    const warning = boss.phase === 3 ? '#ffd166' : '#ff5ec4';

    ctx.fillStyle = shell;
    ctx.fillRect(sx + 18, sy + 8, 50, 24);
    ctx.fillRect(sx + 8, sy + 30, 72, 46);
    ctx.fillRect(sx + 0, sy + 40, 14, 18);
    ctx.fillRect(sx + 78, sy + 40, 14, 18);
    ctx.fillRect(sx + 20, sy + 76, 16, 34);
    ctx.fillRect(sx + 56, sy + 76, 16, 34);

    ctx.fillStyle = plating;
    ctx.fillRect(sx + 22, sy + 12, 42, 14);
    ctx.fillRect(sx + 14, sy + 36, 60, 18);
    ctx.fillRect(sx + 16, sy + 58, 56, 12);
    ctx.fillRect(sx + 24, sy + 80, 8, 24);
    ctx.fillRect(sx + 60, sy + 80, 8, 24);

    ctx.fillStyle = '#111a22';
    ctx.fillRect(sx + 28, sy + 16, 28, 8);
    ctx.fillRect(sx + 28, sy + 40, 24, 10);
    ctx.fillRect(sx + 18, sy + 64, 52, 4);

    ctx.fillStyle = trim;
    ctx.fillRect(sx + 30, sy + 18, 10, 4);
    ctx.fillRect(sx + 44, sy + 18, 10, 4);
    ctx.fillRect(sx + 18, sy + 42, 6, 8);
    ctx.fillRect(sx + 68, sy + 42, 6, 8);
    ctx.fillRect(sx + 12, sy + 34, 62, 2);
    ctx.fillRect(sx + 12, sy + 72, 62, 2);

    ctx.fillStyle = warning;
    ctx.fillRect(sx + 36, sy + 56, 20, 6);
    ctx.fillRect(sx + 4, sy + 44, 6, 10);
    ctx.fillRect(sx + 82, sy + 44, 6, 10);

    ctx.strokeStyle = '#5c6f7c'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(sx + 16, sy + 86); ctx.lineTo(sx + 8, sy + 112); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sx + 76, sy + 86); ctx.lineTo(sx + 84, sy + 112); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sx + 26, sy + 12); ctx.lineTo(sx + 18, sy - 6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sx + 64, sy + 12); ctx.lineTo(sx + 72, sy - 6); ctx.stroke();

    ctx.fillStyle = '#dffcff';
    ctx.fillRect(sx + 34, sy + 18, 4, 4); ctx.fillRect(sx + 50, sy + 18, 4, 4);
    ctx.fillStyle = trim;
    ctx.fillRect(sx + 42, sy + 20, 4, 5);

    if (boss.phase >= 2) {
      ctx.fillStyle = '#22d3ee';
      ctx.fillRect(sx + 10, sy + 90, 10, 6);
      ctx.fillRect(sx + 72, sy + 90, 10, 6);
    }
    if (boss.phase === 3) {
      ctx.fillStyle = '#ff5ec4';
      ctx.fillRect(sx + 24, sy + 0, 8, 8);
      ctx.fillRect(sx + 60, sy + 0, 8, 8);
      ctx.fillRect(sx + 38, sy + 52, 16, 10);
    }
    ctx.restore();
  }
  if (boss.kind === 'heli') {
    ctx.fillStyle = '#ffe27a'; ctx.fillRect(sx + 18, sy + 16, 72, 24); ctx.fillRect(sx + 86, sy + 22, 28, 8); ctx.fillRect(sx + 40, sy, 12, 16); ctx.fillRect(sx, sy + 10, 108, 4);
    if (boss.phase >= 2) { ctx.fillStyle = '#ffcc44'; ctx.fillRect(sx + 8, sy + 18, 10, 10); }
  }
}

function drawPickups() {
  for (const p of pickups) {
    if (p.taken) continue;
    const sx = p.x - camera.x;
    if (sx < -24 || sx > NATIVE_W + 24) continue;
    const bob = Math.sin(Date.now() * 0.003 + p.x) * 2.5;
    const key = rewardIconKey(p);
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.beginPath(); ctx.ellipse(sx + 6, p.y + 14, 11, 4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    drawRewardIcon(key, sx + 6, p.y + bob + 1, p.type === 'flamethrower' ? 1.15 : 1.0, 0.98);
  }
}

function rewardIconKey(entity) {
  if (entity.reward) return entity.reward;
  if (entity.type === 'heal') return 'life';
  if (entity.type === 'super') return 'glitter';
  if (entity.type === 'flamethrower') return 'ability';
  if (entity.type === 'tesla_lash') return 'tesla';
  return 'glitter';
}

function drawRewardIcon(kind, x, y, scale = 1, alpha = 1) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(scale, scale);
  ctx.globalAlpha = alpha;

  if (kind === 'life') {
    ctx.fillStyle = '#7a1026';
    ctx.fillRect(-6, -4, 12, 10);
    ctx.fillStyle = '#ff5c7c';
    ctx.fillRect(-5, -5, 4, 3); ctx.fillRect(1, -5, 4, 3);
    ctx.fillRect(-6, -2, 12, 6); ctx.fillRect(-4, 4, 8, 3);
  } else if (kind === 'glitter') {
    ctx.fillStyle = '#123f5c';
    ctx.fillRect(-6, -6, 12, 12);
    ctx.fillStyle = '#7de6ff';
    ctx.fillRect(-1, -6, 2, 12); ctx.fillRect(-6, -1, 12, 2);
    ctx.fillRect(-3, -3, 6, 6);
    ctx.fillStyle = '#fff3a2';
    ctx.fillRect(-1, -9, 2, 3); ctx.fillRect(-1, 6, 2, 3); ctx.fillRect(-9, -1, 3, 2); ctx.fillRect(6, -1, 3, 2);
  } else if (kind === 'ammo') {
    ctx.fillStyle = '#7a5300';
    ctx.fillRect(-7, -5, 14, 12);
    ctx.fillStyle = '#ffd54a';
    ctx.fillRect(-6, -4, 3, 10); ctx.fillRect(-1, -4, 3, 10); ctx.fillRect(4, -4, 3, 10);
    ctx.fillStyle = '#ff9c00';
    ctx.fillRect(-6, -7, 3, 3); ctx.fillRect(-1, -7, 3, 3); ctx.fillRect(4, -7, 3, 3);
  } else if (kind === 'ability') {
    ctx.fillStyle = '#7d5b00';
    ctx.fillRect(-5, -8, 10, 16);
    ctx.fillStyle = '#ffe066';
    ctx.fillRect(-1, -8, 4, 5); ctx.fillRect(-3, -3, 4, 5); ctx.fillRect(0, -3, 4, 5);
    ctx.fillRect(-2, 2, 4, 6); ctx.fillRect(-4, 5, 4, 3);
  } else if (kind === 'companion') {
    ctx.fillStyle = '#1f4078';
    ctx.fillRect(-6, -7, 12, 14);
    ctx.fillStyle = '#7db5ff';
    ctx.fillRect(-3, -7, 6, 4); ctx.fillRect(-4, -3, 8, 6); ctx.fillRect(-2, 3, 4, 4);
    ctx.fillStyle = '#d8f1ff';
    ctx.fillRect(-7, -2, 3, 2); ctx.fillRect(4, -2, 3, 2); ctx.fillRect(-1, -1, 2, 2);
  } else if (kind === 'tesla') {
    ctx.fillStyle = '#10263a';
    ctx.fillRect(-7, -6, 14, 14);
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(-1, -8, 2, 16); ctx.fillRect(-5, -1, 10, 2);
    ctx.fillStyle = '#ff5ec4';
    ctx.fillRect(-4, -6, 3, 3); ctx.fillRect(1, 3, 3, 3);
    ctx.fillStyle = '#dffcff';
    ctx.fillRect(-2, -10, 4, 2);
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-2, -2, 4, 4);
  }
  ctx.restore();
}

function checkHostageFree() {
  for (const h of hostages) {
    if (h.freed) continue;
    const dx = Math.abs((player.x + player.w / 2) - (h.x + 12));
    const dy = Math.abs((player.y + player.h / 2) - (h.y - 16));
    if (dx < 35 && dy < 40) {
      h.freed = true;
      sfxCheckpoint();
      spawnParticles(h.x + 12, h.y - 20, '#ffd700', 14, 1.5);
      if (h.type === 'azure') {
        player.hasAzure = true;
        player.stageHostages++;
        azure.active = true;
        azure.x = h.x;
        azure.y = h.y - azure.h + 2;
        azure.vx = 0;
        azure.vy = 0;
        flashText = 'AZURE JOINS YOU';
        flashTimer = 90;
        spawnParticles(azure.x + 8, azure.y + 8, '#7ed6ff', 16, 1.3);
      } else {
        player.stageHostages++;
        if (h.reward === 'life') player.hp = Math.min(player.maxHp, player.hp + 35);
        if (h.reward === 'ammo' || h.reward === 'glitter') player.superEnergy = Math.min(player.superMax, player.superEnergy + 100);
      }
      break;
    }
  }
}

function updateHostages() {}

function hostagePalette(type) {
  if (type === 'azure') {
    return {
      skin: '#f3c7a8', hair: '#7ddfff', hairDark: '#37a8da', body: '#c8ecff', bodyDark: '#74c6ef', accent: '#ffffff', rope: '#cfd7dd'
    };
  }
  if (type === 'muscular') {
    return {
      skin: '#d8a07e', hair: '#3a2a24', hairDark: '#241914', body: '#9ae06b', bodyDark: '#4e9b40', accent: '#eaf7d8', rope: '#d8c6a7'
    };
  }
  return {
    skin: '#c89774', hair: '#22364a', hairDark: '#152332', body: '#85c9d8', bodyDark: '#467f96', accent: '#eafcff', rope: '#d5d0c2'
  };
}

function drawAzureSpriteAt(sx, sy, opts = {}) {
  const dir = opts.dir ?? 1;
  const bob = opts.bob || 0;
  const leg = opts.leg || 0;
  const tied = !!opts.tied;
  const shooting = !!opts.shooting;
  ctx.save();
  ctx.translate(Math.round(sx + azure.w / 2), Math.round(sy + azure.h / 2 + bob));
  if (dir === -1) ctx.scale(-1, 1);
  ctx.fillStyle = '#214b8f'; ctx.fillRect(-5, 8, 7, 11 + leg); ctx.fillRect(0, 8, 7, 11 - leg);
  ctx.fillStyle = '#7ed6ff'; ctx.fillRect(-6, 18 + leg, 8, 4); ctx.fillRect(-1, 18 - leg, 8, 4);
  ctx.fillStyle = '#214b8f'; ctx.fillRect(-8, 2, 16, 10);
  ctx.fillStyle = '#dff7ff'; ctx.fillRect(-8, 2, 16, 4);
  ctx.fillStyle = '#69b7ff'; ctx.fillRect(-7, -8, 14, 14);
  ctx.fillStyle = '#9be7ff'; ctx.fillRect(-3, -8, 6, 6);
  ctx.fillStyle = '#cfefff'; ctx.fillRect(-4, -6, 8, 5);
  ctx.fillStyle = '#ffccaa'; ctx.fillRect(-6, -20, 12, 13);
  ctx.fillStyle = '#000'; ctx.fillRect(-4, -17, 3, 3); ctx.fillRect(1, -17, 3, 3);
  ctx.fillStyle = '#fff'; ctx.fillRect(-3, -17, 1, 1); ctx.fillRect(2, -17, 1, 1);
  ctx.fillStyle = '#7ed6ff'; ctx.fillRect(-2, -12, 4, 2);
  ctx.fillStyle = '#4fa3ff'; ctx.beginPath(); ctx.arc(-5, -22, 5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(5, -22, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#5bc0ff'; ctx.fillRect(-9, -20, 4, 30); ctx.fillRect(5, -20, 4, 28);
  ctx.fillStyle = '#e8fbff'; ctx.fillRect(-5, -20, 10, 2);
  ctx.fillStyle = '#2fd6ff'; ctx.fillRect(-1, -22, 2, 3);
  ctx.fillStyle = '#3b4d7a'; ctx.fillRect(-9, 0, 2, 10); ctx.fillRect(7, 0, 2, 10);
  if (tied) {
    ctx.fillStyle = '#d6dde3';
    ctx.fillRect(-10, -2, 20, 2);
    ctx.fillRect(-9, 6, 18, 2);
    ctx.fillRect(-5, -4, 10, 2);
  } else if (shooting) {
    ctx.fillStyle = '#dff7ff'; ctx.fillRect(5, -6, 10, 4); ctx.fillStyle = '#63cfff'; ctx.fillRect(13, -8, 6, 6);
  }
  ctx.restore();
}

function drawHostageHuman(cx, groundY, type, tied, t) {
  if (type === 'azure') {
    const bob = Math.sin(t) * 1.1;
    drawAzureSpriteAt(cx - azure.w / 2, groundY - azure.h + 2, { dir: 1, bob, leg: 0, tied: true, shooting: false });
    return;
  }

  const pal = hostagePalette(type);
  const bodyBob = Math.sin(t) * 1.1;
  const armSwing = Math.sin(t * 0.8) * 0.6;
  const headTilt = Math.sin(t * 0.55) * 0.4;
  const stocky = type === 'muscular' ? 1 : 0;

  ctx.save();
  ctx.translate(Math.round(cx), Math.round(groundY + bodyBob));
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(-8 - stocky, -2, 16 + stocky * 2, 3);
  ctx.fillStyle = pal.bodyDark;
  ctx.fillRect(-5 - stocky, -13, 4, 13);
  ctx.fillRect(1 + stocky, -13, 4, 13);
  ctx.fillStyle = pal.accent;
  ctx.fillRect(-6 - stocky, -1, 5, 2);
  ctx.fillRect(1 + stocky, -1, 5, 2);
  ctx.fillStyle = pal.body;
  ctx.fillRect(-7 - stocky, -28, 14 + stocky * 2, 15);
  ctx.fillStyle = pal.bodyDark;
  ctx.fillRect(-7 - stocky, -28, 14 + stocky * 2, 3);
  ctx.fillStyle = pal.accent;
  ctx.fillRect(-3, -22, 6, 2);
  ctx.fillStyle = pal.skin;
  ctx.fillRect(-10 - stocky, -26 + armSwing, 3, 12);
  ctx.fillRect(7 + stocky, -26 - armSwing, 3, 12);
  if (tied) {
    ctx.fillStyle = pal.rope;
    ctx.fillRect(-11 - stocky, -20, 22 + stocky * 2, 2);
    ctx.fillRect(-4, -18, 8, 2);
  }
  ctx.fillStyle = pal.skin;
  ctx.fillRect(-6, -40, 12, 12);
  ctx.fillStyle = pal.hairDark;
  ctx.fillRect(-7, -42, 14, 4);
  ctx.fillStyle = pal.hair;
  ctx.fillRect(-7, -39, 14, 3);
  ctx.fillRect(-7, -36, 2, 4);
  ctx.fillRect(5, -36, 2, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-4, -35 + headTilt, 2, 2);
  ctx.fillRect(2, -35 - headTilt, 2, 2);
  ctx.fillStyle = '#18222d';
  ctx.fillRect(-3, -35 + headTilt, 1, 1);
  ctx.fillRect(2, -35 - headTilt, 1, 1);
  ctx.fillStyle = '#8b4f4f';
  ctx.fillRect(-2, -31, 4, 1);
  if (tied) {
    ctx.fillStyle = pal.rope;
    ctx.fillRect(-9 - stocky, -29, 18 + stocky * 2, 2);
    ctx.fillRect(-9 - stocky, -17, 18 + stocky * 2, 2);
  }
  ctx.restore();
}



function drawHostages() {
  for (const h of hostages) {
    if (h.freed) continue;
    const sx = h.x - camera.x;
    if (sx < -40 || sx > NATIVE_W + 40) continue;
    const t = Date.now() * 0.003 + h.x * 0.01;
    const iconY = Math.sin(t * 1.3) * 2;
    ctx.save();

    if (h.deco === 'altar') {
      ctx.fillStyle = '#4a5966'; ctx.fillRect(sx - 8, h.y + 2, 38, 8);
      ctx.fillStyle = '#738694'; ctx.fillRect(sx - 2, h.y - 6, 26, 8);
      ctx.fillStyle = '#dfe8ef'; ctx.fillRect(sx + 3, h.y - 10, 4, 4); ctx.fillRect(sx + 15, h.y - 10, 4, 4);
      ctx.fillStyle = '#7ddfff'; ctx.fillRect(sx + 4, h.y - 13 + Math.sin(t * 2) * 0.5, 2, 3); ctx.fillRect(sx + 16, h.y - 13 + Math.sin(t * 2.2) * 0.5, 2, 3);
    } else if (h.deco === 'crate') {
      ctx.fillStyle = '#51626f'; ctx.fillRect(sx - 6, h.y + 2, 34, 12);
      ctx.fillStyle = '#9ab0bd'; ctx.fillRect(sx - 4, h.y + 5, 30, 2);
      ctx.fillRect(sx - 4, h.y + 10, 30, 2);
    } else {
      ctx.fillStyle = '#60676f'; ctx.fillRect(sx + 2, h.y + 2, 4, 9);
      ctx.fillRect(sx + 18, h.y + 2, 4, 9);
      ctx.fillStyle = '#ffd9a8'; ctx.fillRect(sx + 2, h.y - 2, 4, 4); ctx.fillRect(sx + 18, h.y - 2, 4, 4);
      ctx.fillStyle = '#ffb347'; ctx.fillRect(sx + 3, h.y - 5 + Math.sin(t * 1.7) * 0.5, 2, 3); ctx.fillRect(sx + 19, h.y - 5 + Math.sin(t * 1.9) * 0.5, 2, 3);
    }

    drawHostageHuman(sx + 12, h.y, h.type, true, t);

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(sx + 2, h.y - 50, 20, 7);
    ctx.fillStyle = '#ffe072';
    ctx.fillRect(sx + 4, h.y - 48 + iconY, 16, 3);
    ctx.fillStyle = '#fff7c2';
    ctx.fillRect(sx + 8, h.y - 52 + iconY, 8, 3);

    ctx.restore();
  }
}


function updateAzure() {
  if (!azure.active) return;
  azure.prevY = azure.y;
  const dx = player.x - azure.x;
  azure.dir = dx >= 0 ? 1 : -1;

  const runningBoost = Math.abs(player.vx) > 3.2 ? 1.18 : 1;
  const desired = Math.abs(dx) > 42 ? azure.dir * 2.65 * runningBoost : 0;
  azure.vx += (desired - azure.vx) * 0.22;
  azure.vx = Math.max(-3.45, Math.min(3.45, azure.vx));
  if (Math.abs(desired) < 0.1) azure.vx *= 0.84;
  if (Math.abs(dx) > 220) azure.x += dx * 0.16;

  azure.vy += 0.34;
  azure.vy = Math.min(azure.vy, 8.4);
  azure.x += azure.vx;
  const prevBottom = azure.prevY + azure.h;
  azure.y += azure.vy;

  verticalCollide(azure, prevBottom);
  if (azure.onGround) {
    if (player.y + 2 < azure.y - 18 && Math.abs(dx) < 220) azure.vy = -6.6;
  }

  if (azure.x < camera.x - 80) azure.x = camera.x - 40;
  if (azure.stunned > 0) azure.stunned--;

  azure.shootCooldown--;
  if (azure.stunned <= 0 && azure.shootCooldown <= 0) {
    let nearest = null;
    let minDist = 260;
    for (const e of enemies) {
      if (e.dead) continue;
      const ex = e.x + e.w * 0.5;
      const ey = e.y + e.h * 0.5;
      const d = Math.hypot(ex - (azure.x + azure.w * 0.5), ey - (azure.y + 12));
      if (d < minDist) { nearest = e; minDist = d; }
    }
    if (nearest) {
      const shotX = azure.x + azure.w * 0.5;
      const shotY = azure.y + 12;
      const targetX = nearest.x + nearest.w * 0.5;
      const targetY = nearest.y + nearest.h * 0.5;
      const aimDx = targetX - shotX;
      const aimDy = targetY - shotY;
      const mag = Math.max(1, Math.hypot(aimDx, aimDy));
      const dir = aimDx >= 0 ? 1 : -1;
      spawnBullet(shotX + (dir === 1 ? 6 : -6), shotY, dir, { speed: 7.2, damage: 8, size: 3, life: 68, enemy: false, super: false, color: '#7ed6ff', vx: (aimDx / mag) * 7.2, vy: (aimDy / mag) * 7.2 });
      if (minDist < 150) {
        spawnBullet(shotX + (dir === 1 ? 6 : -6), shotY + 2, dir, { speed: 6.4, damage: 6, size: 3, life: 56, enemy: false, super: false, color: '#b5f0ff', vx: (aimDx / mag) * 6.4, vy: (aimDy / mag) * 6.4 + 0.18 });
      }
      spawnParticles(shotX, shotY, '#7ed6ff', 4, 0.4, { shape: 'spark', glow: 6, size: 2 });
      azure.shootCooldown = minDist < 150 ? 24 : 32;
      sfxShoot();
    }
  }

  azure.bob += 0.14;
  azure.frameTimer++;
  if (azure.frameTimer > 10) { azure.frame = (azure.frame + 1) % 4; azure.frameTimer = 0; }
}

function drawAzure() {
  if (!azure.active) return;
  const sx = Math.round(azure.x - camera.x);
  const sy = Math.round(azure.y);
  const bob = azure.onGround ? Math.sin(azure.frame * Math.PI / 2) * 0.8 : 0;
  const leg = azure.onGround ? Math.sin(azure.frame * Math.PI / 2) * 2 : 0;
  drawAzureSpriteAt(sx, sy, { dir: azure.dir, bob, leg, tied: false, shooting: azure.shootCooldown > 26 });
}


function drawHUD() {
  ctx.fillStyle = 'rgba(6,8,18,0.74)'; ctx.fillRect(0, 0, NATIVE_W, 38);
  ctx.strokeStyle = 'rgba(255,255,255,0.14)'; ctx.strokeRect(0.5, 0.5, NATIVE_W - 1, 37);

  const hpFrac = player.hp / player.maxHp;
  ctx.fillStyle = '#1d1f28'; ctx.fillRect(10, 8, 108, 10);
  ctx.fillStyle = hpFrac > 0.5 ? '#44ff66' : hpFrac > 0.25 ? '#ffcc33' : '#ff3355';
  ctx.fillRect(10, 8, 108 * hpFrac, 10);
  ctx.strokeStyle = '#8e93a6'; ctx.strokeRect(10, 8, 108, 10);
  ctx.fillStyle = '#ffffff'; ctx.font = '7px monospace'; ctx.fillText('HP', 12, 16);

  ctx.fillStyle = '#1d1f28'; ctx.fillRect(10, 23, 108, 8);
  ctx.fillStyle = specialWeaponUnlocked ? '#ff7a30' : '#7be9ff';
  ctx.fillRect(10, 23, 108 * (player.superEnergy / player.superMax), 8);
  ctx.strokeStyle = '#8e93a6'; ctx.strokeRect(10, 23, 108, 8);
  ctx.fillStyle = '#dce7ff'; ctx.fillText(specialWeaponUnlocked ? (specialWeaponType === 'tesla' ? 'TESLA' : 'FLAME') : 'GLITTER', 12, 30);

  ctx.fillStyle = '#dce7ff'; ctx.font = '9px monospace';
  ctx.fillText(`JUMP x${player.jumpsLeft}`, 138, 15);
  ctx.fillText(`VITE ${Math.max(0, player.lives)}`, 138, 30);

  ctx.fillStyle = '#ffffff';
  ctx.fillText(`SCORE ${String(score).padStart(6, '0')}`, 224, 15);
  const secs = Math.floor(levelTimer / 60);
  ctx.fillStyle = '#aab2c8';
  ctx.fillText(`${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`, 224, 30);

  const prog = Math.min(1, player.x / currentLevel.bossTrigger);
  ctx.fillStyle = '#1d1f28'; ctx.fillRect(318, 8, 158, 10);
  ctx.fillStyle = '#ff69b4'; ctx.fillRect(318, 8, 158 * prog, 10);
  ctx.strokeStyle = '#8e93a6'; ctx.strokeRect(318, 8, 158, 10);
  ctx.fillStyle = '#fff'; ctx.font = '8px monospace'; ctx.fillText(`STAGE ${Math.floor(prog * 100)}%`, 322, 16);

  if (boss) {
    const frac = Math.max(0, boss.hp / boss.maxHp);
    ctx.fillStyle = '#1d1f28'; ctx.fillRect(318, 23, 158, 8);
    ctx.fillStyle = boss.kind === 'drakoptero' ? (boss.phase >= 2 ? '#ff6a2a' : '#ffb347') : (boss.phase === 1 ? '#ffbb55' : boss.phase === 2 ? '#ff8844' : '#ff4444');
    ctx.fillRect(318, 23, 158 * frac, 8);
    ctx.strokeStyle = '#8e93a6'; ctx.strokeRect(318, 23, 158, 8);
    ctx.fillStyle = '#ffe3aa'; ctx.fillText(currentLevel.bossName.slice(0, 12), 392, 30);
  } else if (bossArenaLocked) {
    ctx.fillStyle = '#ffcc44'; ctx.fillText('BOSS ZONE', 390, 30);
  }

  ctx.fillStyle = '#aab2c8'; ctx.font = '8px monospace';
  ctx.fillText(`L${currentLevel.num}`, 492, 16);
  if (specialWeaponUnlocked) { ctx.fillStyle = specialWeaponType === 'tesla' ? '#22d3ee' : '#ff9d5c'; ctx.fillText(specialWeaponType === 'tesla' ? 'TESLA READY' : 'FLAME READY', 516, 16); }
  if (player.hasAzure) { ctx.fillStyle = '#88aaff'; ctx.fillText('AZURE', 516, 30); }
}

function drawFlash() {
  if (flashTimer <= 0 || bossIntroTimer > 0) return;
  ctx.save();
  ctx.globalAlpha = Math.min(1, flashTimer / 24);
  ctx.fillStyle = 'rgba(0,0,0,0.76)';
  ctx.fillRect(170, 70, 300, 48);
  ctx.strokeStyle = '#ffd700'; ctx.strokeRect(170, 70, 300, 48);
  ctx.fillStyle = '#fff'; ctx.font = 'bold 16px monospace'; ctx.textAlign = 'center';
  ctx.fillText(flashText, NATIVE_W / 2, 100);
  ctx.restore();
  ctx.textAlign = 'left';
}

function drawBossIntro() {
  if (bossIntroTimer <= 0 || !boss) return;
  ctx.save();
  ctx.globalAlpha = Math.min(1, bossIntroTimer / 30);
  ctx.fillStyle = 'rgba(0,0,0,0.68)';
  ctx.fillRect(92, 82, 456, 92);
  ctx.lineWidth = 2;
  ctx.textAlign = 'center';

  if (boss.kind === 'drakoptero') {
    ctx.strokeStyle = '#ff6600';
    ctx.strokeRect(92, 82, 456, 92);
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('WARNING', NATIVE_W / 2, 110);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('DRAKOPTERO', NATIVE_W / 2, 138);
    ctx.fillStyle = '#ffb366';
    ctx.font = '10px monospace';
    ctx.fillText("Sconfiggilo e raccogli l'arma speciale per chiudere il livello", NATIVE_W / 2, 158);
  } else if (boss.kind === 'metro_titan') {
    ctx.strokeStyle = '#22d3ee';
    ctx.strokeRect(92, 82, 456, 92);
    ctx.fillStyle = '#ff5ec4';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('SYSTEM ALERT', NATIVE_W / 2, 110);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('METRO TITAN', NATIVE_W / 2, 138);
    ctx.fillStyle = '#9be7ff';
    ctx.font = '10px monospace';
    ctx.fillText('Abbattelo e raccogli la TESLA LASH per uscire dalla stazione', NATIVE_W / 2, 158);
  }

  ctx.restore();
  ctx.textAlign = 'left';
}

function drawWorld() {
  drawBackground();
  drawPlatforms();
  drawForegroundProps();
  drawPickups();
  drawHostages();
  drawEnemies();
  drawBoss();
  drawBullets();
  drawPlayer();
  drawAzure();
  drawParticles();
  drawHUD();
  drawFlash();
  drawBossIntro();
}

function drawTitle() {
  titleTick++;
  const g = ctx.createLinearGradient(0, 0, 0, NATIVE_H); g.addColorStop(0, '#0d0030'); g.addColorStop(1, '#1a0050');
  ctx.fillStyle = g; ctx.fillRect(0, 0, NATIVE_W, NATIVE_H);
  for (let i = 0; i < 40; i++) {
    const x = (i * 137.5) % NATIVE_W, y = (i * 97.3) % NATIVE_H, a = Math.sin(titleTick * 0.05 + i) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fillRect(x, y, 2, 2);
  }
  ctx.save(); ctx.textAlign = 'center'; ctx.shadowColor = '#ff69b4'; ctx.shadowBlur = 20; ctx.fillStyle = '#ff69b4'; ctx.font = 'bold 36px monospace';
  const bob = Math.sin(titleTick * 0.04) * 3; ctx.fillText('GLITTER', NATIVE_W / 2, 96 + bob); ctx.fillStyle = '#ffd700'; ctx.shadowColor = '#ffd700'; ctx.fillText('BLITZ', NATIVE_W / 2, 136 + bob); ctx.restore();
  ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.font = '10px monospace'; ctx.fillText('Benvenuti nella demo.', NATIVE_W / 2, 164);
  ctx.fillStyle = '#88ffff'; ctx.font = '8px monospace';
  ctx.fillText('FRECCE MUOVI  -  SU SALTO/DOPPIO SALTO  -  SPACE/J SPARA  -  W SUPER/FLAME', NATIVE_W / 2, 252);
  ctx.fillText('1 2 SELEZIONE LIVELLO  -  AUDIO AUTO  -  ESC PAUSA', NATIVE_W / 2, 268);
  ctx.fillStyle = '#ffd700'; ctx.font = 'bold 11px monospace'; ctx.globalAlpha = Math.sin(titleTick * 0.08) * 0.5 + 0.5; ctx.fillText(`SPACE PER INIZIARE LIVELLO ${levelIndex + 1}`, NATIVE_W / 2, 314); ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
}

function drawIntro() {
  drawBackground();
  const t = 110 - introTimer, a = Math.min(1, t / 24), slide = Math.max(0, 56 - t * 3);
  ctx.save(); ctx.globalAlpha = a;
  ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, 0, NATIVE_W, NATIVE_H);
  ctx.translate(0, slide);
  ctx.fillStyle = 'rgba(10,10,20,0.88)'; ctx.fillRect(110, 82, 420, 166);
  ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2; ctx.strokeRect(110, 82, 420, 166);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd700'; ctx.font = 'bold 14px monospace'; ctx.fillText(`MISSION ${currentLevel.num}`, NATIVE_W / 2, 112);
  ctx.fillStyle = '#ff69b4'; ctx.font = 'bold 26px monospace'; ctx.fillText(currentLevel.name, NATIVE_W / 2, 150);
  ctx.fillStyle = '#dce7ff'; ctx.font = '11px monospace';
  ctx.fillText('Doppio salto, checkpoint, ostaggi e boss finale', NATIVE_W / 2, 176);
  ctx.fillStyle = '#88ffff';
  ctx.fillText('Frecce muovi  //  Space spara  //  E libera ostaggi  //  W super', NATIVE_W / 2, 204);
  ctx.fillStyle = '#ffd166';
  ctx.fillText(`BOSS: ${currentLevel.bossName}`, NATIVE_W / 2, 226);
  ctx.restore();
  ctx.textAlign = 'left';
}


function buildStageStats() {
  const rescueBonus = player.stageHostages * 250;
  const killBonus = player.stageKills * 40;
  const survivalBonus = Math.max(0, player.lives) * 150;
  const accuracy = player.shotsFired > 0 ? Math.min(99, Math.round((player.stageKills / player.shotsFired) * 100)) : 0;
  return {
    level: currentLevel.num,
    name: currentLevel.name,
    kills: player.stageKills,
    hostages: player.stageHostages,
    shots: player.shotsFired,
    accuracy,
    time: Math.floor(levelTimer / 60),
    rescueBonus,
    killBonus,
    survivalBonus,
    total: score + rescueBonus + killBonus + survivalBonus
  };
}

function showStageStats(message = '') {
  levelClearMessage = message || levelClearMessage || 'MISSION COMPLETE';
  lastStageStats = buildStageStats();
  score = lastStageStats.total;
  statsTimer = 150;
  gameState = STATE.STATS;
}

function drawStats() {
  if (!lastStageStats) lastStageStats = buildStageStats();
  drawWorld();
  ctx.fillStyle = 'rgba(0,0,0,0.84)'; ctx.fillRect(84, 56, 472, 248);
  ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2; ctx.strokeRect(84, 56, 472, 248);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd700'; ctx.font = 'bold 24px monospace'; ctx.fillText('MISSION REPORT', NATIVE_W / 2, 88);
  ctx.fillStyle = '#ff69b4'; ctx.font = 'bold 14px monospace'; ctx.fillText(`LIVELLO ${lastStageStats.level}  //  ${lastStageStats.name}`, NATIVE_W / 2, 112);
  ctx.fillStyle = '#fff'; ctx.font = '12px monospace'; ctx.fillText(levelClearMessage || 'MISSION COMPLETE', NATIVE_W / 2, 134);
  ctx.textAlign = 'left';
  const xL = 132, xR = 356;
  ctx.fillStyle = '#88ffff'; ctx.font = '12px monospace';
  ctx.fillText(`Nemici KO    ${String(lastStageStats.kills).padStart(3, '0')}`, xL, 170);
  ctx.fillText(`Ostaggi      ${String(lastStageStats.hostages).padStart(3, '0')}`, xL, 192);
  ctx.fillText(`Colpi        ${String(lastStageStats.shots).padStart(3, '0')}`, xL, 214);
  ctx.fillText(`Accuratezza  ${String(lastStageStats.accuracy).padStart(2, '0')}%`, xL, 236);
  const mm = String(Math.floor(lastStageStats.time / 60)).padStart(2, '0');
  const ss = String(lastStageStats.time % 60).padStart(2, '0');
  ctx.fillText(`Tempo        ${mm}:${ss}`, xL, 258);
  ctx.fillStyle = '#ffd166';
  ctx.fillText(`Bonus rescue ${String(lastStageStats.rescueBonus).padStart(4, '0')}`, xR, 170);
  ctx.fillText(`Bonus KO     ${String(lastStageStats.killBonus).padStart(4, '0')}`, xR, 192);
  ctx.fillText(`Bonus vite   ${String(lastStageStats.survivalBonus).padStart(4, '0')}`, xR, 214);
  ctx.fillStyle = '#fff';
  ctx.fillText(`Score totale ${String(lastStageStats.total).padStart(6, '0')}`, xR, 258);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#88ff88'; ctx.font = '11px monospace';
  ctx.fillText(statsTimer > 0 ? 'Calcolo risultati...' : 'SPACE livello 2  //  ESC titolo', NATIVE_W / 2, 286);
  ctx.textAlign = 'left';
}

function drawPause() {
  drawWorld();
  ctx.fillStyle = 'rgba(0,0,0,0.76)'; ctx.fillRect(0, 0, NATIVE_W, NATIVE_H);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd700'; ctx.font = 'bold 28px monospace'; ctx.fillText('PAUSA', NATIVE_W / 2, NATIVE_H / 2 - 26);
  ctx.fillStyle = '#dce7ff'; ctx.font = '12px monospace';
  ctx.fillText('ESC per riprendere', NATIVE_W / 2, NATIVE_H / 2 + 4);
  ctx.fillStyle = '#88ffff'; ctx.fillText('Continua da checkpoint e progressi attuali', NATIVE_W / 2, NATIVE_H / 2 + 26);
  ctx.textAlign = 'left';
}

function drawWin() {
  drawWorld();

  const panelX = 60;
  const panelY = 58;
  const panelW = 520;
  const panelH = 210;
  const neon = ctx.createLinearGradient(panelX, panelY, panelX + panelW, panelY + panelH);
  neon.addColorStop(0, 'rgba(255, 20, 147, 0.24)');
  neon.addColorStop(0.5, 'rgba(20, 210, 255, 0.2)');
  neon.addColorStop(1, 'rgba(255, 215, 0, 0.16)');
  ctx.fillStyle = 'rgba(4,6,16,0.90)';
  ctx.fillRect(panelX, panelY, panelW, panelH);
  ctx.fillStyle = neon;
  ctx.fillRect(panelX, panelY, panelW, panelH);

  ctx.strokeStyle = '#1ad6ff';
  ctx.lineWidth = 3;
  ctx.strokeRect(panelX, panelY, panelW, panelH);
  ctx.strokeStyle = '#ff4fd8';
  ctx.lineWidth = 1;
  ctx.strokeRect(panelX + 6, panelY + 6, panelW - 12, panelH - 12);

  for (let i = 0; i < 18; i++) {
    const x = panelX + 18 + i * 28;
    ctx.fillStyle = i % 2 === 0 ? '#1ad6ff' : '#ff4fd8';
    ctx.fillRect(x, panelY + 14, 14, 3);
    ctx.fillRect(x, panelY + panelH - 17, 14, 3);
  }

  ctx.textAlign = 'center';
  ctx.shadowColor = '#ff4fd8';
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#fff07a';
  ctx.font = 'bold 17px monospace';
  ctx.fillText('GLITTER BLITZ', NATIVE_W / 2, 88);

  ctx.shadowColor = '#1ad6ff';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#9ff8ff';
  ctx.font = 'bold 34px monospace';
  ctx.fillText('DEMO', NATIVE_W / 2, 132);

  ctx.shadowColor = '#ff4fd8';
  ctx.shadowBlur = 22;
  ctx.fillStyle = '#ff8ce8';
  ctx.font = 'bold 30px monospace';
  ctx.fillText('TERMINATA', NATIVE_W / 2, 168);

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#dffcff';
  ctx.font = '12px monospace';
  ctx.fillText('Hai completato la metro moderna di Glitter Blitz.', NATIVE_W / 2, 197);
  ctx.fillStyle = '#ffd166';
  ctx.fillText(`SCORE ${String(score).padStart(6, '0')}`, NATIVE_W / 2, 220);
  ctx.fillStyle = '#88ffff';
  ctx.fillText('SPACE ricomincia dal livello 1  //  ESC titolo', NATIVE_W / 2, 246);
  ctx.textAlign = 'left';
}

function drawGameOver() {
  drawWorld();
  ctx.fillStyle = 'rgba(0,0,0,0.88)'; ctx.fillRect(96, 96, 448, 140);
  ctx.strokeStyle = '#ff3344'; ctx.lineWidth = 2; ctx.strokeRect(96, 96, 448, 140);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff3344'; ctx.font = 'bold 26px monospace'; ctx.fillText('GAME OVER', NATIVE_W / 2, 138);
  ctx.fillStyle = '#fff'; ctx.font = '11px monospace'; ctx.fillText('SPACE per ricominciare  //  ESC titolo', NATIVE_W / 2, 182);
  ctx.fillStyle = '#ffb3b3'; ctx.fillText('Riparti dal livello corrente', NATIVE_W / 2, 202);
  ctx.textAlign = 'left';
}
