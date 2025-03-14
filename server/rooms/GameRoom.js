const { Room } = require('colyseus');
const { Schema, type, MapSchema } = require('@colyseus/schema');

// Player schema
class Player extends Schema {
  constructor(id, username, faction) {
    super();
    this.id = id;
    this.username = username;
    this.faction = faction;
    this.credits = 5000; // Starting credits
    this.power = 100;    // Starting power
  }
}

type(Player, {
  id: 'string',
  username: 'string',
  faction: 'string',
  credits: 'number',
  power: 'number'
});

// Game state schema
class GameState extends Schema {
  constructor() {
    super();
    this.players = new MapSchema();
    this.currentTick = 0;
  }
}

type(GameState, {
  players: { map: Player },
  currentTick: 'number'
});

// Game room
class GameRoom extends Room {
  constructor() {
    super();
    this.maxClients = 4; // Maximum 4 players (2v2)
    this.autoDispose = false; // Don't dispose the room automatically
  }

  onCreate(options) {
    console.log('Game room created!', options);
    
    // Initialize game state
    this.setState(new GameState());
    
    // Set up message handlers
    this.onMessage('join', (client, message) => {
      this.handleJoin(client, message);
    });
    
    this.onMessage('leave', (client) => {
      this.handleLeave(client);
    });
    
    // Set up game loop
    this.setSimulationInterval(() => this.update(), 1000 / 20); // 20 Hz update rate
  }

  onJoin(client, options) {
    console.log(`Client ${client.sessionId} joined the room`);
    
    // Add player to game state
    const player = new Player(
      client.sessionId,
      options.username || `Player ${this.clients.length}`,
      options.faction || (Math.random() > 0.5 ? 'GDI' : 'NOD')
    );
    
    this.state.players[client.sessionId] = player;
    
    // Broadcast join event
    this.broadcast('player-joined', {
      id: player.id,
      username: player.username,
      faction: player.faction
    });
  }

  onLeave(client, consented) {
    console.log(`Client ${client.sessionId} left the room`);
    
    // Remove player from game state
    delete this.state.players[client.sessionId];
    
    // Broadcast leave event
    this.broadcast('player-left', {
      id: client.sessionId
    });
  }

  update() {
    // Increment game tick
    this.state.currentTick++;
    
    // Game logic will be implemented here
  }

  handleJoin(client, message) {
    console.log(`Client ${client.sessionId} sent join message:`, message);
    // Handle join logic
  }

  handleLeave(client) {
    console.log(`Client ${client.sessionId} sent leave message`);
    // Handle leave logic
  }
}

module.exports = {
  GameRoom
}; 