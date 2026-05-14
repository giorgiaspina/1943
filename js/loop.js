let lastTime = 0;
function loop(ts) {
  const dt = Math.min((ts - lastTime) / 16.67, 3);
  lastTime = ts;
  ctx.clearRect(0, 0, NATIVE_W, NATIVE_H);

    if (gameState === STATE.TITLE) {
    if (pressed('Digit1')) levelIndex = 0;
    if (pressed('Digit2')) levelIndex = 1;
  }

  if (gameState === STATE.INTRO) startBGMusic();
  else if (gameState === STATE.PLAY) {
    if (!(boss && boss.kind === 'drakoptero' && boss.active && !boss.dead)) startBGMusic();
  } else stopBGMusic();

  if (window.__lastError) {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,NATIVE_W,NATIVE_H);
    ctx.fillStyle = '#ff4444'; ctx.font = '12px monospace';
    ctx.fillText('RUNTIME ERROR', 20, 40);
    const msg = String(window.__lastError);
    for (let i=0;i<Math.min(6, Math.ceil(msg.length/70));i++) ctx.fillText(msg.slice(i*70,(i+1)*70), 20, 70 + i*18);
    finishInputFrame();
    requestAnimationFrame(loop);
    return;
  }


  switch (gameState) {
    case STATE.TITLE:
      drawTitle();
      if (pressed('Space') || pressed('Enter')) { clearManagedTimeouts(); startLevel(levelIndex); }
      break;
    case STATE.INTRO:
      drawIntro();
      introTimer--;
      if (introTimer <= 0) gameState = STATE.PLAY;
      break;
    case STATE.PLAY:
      if (pressed('Escape')) { clearManagedTimeouts(); gameState = STATE.PAUSE; }
      levelTimer += dt;
      updateWorld();
      drawWorld();
      break;
    case STATE.PAUSE:
      drawPause();
      if (pressed('Escape')) { clearManagedTimeouts(); gameState = STATE.PLAY; }
      break;
    case STATE.STATS:
      drawStats();
      statsTimer--;
      if (statsTimer <= 0 && pressed('Escape')) { clearManagedTimeouts(); gameState = STATE.TITLE; }
      if (statsTimer <= 0 && (pressed('Space') || pressed('KeyJ') || pressed('KeyK'))) { clearManagedTimeouts(); startLevel((levelIndex + 1) % LEVELS.length); }
      else if (statsTimer <= -45) { clearManagedTimeouts(); startLevel((levelIndex + 1) % LEVELS.length); }
      break;
    case STATE.WIN:
      drawWin();
      if (pressed('Escape')) { clearManagedTimeouts(); gameState = STATE.TITLE; }
      if (pressed('Space') || pressed('Enter')) { clearManagedTimeouts(); levelIndex = 0; startLevel(0); }
      break;
    case STATE.GAMEOVER:
      drawGameOver();
      if (pressed('Escape')) { clearManagedTimeouts(); gameState = STATE.TITLE; }
      if (pressed('Space') || pressed('Enter')) { clearManagedTimeouts(); startLevel(levelIndex); }
      break;
  }

  finishInputFrame();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
