function updateCamera() {
  let minX = 0;
  let maxX = currentLevel.width - NATIVE_W;
  if (bossArenaLocked) minX = currentLevel.bossTrigger - 220;
  const target = Math.max(minX, Math.min(player.x - NATIVE_W * 0.35, maxX));
  camera.x += (target - camera.x) * 0.1;
}

function verticalCollide(entity, prevBottom) {
  entity.onGround = false;
  for (const p of platforms) {
    const overlapX = entity.x + entity.w > p.x && entity.x < p.x + p.w;
    if (!overlapX) continue;
    if (prevBottom <= p.y && entity.y + entity.h >= p.y && entity.vy >= 0) {
      entity.y = p.y - entity.h;
      entity.vy = 0;
      entity.onGround = true;
    }
  }
  if (entity.y + entity.h >= GROUND_Y) {
    entity.y = GROUND_Y - entity.h;
    entity.vy = 0;
    entity.onGround = true;
  }
}

function damagePlayer(amount) {
  if (player.inv > 0 || player.respawning > 0 || gameState !== STATE.PLAY) return;
  player.hp = Math.max(0, player.hp - amount);
  player.inv = 70;
  spawnParticles(player.x + player.w / 2, player.y + player.h / 2, '#ff4444', 8);
  sfxHit();
  if (player.hp <= 0) {
    player.lives--;
    sfxDeath();
    if (player.lives <= 0) {
      clearManagedTimeouts();
      stopBGMusic();
      gameState = STATE.GAMEOVER;
    } else {
      player.respawning = 75;
    }
  }
}

function doRespawn() {
  player.hp = player.maxHp;
  player.x = checkpointX;
  player.y = GROUND_Y - player.h;
  player.vx = 0;
  player.vy = 0;
  player.jumpsLeft = 2;
  player.inv = 120;
  player.respawning = 0;
  bullets = bullets.filter(b => !b.enemy);
  if (azure.active) {
    azure.x = player.x - 34;
    azure.y = player.y;
    azure.prevY = azure.y;
    azure.vx = 0;
    azure.vy = 0;
    azure.onGround = true;
  }
}

