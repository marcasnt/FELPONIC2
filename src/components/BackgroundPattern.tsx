import { useEffect, useRef } from 'react';

// Tipo para partícula con velocidad
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const BackgroundPattern = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generar partículas
    const generateParticles = () => {
      const numParticles = Math.floor(canvas.width * canvas.height / 15000);
      const particles: Particle[] = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        });
      }
      particlesRef.current = particles;
    };

    // Actualizar y dibujar partículas
    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      // Actualizar posición y repulsión
      for (let p of particles) {
        // Repulsión si el mouse está cerca
        if (mouse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80 && dist > 0.1) {
            const force = 1.5 / dist;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }
        // Movimiento flotante random
        p.vx += (Math.random() - 0.5) * 0.06; // Cambia la dirección levemente
        p.vy += (Math.random() - 0.5) * 0.06;
        // Limita la velocidad máxima para que no se descontrole
        const maxSpeed = 1.2;
        p.vx = Math.max(-maxSpeed, Math.min(maxSpeed, p.vx));
        p.vy = Math.max(-maxSpeed, Math.min(maxSpeed, p.vy));
        // Movimiento
        p.x += p.vx;
        p.y += p.vy;
        // Fricción
        p.vx *= 0.98;
        p.vy *= 0.98;
        // Rebote en bordes
        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
      }
      // Dibujar conexiones
      ctx.strokeStyle = 'rgba(255, 204, 0, 0.1)';
      ctx.lineWidth = 0.5;
      const connectionDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      // Dibujar partículas
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 204, 0, 0.5)';
        ctx.fill();
      }
    };

    // Animación
    let animationId: number;
    const animate = () => {
      updateAndDraw();
      animationId = requestAnimationFrame(animate);
    };

    // Eventos
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = null;
    };
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateParticles();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 z-0" />
  );
};

export default BackgroundPattern;