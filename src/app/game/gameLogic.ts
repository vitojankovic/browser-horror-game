import { GameState, Scene, CommandResult } from './types';

// Game scenes
const scenes: { [key: string]: Scene } = {
  // Starting scene - abandoned hallway
  hallway: {
    id: 'hallway',
    name: 'Abandoned Hallway',
    description: 'You find yourself in a dimly lit hallway. The wallpaper is peeling, revealing dark stains underneath. To the north is a door that appears to be slightly ajar. To the east is a doorway covered by tattered curtains. You hear faint whispering coming from somewhere.',
    backgroundColor: '#121212',
    flickering: true,
    lightSource: {
      x: 50,
      y: 10,
      radius: 150,
      color: 'rgba(255, 250, 204, 0.2)',
      intensity: 0.3
    },
    objects: [
      // Door to the north
      {
        id: 'door',
        position: { x: 50, y: 30 },
        size: { width: 60, height: 120 },
        color: '#3b2e1d',
        shadow: '0 0 10px rgba(0,0,0,0.7)',
      },
      // Curtain to the east
      {
        id: 'curtain',
        position: { x: 80, y: 40 },
        size: { width: 40, height: 100 },
        color: '#5a3333',
        transform: 'skewY(5deg)',
      },
      // Floor
      {
        id: 'floor',
        position: { x: 0, y: 90 },
        size: { width: 100, height: 10 },
        color: '#1a1a1a',
        zIndex: 0
      },
      // Ceiling
      {
        id: 'ceiling',
        position: { x: 0, y: 0 },
        size: { width: 100, height: 10 },
        color: '#1a1a1a',
        zIndex: 0
      },
    ],
    exits: {
      'north': 'bedroom',
      'east': 'kitchen'
    },
    interactions: {
      'door': {
        description: 'A wooden door, scratched and worn. It seems to open to a bedroom.',
        leadsTo: 'bedroom',
      },
      'curtain': {
        description: 'Tattered red curtains sway slightly, even though there is no breeze.',
        leadsTo: 'kitchen',
      },
      'listen': {
        description: 'The whispers grow louder as you concentrate. You can almost make out words... "don\'t... go... back..."',
      },
      'whispers': {
        description: 'You strain to understand the whispers. They seem to be warning you about something. The more you listen, the colder the air around you becomes.',
      },
      'walls': {
        description: 'The wallpaper peels away at your touch, revealing symbols etched into the wall underneath. They look like ancient warnings.',
      }
    },
  },
  
  // Bedroom
  bedroom: {
    id: 'bedroom',
    name: 'Abandoned Bedroom',
    description: 'You enter a small bedroom. A rusty bed frame sits in the corner, mattress rotted away. A dresser with a cracked mirror stands against the wall. The window is boarded up. There\'s a strange music box on the dresser. The door to the south leads back to the hallway.',
    backgroundColor: '#0d0d14',
    lightSource: {
      x: 75,
      y: 30,
      radius: 100,
      color: 'rgba(150, 150, 255, 0.1)',
      intensity: 0.4
    },
    objects: [
      // Bed frame
      {
        id: 'bed',
        position: { x: 15, y: 60 },
        size: { width: 130, height: 80 },
        color: '#392d2d',
      },
      // Dresser
      {
        id: 'dresser',
        position: { x: 70, y: 40 },
        size: { width: 90, height: 60 },
        color: '#3b2e1d',
        shadow: '0 0 15px rgba(0,0,0,0.8)',
      },
      // Window (boarded)
      {
        id: 'window',
        position: { x: 70, y: 15 },
        size: { width: 70, height: 60 },
        color: '#222',
      },
      // Music box
      {
        id: 'music-box',
        position: { x: 75, y: 35 },
        size: { width: 20, height: 15 },
        color: '#70544c',
        zIndex: 2,
        pulsing: true
      },
      // Floor
      {
        id: 'floor',
        position: { x: 0, y: 90 },
        size: { width: 100, height: 10 },
        color: '#1a1a1a',
        zIndex: 0
      },
    ],
    exits: {
      'south': 'hallway',
    },
    interactions: {
      'bed': {
        description: 'The bed frame is rusted and broken. As you approach, you notice a small teddy bear poking out from beneath it.',
      },
      'teddy': {
        description: 'You pick up the teddy bear. One eye is missing, and it\'s covered in what looks like old dried blood. Inside, you feel something hard.',
        givesItem: 'teddy bear',
      },
      'dresser': {
        description: 'The dresser is covered in dust. The drawers are empty except for a few moth-eaten clothes.',
      },
      'mirror': {
        description: 'You look into the cracked mirror. For a moment, you think you see another face looking back at you - not your reflection, but someone else. Then it\'s gone.',
        jumpscare: true,
      },
      'window': {
        description: 'The window is boarded up tightly. Through the small cracks, you can see it\'s nighttime outside, but there are no stars or moon visible.',
      },
      'music box': {
        description: 'A antique music box made of dark wood. It seems to be intact.',
      },
      'open music box': {
        description: 'You wind up the music box. It begins to play a haunting lullaby. As the melody continues, the temperature in the room drops noticeably. You hear a child\'s laughter from the hallway.',
        effect: 'unlockBasement',
      },
      'play music box': {
        description: 'You wind up the music box. It begins to play a haunting lullaby. As the melody continues, the temperature in the room drops noticeably. You hear a child\'s laughter from the hallway.',
        effect: 'unlockBasement',
      },
    },
  },
  
  // Kitchen
  kitchen: {
    id: 'kitchen',
    name: 'Decrepit Kitchen',
    description: 'The kitchen is in ruins. Cabinets hang open, broken dishes scattered across the floor. A rusted refrigerator stands in the corner, door ajar. The sink is filled with a dark substance that doesn\'t look like water. There\'s a door that seems to lead to a basement, but it\'s locked. The hallway is back to the west.',
    backgroundColor: '#1a1a1c',
    flickering: true,
    lightSource: {
      x: 20,
      y: 20,
      radius: 120,
      color: 'rgba(255, 220, 180, 0.15)',
      intensity: 0.25
    },
    objects: [
      // Refrigerator
      {
        id: 'refrigerator',
        position: { x: 15, y: 30 },
        size: { width: 60, height: 110 },
        color: '#444',
      },
      // Sink
      {
        id: 'sink',
        position: { x: 60, y: 50 },
        size: { width: 80, height: 40 },
        color: '#333',
        shadow: '0 0 10px rgba(0,0,0,0.5)',
      },
      // Basement door
      {
        id: 'basement-door',
        position: { x: 85, y: 35 },
        size: { width: 50, height: 100 },
        color: '#2d2318',
      },
      // Cabinets
      {
        id: 'cabinets',
        position: { x: 30, y: 20 },
        size: { width: 40, height: 60 },
        color: '#3b2e1d',
      },
      // Floor
      {
        id: 'floor',
        position: { x: 0, y: 90 },
        size: { width: 100, height: 10 },
        color: '#1a1a1a',
        zIndex: 0
      },
      // Broken dishes
      {
        id: 'dishes',
        position: { x: 40, y: 85 },
        size: { width: 60, height: 10 },
        color: '#333',
        zIndex: 1
      },
    ],
    exits: {
      'west': 'hallway',
      'down': 'basement',
    },
    interactions: {
      'refrigerator': {
        description: 'The refrigerator contains rotting food. The smell is overwhelming. As you look inside, you think you see something moving amongst the decay.',
      },
      'sink': {
        description: 'The sink is filled with a thick, dark red liquid. It smells metallic. Your reflection in the liquid seems to be moving independently of you.',
        jumpscare: true,
      },
      'basement door': {
        description: 'The door to the basement is locked. There\'s a small keyhole that might accept a special key.',
      },
      'open basement door': {
        description: 'The door is locked. You need to find a way to unlock it.',
      },
      'unlock basement door': {
        description: 'You unlock the basement door with the rusty key. It swings open with a creak.',
        requiresItem: 'rusty key',
        leadsTo: 'basement',
      },
      'use rusty key': {
        description: 'You use the rusty key to unlock the basement door. It swings open with a creak.',
        leadsTo: 'basement',
      },
      'use key': {
        description: 'You use the rusty key to unlock the basement door. It swings open with a creak.',
        leadsTo: 'basement',
      },
      'cabinets': {
        description: 'You search through the cabinets and find an old rusty key hidden in the back of one.',
        givesItem: 'rusty key',
      },
      'examine cabinets': {
        description: 'You search through the cabinets and find an old rusty key hidden in the back of one.',
        givesItem: 'rusty key',
      },
      'look at cabinets': {
        description: 'You search through the cabinets and find an old rusty key hidden in the back of one.',
        givesItem: 'rusty key',
      },
      'search cabinets': {
        description: 'You search through the cabinets and find an old rusty key hidden in the back of one.',
        givesItem: 'rusty key',
      },
      'open cabinets': {
        description: 'You search through the cabinets and find an old rusty key hidden in the back of one.',
        givesItem: 'rusty key',
      },
      'check cabinets': {
        description: 'You search through the cabinets and find an old rusty key hidden in the back of one.',
        givesItem: 'rusty key',
      },
      'inspect cabinets': {
        description: 'You search through the cabinets and find an old rusty key hidden in the back of one.',
        givesItem: 'rusty key',
      },
    },
  },
  
  // Basement (locked until music box is played)
  basement: {
    id: 'basement',
    name: 'Dark Basement',
    description: 'The basement is pitch black and smells of damp earth and decay. Your footsteps echo on the concrete floor. There\'s a single bare light bulb hanging from the ceiling, providing minimal light. In the corner, you see a child\'s rocking chair moving slowly back and forth. No one is sitting in it.',
    backgroundColor: '#0a0a0a',
    lightSource: {
      x: 50,
      y: 10,
      radius: 80,
      color: 'rgba(255, 255, 200, 0.1)',
      intensity: 0.2
    },
    objects: [
      // Light bulb
      {
        id: 'light-bulb',
        position: { x: 50, y: 10 },
        size: { width: 10, height: 20 },
        color: '#fffacc',
        shadow: '0 0 50px rgba(255,250,204,0.3)',
        flickering: true
      },
      // Rocking chair
      {
        id: 'rocking-chair',
        position: { x: 75, y: 60 },
        size: { width: 40, height: 60 },
        color: '#2b2018',
        transform: 'rotate(5deg)',
        floating: true
      },
      // Floor
      {
        id: 'floor',
        position: { x: 0, y: 95 },
        size: { width: 100, height: 5 },
        color: '#1a1a1a',
        zIndex: 0
      },
      // Wall with hidden passage
      {
        id: 'hidden-wall',
        position: { x: 0, y: 20 },
        size: { width: 100, height: 80 },
        color: '#0d0d0d',
        zIndex: 0
      },
    ],
    exits: {
      'up': 'kitchen',
    },
    interactions: {
      'chair': {
        description: 'As you approach the rocking chair, it stops moving. Then you notice small, wet footprints leading from the chair to a wall.',
      },
      'footprints': {
        description: 'The footprints look like they belong to a child. They lead directly to a solid wall and stop.',
      },
      'wall': {
        description: 'The wall appears solid, but when you place your hand on it where the footprints end, it feels cold and slightly yielding. There might be a hidden passage.',
      },
      'push wall': {
        description: 'You push against the wall, and a section of it swings inward, revealing a hidden passage!',
        leadsTo: 'secretRoom',
      },
      'light': {
        description: 'The light flickers erratically. Each time it goes dark momentarily, you think you see someone standing in the corner, but when the light returns, no one is there.',
      },
    },
  },
  
  // Secret Room (final area)
  secretRoom: {
    id: 'secretRoom',
    name: 'Hidden Chamber',
    description: 'You\'ve discovered a small, hidden room. The walls are covered in children\'s drawings, but the images are disturbing - dark figures with long arms and no faces. In the center of the room is a small altar with a porcelain doll placed on it. The doll\'s face is cracked, and it seems to be watching you. There\'s something written in blood on the wall.',
    backgroundColor: '#0c0c12',
    lightSource: {
      x: 50,
      y: 50,
      radius: 200,
      color: 'rgba(200, 0, 0, 0.1)',
      intensity: 0.4
    },
    objects: [
      // Altar
      {
        id: 'altar',
        position: { x: 50, y: 60 },
        size: { width: 60, height: 40 },
        color: '#3b3329',
        shadow: '0 0 15px rgba(0,0,0,0.6)',
      },
      // Doll
      {
        id: 'doll',
        position: { x: 50, y: 55 },
        size: { width: 20, height: 30 },
        color: '#ddd6d6',
        zIndex: 2,
        pulsing: true
      },
      // Writing on wall
      {
        id: 'wall-writing',
        position: { x: 30, y: 30 },
        size: { width: 80, height: 40 },
        color: '#5a0f0f',
        transform: 'skewX(-5deg)',
      },
      // Floor
      {
        id: 'floor',
        position: { x: 0, y: 90 },
        size: { width: 100, height: 10 },
        color: '#1a1a1a',
        zIndex: 0
      },
      // Children's drawings (left wall)
      {
        id: 'drawings',
        position: { x: 5, y: 20 },
        size: { width: 30, height: 40 },
        color: '#0f0f12',
        zIndex: 0
      },
      // Children's drawings (right wall)
      {
        id: 'drawings-right',
        position: { x: 70, y: 25 },
        size: { width: 25, height: 35 },
        color: '#0f0f12',
        zIndex: 0
      },
    ],
    exits: {
      'back': 'basement',
    },
    interactions: {
      'doll': {
        description: 'The doll is cold to the touch. Its cracked porcelain face has a painted smile that seems too wide. As you examine it, you could swear its eyes follow your movements.',
      },
      'altar': {
        description: 'The altar is made of old stone, worn smooth by time. There are dark stains that look like dried blood. Something about it feels wrong.',
      },
      'drawings': {
        description: 'The drawings appear to be made by children, but the content is disturbing. They show tall, slender figures taking children away into the darkness. Some drawings depict the house you\'re in, with something evil living inside the walls.',
      },
      'writing': {
        description: 'The writing on the wall says: "IT FEEDS ON FEAR. FACE IT TO DESTROY IT."',
      },
      'read writing': {
        description: 'The writing on the wall says: "IT FEEDS ON FEAR. FACE IT TO DESTROY IT."',
      },
      'take doll': {
        description: 'As you pick up the doll, its head slowly turns to look directly at you, and you hear a child\'s voice whisper: "You\'ve found me. Now you must choose."',
        jumpscare: true,
      },
      'destroy doll': {
        description: "You smash the doll against the altar. As it breaks, a blinding light fills the room, and you hear a terrible scream fading away. You feel the evil presence dissipating. You've defeated whatever was haunting this place.",
        effect: 'goodEnding',
      },
      'embrace doll': {
        description: 'You embrace the doll, accepting the fear. The doll whispers "Thank you" as it dissolves into warm light. The drawings on the walls transform into colorful, happy scenes. The spirit was trapped here, and your compassion has freed it.',
        effect: 'trueEnding',
      },
      'leave doll': {
        description: 'You decide to leave the doll alone and exit the chamber. As you begin to leave, the door slams shut. The doll rises into the air, its cracked face splitting into a grotesque grin. "No one leaves," it whispers.',
        effect: 'badEnding',
        jumpscare: true,
      },
    },
  },
};

