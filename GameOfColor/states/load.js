var GameOfColor;
(function (GameOfColor) {
    class Load extends Phaser.State {
        preload() {
            //this.load.image('preloadBar', 'assets/loader.png');
        }
        create() {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
            }
            else {
            }
            this.game.time.fps = 60;
            this.game.stage.backgroundColor = "#FFFFFF";
            //  We need arcade physics
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            // Make some people!
            var people = this.game.add.group();
            for (let i = 0; i < STARTING_POPULATION; i++) {
                var x = randomNum(0, this.scale.width);
                var y = randomNum(0, this.scale.height);
                var diameter = randomNum(10, 100);
                var person = new GameOfColor.Person(this, x, y, people, null, null);
                people.add(person);
            }
            this.game.state.start('Simulation', true, false);
        }
    }
    GameOfColor.Load = Load;
})(GameOfColor || (GameOfColor = {}));
//# sourceMappingURL=load.js.map