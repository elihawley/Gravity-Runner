class BatGroup extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        this.scene = scene;

        this.maxSize = 30;
        this.numBats = 1;

        let firstBat = this.createFromConfig({
            classType: Bat,
            quantity: 1,
            active: true,
            visible: true,
            setXY: {
                x: game.config.width - borderUISize - borderPadding,
                y: (Math.random() < .5) ? (4*borderUISize + 2*borderPadding) : (game.config.height - 2*borderUISize - 2*borderPadding),
            },
            key: 'bat'
        })[0];

        firstBat.anims.create({
            key: 'anim_bat',
            frames: this.scene.anims.generateFrameNumbers('bat', {start: 0, end: 1, first: 0}),
            frameRate: 4,
            repeat: -1,
        })
        firstBat.play('anim_bat');
    }

    update() {
        this.getChildren().forEach(bat => bat.update());
        this.updateNumBats();
    }

    updateNumBats() {
        const currWaveDifficulty = this.scene.waveDifficultyLevel
        this.numBats = Math.min(30, Math.floor(currWaveDifficulty / 10));
        for (let i = 0; i < this.numBats - this.countActive(); i++) {
            let newBat = this.createFromConfig({
                classType: Bat,
                quantity: 1,
                active: true,
                visible: true,
                setXY: {
                    x: game.config.width - borderUISize - borderPadding,
                    y: (Math.random() < .5) ? (4*borderUISize + 2*borderPadding) : (game.config.height - 2*borderUISize - 2*borderPadding),
                },
                key: 'bat'
            })[0];

            newBat.anims.create({
                key: 'anim_bat',
                frames: this.scene.anims.generateFrameNumbers('bat', {start: 0, end: 1, first: 0}),
                frameRate: 4,
                repeat: -1,
            })
            newBat.play('anim_bat');
        }
    }
}
