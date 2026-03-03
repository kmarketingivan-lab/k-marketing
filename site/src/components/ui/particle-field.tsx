"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

interface Props {
  color?: string;
  particleCount?: number;
  maxConnectionDist?: number;
  mouseRadius?: number;
  className?: string;
}

export function ParticleField({
  color = "6,7,36",
  particleCount = 80,
  maxConnectionDist = 100,
  mouseRadius = 180,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

    const initParticles = useCallback(
    (w: number, h: number) => {
      // Reduce particles on mobile for performance
      const isMobile = w < 768;
      const count = isMobile
        ? Math.min(Math.round(particleCount * 0.3), 120)
        : particleCount;
      particlesRef.current = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() < 0.15 ? Math.random() * 3 + 1.5 : Math.random() * 1 + 0.2,
          alpha: Math.random() < 0.15 ? Math.random() * 0.15 + 0.06 : Math.random() * 0.12 + 0.03,
        };
      });
    },
    [particleCount],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = true;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouse);
      parent.addEventListener("mouseleave", handleLeave);
    }

    // IntersectionObserver: pause RAF when canvas is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = !!entry?.isIntersecting;
        if (isVisible && !rafRef.current) {
          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { rootMargin: "100px" },
    );
    observer.observe(canvas);

    const animate = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const pts = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of pts) {
        // Mouse interaction — slingshot effect
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius;
          if (dist > 30) {
            // Attract when far
            p.vx += (dx / dist) * force * 0.04;
            p.vy += (dy / dist) * force * 0.04;
          } else {
            // Repel hard when close — slingshot launch
            const repel = (30 - dist) / 30;
            p.vx -= (dx / dist) * repel * 1.8;
            p.vy -= (dy / dist) * repel * 1.8;
          }
        }

        // Gentle floating drift (no return to base)
        p.vx += (Math.random() - 0.5) * 0.04;
        p.vy += (Math.random() - 0.5) * 0.04;

        // Damping (less friction so slingshot carries)
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.alpha})`;
        ctx.fill();
      }

      // Connections (skip if disabled)
      if (maxConnectionDist > 0) {
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const pi = pts[i]!;
            const pj = pts[j]!;
            const ddx = pi.x - pj.x;
            const ddy = pi.y - pj.y;
            const d = Math.sqrt(ddx * ddx + ddy * ddy);
            if (d < maxConnectionDist) {
              const a = (1 - d / maxConnectionDist) * 0.12;
              ctx.strokeStyle = `rgba(${color},${a})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
              ctx.stroke();
            }
          }
        }
      }

      if (isVisible) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = 0;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      observer.disconnect();
      window.removeEventListener("resize", resize);
      parent?.removeEventListener("mousemove", handleMouse);
      parent?.removeEventListener("mouseleave", handleLeave);
    };
  }, [color, maxConnectionDist, mouseRadius, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
      role="presentation"
    />
  );
}