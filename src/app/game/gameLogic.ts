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
    objects: [
      // Door to the north
      {
        position: { x: 50, y: 30 },
        size: { width: 60, height: 120 },
        color: '#3b2e1d',
        shadow: '0 0 10px rgba(0,0,0,0.7)',
      },
      // Curtain to the east
      {
        position: { x: 80, y: 40 },
        size: { width: 40, height: 100 },
        color: '#5a3333',
        transform: 'skewY(5deg)',
      }
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
    objects: [
      // Bed frame
      {
        position: { x: 15, y: 60 },
        size: { width: 130, height: 80 },
        color: '#392d2d',
      },
      // Dresser
      {
        position: { x: 70, y: 40 },
        size: { width: 90, height: 60 },
        color: '#3b2e1d',
        shadow: '0 0 15px rgba(0,0,0,0.8)',
      },
      // Window (boarded)
      {
        position: { x: 70, y: 15 },
        size: { width: 70, height: 60 },
        color: '#222',
      },
      // Music box
      {
        position: { x: 75, y: 35 },
        size: { width: 20, height: 15 },
        color: '#70544c',
        zIndex: 2,
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
    objects: [
      // Refrigerator
      {
        position: { x: 15, y: 30 },
        size: { width: 60, height: 110 },
        color: '#444',
      },
      // Sink
      {
        position: { x: 60, y: 50 },
        size: { width: 80, height: 40 },
        color: '#333',
        shadow: '0 0 10px rgba(0,0,0,0.5)',
      },
      // Basement door
      {
        position: { x: 85, y: 35 },
        size: { width: 50, height: 100 },
        color: '#2d2318',
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
        description: 'You try to unlock the door, but you need a key or some other way to open it.',
      },
      'use key': {
        description: 'You don\'t have a key in your inventory.',
      },
      'cabinets': {
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
    objects: [
      // Light bulb
      {
        position: { x: 50, y: 10 },
        size: { width: 10, height: 20 },
        color: '#fffacc',
        shadow: '0 0 50px rgba(255,250,204,0.3)',
      },
      // Rocking chair
      {
        position: { x: 75, y: 60 },
        size: { width: 40, height: 60 },
        color: '#2b2018',
        transform: 'rotate(5deg)',
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
    objects: [
      // Altar
      {
        position: { x: 50, y: 60 },
        size: { width: 60, height: 40 },
        color: '#3b3329',
        shadow: '0 0 15px rgba(0,0,0,0.6)',
      },
      // Doll
      {
        position: { x: 50, y: 55 },
        size: { width: 20, height: 30 },
        color: '#ddd6d6',
        zIndex: 2,
      },
      // Writing on wall
      {
        position: { x: 30, y: 30 },
        size: { width: 80, height: 40 },
        color: '#5a0f0f',
        transform: 'skewX(-5deg)',
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
        description: 'You smash the doll against the altar. As it breaks, a blinding light fills the room, and you hear a terrible scream fading away. You feel the evil presence dissipating. You\'ve defeated whatever was haunting this place.',
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
  inventory: [],
  visitedScenes: ['hallway'],
  jumpscare: false,
  gameOver: false,
};

// Process user commands
export function processCommand(input: string, state: GameState): CommandResult {
  // Reset jumpscare state
  const newState: GameState = {
    ...state,
    jumpscare: false,
  };
  
  let result = {
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
  if (command === 'look' || command === 'examine') {
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
  
  // Commands: Go, Move, Walk
  if (command === 'go' || command === 'move' || command === 'walk') {
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
    
    return {
      message: `You can't go ${target} from here.`,
      newState,
      jumpscare: false,
    };
  }
  
  // Command: Open, Use, Interact
  if (command === 'open' || command === 'use' || command === 'play' || command === 'push' || command === 'unlock' || command === 'read') {
    if (!target) {
      return {
        message: `${command.charAt(0).toUpperCase() + command.slice(1)} what?`,
        newState,
        jumpscare: false,
      };
    }
    
    // Handle special case: using specific items from inventory
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
    
    // Check for interaction
    const interactionKey = `${command} ${target}`;
    const directInteraction = state.currentScene.interactions[interactionKey];
    const generalInteraction = state.currentScene.interactions[target];
    
    const interaction = directInteraction || generalInteraction;
    
    if (interaction) {
      // Handle required items
      if (interaction.requiresItem && !state.inventory.includes(interaction.requiresItem)) {
        return {
          message: `You need a ${interaction.requiresItem} for that.`,
          newState,
          jumpscare: false,
        };
      }
      
      // Handle special effects
      if (interaction.effect) {
        handleEffect(interaction.effect, newState);
      }
      
      // Handle scene transitions
      if (interaction.leadsTo) {
        newState.currentScene = scenes[interaction.leadsTo];
        if (!newState.visitedScenes.includes(interaction.leadsTo)) {
          newState.visitedScenes.push(interaction.leadsTo);
        }
        
        return {
          message: `${interaction.description}\n\n${scenes[interaction.leadsTo].description}`,
          newState,
          jumpscare: !!interaction.jumpscare,
        };
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
      message: `You can't ${command} that.`,
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