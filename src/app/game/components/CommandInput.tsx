'use client';

import React, { useState, useRef, useEffect } from 'react';

interface CommandInputProps {
  onSubmit: (command: string) => void;
}

export default function CommandInput({ onSubmit }: CommandInputProps) {
  const [command, setCommand] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const commonCommands = [
    { text: "look", desc: "Look around" },
    { text: "inventory", desc: "Check inventory" },
    { text: "help", desc: "Show help" },
    { text: "go north", desc: "Move north" },
    { text: "go south", desc: "Move south" },
    { text: "go east", desc: "Move east" },
    { text: "go west", desc: "Move west" },
  ];

  useEffect(() => {
    // Focus input on component mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onSubmit(command);
      setCommand('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSubmit(suggestion);
    setCommand('');
    setShowSuggestions(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex w-full">
        <div className="text-green-500 mr-2 font-mono text-base">></div>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="flex-grow bg-transparent border-none outline-none text-green-500 font-mono text-base focus:ring-0"
          placeholder="Enter your command..."
          autoComplete="off"
        />
        <button 
          type="submit" 
          className="ml-2 px-3 py-1 bg-green-900 text-green-400 rounded hover:bg-green-800 font-mono text-sm"
        >
          ENTER
        </button>
        <button 
          type="button" 
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="ml-2 px-2 py-1 bg-gray-800 text-gray-400 rounded hover:bg-gray-700 text-sm"
        >
          ?
        </button>
      </form>

      {/* Command suggestions - make compact */}
      {showSuggestions && (
        <div className="mt-2 p-2 bg-gray-800 rounded grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 text-xs">
          {commonCommands.map((cmd, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(cmd.text)}
              className="px-1 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 text-left truncate"
              title={cmd.desc}
            >
              {cmd.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 