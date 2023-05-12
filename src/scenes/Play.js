class Play extends Phaser.scene {
    constructor() {
        super('playscene')        
    }


    preload() {
        // this.load.image('rocket', './assets/rocket.png');
        // this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
        // this.load.image('explosion_particle', './assets/explosion_particle.png');
        // this.load.audio('sfx_menu','./assets/menu_music.wav');
    }

    create() {
        // Inputs
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // Background Music
        // let mmusic = this.sound.add("sfx_menu", {volume: 1, loop: true});
        // mmusic.play()


        // Background Image
        // this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);


        // Player
        // this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(.5, 0);
        
        // Enemies
        // this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
    }

    update() {
        // speedMultiplier: 1,
        // waveDifficultyLevel: 1,

        // Scroll Background
        // this.starfield.tilePositionX -= 4;

        // if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        //     this.scene.restart();
        // }
        // if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //     this.scene.start('menuScene');
        // }

        // if (!this.gameOver) {
        //     this.p1Rocket.update();
        //     this.ship01.update();
        //     this.ship02.update();
        //     this.ship03.update();
        // }

        // if (this.p1Rocket.isFiring) {
        //     this.fireText.alpha = 1;
        // } else {
        //     this.fireText.alpha = 0;
        // }

        // if (this.checkCollision(this.p1Rocket, this.ship03)) {
        //     this.p1Rocket.reset();
        //     this.shipExplode(this.ship03);
        // }
    }

    // checkCollision(rocket, ship) {
    //     if (rocket.x < ship.x + ship.width &&
    //         rocket.x + rocket.width > ship.x &&
    //         rocket.y < ship.y + ship.height && 
    //         rocket.height + rocket.y > ship.y) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // shipExplode(ship) {
    //     ship.alpha = 0;

    //     this.particleEmitter.explode(15, ship.x, ship.y)

    //     let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    //     boom.anims.play('explode');
    //     boom.on('animationcomplete', () => {
    //         ship.reset();
    //         ship.alpha = 1;
    //         boom.destroy();
    //     });

    //     let eChoice = Math.floor(Math.random() * 4);
    //     if (eChoice === 0) {
    //         this.sound.play('sfx_explosion1');
    //     }
    //     else if (eChoice === 1) {
    //         this.sound.play('sfx_explosion2');
    //     }
    //     else if (eChoice === 2) {
    //         this.sound.play('sfx_explosion3');
    //     }
    //     else {
    //         this.sound.play('sfx_explosion4');
    //     }
    // }
}
