class Bat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bat');
        this.scale = 1.5;
        // this.angle = -.05 + Math.random() * .1;
        this.moveSpeed = 1 + Math.random();

        this.scene = scene;
    }

    update() {
        // this.x += this.moveSpeed * Math.cos(180 + this.angle);
        // this.y += this.moveSpeed * Math.sin(this.angle);
        this.x -= this.moveSpeed;

        // reset on miss
        if (this.x <= borderUISize + borderPadding
            || this.x > game.config.width + borderPadding
            || this.y <= borderPadding
            || this.y >= game.config.height - borderUISize) {
            this.resetToSpawnArea();
        }
    }

    resetToSpawnArea() {
        this.x = game.config.width - borderUISize - borderPadding;
        this.y = (Math.random() < .5) ? (4*borderUISize + 2*borderPadding) : (game.config.height - 2*borderUISize - 2*borderPadding);
        // this.y = 2*borderUISize + 2*borderPadding + Math.random()*(game.config.height - 4*borderUISize - 2*borderPadding);
        // this.angle = -.05 + Math.random() * .1;
        this.moveSpeed = 1 + Math.random() * this.scene.speedMultiplier;
    }
}
