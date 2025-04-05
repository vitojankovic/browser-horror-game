'use client';

import { useState, useEffect, useRef } from 'react';
import GameScene from './components/GameScene';
import CommandInput from './components/CommandInput';
import TextDisplay from './components/TextDisplay';
import HelpPanel from './components/HelpPanel';
import { initialGameState, processCommand } from './gameLogic';

export default function Game() {
  const [gameState, setGameState] = useState(initialGameState);
  const [gameHistory, setGameHistory] = useState<string[]>([initialGameState.currentScene.description]);
  const [showHelp, setShowHelp] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages appear
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameHistory]);

  const handleCommand = (command: string) => {
    // Handle special help toggle
    if (command.toLowerCase() === 'help') {
      setShowHelp(!showHelp);
      return;
    }
    
    const result = processCommand(command.toLowerCase(), gameState);
    setGameState(result.newState);
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
      {/* Game title bar */}
      <div className="bg-red-900 text-white p-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">WHISPERS IN THE DARK</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm">Room: {gameState.currentScene.name}</span>
          <button 
            onClick={() => setShowHelp(!showHelp)} 
            className="px-3 py-1 bg-red-700 hover:bg-red-800 rounded text-sm"
          >
            {showHelp ? 'Hide Help' : 'Show Help'}
          </button>
        </div>
      </div>
      
      {/* Main game display */}
      <div className="flex-grow relative overflow-hidden">
        {/* Game scene (visual elements) */}
        <GameScene 
          currentScene={gameState.currentScene}
          jumpscare={gameState.jumpscare}
        />
        
        {/* Help panel (conditionally displayed) */}
        {showHelp && <HelpPanel closeHelp={() => setShowHelp(false)} />}
        
        {/* Text area (scrollable) - reduce height to 45% */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-b from-black/40 to-black/95 overflow-y-auto p-4 text-green-400 font-mono border-t border-gray-800">
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
      
      {/* Status bar */}
      <div className="bg-gray-900 p-1 border-t border-gray-800 text-sm">
        <div className="flex justify-between text-gray-400">
          <div>Inventory: {gameState.inventory.length > 0 ? gameState.inventory.join(', ') : 'Empty'}</div>
          <div>Rooms Explored: {gameState.visitedScenes.length}/{Object.keys(gameState.scenes || {}).length}</div>
        </div>
      </div>
      
      {/* Command input area - made compact */}
      <div className="p-3 bg-gray-900 border-t border-gray-700">
        <CommandInput onSubmit={handleCommand} />
      </div>
    </div>
  );
} 