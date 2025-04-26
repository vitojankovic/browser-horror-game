'use client';

import { useState } from 'react';
import { initialGameState, processCommand } from './game/gameLogic';
import RoomEnvironment from './components/RoomEnvironment';
import styles from './page.module.css';

export default function Home() {
  const [gameState, setGameState] = useState(initialGameState);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('Welcome to the horror game. Type "help" for commands.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = processCommand(input, gameState);
    setGameState(result.newState);
    setMessage(result.message);
    setInput('');
  };

  return (
    <main className={styles.main}>
      <div className={styles.gameContainer}>
        <RoomEnvironment scene={gameState.currentScene} />
        <div className={styles.gameContent}>
          <div className={styles.sceneDescription}>
            <h2>{gameState.currentScene.name}</h2>
            <p>{message}</p>
          </div>
          <div className={styles.inventory}>
            <h3>Inventory:</h3>
            <ul>
              {gameState.inventory.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSubmit} className={styles.commandForm}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter command..."
              className={styles.commandInput}
            />
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
}
