class Play extends Phaser.Scene {
    constructor() {
        super('playScene')        
    }


    preload() {
        this.load.image('background','./assets/background.png');
        this.load.spritesheet('wizard', './assets/wizard-sheet.png', { frameWidth: 15, frameHeight: 30, startFrame: 0, endFrame: 1 });
        this.load.spritesheet('bat', './assets/bat-sheet.png', { frameWidth: 15, frameHeight: 10, startFrame: 0, endFrame: 1 });
        this.load.image('bat_particle', './assets/bat_particle.png');
    }

    create() {
        // Inputs
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // Text Config
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '12px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 35,
        };

        // Background Music
        let mmusic = this.sound.add("sfx_music", {volume: 1, loop: true});
        mmusic.play()


        // Background Image
        this.background = this.add.tileSprite(0, 0, 400, 180, 'background').setOrigin(0, 0);

        // Player
        this.wizard = new Wizard(this, borderUISize + borderPadding, game.config.height - borderUISize - borderPadding - (30*1.5), 'wizard').setOrigin(.5, 0);
        this.wizard.anims.create({
            key: 'anim_wizard',
            frames: this.anims.generateFrameNumbers('wizard', {start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1,
        })
        this.wizard.play('anim_wizard');

        // Explosion particles
        this.particleEmitter = this.add.particles(0, 0, 'bat_particle', {
            frequency: -1, // put in explode mode
            speed: 50,
            lifespan: 200,
            bounds: {
                x: borderUISize,
                y: borderUISize + borderPadding + borderUISize * 2,
                width: game.config.width - 2 * borderUISize,
                height: game.config.height - borderUISize - (borderUISize + borderPadding + borderUISize * 2),
            }
        })
        
        // Enemies
        this.batGroup = new BatGroup(this);

        // Game Logic
        this.gameOver = false;
        this.speedMultiplier = game.settings.speedMultiplier
        this.waveDifficultyLevel = game.settings.waveDifficultyLevel

        this.timeSurvived = 0;
        this.timeSurvivedText = this.add.text(game.config.width - 3*(borderUISize + borderPadding), borderUISize + borderPadding * 2, Math.round(this.timeSurvived / 1000), textConfig);
        this.timeSurvivedClock = this.time.addEvent({
            callback: () => {
                if (this.gameOver) {
                    this.timeSurvivedClock.remove();
                }

                this.timeSurvived += 100;
                this.timeSurvivedText.text = Math.round(this.timeSurvived / 1000);

                if (this.speedMultiplier <= 3) {
                    this.speedMultiplier = 1 + Math.ceil(this.timeSurvived / 1000) * .03;
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

        if (this.checkCollision(this.wizard, [...this.batGroup.getMatching('active', true)])) {
            this.gameOver = true;
            this.sound.play('sfx_gameover');
        }
    }

    checkCollision(wizard, obstacles) {
        for (const obstacle of obstacles) {
            if (obstacle.visible) {
                if (wizard.x < obstacle.x + obstacle.displayWidth &&
                    wizard.x + wizard.displayWidth > obstacle.x &&
                    wizard.y < obstacle.y + obstacle.displayHeight && 
                    wizard.displayHeight + wizard.y > obstacle.y) {
    
                        if (!wizard.gravityOn && ((wizard.y < (obstacle.y + obstacle.displayHeight)) && (wizard.y > (obstacle.y + obstacle.displayHeight/3)))) {
                            // Stomp on upper bats
                            obstacle.visible = false;
                            this.batExplode(wizard, obstacle);
                            return false;
                        } else if (wizard.gravityOn && (((wizard.displayHeight + wizard.y) > obstacle.y) && ((wizard.displayHeight + wizard.y) < (obstacle.y + obstacle.displayHeight * (2/3))))) {
                            // Stomp on lower bats
                            obstacle.visible = false;
                            this.batExplode(wizard, obstacle);
                            return false;
                        } else {
                            return true;
                        }
                }
            }
        }
        return false;
    }

    batExplode(wizard, bat) {
        this.particleEmitter.explode(5, bat.x, bat.y, {angle: wizard.gravityOn ? 135 : 45});
    }
}
