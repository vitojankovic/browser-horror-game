export interface GameObject {
  id?: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  color?: string;
  transform?: string;
  shadow?: string;
  borderRadius?: string;
  zIndex?: number;
}

export interface Scene {
  id: string;
  name: string;
  description: string;
  backgroundColor?: string;
  objects?: GameObject[];
  exits: {
    [direction: string]: string;
  };
  interactions: {
    [item: string]: {
      description: string;
      effect?: string;
      leadsTo?: string;
      requiresItem?: string;
      givesItem?: string;
      jumpscare?: boolean;
    };
  };
  flickering?: boolean;
}

export interface GameState {
  currentScene: Scene;
  inventory: string[];
  visitedScenes: string[];
  jumpscare: boolean;
  gameOver: boolean;
  endingType?: 'good' | 'bad' | 'neutral';
}

export interface CommandResult {
  message: string;
  newState: GameState;
  jumpscare: boolean;
} 