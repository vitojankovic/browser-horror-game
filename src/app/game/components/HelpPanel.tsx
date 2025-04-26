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
        { cmd: "go [direction]", desc: "Move between rooms (e.g., go north)" },
        { cmd: "walk around", desc: "Explore current area for hidden details" },
        { cmd: "move [object]", desc: "Push or move objects (e.g., move wall)" },
      ]
    },
    {
      title: "Examination Commands",
      commands: [
        { cmd: "look", desc: "Get a general view of your surroundings" },
        { cmd: "look at [object]", desc: "Basic observation of an object" },
        { cmd: "examine [object]", desc: "Detailed inspection of an object" },
      ]
    },
    {
      title: "Interaction Commands",
      commands: [
        { cmd: "open [object]", desc: "Open doors or containers" },
        { cmd: "use [item]", desc: "Use an item from your inventory" },
        { cmd: "push [object]", desc: "Push heavy objects or walls" },
        { cmd: "play [object]", desc: "Interact with playable objects" },
        { cmd: "unlock [door]", desc: "Unlock doors with keys" },
        { cmd: "read [text]", desc: "Read writing or text" },
      ]
    },
    {
      title: "Item Commands",
      commands: [
        { cmd: "take [item]", desc: "Pick up an item" },
        { cmd: "inventory", desc: "Check your carried items" },
      ]
    },
    {
      title: "Special Commands",
      commands: [
        { cmd: "help", desc: "Show this help panel" },
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
                  <span className="text-green-400 font-mono">&quot;{command.cmd}&quot;</span>
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
          <li>If you&apos;re stuck, try using different verbs (push, pull, open, etc.)</li>
        </ul>
      </div>
    </div>
  );
} 