function updatePlayer() {
  if (player.respawning > 0) {
    player.respawning--;
    if (player.respawning === 0) doRespawn();
    return;
  }

  if (pressed('ArrowUp')) player.jumpBuffer = 8;
  if (player.jumpBuffer > 0) player.jumpBuffer--;
  player.coyote = player.onGround ? 7 : Math.max(0, player.coyote - 1);

  if (player.runTapTimer > 0) player.runTapTimer--;

  if (pressed('ArrowRight')) {
    if (player.runTapDir === 1 && player.runTapTimer > 0) {
      player.runModeDir = 1;
      player.runTapDir = 0;
      player.runTapTimer = 0;
      spawnParticles(player.x + player.w / 2, player.y + player.h - 4, '#88ffff', 6, 0.8, { shape: 'spark', glow: 5, size: 2 });
    } else {
      player.runTapDir = 1;
      player.runTapTimer = 14;
    }
  } else if (pressed('ArrowLeft')) {
    if (player.runTapDir === -1 && player.runTapTimer > 0) {
      player.runModeDir = -1;
      player.runTapDir = 0;
      player.runTapTimer = 0;
      spawnParticles(player.x + player.w / 2, player.y + player.h - 4, '#88ffff', 6, 0.8, { shape: 'spark', glow: 5, size: 2 });
    } else {
      player.runTapDir = -1;
      player.runTapTimer = 14;
    }
  }

  const runningRight = Keys.ArrowRight && player.runModeDir === 1;
  const runningLeft = Keys.ArrowLeft && player.runModeDir === -1;
  const moveMax = (runningRight || runningLeft) ? 3.8 : 2.8;
  const moveAccel = (runningRight || runningLeft) ? 0.42 : 0.34;
  const moveDrag = player.onGround ? 0.78 : 0.92;

  if (Keys.ArrowRight) { player.vx = Math.min(moveMax, player.vx + moveAccel); player.dir = 1; }
  else if (Keys.ArrowLeft) { player.vx = Math.max(-moveMax, player.vx - moveAccel); player.dir = -1; }
  else player.vx *= moveDrag;

  if (bossArenaLocked && player.x < currentLevel.bossTrigger - 180) player.x = currentLevel.bossTrigger - 180;

  if (player.jumpBuffer > 0 && player.coyote > 0) {
    player.vy = -7.9;
    player.onGround = false;
    player.coyote = 0;
    player.jumpBuffer = 0;
    player.jumpsLeft = 1;
    sfxJump();
  } else if (player.jumpBuffer > 0 && !player.onGround && player.jumpsLeft > 0) {
    player.vy = -7.5;
    player.jumpBuffer = 0;
    player.jumpsLeft--;
    spawnParticles(player.x + player.w / 2, player.y + player.h / 2, '#88ffff', 8, 1.2);
    sfxDoubleJump();
  }

  if (!Keys.ArrowUp && player.vy < -2.2) player.vy += 0.18;
  player.vy += 0.38;
  if (player.vy > 10) player.vy = 10;

  player.x += player.vx;
  player.x = Math.max(0, Math.min(player.x, currentLevel.width - player.w));

  const prevBottom = player.y + player.h;
  player.y += player.vy;
  verticalCollide(player, prevBottom);
  if (player.onGround) player.jumpsLeft = 2;

  if (player.shootCd > 0) player.shootCd--;
  if (player.inv > 0) player.inv--;
  if (pressed('KeyE')) checkHostageFree();

  player.superEnergy = Math.min(player.superMax, player.superEnergy + 0.28);
  player.superShots = Math.floor(player.superEnergy / 100);

  if ((Keys.Space || Keys.KeyJ) && player.shootCd <= 0) {
    spawnBullet(player.x + (player.dir === 1 ? player.w + 2 : -6), player.y + player.h * 0.38, player.dir, { damage: 8, color: '#88ffff', speed: 7, size: 5 });
    player.shotsFired++;
    player.shootCd = 9;
    sfxShoot();
  }
  if (pressed('KeyW') && (specialWeaponUnlocked ? player.superEnergy >= 80 : player.superShots > 0)) {
    if (specialWeaponUnlocked && levelIndex >= 1) {
      if (specialWeaponType === 'tesla' && levelIndex >= 2) {
        const beamX = player.x + (player.dir === 1 ? player.w + 4 : -12);
        const beamY = player.y + player.h * 0.40;
        for (const vy of [-0.55, -0.18, 0.18, 0.55]) {
          spawnBullet(beamX, beamY, player.dir, { damage: 16, color: '#22d3ee', speed: 7.4, size: 6, super: true, life: 30, vy });
          player.shotsFired++;
        }
        spawnBullet(beamX, beamY, player.dir, { damage: 24, color: '#ff5ec4', speed: 8.2, size: 8, super: true, life: 22 });
        player.shotsFired++;
        player.superEnergy = Math.max(0, player.superEnergy - 80);
        player.superShots = Math.floor(player.superEnergy / 100);
        player.shootCd = 12;
        spawnParticles(player.x + player.w / 2, player.y + 12, '#22d3ee', 10, 1.2, { shape: 'spark', glow: 7, size: 2 });
        spawnParticles(player.x + player.w / 2, player.y + 12, '#ff5ec4', 6, 0.9);
        sfxSuperShot();
      } else {
        const flameX = player.x + (player.dir === 1 ? player.w + 3 : -10);
        const flameY = player.y + player.h * 0.46;
        for (const vy of [-0.7, -0.25, 0.25, 0.7]) {
          spawnBullet(flameX, flameY, player.dir, { damage: 14, color: '#ff6600', speed: 5.2, size: 6, super: true, life: 24, vy });
          player.shotsFired++;
        }
        player.superEnergy = Math.max(0, player.superEnergy - 80);
        player.superShots = Math.floor(player.superEnergy / 100);
        player.shootCd = 14;
        spawnParticles(player.x + player.w / 2, player.y + 12, '#ff6600', 10, 1.4);
        sfxFlamethrower();
      }
    } else {
      spawnBullet(player.x + (player.dir === 1 ? player.w + 3 : -10), player.y + player.h * 0.40, player.dir, { damage: 24, color: '#ffe477', speed: 6.4, size: 10, super: true });
      player.superEnergy = Math.max(0, player.superEnergy - 100);
      player.superShots = Math.floor(player.superEnergy / 100);
      player.shootCd = 16;
      spawnParticles(player.x + player.w / 2, player.y + 12, '#ffe477', 8, 1.4);
      sfxSuperShot();
    }
  }

  if (!bossDefeated && !bossArenaLocked && player.x >= currentLevel.bossTrigger) spawnBoss();

  player.frameTimer++;
  if (player.frameTimer >= 8) { player.frame = (player.frame + 1) % 4; player.frameTimer = 0; }
}

