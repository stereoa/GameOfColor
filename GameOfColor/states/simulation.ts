module GameOfColor {
    var fullScreenKey: Phaser.Key;

    export class Simulation extends Phaser.State {

        create() {
            //press "F" to toggle fullscreen
            fullScreenKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
            fullScreenKey.onDown.add(this.toggleFullScreen);
        }

        toggleFullScreen: () => void = () => {
            if (!this.scale.isFullScreen) this.scale.startFullScreen();
            else this.scale.stopFullScreen();
        }
    }

}