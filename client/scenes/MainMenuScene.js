class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        // Set background color
        this.cameras.main.setBackgroundColor('#000000');
        
        // Get screen dimensions
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Add title
        const title = this.add.text(width / 2, height / 4, 'Command & Conquer Clone', {
            fontFamily: 'Arial',
            fontSize: 48,
            color: '#ffffff',
            stroke: '#ff0000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Add menu options
        const startButton = this.add.text(width / 2, height / 2, 'Start Game', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff'
        }).setOrigin(0.5).setInteractive();
        
        const optionsButton = this.add.text(width / 2, height / 2 + 60, 'Options', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff'
        }).setOrigin(0.5).setInteractive();
        
        // Add hover effects
        startButton.on('pointerover', () => {
            startButton.setColor('#ff0000');
        });
        
        startButton.on('pointerout', () => {
            startButton.setColor('#ffffff');
        });
        
        optionsButton.on('pointerover', () => {
            optionsButton.setColor('#ff0000');
        });
        
        optionsButton.on('pointerout', () => {
            optionsButton.setColor('#ffffff');
        });
        
        // Add click events
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
        
        optionsButton.on('pointerdown', () => {
            console.log('Options button clicked');
            // Options functionality will be implemented later
        });
        
        // Add version text
        this.add.text(width - 10, height - 10, 'v1.0.0', {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#ffffff'
        }).setOrigin(1);
    }
} 