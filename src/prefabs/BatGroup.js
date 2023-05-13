class BatGroup extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        this.scene = scene;

        this.maxSize = 30;
        this.numBats = 1;

        this.createFromConfig({
            classType: Bat,
            quantity: 1,
            active: true,
            visible: true,
            key: 'bat'
        })
    }

    update() {
        this.getChildren().forEach(bat => bat.update());
        this.updateNumBats();
    }

    randomizePlacement() {
        const spawnBounds = new Phaser.Geom.Rectangle(game.config.width - borderUISize, 2*borderUISize + 2*borderPadding, borderPadding, game.config.height - 4*borderUISize - 2*borderPadding);

        Phaser.Actions.RandomRectangle(this.getChildren(), spawnBounds);
    }

    updateNumBats() {
        const currWaveDifficulty = this.scene.waveDifficultyLevel
        this.numBats = Math.min(30, Math.floor(currWaveDifficulty / 2));
        for (let i = 0; i < this.numBats - this.countActive(); i++) {
            this.createFromConfig({
                classType: Bat,
                quantity: 1,
                active: true,
                visible: true,
                key: 'bat'
            })
        }
    }
}