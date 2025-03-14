// Network client for connecting to the Colyseus server
class NetworkClient {
    constructor() {
        this.client = null;
        this.room = null;
        this.connected = false;
        this.serverUrl = 'ws://localhost:3000'; // Default server URL
        this.latency = 0;
        this.lastPingTime = 0;
        
        // Bind methods
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.isConnected = this.isConnected.bind(this);
        this.ping = this.ping.bind(this);
    }
    
    // Connect to the Colyseus server
    async connect(serverUrl = this.serverUrl) {
        try {
            console.log(`Connecting to server at ${serverUrl}...`);
            this.serverUrl = serverUrl;
            this.client = new Colyseus.Client(serverUrl);
            this.connected = true;
            
            // Start pinging the server to measure latency
            this.pingInterval = setInterval(this.ping, 1000);
            
            console.log('Connected to server successfully');
            return true;
        } catch (error) {
            console.error('Failed to connect to server:', error);
            this.connected = false;
            return false;
        }
    }
    
    // Disconnect from the Colyseus server
    async disconnect() {
        try {
            if (this.room) {
                await this.leaveRoom();
            }
            
            if (this.pingInterval) {
                clearInterval(this.pingInterval);
            }
            
            this.connected = false;
            console.log('Disconnected from server');
            return true;
        } catch (error) {
            console.error('Failed to disconnect from server:', error);
            return false;
        }
    }
    
    // Join a game room
    async joinRoom(roomName = 'game_room', options = {}) {
        try {
            if (!this.client) {
                await this.connect();
            }
            
            console.log(`Joining room ${roomName}...`);
            this.room = await this.client.joinOrCreate(roomName, options);
            
            // Set up room event listeners
            this.room.onStateChange((state) => {
                console.log('Room state changed:', state);
                // Handle state change
            });
            
            this.room.onMessage('*', (type, message) => {
                console.log(`Received message of type ${type}:`, message);
                // Handle message
            });
            
            this.room.onLeave((code) => {
                console.log(`Left room with code ${code}`);
                this.room = null;
            });
            
            this.room.onError((code, message) => {
                console.error(`Room error (${code}):`, message);
            });
            
            console.log(`Joined room ${roomName} successfully`);
            return true;
        } catch (error) {
            console.error('Failed to join room:', error);
            return false;
        }
    }
    
    // Leave the current game room
    async leaveRoom() {
        try {
            if (this.room) {
                await this.room.leave();
                this.room = null;
                console.log('Left room successfully');
            }
            return true;
        } catch (error) {
            console.error('Failed to leave room:', error);
            return false;
        }
    }
    
    // Send a message to the server
    sendMessage(type, message) {
        try {
            if (!this.room) {
                console.error('Cannot send message: Not in a room');
                return false;
            }
            
            this.room.send(type, message);
            return true;
        } catch (error) {
            console.error('Failed to send message:', error);
            return false;
        }
    }
    
    // Check if connected to the server
    isConnected() {
        return this.connected && this.client !== null;
    }
    
    // Ping the server to measure latency
    ping() {
        if (!this.room) return;
        
        this.lastPingTime = Date.now();
        this.room.send('ping');
        
        // Set up a one-time message handler for the pong response
        const pongHandler = (message) => {
            const now = Date.now();
            this.latency = now - this.lastPingTime;
            console.log(`Current latency: ${this.latency}ms`);
            
            // If latency is too high, log a warning
            if (this.latency > 150) {
                console.warn(`High latency detected: ${this.latency}ms`);
            }
            
            // Remove the handler after receiving the pong
            this.room.removeListener('pong', pongHandler);
        };
        
        this.room.onMessage('pong', pongHandler);
    }
}

// Create a global instance of the network client
window.networkClient = new NetworkClient(); 