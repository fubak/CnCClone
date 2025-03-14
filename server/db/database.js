const { MongoClient } = require('mongodb');

// MongoDB connection singleton
class Database {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    if (this.db) return this.db;

    try {
      const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cncclone';
      this.client = new MongoClient(uri);
      await this.client.connect();
      this.db = this.client.db();
      console.log('Connected to MongoDB');
      return this.db;
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log('MongoDB connection closed');
    }
  }

  // Helper methods for common database operations
  async findOne(collection, query, options = {}) {
    if (!this.db) await this.connect();
    return this.db.collection(collection).findOne(query, options);
  }

  async find(collection, query, options = {}) {
    if (!this.db) await this.connect();
    return this.db.collection(collection).find(query, options).toArray();
  }

  async insertOne(collection, document) {
    if (!this.db) await this.connect();
    return this.db.collection(collection).insertOne(document);
  }

  async updateOne(collection, filter, update, options = {}) {
    if (!this.db) await this.connect();
    return this.db.collection(collection).updateOne(filter, update, options);
  }

  async deleteOne(collection, filter) {
    if (!this.db) await this.connect();
    return this.db.collection(collection).deleteOne(filter);
  }

  // Create indexes for collections
  async createIndexes() {
    if (!this.db) await this.connect();
    
    // Game Room Indexes
    await this.db.collection('gameRooms').createIndex({ roomId: 1 }, { unique: true });
    await this.db.collection('gameRooms').createIndex({ status: 1 });
    await this.db.collection('gameRooms').createIndex({ 'players.id': 1 });
    
    // Player Indexes
    await this.db.collection('players').createIndex({ username: 1 }, { unique: true });
    await this.db.collection('players').createIndex({ lastActive: 1 });
    
    // Game History Indexes
    await this.db.collection('gameHistory').createIndex({ roomId: 1 });
    await this.db.collection('gameHistory').createIndex({ players: 1 });
    await this.db.collection('gameHistory').createIndex({ createdAt: 1 });
    
    console.log('Database indexes created');
  }
}

// Export a singleton instance
const database = new Database();
module.exports = database; 