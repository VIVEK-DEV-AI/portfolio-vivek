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
  layer: number; // 0 = back, 1 = mid, 2 = front
}

interface DataStream {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  active: boolean;
}

interface FloatingShape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  sides: number;
  opacity: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    // --- Configuration ---
    const NODE_COUNT = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 12000), 120);
    const CONNECTION_DIST = 200;
    const MOUSE_RADIUS = 180;

    // --- Initialize Nodes ---
    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const layer = Math.random() < 0.3 ? 0 : Math.random() < 0.6 ? 1 : 2;
      const baseR = layer === 0 ? 1.5 : layer === 1 ? 2.5 : 3.5;
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (0.3 + layer * 0.15),
        vy: (Math.random() - 0.5) * (0.3 + layer * 0.15),
        radius: baseR,
        baseRadius: baseR,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        layer,
      });
    }

    // --- Data Streams ---
    const streams: DataStream[] = [];
    const MAX_STREAMS = 15;

    // --- Floating Shapes ---
    const shapes: FloatingShape[] = [];
    const SHAPE_COUNT = 6;
    for (let i = 0; i < SHAPE_COUNT; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        size: 30 + Math.random() * 50,
        sides: [3, 4, 5, 6][Math.floor(Math.random() * 4)],
        opacity: 0.03 + Math.random() * 0.04,
      });
    }

    // --- Helper: Draw polygon ---
    const drawPolygon = (cx: number, cy: number, r: number, sides: number, rot: number) => {
      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const angle = (i * 2 * Math.PI) / sides + rot;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    // --- Color palette ---
    const PRIMARY_HUE = 270; // Purple
    const ACCENT_HUE = 200;  // Blue
    const GLOW_HUE = 180;    // Cyan accent

    const draw = () => {
      timeRef.current += 1;
      const t = timeRef.current;
      const mouse = mouseRef.current;

      // --- Background gradient ---
      const grad = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.3, 0,
        canvas.width * 0.5, canvas.height * 0.3, canvas.width * 0.8
      );
      grad.addColorStop(0, "hsl(260, 30%, 8%)");
      grad.addColorStop(0.5, "hsl(250, 20%, 5%)");
      grad.addColorStop(1, "hsl(240, 15%, 3%)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- Grid overlay (subtle circuit board pattern) ---
      ctx.strokeStyle = "rgba(139, 92, 246, 0.03)";
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // --- Draw floating geometric shapes ---
      for (const shape of shapes) {
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.rotation += shape.rotationSpeed;
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size;

        ctx.strokeStyle = `hsla(${PRIMARY_HUE}, 60%, 65%, ${shape.opacity})`;
        ctx.lineWidth = 1;
        drawPolygon(shape.x, shape.y, shape.size, shape.sides, shape.rotation);
        ctx.stroke();
      }

      // --- Update & draw nodes ---
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulsePhase += n.pulseSpeed;

        // Bounce
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.x = Math.max(0, Math.min(canvas.width, n.x));
        n.y = Math.max(0, Math.min(canvas.height, n.y));

        // Mouse interaction — push away gently
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_RADIUS && mDist > 0) {
          const force = (MOUSE_RADIUS - mDist) / MOUSE_RADIUS * 0.8;
          n.x += (mdx / mDist) * force;
          n.y += (mdy / mDist) * force;
        }

        // Pulse radius
        n.radius = n.baseRadius + Math.sin(n.pulsePhase) * 0.8;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST);
            // Color shifts based on layer
            const hue = n.layer === 2 ? PRIMARY_HUE : ACCENT_HUE;
            ctx.strokeStyle = `hsla(${hue}, 60%, 55%, ${alpha * 0.2})`;
            ctx.lineWidth = alpha * 1.5;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();

            // Randomly spawn data streams
            if (streams.length < MAX_STREAMS && Math.random() < 0.001 && alpha > 0.3) {
              streams.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: 0.01 + Math.random() * 0.02,
                active: true,
              });
            }
          }
        }

        // Draw node with glow
        const pulseAlpha = 0.4 + Math.sin(n.pulsePhase) * 0.2;
        const nodeHue = n.layer === 2 ? PRIMARY_HUE : n.layer === 1 ? ACCENT_HUE : GLOW_HUE;

        // Outer glow
        const glowGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 4);
        glowGrad.addColorStop(0, `hsla(${nodeHue}, 70%, 65%, ${pulseAlpha * 0.3})`);
        glowGrad.addColorStop(1, `hsla(${nodeHue}, 70%, 65%, 0)`);
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `hsla(${nodeHue}, 70%, 75%, ${pulseAlpha + 0.2})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // --- Draw data streams (particles flowing along connections) ---
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

        // Bright flowing dot
        const streamGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 6);
        streamGrad.addColorStop(0, `hsla(${GLOW_HUE}, 100%, 80%, 0.9)`);
        streamGrad.addColorStop(0.5, `hsla(${PRIMARY_HUE}, 80%, 65%, 0.4)`);
        streamGrad.addColorStop(1, `hsla(${PRIMARY_HUE}, 80%, 65%, 0)`);
        ctx.fillStyle = streamGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Mouse cursor aura ---
      if (mouse.x > 0 && mouse.y > 0) {
        const auraGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS);
        auraGrad.addColorStop(0, `hsla(${PRIMARY_HUE}, 60%, 65%, 0.06)`);
        auraGrad.addColorStop(1, `hsla(${PRIMARY_HUE}, 60%, 65%, 0)`);
        ctx.fillStyle = auraGrad;
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
      style={{ background: "transparent" }}
    />
  );
};

export default ParticleBackground;
