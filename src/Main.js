let config = {
    type: Phaser.AUTO,
    width: 400,
    height: 180,
    scene: [ Menu, Play ],
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyG, keyR, keyC;
