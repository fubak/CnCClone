class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Create loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Loading text
        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff'
        }).setOrigin(0.5);
        
        // Progress bar background
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2, 320, 30);
        
        // Progress bar
        const progressBar = this.add.graphics();
        
        // Loading progress events
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 + 10, 300 * value, 10);
        });
        
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
        
        // Load assets here
        // this.load.image('logo', 'assets/logo.png');
        // this.load.spritesheet('units', 'assets/units.png', { frameWidth: 32, frameHeight: 32 });
        
        // Placeholder assets for testing
        this.load.image('placeholder', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB7SURBVFhH7ZBBCsAgDAT9/6etoUgOJrA1Gw+lDgziZdwRyWVm5lf0Oj5BzYO6yxqoTlCzYAeogZoFO0AN1CzYAWqgZsEOUAM1C3aAGqhZsAPUQM2CHaAGahbsADVQs2AHqIGaBTtADdQs2AFqoGbBDlADNQt2gBqo/ZzZAVGfGy5zjkJBAAAAAElFTkSuQmCC');
    }

    create() {
        console.log('BootScene: Assets loaded successfully');
        this.scene.start('MainMenuScene');
    }
} 