function updateEnemies() {
  for (const e of enemies) {
    if (e.dead) { e.fade--; continue; }
    if (!e.active && e.x < camera.x + NATIVE_W + 120) e.active = true;
    if (!e.active) continue;
    const t = ENEMY_TYPES[e.type];
    const dx = player.x - e.x;
    const dy = player.y - e.y;
    const dist = Math.hypot(dx, dy);
    e.dir = dx >= 0 ? 1 : -1;

    if (e.type === 'SPARK_RAT') {
      const rushBoost = dist < t.chaseRange ? 1.35 : 0;
      e.vx = dist < t.chaseRange ? e.dir * t.speed * rushBoost : 0;
      e.vy += 0.28;
      e.x += e.vx;
      const prevBottom = e.y + e.h;
      e.y += e.vy;
      verticalCollide(e, prevBottom);
      if (Math.random() < 0.08) spawnParticles(e.x + e.w * 0.3, e.y + e.h * 0.7, '#22d3ee', 1, 0.25, { shape: 'spark', glow: 5, size: 2 });
    } else if (t.flying) {
      const desiredY = Math.min(GROUND_Y - 56, player.y - 18);
      if (dist < t.chaseRange) {
        e.vx += Math.sign(dx) * 0.08;
        e.vy += (desiredY > e.y ? 0.09 : -0.05);
      }
      e.vx *= 0.94;
      e.vy *= 0.94;
      e.vx = Math.max(-t.speed, Math.min(t.speed, e.vx));
      e.vy = Math.max(-1.15, Math.min(1.15, e.vy));
      e.x += e.vx;
      e.y += e.vy;
      e.y = Math.max(86, Math.min(GROUND_Y - 44, e.y));
    } else {
      const chargeBoost = t.charger && dist < t.chaseRange ? 1.9 : 1;
      e.vx = dist < t.chaseRange ? e.dir * t.speed * chargeBoost : 0;
      e.vy += 0.35;
      e.x += e.vx;
      const prevBottom = e.y + e.h;
      e.y += e.vy;
      verticalCollide(e, prevBottom);
    }

    if (t.shootRange > 0 && dist < t.shootRange) {
      e.shootCd--;
      if (e.shootCd <= 0) {
        const bulletSpeed = e.type === 'RAIL_DRONE' ? 5.4 : e.type === 'SIGNAL_WITCH' ? 4.2 : levelIndex === 2 ? 4.9 : levelIndex === 1 ? 4.6 : 4.4;
        const bulletSize = e.type === 'RAIL_DRONE' ? 4 : e.type === 'SIGNAL_WITCH' ? 6 : 5;
        const shotX = e.x + e.w / 2;
        const shotY = e.y + e.h / 2;
        if (t.flying) {
          const aimDx = (player.x + player.w / 2) - shotX;
          const aimDy = (player.y + player.h / 2) - shotY;
          const mag = Math.max(1, Math.hypot(aimDx, aimDy));
          spawnBullet(shotX, shotY, aimDx >= 0 ? 1 : -1, { damage: t.damage, color: t.color, speed: bulletSpeed, size: bulletSize, enemy: true, life: 90, vx: (aimDx / mag) * bulletSpeed, vy: (aimDy / mag) * bulletSpeed });
          if (e.type === 'SIGNAL_WITCH') {
            spawnBullet(shotX, shotY, aimDx >= 0 ? 1 : -1, { damage: t.damage * 0.85, color: '#d7a6ff', speed: bulletSpeed * 0.92, size: 4, enemy: true, life: 84, vx: (aimDx / mag) * bulletSpeed * 0.55, vy: Math.max(2.2, Math.abs(aimDy / mag) * bulletSpeed * 0.95) });
          }
        } else {
          spawnBullet(shotX, shotY, e.dir, { damage: t.damage, color: t.color, speed: bulletSpeed, size: bulletSize, enemy: true, life: 84, vy: e.type === 'SIGNAL_WITCH' ? Math.sin(levelTimer * 0.1) * 0.3 : 0 });
        }
        spawnParticles(shotX, shotY, t.color, 3, 0.45, { shape: 'spark', glow: 6, size: 2 });
        e.shootCd = (levelIndex === 2 ? 68 : levelIndex === 1 ? 76 : 80) + Math.random() * 26;
      }
    }

    if (dist < 28) damagePlayer(t.damage * 0.08);

    e.frameTimer++;
    if (e.frameTimer >= 8) { e.frame = (e.frame + 1) % 8; e.frameTimer = 0; }
  }
  enemies = enemies.filter(e => !e.dead || e.fade > 0);
}

