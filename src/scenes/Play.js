class Play extends Phaser.Scene {
    constructor() {
        super('playScene')        
    }


    preload() {
        this.load.image('background','./assets/background.png');
        this.load.image('wizard', './assets/wizard.png');
        this.load.image('bat', './assets/bat.png');
    }

    create() {
        // Inputs
        this.background = this.add.tileSprite(0, 0, 400, 180, 'background').setOrigin(0, 0);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // Text Config
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100,
        };

        // Background Music
        let mmusic = this.sound.add("sfx_music", {volume: 1, loop: true});
        mmusic.play()


        // Background Image
        // this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // Explosion Animation
        // this.anims.create({
        //     key: 'explode',
        //     frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
        //     frameRate: 30,
        // });
        // Explosion particles
        // this.particleEmitter = this.add.particles(0, 0, 'explosion_particle', {
        //     frequency: -1, // put in explode mode
        //     speed: 200,
        //     lifespan: 200,
        //     bounds: {
        //         x: borderUISize,
        //         y: borderUISize + borderPadding + borderUISize * 2,
        //         width: game.config.width - 2 * borderUISize,
        //         height: game.config.height - borderUISize - (borderUISize + borderPadding + borderUISize * 2),
        //     }
        // })

        // Player
        this.wizard = new Wizard(this, borderUISize + borderPadding, game.config.height - borderUISize - borderPadding - 15, 'wizard').setOrigin(.5, 0);

        this.anims.create({
            key: 'gravity',
            frames: this.anims.generateFrameNumbers('wizard', {start: 0, end: 9, first: 0}),
            framerate: 30
        })

        this.anims.create({
            key:
             'gover',
            frames: this.anims.generateFrameNumbers('wizard', {start: 0, end: 9, first: 0}),
            framerate: 30
        })
        
        // Enemies
        this.batGroup = new BatGroup(this);
'e'
        // Game Logic
        this.gameOver = false;
        this.speedMultiplier = game.settings.speedMultiplier
        this.waveDifficultyLevel = game.settings.waveDifficultyLevel

        this.timeSurvived = 0;
        this.timeSurvivedText = this.add.text(game.config.width - 2*(borderUISize + borderPadding) - (borderUISize + borderPadding * 2), borderUISize + borderPadding * 2, Math.round(this.timeSurvived / 1000), textConfig);
        this.timeSurvivedClock = this.time.addEvent({
            callback: () => {
                if (this.gameOver) {
                    this.timeSurvivedClock.remove();
                }

                this.timeSurvived += 100;
                this.add.text(game.config.width - 2*(borderUISize + borderPadding) - (borderUISize + borderPadding * 2), borderUISize + borderPadding * 2, Math.round(this.timeSurvived / 1000), textConfig); 

                if (this.speedMultiplier <= 5) {
                    this.speedMultiplier = Math.ceil(this.timeSurvived / 1000);
                }
                this.waveDifficultyLevel += .1;
            },
            callbackScope: this,
            delay: 100,
            loop: true,
        });

    }

    update() {
        // Scroll Background
        this.background.tilePositionX -= 3;

        if (!this.gameOver) {
            this.wizard.update();
            this.bat.update();
            this.batGroup.update();
        }
        
        if (this.gameOver) {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', this.textConfig).setOrigin(.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu', this.textConfig).setOrigin(.5);
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }

        if (!this.gameOver) {
            this.wizard.update();
            this.batGroup.update();
        }

        if (this.checkCollision(this.wizard, this.batGroup)) {
            this.gameOver = true;
        }
    }

    checkCollision(wizard, batGroup) {
        const bats = batGroup.getMatching('active', true);

        for (const bat of bats) {
            if (wizard.x < bat.x + bat.displayWidth &&
                wizard.x + wizard.displayWidth > bat.x &&
                wizard.y < bat.y + bat.displayHeight && 
                wizard.displayHeight + wizard.y > bat.y) {
                
                // this.batExplode(this.bat);
                return true;
            }
        }
        return false;
    }

    // dieOfCovid(wizard) {

    // }

    // batExplode(bat) {
    //     bat.alpha = 0;

    //     this.particleEmitter.explode(15, bat.x, bat.y)

    //     let boom = this.add.sprite(bat.x, bat.y, 'explosion').setOrigin(0, 0);
    //     boom.anims.play('explode');
    //     boom.on('animationcomplete', () => {
    //         bat.reset();
    //         bat.alpha = 1;
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
