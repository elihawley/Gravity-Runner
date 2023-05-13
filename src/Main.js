/**
 * Elia Hawley
 * Gravity Runner
 * Took around 27 hours to complete
 * Creative tilt (technical): Added logic and hitboxes for stomping on bats with gravity and without gravity (see Play.js's checkCollision function). Took a lot of experimentation and turned out it could be done in a clean way.
 * Creative tilt (style): Kept the style of Google Chrome's Dinosaur game but with more features (gravity control and squishing enemies) and animations (handcrafted sprites and explosions).
 */

let config = {
    type: Phaser.AUTO,
    width: 400,
    height: 180,
    scene: [ Menu, Play, Credits ],
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyG, keyR, keyC;
