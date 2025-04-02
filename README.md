**Whispers in the Dark: Game Overview**

This is a text-based horror game where players navigate through an abandoned house using text commands.

The visual elements are minimal, using simple div elements to represent objects in the game environment.


**Game Structure**
The game consists of 5 interconnected scenes (rooms):
Hallway (starting room)
Bedroom
Kitchen
Basement (locked initially)
Secret Room (hidden area with multiple endings)

**Command System**
Players interact with the game by typing text commands. The main commands are:
Look/Examine: look or examine + optional object (e.g., "look around", "examine mirror")
Movement: go, move, or walk + direction (e.g., "go north", "move east")
Take/Get: take, get, grab, or pick + item (e.g., "take key", "get teddy")
Use/Interact: open, use, play, push, unlock, read + object (e.g., "open music box", "push wall")
Inventory: inventory or items to see what you're carrying
Help: help displays basic command list
For a new player, the help command reveals the basic commands, but discovering specific interactions requires exploration.

**Game Progression**
Players start in the hallway and can explore the bedroom or kitchen
In the bedroom, they can find a teddy bear and a music box
Playing the music box helps unlock the basement (via a key found in the kitchen)
In the basement, players can discover hidden footprints leading to a secret wall
Pushing the wall reveals a hidden room with a doll
The game has 3 different endings based on how the player interacts with the doll:
Good Ending: Destroy the doll
True Ending: Embrace the doll
Bad Ending: Try to leave


**Technical Implementation**
The game logic is built around:
A scene system with unique objects and interactions per room
Command parsing that breaks input into command + target
State management tracking:
Current scene
Inventory items
Visited rooms

Special effects (jumpscare triggers)
Each scene has:
Visual representation via background colors and object positions
Text descriptions
Available exits
Possible interactions with objects
Special effects (like flickering lights)
The processCommand function handles all logic, with specific command handlers for movement, looking, taking items, etc. Commands can trigger state changes like adding items to inventory, moving between rooms, or activating special effects.
Special commands like destroy doll, embrace doll, or leave doll trigger different game endings.
