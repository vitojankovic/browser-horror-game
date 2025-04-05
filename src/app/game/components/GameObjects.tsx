'use client';

import React from 'react';
import { GameObject } from '../types';
import { 
  FaDoorClosed, FaWindowMaximize, FaBed, FaChair, FaMusic, 
  FaSink, FaBook, FaSkull, FaGhost, FaChild,
  FaQuestion, FaKey, FaLightbulb, FaWater, FaFlask,
  FaRegSquare, FaSquare
} from 'react-icons/fa';
import { 
  GiCurledTentacle, GiCrossMark, GiCandleFlame, GiDoorway, 
  GiWoodenCrate, GiCultist, GiHangingSpider, GiScrollQuill, 
  GiStoneBlock, GiPaperBomb, GiClothes, GiWaterDrop,
  GiCandlestick, GiMirror, GiIceCreamCone, GiWoodBeam,
  GiWoodenChair, GiCauldron, GiOldLantern, GiBloodySword,
  GiPlainSquare, GiWoodCabin
} from 'react-icons/gi';
import { MdBloodtype, MdDarkMode } from 'react-icons/md';
import { RiDoorClosedLine, RiFootprintFill } from 'react-icons/ri';
import { BsSquareFill } from 'react-icons/bs';
import { TbStairsDown, TbRefrigerator } from 'react-icons/tb';

interface GameObjectProps {
  object: GameObject;
}

// This component will render game objects using React icons
export default function GameObjectRenderer({ object }: GameObjectProps) {
  // Function to get the appropriate icon component based on object id
  const getObjectIcon = () => {
    // Return the appropriate icon based on the object's id
    switch (object.id) {
      // Hallway objects
      case 'door':
        return <FaDoorClosed />;
      case 'curtain':
        return <GiClothes />;
      
      // Bedroom objects
      case 'bed':
        return <FaBed />;
      case 'dresser':
        return <GiWoodenCrate />;
      case 'mirror':
        return <GiMirror />;
      case 'window':
        return <FaWindowMaximize />;
      case 'music-box':
        return <FaMusic />;
      
      // Kitchen objects
      case 'refrigerator':
        return <TbRefrigerator />;
      case 'sink':
        return <FaSink />;
      case 'basement-door':
        return <TbStairsDown />;
      case 'cabinets':
        return <GiWoodenCrate />;
      
      // Basement objects
      case 'light-bulb':
        return <FaLightbulb />;
      case 'rocking-chair':
        return <GiWoodenChair />;
      case 'hidden-wall':
        return <BsSquareFill />;
      case 'footprints':
        return <RiFootprintFill />;
      
      // Secret room objects
      case 'altar':
        return <GiStoneBlock />;
      case 'doll':
        return <FaChild />;
      case 'wall-writing':
        return <GiBloodySword />;
      case 'drawings':
        return <GiScrollQuill />;
      
      // Generic objects
      case 'floor':
        return <GiPlainSquare />;
      case 'ceiling':
        return <FaSquare />;
      case 'wall':
        return <BsSquareFill />;
      case 'dishes':
        return <FaRegSquare />;
        
      // Jumpscare
      case 'jumpscare':
        return <GiCurledTentacle size={200} />;
        
      default:
        return <FaQuestion />; // Fallback for unknown objects
    }
  };

  const iconColor = object.color || '#fff';
  const Icon = getObjectIcon();

  // Calculate icon size based on object dimensions - make icons larger
  const iconSize = Math.min(object.size.width, object.size.height) * 1.2;

  // Improve icon contrast based on the type of object
  const getEnhancedColor = () => {
    // Brighten up colors for better visibility
    switch (object.id) {
      case 'door':
      case 'basement-door':
        return '#8B4513'; // Saddle brown for doors
      case 'bed':
        return '#A52A2A'; // Brown for bed
      case 'dresser':
      case 'cabinets':
        return '#D2691E'; // Chocolate for furniture
      case 'mirror':
        return '#C0C0C0'; // Silver for mirror
      case 'window':
        return '#87CEEB'; // Sky blue for window
      case 'music-box':
        return '#FFD700'; // Gold for music box
      case 'refrigerator':
        return '#B0C4DE'; // Light steel blue for fridge
      case 'sink':
        return '#E0FFFF'; // Light cyan for sink
      case 'light-bulb':
        return '#FFFF99'; // Light yellow for bulb
      case 'rocking-chair':
        return '#CD853F'; // Peru (brown) for chair
      case 'altar':
        return '#800000'; // Maroon for altar
      case 'doll':
        return '#FFC0CB'; // Pink for doll
      case 'wall-writing':
        return '#8B0000'; // Dark red for blood writing
      case 'drawings':
        return '#FF4500'; // Orange red for drawings
      case 'floor':
      case 'wall':
      case 'ceiling':
        return '#3D3D3D'; // Dark gray for structural elements
      default:
        return iconColor; // Use the original color if no enhancement defined
    }
  };

  return (
    <div
      className="absolute transition-all duration-500 flex items-center justify-center"
      style={{
        top: `${object.position.y}%`,
        left: `${object.position.x}%`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
        zIndex: object.zIndex || 1,
        transform: object.transform || 'none',
        filter: object.shadow ? `drop-shadow(${object.shadow}) drop-shadow(2px 2px 4px rgba(0,0,0,0.5))` : 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
        color: getEnhancedColor(),
        opacity: object.opacity || 1,
      }}
    >
      {/* Render the icon with dynamic sizing */}
      {React.cloneElement(Icon, { 
        size: iconSize,
        className: `${object.flickering ? 'animate-flicker' : ''} ${object.floating ? 'animate-float' : ''} ${object.pulsing ? 'animate-pulse' : ''}`
      })}
    </div>
  );
} 