function updateBoss() {
  if (!boss) return;

  if (boss.kind === 'drakoptero') {
    if (!boss.active) return;
    if (boss.dead) {
      if (boss.deathTimer > 36) boss.deathTimer--;
      boss.rotorAngle += 0.35;
      boss.y += Math.sin(levelTimer * 0.12) * 0.6;
      if (!boss.rewardDropped && boss.deathTimer === 120) {
        pickups.push({ x: boss.x + 56, y: boss.y + 56, type: 'flamethrower', reward: 'ability', taken: false, special: true });
        boss.rewardDropped = true;
      }
      if (boss.deathTimer <= 36) {
        bossDefeated = true;
        bossArenaLocked = false;
        boss = null;
        return;
      }
      if (boss.deathTimer % 10 === 0) spawnParticles(boss.x + 40 + Math.random() * 70, boss.y + 20 + Math.random() * 50, '#ff6600', 8);
      return;
    }

    if (bossIntroTimer > 0) {
      bossIntroTimer--;
      boss.rotorAngle += 0.28;
      boss.y = 92 + Math.sin(levelTimer * 0.05) * 16;
      boss.x += Math.sin(levelTimer * 0.03) * 0.6;
      return;
    }

    const hpFrac = boss.hp / boss.maxHp;
    const newPhase = hpFrac <= 0.22 ? 3 : hpFrac <= 0.55 ? 2 : 1;
    if (newPhase !== boss.phase) {
      boss.phase = newPhase;
      boss.enragedFlash = 45;
      if (boss.phase === 2) boss.vx = 2.15;
      if (boss.phase === 3) boss.vx = 2.6;
      flashText = boss.phase === 2 ? 'DRAKOPTERO FASE 2' : 'DRAKOPTERO FASE 3';
      flashTimer = 90;
      spawnParticles(boss.x + boss.w / 2, boss.y + boss.h / 2, '#ff6600', 26, 1.5);
      sfxCheckpoint();
    }
    if (boss.enragedFlash > 0) boss.enragedFlash--;

    boss.rotorAngle += 0.23 + boss.phase * 0.05;
    boss.frameTimer++;
    if (boss.frameTimer > 5) { boss.frame = (boss.frame + 1) % 8; boss.frameTimer = 0; }

    boss.x += boss.vx * boss.dir;
    boss.vy += 0.045 + boss.phase * 0.01;
    boss.y += boss.vy;

    const topLimit = boss.phase === 1 ? 64 : 56;
    const lowLimit = boss.phase === 1 ? 214 : boss.phase === 2 ? 226 : 236;
    if (boss.y < topLimit) boss.vy = Math.abs(boss.vy);
    if (boss.y > lowLimit) boss.vy = -Math.abs(boss.vy);

    const leftBound = currentLevel.bossTrigger + 10;
    const rightBound = currentLevel.width - 170;
    if (boss.x < leftBound) boss.dir = 1;
    if (boss.x + boss.w > rightBound) boss.dir = -1;

    if (boss.dashTimer > 0) {
      boss.dashTimer--;
      boss.x += boss.dir * (boss.phase === 3 ? 2.6 : 1.8);
    }

    boss.attackTimer--;
    if (boss.attackTimer <= 0) {
      const baseInterval = boss.phase === 1 ? 96 : boss.phase === 2 ? 74 : 56;
      boss.attackTimer = baseInterval + Math.random() * (boss.phase === 3 ? 25 : 40);
      boss.attackType = (boss.attackType + 1) % 4;

      if (boss.attackType === 0) {
        const volleys = boss.phase === 1 ? 3 : boss.phase === 2 ? 4 : 5;
        for (let i = 0; i < volleys; i++) {
          scheduleManagedTimeout(() => {
            if (!boss || boss.dead || boss.kind !== 'drakoptero' || gameState !== STATE.PLAY) return;
            const mouthX = boss.x + (boss.dir > 0 ? boss.w + 4 : -10);
            const mouthY = boss.y + boss.h * 0.48;
            const spread = boss.phase === 1 ? [-0.35, 0.15] : boss.phase === 2 ? [-0.7, 0, 0.7] : [-1.0, -0.45, 0, 0.45, 1.0];
            for (const vy of spread) {
              spawnBullet(mouthX, mouthY + i * 2, boss.dir, { damage: boss.phase === 3 ? 18 : 14, color: i % 2 === 0 ? '#ff6600' : '#ffbb33', speed: boss.phase === 3 ? 5.7 : 5.0, size: boss.phase === 3 ? 8 : 7, enemy: true, life: 92, vy });
            }
            sfxFlamethrower();
          }, i * 90);
        }
      } else if (boss.attackType === 1) {
        const bombs = boss.phase === 1 ? 3 : boss.phase === 2 ? 5 : 7;
        for (let i = 0; i < bombs; i++) {
          const bx = boss.x + 18 + Math.random() * (boss.w - 36);
          const drift = (Math.random() - 0.5) * (boss.phase === 3 ? 1.4 : 0.8);
          bullets.push({ x: bx, y: boss.y + boss.h - 4, vx: drift, vy: 2.6 + Math.random() * 0.6, damage: boss.phase === 3 ? 28 : 24, color: '#ff4400', size: 8, life: 130, enemy: true, bomb: true, super: false });
        }
      } else if (boss.attackType === 2) {
        const dy = player.y - boss.y;
        boss.vy = dy * 0.035;
        boss.dir = player.x > boss.x ? 1 : -1;
        boss.dashTimer = boss.phase === 1 ? 18 : boss.phase === 2 ? 28 : 36;
        if (boss.phase >= 2) {
          const clawY = boss.y + boss.h * 0.62;
          for (const vy of [-0.9, 0, 0.9]) {
            spawnBullet(boss.x + boss.w / 2, clawY, boss.dir, { damage: 16, color: '#ffaa22', speed: 5.2, size: 6, enemy: true, life: 80, vy });
          }
        }
      } else {
        const ring = boss.phase === 1 ? [-1.2, -0.4, 0.4, 1.2] : boss.phase === 2 ? [-1.6, -0.8, 0, 0.8, 1.6] : [-2.0, -1.2, -0.4, 0.4, 1.2, 2.0];
        const centerX = boss.x + boss.w * 0.55;
        const centerY = boss.y + boss.h * 0.55;
        for (const vy of ring) {
          spawnBullet(centerX, centerY, -1, { damage: 13, color: '#ffd166', speed: 4.4 + boss.phase * 0.2, size: 6, enemy: true, life: 96, vy });
          spawnBullet(centerX, centerY, 1, { damage: 13, color: '#ffd166', speed: 4.4 + boss.phase * 0.2, size: 6, enemy: true, life: 96, vy });
        }
      }
    }

    bullets.filter(b => b.bomb && b.enemy).forEach(b => {
      if (b.y > 305) {
        spawnParticles(b.x, b.y, '#ff4400', 16);
        spawnParticles(b.x, b.y, '#ffaa22', 8);
        b.life = 0;
        if (Math.abs(b.x - (player.x + player.w / 2)) < 44) damagePlayer(25);
      }
    });

    if (overlaps({ x: player.x, y: player.y, w: player.w, h: player.h }, { x: boss.x + 14, y: boss.y + 20, w: boss.w - 28, h: boss.h - 16 })) {
      damagePlayer(1.0);
    }
    return;
  }

  const hpFrac = boss.hp / boss.maxHp;
  boss.phase = hpFrac <= 0.33 ? 3 : hpFrac <= 0.66 ? 2 : 1;
  boss.cooldown--;

  if (boss.kind === 'metro_titan') {
    if (bossIntroTimer > 0) {
      bossIntroTimer--;
      boss.enragedFlash = Math.max(boss.enragedFlash || 0, 8);
      boss.vx = 0;
      boss.vy = 0;
      boss.x = currentLevel.width - 196;
      boss.y = GROUND_Y - boss.h;
      return;
    }

    let newPhase = boss.phase;
    if (boss.phase === 1 && hpFrac <= 0.58) newPhase = 2;
    if (boss.phase === 2 && hpFrac <= 0.24) newPhase = 3;
    if (newPhase !== boss.phase) {
      boss.phase = newPhase;
      boss.enragedFlash = 56;
      flashText = `METRO TITAN FASE ${boss.phase}`;
      flashTimer = 100;
      spawnParticles(boss.x + boss.w / 2, boss.y + boss.h / 2, boss.phase === 3 ? '#ff5ec4' : '#22d3ee', 28, 1.35);
      sfxCheckpoint();
    }
    if (boss.enragedFlash > 0) boss.enragedFlash--;

    boss.cooldown--;
    boss.attackTimer--;
    boss.jumpCd--;
    boss.dir = player.x > boss.x ? 1 : -1;

    const moveSpeed = boss.phase === 1 ? 0.7 : boss.phase === 2 ? 1.15 : 1.7;
    if (boss.dashTimer > 0) {
      boss.dashTimer--;
      boss.vx = boss.dir * (boss.phase === 3 ? 4.9 : 3.8);
      if (boss.dashTimer % 4 === 0) spawnParticles(boss.x + boss.w * 0.5, boss.y + boss.h - 10, '#22d3ee', 2, 0.35, { shape: 'spark', glow: 6, size: 2 });
    } else {
      const targetX = player.x > boss.x ? 1 : -1;
      boss.vx += targetX * 0.12;
      boss.vx *= 0.88;
      boss.vx = Math.max(-moveSpeed, Math.min(moveSpeed, boss.vx));
    }

    boss.x += boss.vx;
    const leftBound = currentLevel.bossTrigger + 16;
    const rightBound = currentLevel.width - boss.w - 18;
    if (boss.x < leftBound) { boss.x = leftBound; boss.vx = Math.abs(boss.vx) * 0.4; }
    if (boss.x > rightBound) { boss.x = rightBound; boss.vx = -Math.abs(boss.vx) * 0.4; }

    boss.vy += boss.phase === 3 ? 0.42 : 0.35;
    boss.y += boss.vy;
    if (boss.y + boss.h >= GROUND_Y) {
      const wasAir = !boss.onGround;
      boss.y = GROUND_Y - boss.h;
      boss.vy = 0;
      boss.onGround = true;
      if (wasAir && boss.phase >= 2) {
        const slamSpread = boss.phase === 2 ? [-1.1, -0.5, 0.5, 1.1] : [-1.5, -0.9, -0.3, 0.3, 0.9, 1.5];
        for (const vy of slamSpread) {
          spawnBullet(boss.x + boss.w * 0.5, boss.y + boss.h - 8, -1, { damage: boss.phase === 3 ? 16 : 13, color: '#4cc9f0', speed: boss.phase === 3 ? 5.2 : 4.6, size: 6, enemy: true, life: 86, vy });
          spawnBullet(boss.x + boss.w * 0.5, boss.y + boss.h - 8, 1, { damage: boss.phase === 3 ? 16 : 13, color: '#4cc9f0', speed: boss.phase === 3 ? 5.2 : 4.6, size: 6, enemy: true, life: 86, vy });
        }
        spawnParticles(boss.x + boss.w * 0.5, boss.y + boss.h - 6, '#22d3ee', 22, 1.1);
      }
    } else {
      boss.onGround = false;
    }

    if (boss.onGround && boss.phase >= 2 && boss.jumpCd <= 0) {
      boss.vy = boss.phase === 3 ? -8.9 : -7.4;
      boss.jumpCd = boss.phase === 3 ? 62 : 86;
    }

    if (boss.attackTimer <= 0) {
      boss.attackType = (boss.attackType + 1) % 4;
      boss.attackTimer = boss.phase === 1 ? 70 : boss.phase === 2 ? 54 : 40;

      if (boss.attackType === 0) {
        const lanes = boss.phase === 1 ? [24, 52] : boss.phase === 2 ? [20, 44, 68] : [18, 36, 54, 72];
        for (const yOff of lanes) {
          spawnBullet(boss.x + 6, boss.y + yOff, -1, { damage: boss.phase === 3 ? 15 : 12, color: '#7df9ff', speed: boss.phase === 3 ? 5.8 : 5.0, size: 6, enemy: true, life: 94 });
        }
      } else if (boss.attackType === 1) {
        const spread = boss.phase === 1 ? [-0.5, 0, 0.5] : boss.phase === 2 ? [-1.0, -0.35, 0.35, 1.0] : [-1.3, -0.7, 0, 0.7, 1.3];
        for (const vy of spread) {
          spawnBullet(boss.x + 10, boss.y + 36, -1, { damage: boss.phase === 3 ? 14 : 11, color: '#ff5ec4', speed: boss.phase === 3 ? 5.4 : 4.8, size: boss.phase === 3 ? 7 : 6, enemy: true, life: 96, vy });
        }
      } else if (boss.attackType === 2) {
        boss.dashTimer = boss.phase === 1 ? 16 : boss.phase === 2 ? 24 : 32;
        if (boss.phase >= 2) {
          for (const vy of [-0.9, 0, 0.9]) {
            spawnBullet(boss.x + boss.w * 0.46, boss.y + 58, boss.dir, { damage: 13, color: '#22d3ee', speed: 5.0, size: 5, enemy: true, life: 84, vy });
          }
        }
      } else {
        const bursts = boss.phase === 1 ? 3 : boss.phase === 2 ? 4 : 5;
        for (let i = 0; i < bursts; i++) {
          scheduleManagedTimeout(() => {
            if (!boss || boss.kind !== 'metro_titan' || gameState !== STATE.PLAY) return;
            const count = boss.phase === 3 ? 6 : 4;
            for (let j = 0; j < count; j++) {
              const drift = -1.0 + j * (2.0 / Math.max(1, count - 1));
              bullets.push({ x: boss.x + 24 + Math.random() * (boss.w - 48), y: boss.y + 16, vx: drift * 0.7, vy: 2.8 + Math.random() * 0.35, damage: boss.phase === 3 ? 16 : 12, color: '#7df9ff', size: 6, life: 116, enemy: true, bomb: true, super: false });
            }
          }, i * 120);
        }
      }
    }

    bullets.filter(b => b.bomb && b.enemy && b.color === '#7df9ff').forEach(b => {
      if (b.y > 304) {
        spawnParticles(b.x, b.y, '#7df9ff', 14, 0.9);
        spawnParticles(b.x, b.y, '#ff5ec4', 8, 0.7);
        b.life = 0;
        if (Math.abs(b.x - (player.x + player.w / 2)) < 52) damagePlayer(boss.phase === 3 ? 24 : 18);
      }
    });

    if (overlaps({ x: player.x, y: player.y, w: player.w, h: player.h }, { x: boss.x + 10, y: boss.y + 10, w: boss.w - 20, h: boss.h - 10 })) {
      damagePlayer(boss.phase === 3 ? 1.4 : 1.0);
    }
    return;
  }

  if (boss.kind === 'heli') {
    boss.phase = hpFrac <= 0.33 ? 3 : hpFrac <= 0.66 ? 2 : 1;
    boss.t += 0.04 + boss.phase * 0.01;
    const minY = 112;
    const maxY = 178;
    const amp = boss.phase === 1 ? 18 : boss.phase === 2 ? 26 : 32;
    boss.y = 144 + Math.sin(boss.t) * amp;
    boss.y = Math.max(minY, Math.min(maxY, boss.y));
    boss.x = currentLevel.width - 180 + Math.sin(boss.t * 0.7) * (boss.phase >= 2 ? 26 : 14);
    if (boss.cooldown <= 0) {
      if (boss.phase === 1) {
        spawnBullet(boss.x - 5, boss.y + 18, -1, { damage: 10, color: '#ffe477', speed: 4.2, size: 6, enemy: true, life: 88 });
        spawnBullet(boss.x + 18, boss.y + 24, -1, { damage: 10, color: '#ffe477', speed: 4.5, size: 6, enemy: true, life: 88 });
        boss.cooldown = 30;
      } else if (boss.phase === 2) {
        for (const vy of [-0.8, 0, 0.8]) spawnBullet(boss.x, boss.y + 24, -1, { damage: 10, color: '#ffdd55', speed: 4.6, size: 6, enemy: true, life: 88, vy });
        boss.cooldown = 24;
      } else {
        for (const vy of [-1.2, -0.6, 0, 0.6, 1.2]) spawnBullet(boss.x + 6, boss.y + 22, -1, { damage: 11, color: '#ffcc44', speed: 4.8, size: 6, enemy: true, life: 92, vy });
        boss.cooldown = 18;
      }
    }
  }
}

