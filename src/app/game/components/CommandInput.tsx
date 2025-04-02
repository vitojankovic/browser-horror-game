'use client';

import React, { useState, useRef, useEffect } from 'react';

interface CommandInputProps {
  onSubmit: (command: string) => void;
}

export default function CommandInput({ onSubmit }: CommandInputProps) {
  const [command, setCommand] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on component mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onSubmit(command);
      setCommand('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <div className="text-green-500 mr-2 font-mono text-xl">></div>
      <input
        ref={inputRef}
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        className="flex-grow bg-transparent border-none outline-none text-green-500 font-mono text-xl focus:ring-0"
        placeholder="Enter your command..."
        autoComplete="off"
      />
      <button 
        type="submit" 
        className="ml-2 px-4 py-2 bg-green-900 text-green-400 rounded hover:bg-green-800 font-mono"
      >
        ENTER
      </button>
    </form>
  );
} 