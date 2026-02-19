import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulsePhase: number;
  pulseSpeed: number;
  layer: number;
}

interface DataStream {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    // --- Reduce particles on mobile for performance ---
    const isMobile = w < 768;
    const NODE_COUNT = isMobile
      ? Math.min(Math.floor((w * h) / 25000), 40)
      : Math.min(Math.floor((w * h) / 14000), 100);
    const CONNECTION_DIST = isMobile ? 140 : 180;
    const MOUSE_RADIUS = 150;

    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const layer = Math.random() < 0.3 ? 0 : Math.random() < 0.6 ? 1 : 2;
      const baseR = layer === 0 ? 1.2 : layer === 1 ? 2 : 2.8;
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (0.25 + layer * 0.1),
        vy: (Math.random() - 0.5) * (0.25 + layer * 0.1),
        radius: baseR,
        baseRadius: baseR,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        layer,
      });
    }

    // Data streams
    const streams: DataStream[] = [];
    const MAX_STREAMS = isMobile ? 5 : 12;

    // Pre-compute colors to avoid string creation in loop
    const PRIMARY_HUE = 270;
    const ACCENT_HUE = 200;
    const GLOW_HUE = 180;

    // Grid lines — draw once to offscreen canvas
    const gridCanvas = document.createElement("canvas");
    gridCanvas.width = w;
    gridCanvas.height = h;
    const gridCtx = gridCanvas.getContext("2d");
    if (gridCtx) {
      gridCtx.strokeStyle = "rgba(139, 92, 246, 0.025)";
      gridCtx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < w; x += gridSize) {
        gridCtx.beginPath();
        gridCtx.moveTo(x, 0);
        gridCtx.lineTo(x, h);
        gridCtx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        gridCtx.beginPath();
        gridCtx.moveTo(0, y);
        gridCtx.lineTo(w, y);
        gridCtx.stroke();
      }
    }

    const draw = () => {
      const mouse = mouseRef.current;

      // Background — solid fill (much faster than gradient every frame)
      ctx.fillStyle = "hsl(250, 20%, 5%)";
      ctx.fillRect(0, 0, w, h);

      // Grid overlay from cached canvas
      ctx.drawImage(gridCanvas, 0, 0);

      // --- Update & draw nodes + connections ---
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulsePhase += n.pulseSpeed;

        // Bounce
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));

        // Mouse repulsion
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_RADIUS && mDist > 0) {
          const force = ((MOUSE_RADIUS - mDist) / MOUSE_RADIUS) * 0.6;
          n.x += (mdx / mDist) * force;
          n.y += (mdy / mDist) * force;
        }

        // Pulse radius
        n.radius = n.baseRadius + Math.sin(n.pulsePhase) * 0.6;

        // Draw connections (no gradient — simple lines)
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = 1 - dist / CONNECTION_DIST;
            const hue = n.layer === 2 ? PRIMARY_HUE : ACCENT_HUE;
            ctx.strokeStyle = `hsla(${hue},60%,55%,${(alpha * 0.18).toFixed(2)})`;
            ctx.lineWidth = alpha * 1.2;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();

            // Spawn data stream rarely
            if (
              streams.length < MAX_STREAMS &&
              Math.random() < 0.0008 &&
              alpha > 0.35
            ) {
              streams.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: 0.012 + Math.random() * 0.018,
              });
            }
          }
        }

        // Draw node — simple filled circle, no radial gradient
        const pulseAlpha = 0.5 + Math.sin(n.pulsePhase) * 0.2;
        const nodeHue =
          n.layer === 2 ? PRIMARY_HUE : n.layer === 1 ? ACCENT_HUE : GLOW_HUE;

        ctx.fillStyle = `hsla(${nodeHue},70%,72%,${pulseAlpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Draw data streams ---
      for (let s = streams.length - 1; s >= 0; s--) {
        const stream = streams[s];
        stream.progress += stream.speed;
        if (stream.progress >= 1) {
          streams.splice(s, 1);
          continue;
        }

        const from = nodes[stream.fromNode];
        const to = nodes[stream.toNode];
        const sx = from.x + (to.x - from.x) * stream.progress;
        const sy = from.y + (to.y - from.y) * stream.progress;

        ctx.fillStyle = `hsla(${GLOW_HUE},100%,80%,0.85)`;
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Mouse aura — single simple circle
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.fillStyle = `hsla(${PRIMARY_HUE},60%,65%,0.04)`;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