function updateCombat() {
  for (const b of bullets) {
    if (!b.enemy) {
      const box = { x: b.x - 3, y: b.y - 3, w: 6, h: 6 };
      for (const e of enemies) {
        if (e.dead) continue;
        if (overlaps(box, { x: e.x, y: e.y, w: e.w, h: e.h })) {
          e.hp -= b.damage;
          b.life = 0;
          spawnParticles(b.x, b.y, b.super ? '#ffe477' : '#88ffff', b.super ? 7 : 4);
          if (e.hp <= 0) {
            e.dead = true;
            e.fade = 24;
            player.stageKills++;
            score += ENEMY_TYPES[e.type].score;
            spawnParticles(e.x + e.w / 2, e.y + e.h / 2, ENEMY_TYPES[e.type].color, 10);
          }
          break;
        }
      }
      if (boss && !boss.dead && overlaps(box, { x: boss.x, y: boss.y, w: boss.w, h: boss.h })) {
        boss.hp -= b.damage;
        b.life = 0;
        sfxBossHit();
        spawnParticles(b.x, b.y, boss.kind === 'drakoptero' ? '#ff6600' : (b.super ? '#ffe477' : '#88ffff'), boss.kind === 'drakoptero' ? 4 : (b.super ? 8 : 4));
        if (boss.hp <= 0) {
          resetTransientRuntime();
          if (boss.kind === 'drakoptero') {
            boss.dead = true;
            boss.deathTimer = 180;
            spawnParticles(boss.x + 60, boss.y + 40, '#ff6600', 40);
            spawnParticles(boss.x + 60, boss.y + 40, '#ffd700', 30);
            stopBGMusic();
            sfxWin();
          } else if (boss.kind === 'metro_titan') {
            pickups.push({ x: boss.x + boss.w * 0.5, y: boss.y + 30, type: 'tesla_lash', reward: 'tesla', taken: false, special: true });
            bossDefeated = true;
            bossArenaLocked = false;
            stopBGMusic();
            sfxWin();
            spawnParticles(boss.x + boss.w / 2, boss.y + boss.h / 2, '#22d3ee', 28, 1.1);
            spawnParticles(boss.x + boss.w / 2, boss.y + boss.h / 2, '#ff5ec4', 18, 0.9);
            boss = null;
          } else {
            levelClearMessage = `${currentLevel.bossName} KO`;
            boss = null;
            bossArenaLocked = false;
            stopBGMusic();
            sfxWin();
            if (levelIndex === LEVELS.length - 1) gameState = STATE.WIN;
            else showStageStats(levelClearMessage);
          }
        }
      }
    } else {
      const hitBox = { x: b.x - 3, y: b.y - 3, w: 6, h: 6 };
      if (overlaps(hitBox, { x: player.x, y: player.y, w: player.w, h: player.h })) {
        b.life = 0;
        damagePlayer(b.damage * 0.5);
      }
    }
  }
}

