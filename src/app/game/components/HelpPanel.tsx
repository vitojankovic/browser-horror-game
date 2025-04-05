'use client';

import React from 'react';

interface HelpPanelProps {
  closeHelp: () => void;
}

export default function HelpPanel({ closeHelp }: HelpPanelProps) {
  const commandSections = [
    {
      title: "Movement Commands",
      commands: [
        { cmd: "go north", desc: "Move to the room to the north" },
        { cmd: "go south", desc: "Move to the room to the south" },
        { cmd: "go east", desc: "Move to the room to the east" },
        { cmd: "go west", desc: "Move to the room to the west" },
        { cmd: "go up/down", desc: "Climb stairs or enter basement" },
      ]
    },
    {
      title: "Look Commands",
      commands: [
        { cmd: "look", desc: "Examine your surroundings" },
        { cmd: "look at [object]", desc: "Example: look at door" },
        { cmd: "examine [object]", desc: "Example: examine mirror" },
      ]
    },
    {
      title: "Interaction Commands",
      commands: [
        { cmd: "open [object]", desc: "Example: open music box" },
        { cmd: "use [object]", desc: "Example: use key" },
        { cmd: "push [object]", desc: "Example: push wall" },
        { cmd: "play [object]", desc: "Example: play music box" },
        { cmd: "read [object]", desc: "Example: read writing" },
      ]
    },
    {
      title: "Item Commands",
      commands: [
        { cmd: "take [item]", desc: "Example: take key" },
        { cmd: "get [item]", desc: "Example: get teddy" },
        { cmd: "inventory", desc: "Check what items you're carrying" },
      ]
    },
    {
      title: "Special Commands",
      commands: [
        { cmd: "listen", desc: "Listen for sounds" },
        { cmd: "help", desc: "Toggle this help panel" },
      ]
    },
  ];

  return (
    <div className="absolute inset-10 bg-black/95 text-white z-50 rounded-lg overflow-auto p-6 border border-red-900 shadow-2xl">
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-black pt-1">
        <h2 className="text-2xl font-bold text-red-600">GAME COMMANDS</h2>
        <button 
          onClick={closeHelp}
          className="px-4 py-2 bg-red-800 hover:bg-red-900 rounded"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {commandSections.map((section, idx) => (
          <div key={idx} className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-red-500 mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.commands.map((command, cmdIdx) => (
                <li key={cmdIdx} className="flex flex-col">
                  <span className="text-green-400 font-mono">"{command.cmd}"</span>
                  <span className="text-gray-400 text-sm">{command.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-900 p-4 rounded-lg">
        <h3 className="text-lg font-bold text-red-500 mb-3">Game Tips</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Explore each room carefully. Look at everything.</li>
          <li>Remember to check your inventory often.</li>
          <li>Some actions might trigger jump scares!</li>
          <li>There are multiple endings to discover.</li>
          <li>Items you collect may be used in different rooms.</li>
          <li>If you're stuck, try using different verbs (push, pull, open, etc.)</li>
        </ul>
      </div>
    </div>
  );
} 