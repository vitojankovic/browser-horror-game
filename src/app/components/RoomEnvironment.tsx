import React, { useEffect, useRef } from 'react';
import { Scene } from '../game/types';

interface RoomEnvironmentProps {
  scene: Scene;
}

const RoomEnvironment: React.FC<RoomEnvironmentProps> = ({ scene }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Clear canvas
    ctx.fillStyle = scene.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw walls
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, canvas.width, 50); // Ceiling
    ctx.fillRect(0, 0, 50, canvas.height); // Left wall
    ctx.fillRect(canvas.width - 50, 0, 50, canvas.height); // Right wall
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50); // Floor

    // Draw light source if exists
    if (scene.lightSource) {
      const gradient = ctx.createRadialGradient(
        scene.lightSource.x * canvas.width / 100,
        scene.lightSource.y * canvas.height / 100,
        0,
        scene.lightSource.x * canvas.width / 100,
        scene.lightSource.y * canvas.height / 100,
        scene.lightSource.radius * canvas.width / 100
      );
      gradient.addColorStop(0, scene.lightSource.color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw objects
    scene.objects.forEach(obj => {
      const x = obj.position.x * canvas.width / 100;
      const y = obj.position.y * canvas.height / 100;
      const width = obj.size.width * canvas.width / 100;
      const height = obj.size.height * canvas.height / 100;

      ctx.fillStyle = obj.color;
      if (obj.shadow) {
        ctx.shadowColor = obj.shadow;
        ctx.shadowBlur = 10;
      }
      ctx.fillRect(x, y, width, height);
      ctx.shadowBlur = 0;

      // Add flickering effect if specified
      if (obj.flickering) {
        const flicker = Math.random() * 0.2 + 0.9;
        ctx.globalAlpha = flicker;
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.fillRect(x, y, width, height);
        ctx.globalAlpha = 1;
      }
    });

  }, [scene]);

  return (
    <div className="room-environment">
      <canvas 
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      />
    </div>
  );
};

export default RoomEnvironment; 