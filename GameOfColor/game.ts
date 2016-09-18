module GameOfColor {
    var fullScreenKey: Phaser.Key;
    var people: Phaser.Group;

    export class Game extends Phaser.Game {

        constructor() {
            super(800, 600, Phaser.AUTO, "content", null);

            this.state.add("Load", Load, false);
            this.state.add("Simulation", Simulation, false);

            this.state.start("Load");
        }

        playSound: (x, y, sound) => void = (x, y, sound) => {
            var volume = 1;

            var distance = this.camera.position.distance(x, y);
            var maxDistance = 300;
            if (distance > maxDistance) distance = maxDistance;
            volume = (maxDistance - distance) / maxDistance;

            if (volume === 0) volume = 0.01;
            sound.play();
            sound.volume = volume;
        }
    }
}