function updatePickups() {
  for (const p of pickups) {
    if (p.taken) continue;
    if (overlaps({ x: player.x, y: player.y, w: player.w, h: player.h }, { x: p.x - 8, y: p.y - 8, w: 16, h: 16 })) {
      p.taken = true;
      if (p.type === 'heal') player.hp = Math.min(player.maxHp, player.hp + 30);
      if (p.type === 'super') player.superEnergy = Math.min(player.superMax, player.superEnergy + 100);
      if (p.type === 'flamethrower') {
        specialWeaponUnlocked = true;
        specialWeaponType = 'flame';
        player.superEnergy = player.superMax;
        score += 250;
        levelClearMessage = 'FLAMETHROWER ACQUIRED';
        flashText = 'FLAMETHROWER';
        flashTimer = 100;
        stopBGMusic();
        bossArenaLocked = false;
        boss = null;
        showStageStats(levelClearMessage || 'FLAMETHROWER ACQUIRED');
      }
      if (p.type === 'tesla_lash') {
        specialWeaponUnlocked = true;
        specialWeaponType = 'tesla';
        player.superEnergy = player.superMax;
        score += 300;
        levelClearMessage = 'TESLA LASH ACQUIRED';
        flashText = 'TESLA LASH';
        flashTimer = 100;
        stopBGMusic();
        bossArenaLocked = false;
        boss = null;
        if (levelIndex === LEVELS.length - 1) {
          campaignCleared = true;
          gameState = STATE.WIN;
        } else {
          showStageStats(levelClearMessage || 'TESLA LASH ACQUIRED');
        }
      }
      score += (p.type === 'flamethrower' || p.type === 'tesla_lash') ? 0 : 40;
      sfxPickup();
      spawnParticles(p.x, p.y, p.type === 'heal' ? '#88ff88' : (p.type === 'flamethrower' ? '#ff6600' : p.type === 'tesla_lash' ? '#22d3ee' : '#88ffff'), 10);
      if (p.x > checkpointX + 500 && !bossArenaLocked) {
        checkpointX = p.x - 120;
        sfxCheckpoint();
      }
    }
  }
}

function updateWorld() {
  if (bossIntroTimer > 0) {
    updateBoss();
    updateParticles();
    updateCamera();
    if (flashTimer > 0) flashTimer--;
    return;
  }
  updatePlayer();
  updateBullets();
  updateEnemies();
  updateBoss();
  updateCombat();
  updatePickups();
  updateHostages();
  updateAzure();
  updateParticles();
  updateCamera();
  if (flashTimer > 0) flashTimer--;
}
