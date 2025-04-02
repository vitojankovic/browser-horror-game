'use client';

import React, { useState, useEffect } from 'react';
import { Scene } from '../types';

interface GameSceneProps {
  currentScene: Scene;
  jumpscare: boolean;
}

export default function GameScene({ currentScene, jumpscare }: GameSceneProps) {
  const [showJumpscare, setShowJumpscare] = useState(false);
  
  // Handle jumpscare effect
  useEffect(() => {
    if (jumpscare) {
      setShowJumpscare(true);
      const timer = setTimeout(() => {
        setShowJumpscare(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [jumpscare]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background scene */}
      <div 
        className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000"
        style={{ 
          backgroundColor: currentScene.backgroundColor || '#111',
          opacity: 0.7
        }}
      />

      {/* Scene objects (door, window, items, etc.) */}
      <div className="absolute inset-0">
        {currentScene.objects?.map((object, index) => (
          <div
            key={index}
            className="absolute transition-all duration-500"
            style={{
              top: `${object.position.y}%`,
              left: `${object.position.x}%`,
              width: `${object.size.width}px`,
              height: `${object.size.height}px`,
              backgroundColor: object.color || '#444',
              transform: object.transform || 'none',
              boxShadow: object.shadow || 'none',
              borderRadius: object.borderRadius || '0',
              zIndex: object.zIndex || 1,
            }}
          />
        ))}
      </div>

      {/* Jumpscare overlay */}
      {showJumpscare && (
        <div className="absolute inset-0 bg-red-900 flex items-center justify-center z-50 animate-pulse">
          <div className="jumpscare-entity w-64 h-64 bg-black" 
               style={{
                 clipPath: 'polygon(50% 0%, 80% 40%, 100% 40%, 80% 60%, 100% 100%, 50% 80%, 0% 100%, 20% 60%, 0% 40%, 20% 40%)'
               }}>
          </div>
        </div>
      )}

      {/* Ambient effects - like flickering lights */}
      <div className={`absolute inset-0 bg-black opacity-0 pointer-events-none ${currentScene.flickering ? 'animate-flicker' : ''}`}></div>
    </div>
  );
} 