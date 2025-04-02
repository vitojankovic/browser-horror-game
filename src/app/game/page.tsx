'use client';

import { useState, useEffect, useRef } from 'react';
import GameScene from './components/GameScene';
import CommandInput from './components/CommandInput';
import TextDisplay from './components/TextDisplay';
import { initialGameState, processCommand } from './gameLogic';

export default function Game() {
  const [gameState, setGameState] = useState(initialGameState);
  const [message, setMessage] = useState(initialGameState.currentScene.description);
  const [gameHistory, setGameHistory] = useState<string[]>([initialGameState.currentScene.description]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages appear
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameHistory]);

  const handleCommand = (command: string) => {
    const result = processCommand(command.toLowerCase(), gameState);
    setGameState(result.newState);
    setMessage(result.message);
    setGameHistory(prev => [...prev, `> ${command}`, result.message]);

    // Play sound if there's a jumpscare
    if (result.jumpscare) {
      playJumpscareSound();
    }
  };

  const playJumpscareSound = () => {
    // In a real game, you'd add actual sound implementation here
    console.log('JUMPSCARE SOUND PLAYED');
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Game display area */}
      <div className="flex-grow relative overflow-hidden">
        {/* Game scene (visual elements) */}
        <GameScene 
          currentScene={gameState.currentScene}
          jumpscare={gameState.jumpscare}
        />
        
        {/* Text area (scrollable) */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/80 overflow-y-auto p-4 text-green-400 font-mono">
          {gameHistory.map((text, index) => (
            <TextDisplay 
              key={index} 
              text={text} 
              isCommand={text.startsWith('>')} 
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      
      {/* Command input area */}
      <div className="p-4 bg-gray-900">
        <CommandInput onSubmit={handleCommand} />
      </div>
    </div>
  );
} 