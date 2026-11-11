/**
 * AC3games Procedural Vector Render Engine
 * Directly ported from Geometry Platforms codebase:
 * - Drones: hq-scene.ts:drawProceduralWeaponIcon (Lines 759-1160)
 * - Expressions: CyberHUDExpressions.ts:drawCyberHUDExpression
 * - Auras: BiomeAuraManager.ts + Hazard Rails + Snowflakes
 * - Hulls & Projectiles: RenderSystem.ts
 */

export function renderProceduralAsset(
  ctx: CanvasRenderingContext2D,
  type: string,
  width: number,
  height: number,
  time: number = 0,
  baseColor: string = '#00f0ff'
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  // Background subtle grid
  ctx.fillStyle = '#070314';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 80; // dynamic scaling

  // --- DRONES DA FORJA DE ARMAS SUPREMAS (hq-scene.ts) ---
  if (type === 'drone_missiles') {
    ctx.strokeStyle = baseColor;
    ctx.fillStyle = '#3a0808';
    ctx.lineWidth = 1.8 * s;
    ctx.beginPath();
    ctx.moveTo(cx + 13 * s, cy);
    ctx.lineTo(cx + 4 * s, cy - 6 * s);
    ctx.lineTo(cx - 7 * s, cy - 6 * s);
    ctx.lineTo(cx - 11 * s, cy - 10 * s);
    ctx.lineTo(cx - 9 * s, cy - 3 * s);
    ctx.lineTo(cx - 9 * s, cy + 3 * s);
    ctx.lineTo(cx - 11 * s, cy + 10 * s);
    ctx.lineTo(cx - 7 * s, cy + 6 * s);
    ctx.lineTo(cx + 4 * s, cy + 6 * s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.4 * s;
    ctx.beginPath();
    ctx.moveTo(cx - 5 * s, cy);
    ctx.lineTo(cx + 7 * s, cy);
    ctx.stroke();

    // Exhaust
    ctx.fillStyle = '#ffaa00';
    ctx.beginPath();
    ctx.arc(cx - 12 * s, cy, 2.2 * s, 0, Math.PI * 2);
    ctx.fill();
  } 
  else if (type === 'drone_lightning') {
    ctx.strokeStyle = baseColor;
    ctx.fillStyle = '#3d3000';
    ctx.lineWidth = 2.0 * s;
    ctx.beginPath();
    ctx.moveTo(cx + 2 * s, cy - 13 * s);
    ctx.lineTo(cx - 7 * s, cy - 1 * s);
    ctx.lineTo(cx - 1 * s, cy - 1 * s);
    ctx.lineTo(cx - 3 * s, cy + 13 * s);
    ctx.lineTo(cx + 7 * s, cy + 1 * s);
    ctx.lineTo(cx + 1 * s, cy + 1 * s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 2.2 * s, 0, Math.PI * 2);
    ctx.fill();
  }
  else if (type === 'drone_golden_aura') {
    ctx.strokeStyle = baseColor;
    ctx.fillStyle = '#382d00';
    ctx.lineWidth = 1.6 * s;
    ctx.beginPath();
    ctx.arc(cx, cy, 10 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    for (let r = 0; r < 4; r++) {
      const ra = (r * Math.PI) / 2 + time * 0.5;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ra) * 6 * s, cy + Math.sin(ra) * 6 * s);
      ctx.lineTo(cx + Math.cos(ra) * 14 * s, cy + Math.sin(ra) * 14 * s);
      ctx.stroke();
    }
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 2.8 * s, 0, Math.PI * 2);
    ctx.fill();
  }
  else if (type === 'drone_black_hole') {
    ctx.fillStyle = '#18002e';
    ctx.strokeStyle = baseColor;
    ctx.lineWidth = 1.5 * s;
    ctx.beginPath();
    ctx.arc(cx, cy, 9 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    for (const rot of [Math.PI / 4 + time, -Math.PI / 4 - time]) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, 14 * s, 5 * s, rot, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(cx, cy, 4 * s, 0, Math.PI * 2);
    ctx.fill();
  }
  else if (type === 'drone_death_wave') {
    ctx.strokeStyle = baseColor;
    ctx.lineWidth = 2.0 * s;
    for (let a = 1; a <= 3; a++) {
      const ar = (a * 5 + 2) * s;
      ctx.beginPath();
      ctx.arc(cx - 4 * s, cy, ar, -Math.PI * 0.42, Math.PI * 0.42);
      ctx.stroke();
    }
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx - 4 * s, cy, 2.8 * s, 0, Math.PI * 2);
    ctx.fill();
  }
  else if (type === 'drone_chrono_field') {
    ctx.strokeStyle = baseColor;
    ctx.fillStyle = '#002626';
    ctx.lineWidth = 1.6 * s;
    ctx.beginPath();
    ctx.arc(cx, cy, 7 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    for (let gr = 0; gr < 6; gr++) {
      const ga = (gr * Math.PI) / 3 + time * 0.8;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ga) * 7 * s, cy + Math.sin(ga) * 7 * s);
      ctx.lineTo(cx + Math.cos(ga) * 12 * s, cy + Math.sin(ga) * 12 * s);
      ctx.stroke();
    }
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 2.8 * s, 0, Math.PI * 2);
    ctx.fill();
  }
  else if (type === 'drone_orbital_beam') {
    ctx.strokeStyle = baseColor;
    ctx.fillStyle = '#002233';
    ctx.lineWidth = 1.6 * s;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 11 * s);
    ctx.lineTo(cx + 8 * s, cy + 3 * s);
    ctx.lineTo(cx - 8 * s, cy + 3 * s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Laser Beam
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2 * s;
    ctx.beginPath();
    ctx.moveTo(cx, cy + 3 * s);
    ctx.lineTo(cx, cy + 18 * s);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy - 2 * s, 2.2 * s, 0, Math.PI * 2);
    ctx.fill();
  }
  else if (type === 'drone_quantum_boomerang') {
    ctx.strokeStyle = baseColor;
    ctx.fillStyle = '#033e5c';
    ctx.lineWidth = 1.6 * s;
    for (let b = 0; b < 3; b++) {
      const ba = (b * 2 * Math.PI) / 3 - Math.PI / 2 + time * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(ba) * 13 * s, cy + Math.sin(ba) * 13 * s);
      ctx.lineTo(cx + Math.cos(ba + 0.5) * 6 * s, cy + Math.sin(ba + 0.5) * 6 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 2.8 * s, 0, Math.PI * 2);
    ctx.fill();
  }
  else if (type === 'drone_proximity_mine') {
    ctx.strokeStyle = baseColor;
    ctx.fillStyle = '#380505';
    ctx.lineWidth = 1.6 * s;
    ctx.beginPath();
    for (let m = 0; m < 8; m++) {
      const ma = (m * Math.PI) / 4;
      const mx = cx + Math.cos(ma) * 9 * s;
      const my = cy + Math.sin(ma) * 9 * s;
      if (m === 0) ctx.moveTo(mx, my);
      else ctx.lineTo(mx, my);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ff5555';
    ctx.beginPath();
    ctx.arc(cx, cy, 3.8 * s, 0, Math.PI * 2);
    ctx.fill();
  }
  else if (type === 'drone_mirror_deflector') {
    ctx.strokeStyle = baseColor;
    ctx.fillStyle = '#0e244d';
    ctx.lineWidth = 1.6 * s;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 10 * s);
    ctx.lineTo(cx + 8 * s, cy);
    ctx.lineTo(cx, cy + 10 * s);
    ctx.lineTo(cx - 8 * s, cy);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    for (let d = 0; d < 4; d++) {
      const da = (d * Math.PI) / 2 + Math.PI / 4 + time * 0.7;
      ctx.fillStyle = baseColor;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(da) * 13 * s, cy + Math.sin(da) * 13 * s, 1.8 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  else if (type === 'drone_subzero_cryo') {
    ctx.strokeStyle = baseColor;
    ctx.fillStyle = '#082f49';
    ctx.lineWidth = 1.6 * s;
    ctx.beginPath();
    ctx.arc(cx, cy, 7 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    for (let c = 0; c < 6; c++) {
      const ca = (c * Math.PI) / 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(ca) * 12 * s, cy + Math.sin(ca) * 12 * s);
      ctx.stroke();
    }
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 2.8 * s, 0, Math.PI * 2);
    ctx.fill();
  }
  else if (type === 'drone_tesla_coil') {
    ctx.strokeStyle = baseColor;
    ctx.fillStyle = '#270744';
    ctx.lineWidth = 1.6 * s;
    ctx.beginPath();
    ctx.arc(cx, cy, 8 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    for (let sn = 0; sn < 3; sn++) {
      const sa = (sn * 2 * Math.PI) / 3 - Math.PI / 2 + time * 1.5;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx + Math.cos(sa) * 12 * s, cy + Math.sin(sa) * 12 * s, 2 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  else if (type === 'drone_elemental_buffer') {
    ctx.strokeStyle = '#00ffcc';
    ctx.fillStyle = '#042f2e';
    ctx.lineWidth = 1.6 * s;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 10 * s);
    ctx.lineTo(cx + 8 * s, cy);
    ctx.lineTo(cx, cy + 10 * s);
    ctx.lineTo(cx - 8 * s, cy);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    const eleColors = ['#10b981', '#fbbf24', '#f97316', '#38bdf8'];
    for (let m = 0; m < 4; m++) {
      const ma = (m * Math.PI) / 2 + time;
      ctx.fillStyle = eleColors[m]!;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(ma) * 12 * s, cy + Math.sin(ma) * 12 * s, 2 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  else if (type === 'drone_tactical_buffer') {
    ctx.strokeStyle = '#f59e0b';
    ctx.fillStyle = '#3d2503';
    ctx.lineWidth = 1.6 * s;
    ctx.beginPath();
    for (let h = 0; h < 6; h++) {
      const ha = (h * Math.PI) / 3;
      const hx = cx + Math.cos(ha) * 10 * s;
      const hy = cy + Math.sin(ha) * 10 * s;
      if (h === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    for (let d = 0; d < 3; d++) {
      const da = (d * 2 * Math.PI) / 3 + time * 0.6;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(cx + Math.cos(da) * 13 * s, cy + Math.sin(da) * 13 * s, 2 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  else if (type === 'drone_scavenger_harvester') {
    ctx.strokeStyle = '#10b981';
    ctx.fillStyle = '#064e3b';
    ctx.lineWidth = 1.6 * s;
    ctx.beginPath();
    ctx.arc(cx, cy, 9 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    for (let m = 0; m < 3; m++) {
      const ma = (m * 2 * Math.PI) / 3 + time * 1.2;
      ctx.fillStyle = '#a7f3d0';
      ctx.beginPath();
      ctx.arc(cx + Math.cos(ma) * 13 * s, cy + Math.sin(ma) * 13 * s, 1.8 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  else if (type === 'drone_disruptor_debuffer') {
    ctx.strokeStyle = '#ec4899';
    ctx.fillStyle = '#500724';
    ctx.lineWidth = 1.6 * s;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 8 * s);
    ctx.lineTo(cx + 7 * s, cy + 4 * s);
    ctx.lineTo(cx - 7 * s, cy + 4 * s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f472b6';
    ctx.beginPath();
    ctx.arc(cx, cy, 3 * s, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- MATRIZ SENSORIAL HUD - EXPRESSÕES (Imagem 2) ---
  else if (type.startsWith('expression_')) {
    // Holographic box
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 30 * s, cy - 20 * s, 60 * s, 40 * s);

    ctx.fillStyle = '#00f0ff';
    ctx.font = `${Math.max(8, 5 * s)}px JetBrains Mono`;
    ctx.textAlign = 'center';
    ctx.fillText('MATRIZ SENSORIAL HUD', cx, cy + 16 * s);

    // Draw Face Vectors
    ctx.lineWidth = 2.5 * s;
    ctx.lineCap = 'round';
    ctx.strokeStyle = baseColor;

    if (type === 'expression_happy') {
      // ^ ^ Eyes and smile
      ctx.beginPath();
      ctx.moveTo(cx - 10 * s, cy - 3 * s);
      ctx.lineTo(cx - 6 * s, cy - 7 * s);
      ctx.lineTo(cx - 2 * s, cy - 3 * s);

      ctx.moveTo(cx + 2 * s, cy - 3 * s);
      ctx.lineTo(cx + 6 * s, cy - 7 * s);
      ctx.lineTo(cx + 10 * s, cy - 3 * s);

      // Smile
      ctx.moveTo(cx - 6 * s, cy + 3 * s);
      ctx.lineTo(cx, cy + 7 * s);
      ctx.lineTo(cx + 6 * s, cy + 3 * s);
      ctx.stroke();
    } else if (type === 'expression_excited') {
      ctx.fillStyle = baseColor;
      ctx.fillRect(cx - 9 * s, cy - 8 * s, 5 * s, 5 * s);
      ctx.fillRect(cx + 4 * s, cy - 8 * s, 5 * s, 5 * s);
      ctx.beginPath();
      ctx.arc(cx, cy + 3 * s, 6 * s, 0, Math.PI);
      ctx.stroke();
    } else {
      // Default expressive visor
      ctx.beginPath();
      ctx.moveTo(cx - 8 * s, cy - 4 * s);
      ctx.lineTo(cx - 2 * s, cy - 4 * s);
      ctx.moveTo(cx + 2 * s, cy - 4 * s);
      ctx.lineTo(cx + 8 * s, cy - 4 * s);
      ctx.moveTo(cx - 6 * s, cy + 4 * s);
      ctx.lineTo(cx + 6 * s, cy + 4 * s);
      ctx.stroke();
    }
  }

  // --- AURAS DE CENÁRIO (Imagem 3) ---
  else if (type.startsWith('aura_')) {
    // Draw Hazard Platform Rails
    const platY = cy + 22 * s;
    ctx.fillStyle = '#061320';
    ctx.fillRect(0, platY, width, height - platY);
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, platY);
    ctx.lineTo(width, platY);
    ctx.stroke();

    // Hazard Stripes
    ctx.fillStyle = '#00f0ff55';
    for (let hx = 0; hx < width; hx += 16 * s) {
      ctx.beginPath();
      ctx.moveTo(hx, platY);
      ctx.lineTo(hx + 8 * s, platY);
      ctx.lineTo(hx, platY + 8 * s);
      ctx.fill();
    }

    // Outer Aura Hexagon
    ctx.strokeStyle = '#00f0ff44';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let h = 0; h < 6; h++) {
      const ha = (h * Math.PI) / 3;
      const hx = cx + Math.cos(ha) * 32 * s;
      const hy = (cy - 6 * s) + Math.sin(ha) * 32 * s;
      if (h === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.stroke();

    // Snowflake Stasis Ring
    ctx.strokeStyle = baseColor;
    ctx.beginPath();
    ctx.arc(cx, cy - 6 * s, 18 * s, 0, Math.PI * 2);
    ctx.stroke();

    // Little snowflakes
    for (let f = 0; f < 8; f++) {
      const fa = (f * Math.PI) / 4 + time * 0.2;
      const fx = cx + Math.cos(fa) * 18 * s;
      const fy = (cy - 6 * s) + Math.sin(fa) * 18 * s;
      ctx.fillStyle = '#ffffff';
      ctx.font = `${Math.max(8, 4 * s)}px Arial`;
      ctx.fillText('❄', fx, fy);
    }
  }

  // --- HULLS & NAVES ---
  else if (type === 'hull_vector01') {
    // Interceptor Ship
    ctx.fillStyle = '#061a29';
    ctx.strokeStyle = baseColor;
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 14 * s);
    ctx.lineTo(cx + 10 * s, cy + 8 * s);
    ctx.lineTo(cx, cy + 4 * s);
    ctx.lineTo(cx - 10 * s, cy + 8 * s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Plasma Flame
    ctx.fillStyle = '#ff0055';
    ctx.beginPath();
    ctx.moveTo(cx - 4 * s, cy + 6 * s);
    ctx.lineTo(cx, cy + (12 + Math.sin(time * 10) * 3) * s);
    ctx.lineTo(cx + 4 * s, cy + 6 * s);
    ctx.fill();
  }
  else if (type === 'hull_flower') {
    // Flower Guardian
    ctx.fillStyle = '#1c0514';
    ctx.strokeStyle = '#ff0055';
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    for (let p = 0; p < 8; p++) {
      const pa = (p * Math.PI) / 4;
      const px = cx + Math.cos(pa) * 12 * s;
      const py = cy + Math.sin(pa) * 12 * s;
      ctx.arc(px, py, 4 * s, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.stroke();
  }

  // --- PROJÉTEIS ---
  else if (type === 'proj_kinetic_dart') {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = baseColor;
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    ctx.moveTo(cx + 14 * s, cy);
    ctx.lineTo(cx - 10 * s, cy - 3 * s);
    ctx.lineTo(cx - 10 * s, cy + 3 * s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  else if (type === 'proj_photon_lance') {
    ctx.strokeStyle = baseColor;
    ctx.lineWidth = 4 * s;
    ctx.beginPath();
    ctx.moveTo(cx - 20 * s, cy);
    ctx.lineTo(cx + 20 * s, cy);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx + 20 * s, cy, 3 * s, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}