// Initial game state
export const initialGameState: GameState = {
  currentScene: scenes.hallway,
  inventory: ['rusty key'],
  visitedScenes: ['hallway'],
  jumpscare: false,
  gameOver: false,
  scenes: scenes, // Make scenes available to UI
};

// Process user commands
export function processCommand(input: string, state: GameState): CommandResult {
  // Reset jumpscare state
  const newState: GameState = {
    ...state,
    jumpscare: false,
  };
  
  const result = {
    message: "I don't understand that command.",
    newState,
    jumpscare: false,
  };
  
  // Game over check
  if (state.gameOver) {
    return {
      message: "The game is over. Refresh the page to start again.",
      newState: state,
      jumpscare: false,
    };
  }

  // Parse the input
  const words = input.toLowerCase().split(' ').filter(word => word);
  
  if (words.length === 0) {
    return result;
  }
  
  const command = words[0];
  const target = words.slice(1).join(' ');
  
  // Command: Look
  if (command === 'look') {
    if (!target || target === 'around' || target === 'room') {
      return {
        message: state.currentScene.description,
        newState,
        jumpscare: false,
      };
    }
    
    // Check scene interactions
    const interaction = state.currentScene.interactions[target];
    if (interaction) {
      // Handle special effects
      if (interaction.effect) {
        handleEffect(interaction.effect, newState);
      }
      
      // Handle item acquisition
      if (interaction.givesItem && !newState.inventory.includes(interaction.givesItem)) {
        newState.inventory.push(interaction.givesItem);
        return {
          message: `${interaction.description} You obtained: ${interaction.givesItem}.`,
          newState,
          jumpscare: !!interaction.jumpscare,
        };
      }
      
      return {
        message: interaction.description,
        newState,
        jumpscare: !!interaction.jumpscare,
      };
    }
    
    return {
      message: `You don't see anything special about the ${target}.`,
      newState,
      jumpscare: false,
    };
  }

  // Command: Examine (more detailed than look)
  if (command === 'examine') {
    if (!target) {
      return {
        message: "Examine what?",
        newState,
        jumpscare: false,
      };
    }
    
    const interaction = state.currentScene.interactions[target];
    if (interaction) {
      // For examine, provide more detailed descriptions
      const detailedDescription = interaction.description + 
        (interaction.effect ? "\n\nYou sense something significant about this object..." : "");
      
      return {
        message: detailedDescription,
        newState,
        jumpscare: !!interaction.jumpscare,
      };
    }
    
    return {
      message: `You examine the ${target} carefully but find nothing unusual.`,
      newState,
      jumpscare: false,
    };
  }
  
  // Command: Go (primary movement)
  if (command === 'go') {
    if (!target) {
      return {
        message: "Go where?",
        newState,
        jumpscare: false,
      };
    }
    
    // Check exits
    if (state.currentScene.exits[target]) {
      const nextSceneId = state.currentScene.exits[target];
      
      // Check if basement is locked
      if (nextSceneId === 'basement' && !state.inventory.includes('rusty key') && !newState.visitedScenes.includes('basement')) {
        return {
          message: "The basement door is locked. You need to find a key.",
          newState,
          jumpscare: false,
        };
      }
      
      // Move to the next scene
      newState.currentScene = scenes[nextSceneId];
      if (!newState.visitedScenes.includes(nextSceneId)) {
        newState.visitedScenes.push(nextSceneId);
      }
      
      return {
        message: newState.currentScene.description,
        newState,
        jumpscare: false,
      };
    }
    
    // Special case for basement access
    if (target === 'down' && state.currentScene.id === 'kitchen' && state.inventory.includes('rusty key')) {
      newState.currentScene = scenes.basement;
      if (!newState.visitedScenes.includes('basement')) {
        newState.visitedScenes.push('basement');
      }
      
      return {
        message: scenes.basement.description,
        newState,
        jumpscare: false,
      };
    }
    
    return {
      message: `You can't go ${target} from here.`,
      newState,
      jumpscare: false,
    };
  }

  // Command: Move (for pushing objects)
  if (command === 'move') {
    if (!target) {
      return {
        message: "Move what?",
        newState,
        jumpscare: false,
      };
    }
    
    const interaction = state.currentScene.interactions[`push ${target}`] || 
                        state.currentScene.interactions[target];
    
    if (interaction) {
      return {
        message: interaction.description,
        newState,
        jumpscare: !!interaction.jumpscare,
      };
    }
    
    return {
      message: `You can't move the ${target}.`,
      newState,
      jumpscare: false,
    };
  }

  // Command: Walk (for exploring hidden areas)
  if (command === 'walk') {
    if (!target) {
      return {
        message: "Walk where?",
        newState,
        jumpscare: false,
      };
    }
    
    if (target === 'around' && state.currentScene.id === 'basement') {
      return {
        message: "As you walk around the basement, you notice faint footprints leading to a section of the wall that looks slightly different from the rest.",
        newState,
        jumpscare: false,
      };
    }
    
    return {
      message: `You can't walk ${target} from here.`,
      newState,
      jumpscare: false,
    };
  }
  
  // Command: Open (for doors and containers)
  if (command === 'open') {
    if (!target) {
      return {
        message: "Open what?",
        newState,
        jumpscare: false,
      };
    }
    
    const interaction = state.currentScene.interactions[`open ${target}`] || 
                        state.currentScene.interactions[target];
    
    if (interaction) {
      return {
        message: interaction.description,
        newState,
        jumpscare: !!interaction.jumpscare,
      };
    }
    
    return {
      message: `You can't open the ${target}.`,
      newState,
      jumpscare: false,
    };
  }

  // Command: Use (for items and tools)
  if (command === 'use') {
    if (!target) {
      return {
        message: "Use what?",
        newState,
        jumpscare: false,
      };
    }
    
    if (target === 'rusty key' && state.inventory.includes('rusty key') && state.currentScene.id === 'kitchen') {
      newState.currentScene = scenes.basement;
      if (!newState.visitedScenes.includes('basement')) {
        newState.visitedScenes.push('basement');
      }
      
      return {
        message: "You use the rusty key to unlock the basement door. It swings open with a creak.\n\n" + scenes.basement.description,
        newState,
        jumpscare: false,
      };
    }
    
    return {
      message: `You can't use the ${target} here.`,
      newState,
      jumpscare: false,
    };
  }

  // Command: Play (for interactive objects)
  if (command === 'play') {
    if (!target) {
      return {
        message: "Play what?",
        newState,
        jumpscare: false,
      };
    }
    
    const interaction = state.currentScene.interactions[`play ${target}`] || 
                        state.currentScene.interactions[target];
    
    if (interaction) {
      return {
        message: interaction.description,
        newState,
        jumpscare: !!interaction.jumpscare,
      };
    }
    
    return {
      message: `You can't play with the ${target}.`,
      newState,
      jumpscare: false,
    };
  }

  // Command: Push (for moving heavy objects)
  if (command === 'push') {
    if (!target) {
      return {
        message: "Push what?",
        newState,
        jumpscare: false,
      };
    }
    
    if (target === 'wall' && state.currentScene.id === 'basement') {
      newState.currentScene = scenes.secretRoom;
      if (!newState.visitedScenes.includes('secretRoom')) {
        newState.visitedScenes.push('secretRoom');
      }
      
      return {
        message: "You push against the wall and it gives way, revealing a hidden room.\n\n" + scenes.secretRoom.description,
        newState,
        jumpscare: false,
      };
    }
    
    return {
      message: `You can't push the ${target}.`,
      newState,
      jumpscare: false,
    };
  }

  // Command: Unlock (for locked doors)
  if (command === 'unlock') {
    if (!target) {
      return {
        message: "Unlock what?",
        newState,
        jumpscare: false,
      };
    }
    
    if (target === 'basement door' && state.inventory.includes('rusty key') && state.currentScene.id === 'kitchen') {
      newState.currentScene = scenes.basement;
      if (!newState.visitedScenes.includes('basement')) {
        newState.visitedScenes.push('basement');
      }
      
      return {
        message: "You unlock the basement door with the rusty key. It swings open with a creak.\n\n" + scenes.basement.description,
        newState,
        jumpscare: false,
      };
    }
    
    return {
      message: `You can't unlock the ${target}.`,
      newState,
      jumpscare: false,
    };
  }

  // Command: Read (for text and writing)
  if (command === 'read') {
    if (!target) {
      return {
        message: "Read what?",
        newState,
        jumpscare: false,
      };
    }
    
    const interaction = state.currentScene.interactions[`read ${target}`] || 
                        state.currentScene.interactions[target];
    
    if (interaction) {
      return {
        message: interaction.description,
        newState,
        jumpscare: !!interaction.jumpscare,
      };
    }
    
    return {
      message: `You can't read the ${target}.`,
      newState,
      jumpscare: false,
    };
  }

  // Command: Take, Get, Grab
  if (command === 'take' || command === 'get' || command === 'grab' || command === 'pick') {
    const itemName = target.replace('up ', ''); // Handle "pick up x"
    
    if (!itemName) {
      return {
        message: "Take what?",
        newState,
        jumpscare: false,
      };
    }
    
    // Check for direct interactions
    const takeInteraction = state.currentScene.interactions[`take ${itemName}`] || 
                            state.currentScene.interactions[itemName];
    
    if (takeInteraction) {
      if (takeInteraction.givesItem && !newState.inventory.includes(takeInteraction.givesItem)) {
        newState.inventory.push(takeInteraction.givesItem);
        
        // Handle special effects
        if (takeInteraction.effect) {
          handleEffect(takeInteraction.effect, newState);
        }
        
        return {
          message: `${takeInteraction.description} You obtained: ${takeInteraction.givesItem}.`,
          newState,
          jumpscare: !!takeInteraction.jumpscare,
        };
      }
      
      return {
        message: takeInteraction.description,
        newState,
        jumpscare: !!takeInteraction.jumpscare,
      };
    }
    
    return {
      message: `You can't take that.`,
      newState,
      jumpscare: false,
    };
  }

  // Command: Inventory
  if (command === 'inventory' || command === 'items') {
    if (state.inventory.length === 0) {
      return {
        message: "Your inventory is empty.",
        newState,
        jumpscare: false,
      };
    }
    
    return {
      message: `Inventory: ${state.inventory.join(', ')}`,
      newState,
      jumpscare: false,
    };
  }

  // Command: Help
  if (command === 'help') {
    return {
      message: "Available commands:\n- look [at object]\n- go [direction]\n- take/get [item]\n- use/open [object]\n- inventory\n- help",
      newState,
      jumpscare: false,
    };
  }

  // Commands related to the doll in the secret room
  if (state.currentScene.id === 'secretRoom') {
    if ((command === 'destroy' && target === 'doll') || (command === 'break' && target === 'doll') || (command === 'smash' && target === 'doll')) {
      handleEffect('goodEnding', newState);
      return {
        message: "You smash the doll against the altar. As it breaks, a blinding light fills the room, and you hear a terrible scream fading away. You feel the evil presence dissipating. You've defeated whatever was haunting this place.\n\nCONGRATULATIONS: You got the Good Ending!",
        newState,
        jumpscare: false,
      };
    }
    
    if ((command === 'embrace' && target === 'doll') || (command === 'hug' && target === 'doll') || (command === 'accept' && target === 'doll') || (command === 'hold' && target === 'doll')) {
      handleEffect('trueEnding', newState);
      return {
        message: "You embrace the doll, accepting the fear. The doll whispers \"Thank you\" as it dissolves into warm light. The drawings on the walls transform into colorful, happy scenes. The spirit was trapped here, and your compassion has freed it.\n\nCONGRATULATIONS: You got the True Ending!",
        newState,
        jumpscare: false,
      };
    }
    
    if ((command === 'leave' && (target === 'doll' || target === 'room')) || command === 'exit' || command === 'escape' || command === 'run') {
      handleEffect('badEnding', newState);
      return {
        message: "You decide to leave the doll alone and exit the chamber. As you begin to leave, the door slams shut. The doll rises into the air, its cracked face splitting into a grotesque grin. \"No one leaves,\" it whispers.\n\nGAME OVER: You got the Bad Ending!",
        newState,
        jumpscare: true,
      };
    }
  }
  
  // Return default result if no commands matched
  return result;
}

// Handle special game effects
function handleEffect(effect: string, state: GameState) {
  switch (effect) {
    case 'unlockBasement':
      // Add the rusty key to inventory if not present
      if (!state.inventory.includes('rusty key')) {
        state.inventory.push('rusty key');
      }
      break;
      
    case 'goodEnding':
      state.gameOver = true;
      state.endingType = 'good';
      break;
      
    case 'trueEnding':
      state.gameOver = true;
      state.endingType = 'neutral';
      break;
      
    case 'badEnding':
      state.gameOver = true;
      state.endingType = 'bad';
      break;
  }
} 