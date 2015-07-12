var game = new Phaser.Game(
    800, 600,
    Phaser.CANVAS, '',
    {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
);

//load in assets
function preload() {

}

var people;
var screenWidth = 800;
var screenHeight = 600;
var startingPopulation = 100;
var numOfColors = 2;
var isRunning = true;

//run after preload
function create() {
    game.time.fps = 60;
    game.stage.backgroundcolor = "#FFFFFF";

    //  We need arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //press "F" to toggle fullscreen
    fullScreenKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
    fullScreenKey.onDown.add(toggleFullScreen, this);

    people = game.add.group();
    startSimulation();
}

//game logic (updates every frame)
function update() {
    if (isRunning) {

    }
}

function update() {
    game.physics.arcade.collide(people, people, peopleTouched, null, this);

}

function render() {
    game.debug.text('Population Count: ' + people.length, 10, 10, 'rgb(255,255,255)');
}

function toggleFullScreen()
{
        if (!game.stage.scale.isFullScreen) game.stage.scale.startFullScreen();
        else game.stage.scale.stopFullScreen();
}

function startSimulation() {
    for (var i = 0; i<startingPopulation; i++)
    {
        var x = randomNum(0,screenWidth);
        var y = randomNum(0,screenHeight);
        var diameter = randomNum(10,100);
        var person = new Person(game, x, y, null, null);
        people.add(person);
    }
}

//handle end game
function endSimulation() {
    people.destroy();
}

//hides titleScreen once start button clicked
function startKeyPressed() {
    titleScreen.visible = false;
    //startButton.visible = false;
    startGame();
}

function playSound(x,y,sound,volume)
{
    var volume = 1;
    //if only one argument is supplied (aka we don't care about distance)
    if(typeof x === "object")
    {
        sound = x;
        volume = y;
    }
    else
    {
    var distance = game.physics.distanceToXY(shark,x,y);
    var maxDistance = 300;
    if (distance>maxDistance) distance=maxDistance;
    volume = (maxDistance-distance)/maxDistance;
    }
    if (volume == 0) volume = 0.01;
    sound.play();
    sound.volume = volume;
}

