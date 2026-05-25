(function () {
  'use strict';

  // Canvas and Context
  const container = document.getElementById('canvas-container');
  const canvas = document.getElementById('fluid-canvas');
  const ctx = canvas.getContext('2d');

  // UI Elements for bindings
  const elParticlesStat = document.getElementById('stats-particles');
  const elSpeedVal = document.getElementById('val-speed');
  const elDensityVal = document.getElementById('val-density');
  const elGravityVal = document.getElementById('val-gravity');
  const elFpsVal = document.getElementById('val-fps');

  const inputSpeed = document.getElementById('control-speed');
  const inputDensity = document.getElementById('control-density');
  const inputGravity = document.getElementById('control-gravity');
  const modeButtons = document.querySelectorAll('.mode-btn');

  // Simulation State
  let width = 0;
  let height = 0;
  let dpr = 1;
  let isRunning = true;
  let animationFrameId = null;
  let lastTime = performance.now();
  let fpsInterval = 1000;
  let frameCount = 0;
  let time = 0;

  // Sandbox Customizable Parameters
  const params = {
    mode: 'hybrid', // 'hybrid' | 'fluid' | 'geometric'
    speed: 1.0,
    density: 120,
    gravity: 1.5,
  };

  // Mouse State
  const mouse = {
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    radius: 200,
    active: false,
    lerpFactor: 0.1,
  };

  // Lists of render objects
  let particles = [];
  let gridPoints = [];
  let shapes = [];

  // Color Interpolation (Lime HSL: 87, 73%, 65% | Cyan HSL: 187, 86%, 60%)
  const LIME_HUE = 87;
  const LIME_SAT = 73;
  const LIME_LIG = 65;

  const CYAN_HUE = 187;
  const CYAN_SAT = 86;
  const CYAN_LIG = 60;

  function getColor(t, alpha = 1) {
    const h = LIME_HUE + t * (CYAN_HUE - LIME_HUE);
    const s = LIME_SAT + t * (CYAN_SAT - LIME_SAT);
    const l = LIME_LIG + t * (CYAN_LIG - LIME_LIG);
    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
  }

  // ==========================================
  // OBJECT DEFINITIONS: PARTICLES (FLUID)
  // ==========================================
  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initFull = false) {
      this.x = Math.random() * width;
      this.y = initFull ? Math.random() * height : height + 10;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = -Math.random() * 1.5 - 0.5;
      this.size = Math.random() * 2 + 1;
      this.colorT = Math.random(); // Mix factor
      this.alpha = Math.random() * 0.4 + 0.2;
      this.history = [];
      this.maxHistory = Math.floor(Math.random() * 8) + 4;
      this.speedScale = Math.random() * 0.4 + 0.8;
    }

    update() {
      // Vector field calculation (fluid simulation)
      // Layered sine/cosine representing noise-based flow
      const scale = 0.003;
      const angle = Math.sin(this.x * scale + time * 0.5) * Math.cos(this.y * scale + time * 0.3) * Math.PI * 2.5;

      // Base forces
      let ax = Math.cos(angle) * 0.15;
      let ay = Math.sin(angle) * 0.15 - 0.02; // Slight upward buoyancy

      // Interactive mouse attraction/repulsion
      if (mouse.x > -500) {
        const dx = this.x - mouse.x;
        const db = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + db * db);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * params.gravity * 0.5;
          // Repel force
          ax += (dx / dist) * force;
          ay += (db / dist) * force;
        }
      }

      // Apply acceleration and velocity
      this.vx += ax * params.speed * this.speedScale;
      this.vy += ay * params.speed * this.speedScale;

      // Apply drag
      this.vx *= 0.98;
      this.vy *= 0.98;

      // Store history for sleek trail rendering
      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > this.maxHistory) {
        this.history.shift();
      }

      this.x += this.vx;
      this.y += this.vy;

      // Re-spawn logic if off-screen
      if (this.x < -20 || this.x > width + 20 || this.y < -20 || this.y > height + 20) {
        this.reset(false);
      }
    }

    draw() {
      if (this.history.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 1; i < this.history.length; i++) {
        ctx.lineTo(this.history[i].x, this.history[i].y);
      }

      // Create glowing gradient stroke
      ctx.strokeStyle = getColor(this.colorT, this.alpha);
      ctx.lineWidth = this.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  }

  // ==========================================
  // OBJECT DEFINITIONS: WARPING GRID (GEOMETRIC)
  // ==========================================
  function initGrid() {
    gridPoints = [];
    const spacing = 45;
    const pad = 10;
    
    for (let x = pad; x < width; x += spacing) {
      for (let y = pad; y < height; y += spacing) {
        gridPoints.push({
          x0: x,
          y0: y,
          x: x,
          y: y,
          vx: 0,
          vy: 0,
        });
      }
    }
  }

  function updateGrid() {
    const gridLen = gridPoints.length;
    for (let i = 0; i < gridLen; i++) {
      const p = gridPoints[i];
      
      // Default rest state forces (spring stiffness)
      let dx = p.x0 - p.x;
      let dy = p.y0 - p.y;
      
      let ax = dx * 0.08;
      let ay = dy * 0.08;

      // Warp forces based on mouse presence
      if (mouse.x > -500) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          const force = (1 - mdist / mouse.radius) * params.gravity * 22;
          // Warp pushing away from cursor
          ax += (mdx / mdist) * force;
          ay += (mdy / mdist) * force;
        }
      }

      // Warp forces based on waves
      const wave = Math.sin(p.x0 * 0.005 + time * 0.8) * Math.cos(p.y0 * 0.005 + time * 0.5) * 4;
      ax += Math.cos(p.x0) * wave * 0.02;
      ay += Math.sin(p.y0) * wave * 0.02;

      // Update velocity and apply friction
      p.vx = (p.vx + ax) * 0.82;
      p.vy = (p.vy + ay) * 0.82;

      p.x += p.vx;
      p.y += p.vy;
    }
  }

  function drawGrid() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    const gridLen = gridPoints.length;
    
    for (let i = 0; i < gridLen; i++) {
      const p = gridPoints[i];
      
      // Distance check to colorize dot glows
      let colorVal = 0.5;
      if (mouse.x > -500) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          colorVal = 1 - (dist / mouse.radius);
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2 + colorVal * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = getColor(colorVal, 0.08 + colorVal * 0.22);
      ctx.fill();
    }
  }

  // ==========================================
  // OBJECT DEFINITIONS: MORPHING SHAPES
  // ==========================================
  class GeometricShape {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 60 + 40;
      this.sides = [3, 6, 8, 20][Math.floor(Math.random() * 4)]; // Triangles, Hexagons, Octagons, Circles
      this.angle = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.005;
      this.morphPhase = Math.random() * 100;
      this.morphSpeed = Math.random() * 0.01 + 0.005;
      this.colorT = Math.random();
    }

    update() {
      this.x += this.vx * params.speed;
      this.y += this.vy * params.speed;
      this.angle += this.rotationSpeed * params.speed;
      this.morphPhase += this.morphSpeed * params.speed;

      // Push off mouse
      if (mouse.x > -500) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius + this.radius) {
          const force = (1 - dist / (mouse.radius + this.radius)) * 0.6;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }
      }

      // Drag friction
      this.vx *= 0.98;
      this.vy *= 0.98;

      // Screen containment boundaries
      if (this.x < -this.radius) this.x = width + this.radius;
      if (this.x > width + this.radius) this.x = -this.radius;
      if (this.y < -this.radius) this.y = height + this.radius;
      if (this.y > height + this.radius) this.y = -this.radius;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      ctx.beginPath();
      
      // Draw morphing vertices
      for (let i = 0; i < this.sides; i++) {
        const itemAngle = (i / this.sides) * Math.PI * 2;
        // Morph the radius slightly using sine waves
        const warp = Math.sin(this.morphPhase + itemAngle * 3) * (this.radius * 0.12);
        const r = this.radius + warp;
        
        const vx = Math.cos(itemAngle) * r;
        const vy = Math.sin(itemAngle) * r;

        if (i === 0) {
          ctx.moveTo(vx, vy);
        } else {
          ctx.lineTo(vx, vy);
        }
      }

      ctx.closePath();

      // Create styling stroke & fills
      const strokeGrad = ctx.createLinearGradient(-this.radius, -this.radius, this.radius, this.radius);
      strokeGrad.addColorStop(0, getColor(this.colorT, 0.22));
      strokeGrad.addColorStop(1, getColor(1 - this.colorT, 0.22));

      ctx.strokeStyle = strokeGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Subtle fill
      ctx.fillStyle = getColor(this.colorT, 0.015);
      ctx.fill();

      ctx.restore();
    }
  }

  function initShapes() {
    shapes = [];
    const count = Math.min(8, Math.max(4, Math.floor((width * height) / 180000)));
    for (let i = 0; i < count; i++) {
      shapes.push(new GeometricShape());
    }
  }

  // ==========================================
  // CORE SIMULATION UPDATE & DRAW LOOP
  // ==========================================
  function adjustParticles() {
    const diff = params.density - particles.length;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        particles.push(new Particle());
      }
    } else if (diff < 0) {
      particles.splice(diff);
    }
  }

  function resize() {
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    
    // Scale for high DPR/Retina crispness
    dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initGrid();
    initShapes();
    adjustParticles();
  }

  function update() {
    time += 0.01 * params.speed;

    // Smooth mouse coordinates lerp
    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * mouse.lerpFactor;
      mouse.y += (mouse.targetY - mouse.y) * mouse.lerpFactor;
    } else {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    if (params.mode === 'hybrid' || params.mode === 'fluid') {
      const partLen = particles.length;
      for (let i = 0; i < partLen; i++) {
        particles[i].update();
      }
    }

    if (params.mode === 'hybrid' || params.mode === 'geometric') {
      updateGrid();
      const shapeLen = shapes.length;
      for (let i = 0; i < shapeLen; i++) {
        shapes[i].update();
      }
    }
  }

  function draw() {
    // Semi-transparent clear to allow clean movement rendering trails
    ctx.fillStyle = 'rgba(7, 12, 14, 0.2)';
    ctx.fillRect(0, 0, width, height);

    if (params.mode === 'hybrid' || params.mode === 'geometric') {
      drawGrid();
      
      const shapeLen = shapes.length;
      for (let i = 0; i < shapeLen; i++) {
        shapes[i].draw();
      }
    }

    if (params.mode === 'hybrid' || params.mode === 'fluid') {
      const partLen = particles.length;
      for (let i = 0; i < partLen; i++) {
        particles[i].draw();
      }
    }
  }

  function loop(timestamp) {
    if (!isRunning) return;

    // FPS Calculations
    frameCount++;
    if (timestamp > lastTime + fpsInterval) {
      const fps = Math.round((frameCount * 1000) / (timestamp - lastTime));
      elFpsVal.textContent = `${fps} FPS`;
      frameCount = 0;
      lastTime = timestamp;
      
      // Update Live UI Stats
      if (elParticlesStat) {
        elParticlesStat.textContent = particles.length + shapes.length + gridPoints.length;
      }
    }

    update();
    draw();

    animationFrameId = requestAnimationFrame(loop);
  }

  // ==========================================
  // CONTROLS & BINDINGS SETUP
  // ==========================================
  function bindUI() {
    // Inputs Sliders
    inputSpeed.addEventListener('input', (e) => {
      params.speed = parseFloat(e.target.value);
      elSpeedVal.textContent = `${params.speed.toFixed(1)}x`;
    });

    inputDensity.addEventListener('input', (e) => {
      params.density = parseInt(e.target.value, 10);
      elDensityVal.textContent = params.density;
      adjustParticles();
    });

    inputGravity.addEventListener('input', (e) => {
      params.gravity = parseFloat(e.target.value);
      elGravityVal.textContent = params.gravity.toFixed(1);
    });

    // Render Mode Toggles
    modeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        modeButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        params.mode = e.target.getAttribute('data-mode');
      });
    });

    // Expand/Collapse Control Panel
    const header = document.getElementById('controls-header');
    const toggle = document.getElementById('controls-toggle');
    const panel = document.getElementById('controls-panel');
    
    header.addEventListener('click', () => {
      panel.classList.toggle('collapsed');
      toggle.textContent = panel.classList.contains('collapsed') ? '▼' : '▲';
    });

    // Mouse Listeners
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    window.addEventListener('resize', resize);
  }

  // ==========================================
  // EFFICIENT BACKGROUND PROCESSING STATE MANAGER
  // ==========================================
  function startSimulation() {
    if (!isRunning) {
      isRunning = true;
      lastTime = performance.now();
      frameCount = 0;
      loop(lastTime);
      console.log('Canvas engine RESUMED execution loop.');
    }
  }

  function stopSimulation() {
    if (isRunning) {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      console.log('Canvas engine PAUSED execution loop.');
    }
  }

  function setupBackgroundProcessing() {
    // 1. Detect support for content-visibility & contentvisibilityautostatechange
    const isCVSupported = 'contentVisibility' in document.documentElement.style;

    if (isCVSupported) {
      console.log('content-visibility supported natively. Attaching performance event listener.');
      
      // Hook up to the container with content-visibility applied
      container.addEventListener('contentvisibilityautostatechange', (event) => {
        if (event.skipped) {
          stopSimulation();
        } else {
          startSimulation();
        }
      });
    } else {
      console.log('content-visibility NOT supported natively. Falling back to IntersectionObserver.');
      
      // Fallback implementation using IntersectionObserver
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startSimulation();
          } else {
            stopSimulation();
          }
        });
      }, {
        rootMargin: '200px' // Pre-render buffer margin
      });

      observer.observe(container);
    }

    // 2. Tab Visibility Listener (Document Page Visibility API)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopSimulation();
      } else {
        // Only resume if canvas is currently in a visible state (if using IntersectionObserver/CV)
        // Since we are fullscreen, we can check intersection manually or let the element events re-fire.
        // To be safe, resume and let CV events coordinate if skipped.
        startSimulation();
      }
    });
  }

  // ==========================================
  // INITS
  // ==========================================
  function init() {
    resize();
    bindUI();
    setupBackgroundProcessing();
    
    // Start simulation
    lastTime = performance.now();
    loop(lastTime);
  }

  // Kickoff on script load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
