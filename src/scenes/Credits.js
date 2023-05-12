class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '28px',
            backgroundColor: 'brown',
            color: 'white',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        };


        this.add.text(game.config.width / 2, game.config.height - borderUISize - borderPadding, 'CREDITS', menuConfig).setOrigin(.5);
        this.add.text(game.config.width / 2, game.config.height - borderUISize * 2 - borderPadding, 'Press (C) to return', Object.assign({}, menuConfig, {backgroundColor: '#00FF00', color: '#000'})).setOrigin(.5);
        this.add.text(game.config.width / 2, game.config.height - borderUISize * 3 - borderPadding, 'Developer: Elia Hawley', menuConfig).setOrigin(.5);
        this.add.text(game.config.width / 2, game.config.height - borderUISize * 4 - borderPadding, 'Assets: Asesprite', menuConfig).setOrigin(.5);
        this.add.text(game.config.width / 2, game.config.height - borderUISize * 5 - borderPadding, 'Music: TODO', menuConfig).setOrigin(.5);
        this.add.text(game.config.width / 2, game.config.height - borderUISize * 6 - borderPadding, 'SFX: jsfxr', menuConfig).setOrigin(.5);

        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.sound.play('sfx_select');
            this.scene.start('menuScene');
        }
    }
}