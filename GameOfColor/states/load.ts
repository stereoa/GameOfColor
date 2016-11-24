module GameOfColor {

    export class Load extends Phaser.State {

        preload() {
            //this.load.image('preloadBar', 'assets/loader.png');
        }

        create() {

            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
            }
            else {
                //  Same goes for mobile settings.
            }

            this.game.time.fps = 60;
            this.game.stage.backgroundColor = "#FFFFFF";

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            var colors = [];
            for (var i = 0; i < STARTING_COLORS_MAX; i++) {
                colors.push(Genetics.getRandomColor());
            }

            // Make some people!
            var people = this.game.add.group();
            for (var i = 0; i < STARTING_POPULATION; i++) {
                var person = Genetics.createRandomPerson(null, this.game, people);
                person.setColor(colors[randomNum(0, colors.length - 1)]);
                people.add(person);
            }

            this.game.state.start("Simulation", false, false);

        }

    }

}