'use client';

import React, { useState, useEffect } from 'react';
import { Scene } from '../types';
import GameObjectRenderer from './GameObjects';
import { GiCurledTentacle, GiGhost } from 'react-icons/gi';

interface GameSceneProps {
  currentScene: Scene;
  jumpscare: boolean;
}

export default function GameScene({ currentScene, jumpscare }: GameSceneProps) {
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [dustParticles, setDustParticles] = useState<{x: number, y: number, size: number, speed: number}[]>([]);
  
  // Generate dust particles
  useEffect(() => {
    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1
    }));
    setDustParticles(particles);
    
    // Animate particles
    const interval = setInterval(() => {
      setDustParticles(prev => 
        prev.map(p => ({
          ...p,
          y: p.y + p.speed > 100 ? 0 : p.y + p.speed,
          x: p.x + (Math.random() * 0.2 - 0.1)
        }))
      );
    }, 100);
    
    return () => clearInterval(interval);
  }, [currentScene.id]); // Regenerate when scene changes

  // Handle jumpscare effect
  useEffect(() => {
    if (jumpscare) {
      setShowJumpscare(true);
      const timer = setTimeout(() => {
        setShowJumpscare(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [jumpscare]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none" style={{ bottom: '40%' }}>
      {/* Background scene with vignette effect */}
      <div 
        className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000"
        style={{ 
          backgroundColor: currentScene.backgroundColor || '#111',
          opacity: 0.9,
          boxShadow: 'inset 0 0 100px 20px rgba(0, 0, 0, 0.9)'
        }}
      />
      
      {/* Dust particles floating in the air */}
      {dustParticles.map((particle, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-white/10"
          style={{
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.size / 4,
          }}
        />
      ))}

      {/* Scene objects rendered with icons */}
      <div className="absolute inset-0">
        {currentScene.objects?.map((object, index) => (
          <GameObjectRenderer key={index} object={object} />
        ))}
      </div>

      {/* Room name indicator */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-black/50 text-white/70 px-4 py-1 rounded text-sm">
        {currentScene.name}
      </div>

      {/* Light source effect */}
      {currentScene.lightSource && (
        <div 
          className="absolute rounded-full pointer-events-none"
          style={{
            top: `${currentScene.lightSource.y}%`,
            left: `${currentScene.lightSource.x}%`,
            width: `${currentScene.lightSource.radius * 2}px`,
            height: `${currentScene.lightSource.radius * 2}px`,
            background: `radial-gradient(circle, ${currentScene.lightSource.color} 0%, transparent 70%)`,
            opacity: currentScene.lightSource.intensity || 0.6,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Jumpscare overlay with icon-based jumpscare */}
      {showJumpscare && (
        <div className="absolute inset-0 bg-red-900/80 flex items-center justify-center z-50 animate-pulse">
          <div className="jumpscare-entity transform scale-110 transition-all duration-100" 
               style={{
                 animation: 'jumpscare 0.5s ease-in-out'
               }}>
            <GiGhost size={300} color="#000" />
          </div>
        </div>
      )}

      {/* Ambient effects - like flickering lights with improved effect */}
      <div 
        className={`absolute inset-0 bg-black pointer-events-none ${currentScene.flickering ? 'animate-flicker' : ''}`}
        style={{ 
          opacity: 0,
          mixBlendMode: 'multiply'
        }}
      ></div>
    </div>
  );
} 