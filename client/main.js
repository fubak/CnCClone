// Phaser game configuration
const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene,
        MainMenuScene,
        GameScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    render: {
        pixelArt: true,
        antialias: false
    }
};

// Create the game instance
const game = new Phaser.Game(config);

// Add performance monitoring
let fps = {
    startTime: 0,
    frameCount: 0,
    currentFps: 0,
    updateInterval: 1000 // Update FPS every second
};

// Add FPS counter
game.events.on('step', function (time, delta) {
    fps.frameCount++;
    
    if (time - fps.startTime > fps.updateInterval) {
        fps.currentFps = Math.round((fps.frameCount * 1000) / (time - fps.startTime));
        fps.frameCount = 0;
        fps.startTime = time;
        
        // Log FPS to console
        console.log(`Current FPS: ${fps.currentFps}`);
        
        // If FPS is below target, log a warning
        if (fps.currentFps < 55) {
            console.warn(`FPS dropped below target: ${fps.currentFps}`);
        }
    }
}); 