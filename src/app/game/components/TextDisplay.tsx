'use client';

import React, { useState, useEffect } from 'react';

interface TextDisplayProps {
  text: string;
  isCommand?: boolean;
}

export default function TextDisplay({ text, isCommand = false }: TextDisplayProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(!isCommand);
  
  useEffect(() => {
    // If it's a command, just show it immediately
    if (isCommand) {
      setDisplayedText(text);
      return;
    }
    
    // For game text, create a typing effect
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(prev => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30); // Adjust speed of typing here
    
    return () => clearInterval(interval);
  }, [text, isCommand]);
  
  return (
    <div className={`mb-3 ${isCommand ? 'text-yellow-400' : 'text-green-400'}`}>
      <p>{displayedText}{isTyping && <span className="animate-blink">_</span>}</p>
    </div>
  );
} 