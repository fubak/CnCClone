class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.networkClient = null;
    }

    init() {
        // Initialize network client
        this.networkClient = window.networkClient;
        
        // Connect to server if not already connected
        if (!this.networkClient || !this.networkClient.isConnected()) {
            console.log('Connecting to server...');
            // This will be implemented in network/client.js
        }
    }

    create() {
        // Set background color
        this.cameras.main.setBackgroundColor('#1a4d2e'); // Dark green for placeholder ground
        
        // Get screen dimensions
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Create a simple grid for the map (placeholder)
        const gridSize = 32; // 32x32 pixel tiles
        const graphics = this.add.graphics();
        
        // Draw grid lines
        graphics.lineStyle(1, 0x000000, 0.3);
        
        // Vertical lines
        for (let x = 0; x <= width; x += gridSize) {
            graphics.moveTo(x, 0);
            graphics.lineTo(x, height);
        }
        
        // Horizontal lines
        for (let y = 0; y <= height; y += gridSize) {
            graphics.moveTo(0, y);
            graphics.lineTo(width, y);
        }
        
        graphics.strokePath();
        
        // Add some placeholder objects
        // Construction yard (player's base)
        const constructionYard = this.add.rectangle(width / 2, height / 2, 96, 96, 0x0000ff, 0.8);
        constructionYard.setStrokeStyle(2, 0xffffff);
        
        // Add a placeholder unit
        const unit = this.add.circle(width / 2 - 100, height / 2, 16, 0xff0000);
        unit.setStrokeStyle(2, 0xffffff);
        
        // Add a placeholder resource
        const tiberium = this.add.rectangle(width / 2 + 200, height / 2 - 100, 32, 32, 0x00ff00, 0.8);
        
        // Add UI elements
        // Resource display
        this.add.rectangle(100, 30, 180, 40, 0x000000, 0.7);
        this.add.text(20, 20, 'Credits: 5000', {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#ffffff'
        });
        
        // Add back button
        const backButton = this.add.text(width - 20, 20, 'Back to Menu', {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#ffffff'
        }).setOrigin(1, 0).setInteractive();
        
        backButton.on('pointerover', () => {
            backButton.setColor('#ff0000');
        });
        
        backButton.on('pointerout', () => {
            backButton.setColor('#ffffff');
        });
        
        backButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });
        
        // Log that the game scene has loaded
        console.log('GameScene: Game scene loaded successfully');
    }

    update() {
        // Game logic will be implemented here
    }
} 