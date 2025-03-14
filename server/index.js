require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('colyseus');
const { MongoClient } = require('mongodb');

// Import game room
const { GameRoom } = require('./rooms/GameRoom');

// Create Express app and HTTP server
const app = express();
const port = process.env.PORT || 3000;

// Apply middleware
app.use(cors());
app.use(express.json());

// Serve static files from the client directory
app.use(express.static('client'));

// Create HTTP server
const server = http.createServer(app);

// Create Colyseus server
const gameServer = new Server({
  server,
  // Set the update rate to 20Hz (50ms)
  updateRate: process.env.UPDATE_RATE || 20,
});

// Register game room
gameServer.define('game_room', GameRoom);

// MongoDB connection
const mongoClient = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/cncclone');

async function startServer() {
  try {
    // Try to connect to MongoDB, but continue even if it fails
    try {
      await mongoClient.connect();
      console.log('Connected to MongoDB');

      // Create indexes
      const db = mongoClient.db();
      
      // Game Room Indexes
      await db.collection('gameRooms').createIndex({ roomId: 1 }, { unique: true });
      await db.collection('gameRooms').createIndex({ status: 1 });
      await db.collection('gameRooms').createIndex({ 'players.id': 1 });
      
      // Player Indexes
      await db.collection('players').createIndex({ username: 1 }, { unique: true });
      await db.collection('players').createIndex({ lastActive: 1 });
      
      // Game History Indexes
      await db.collection('gameHistory').createIndex({ roomId: 1 });
      await db.collection('gameHistory').createIndex({ players: 1 });
      await db.collection('gameHistory').createIndex({ createdAt: 1 });
    } catch (dbError) {
      console.warn('Failed to connect to MongoDB, continuing without database:', dbError.message);
    }

    // Start listening
    await gameServer.listen(port);
    console.log(`Game server is running on http://localhost:${port}`);
    
    // Log performance metrics
    setInterval(() => {
      const rooms = gameServer.rooms;
      console.log(`Active rooms: ${rooms.length}`);
      console.log(`Connected clients: ${rooms.reduce((acc, room) => acc + room.clients.length, 0)}`);
    }, 60000); // Log every minute
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await gameServer.gracefullyShutdown();
  try {
    await mongoClient.close();
  } catch (error) {
    console.warn('Error closing MongoDB connection:', error.message);
  }
  process.exit(0);
});

// Start the server
startServer(); 