// Game Constants
export const TILE_SIZE = 32;
export const MAP_WIDTH = 128;
export const MAP_HEIGHT = 128;
export const UPDATE_RATE = 20; // Hz

// Enums
export enum Faction {
  GDI = 'GDI',
  NOD = 'NOD'
}

export enum ResourceType {
  CREDITS = 'credits',
  POWER = 'power'
}

export enum UnitType {
  RIFLEMAN = 'rifleman',
  ENGINEER = 'engineer',
  HARVESTER = 'harvester',
  LIGHT_TANK = 'light_tank',
  MEDIUM_TANK = 'medium_tank',
  MAMMOTH_TANK = 'mammoth_tank',
  BUGGY = 'buggy',
  STEALTH_TANK = 'stealth_tank',
  ORCA = 'orca',
  APACHE = 'apache'
}

export enum BuildingType {
  CONSTRUCTION_YARD = 'construction_yard',
  POWER_PLANT = 'power_plant',
  REFINERY = 'refinery',
  BARRACKS = 'barracks',
  WAR_FACTORY = 'war_factory',
  TECH_CENTER = 'tech_center',
  GUARD_TOWER = 'guard_tower',
  ADVANCED_GUARD_TOWER = 'advanced_guard_tower',
  HAND_OF_NOD = 'hand_of_nod',
  TEMPLE_OF_NOD = 'temple_of_nod',
  ION_CANNON = 'ion_cannon',
  WALL = 'wall'
}

export enum TileType {
  GROUND = 'ground',
  WATER = 'water',
  CLIFF = 'cliff',
  TIBERIUM = 'tiberium'
}

// Interfaces
export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  username: string;
  faction: Faction;
  resources: {
    [ResourceType.CREDITS]: number;
    [ResourceType.POWER]: number;
  };
}

export interface Unit {
  id: string;
  type: UnitType;
  position: Position;
  health: number;
  playerId: string;
  selected: boolean;
}

export interface Building {
  id: string;
  type: BuildingType;
  position: Position;
  health: number;
  playerId: string;
  selected: boolean;
}

export interface Tile {
  type: TileType;
  position: Position;
  resourceAmount?: number;
}

export interface GameState {
  players: { [playerId: string]: Player };
  units: { [unitId: string]: Unit };
  buildings: { [buildingId: string]: Building };
  map: {
    width: number;
    height: number;
    tiles: Tile[][];
  };
} 