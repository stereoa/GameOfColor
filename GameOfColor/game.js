window.onload = function () {
    var game = new GameOfColor.Game();
};
function peopleTouched(personA, personB) {
    personA.damage(personB.strength);
    personB.damage(personA.strength);
}
var MATING_DISTANCE = 10;
var ATTACK_DISTANCE = 10;
var BASE_MAX_SPEED = 10;
var BASE_MAX_STRENGTH = 10;
var BASE_MAX_SIGHT = 10;
var BASE_MAX_DECAY = 10;
var STARTING_POPULATION = 10;
var GameOfColor;
(function (GameOfColor) {
    var Genetics;
    (function (Genetics) {
        function createRandomPerson(gender, game, people) {
            return new GameOfColor.Person(game, people, gender, null, null, null, null);
        }
        Genetics.createRandomPerson = createRandomPerson;
        function getRandomColor() {
            return "0x" + Math.floor(Math.random() * 16777215).toString(16);
        }
        Genetics.getRandomColor = getRandomColor;
        function getChildDna(mother, father) {
            var child = new Dna();
            child.color = getChildColor(mother.color, father.color);
            child.gender = getChildGender();
            child.strength = getChildStrength(mother.strength, father.strength, child.gender);
            child.speed = getChildSpeed(mother.speed, father.speed);
            child.opinions = getChildOpinions(mother.opinions, father.opinions);
            child.sight = getChildSight(mother.sight, father.sight);
            child.decay = getChildDecayRate();
            return child;
        }
        Genetics.getChildDna = getChildDna;
        function getChildStrength(motherStrength, fatherStrength, gender) {
            var baseStrength = (motherStrength + fatherStrength) / 2;
            if (gender === Gender.Male)
                baseStrength += randomNum(-1, 4);
            return baseStrength;
        }
        function getChildOpinions(fatherOpinions, motherOpinions) {
            var childOpinions = new Array();
            fatherOpinions.forEach(function (fatherOpinion) {
                var newOpinion = new GameOfColor.Opinion();
                var motherOpinion = motherOpinions.filter(function (m) { return m.color === fatherOpinion.color; })[0];
                if (motherOpinion == null)
                    motherOpinion = fatherOpinion;
                newOpinion.color = fatherOpinion.color;
                newOpinion.rating = (fatherOpinion.rating + motherOpinion.rating) / 2;
                childOpinions.push(newOpinion);
            });
            return childOpinions;
        }
        function getChildSight(fatherSight, motherSight) {
            return (fatherSight + motherSight) / 2;
        }
        function getChildDecayRate() {
            // between .01 and .20
            // probably WAY too fast
            return randomNum(0, 20) * .01;
        }
        function getChildColor(motherColor, fatherColor) {
            return "#ffffff";
        }
        function getChildGender() {
            if (randomNum(0, 1) === 1)
                return Gender.Male;
            else
                return Gender.Female;
        }
        function getChildSpeed(motherSpeed, fatherSpeed) {
            return (motherSpeed + fatherSpeed) / 2;
        }
        var Dna = (function () {
            function Dna() {
                this.color = "";
                this.strength = 0;
                this.gender = Gender.Female;
                this.speed = 0;
                this.opinions = [];
                this.sight = 0;
                this.decay = 0;
            }
            return Dna;
        }());
        Genetics.Dna = Dna;
    })(Genetics = GameOfColor.Genetics || (GameOfColor.Genetics = {}));
})(GameOfColor || (GameOfColor = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//Person class
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 1] = "Male";
    Gender[Gender["Female"] = 2] = "Female";
})(Gender || (Gender = {}));
var GameOfColor;
(function (GameOfColor) {
    var Opinion = (function () {
        function Opinion() {
        }
        return Opinion;
    }());
    GameOfColor.Opinion = Opinion;
    var Person = (function (_super) {
        __extends(Person, _super);
        function Person(game, people, gender, x, y, mother, father) {
            _super.call(this, game, 0, 0);
            //relationships
            this.mate = null;
            this.threats = [];
            this.victims = [];
            if (x == null) {
                this.x = randomNum(0, game.scale.width);
            }
            if (y == null) {
                this.y = randomNum(0, game.scale.height);
            }
            //add to appropriate lists
            game.add.existing(this);
            //enable physics
            game.physics.enable(this);
            if (mother != null && father != null) {
                //inherited attributes
                this.dna = GameOfColor.Genetics.getChildDna(mother, father);
            }
            else {
                //random
                this.dna = new GameOfColor.Genetics.Dna();
                if (gender == null) {
                    this.dna.gender = randomNum(Gender.Male, Gender.Female);
                }
                this.dna.color = GameOfColor.Genetics.getRandomColor();
                this.dna.strength = randomNum(1, BASE_MAX_STRENGTH);
                this.dna.speed = randomNum(1, BASE_MAX_SPEED);
                this.dna.opinions = [];
                this.dna.sight = randomNum(1, BASE_MAX_SIGHT);
                this.dna.decay = randomNum(1, BASE_MAX_DECAY);
            }
            this.parents = [mother, father];
            //relationships
            this.mate = null;
            this.threats = [];
            this.victims = [];
            this.people = people;
            //travel direction
            this.direction = 0;
            //get access to drawing method
            var shape = game.add.graphics();
            //draw a circle to represent the person
            shape.lineStyle(0);
            shape.beginFill(this.dna.color, 1);
            shape.arc(0, 0, 10, 0, game.math.degToRad(this.health), true);
            shape.lineTo(0, 0);
            shape.endFill();
            //its important to add the shape after we've enabled physics otherwise it gets its own physics body on enable
            this.addChild(shape);
        }
        Person.prototype.update = function () {
            var _this = this;
            //create list of people that can be seen
            var visiblePeople = [];
            var personTarget;
            var i;
            this.people.forEach(function (p) {
                if (_this.position.distance(p.position) < _this.dna.sight)
                    visiblePeople.push(p);
            });
            if (this.threats.length !== 0) {
            }
            if (this.mate == null) {
                if (this.dna.gender === Gender.Male) {
                    //try to find mate
                    var viableMates = [];
                    visiblePeople.forEach(function (p) {
                        if (p.gender === Gender.Female)
                            viableMates.push(p);
                    });
                    //evaluate viable mates
                    viableMates.some(function (m) {
                        var currentMate = viableMates[i];
                        if (currentMate.mate == null) {
                            _this.target = currentMate;
                            return true;
                        }
                        return false;
                    });
                }
            }
            if (this.mate != null) {
                //think about mate
                if (this.body.distanceBetween(this, this.mate) < MATING_DISTANCE) {
                }
            }
            if (this.victims.length === 0) {
            }
            else {
            }
            this.position.x += randomNum(-1, 1);
            this.position.y += randomNum(-1, 1);
            //die a little (age)
            //this.health -= this.dna.decay;
        };
        return Person;
    }(Phaser.Sprite));
    GameOfColor.Person = Person;
})(GameOfColor || (GameOfColor = {}));
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var GameOfColor;
(function (GameOfColor) {
    var fullScreenKey;
    var people;
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = this;
            _super.call(this, 800, 600, Phaser.AUTO, "content", null);
            this.playSound = function (x, y, sound) {
                var volume = 1;
                var distance = _this.camera.position.distance(x, y);
                var maxDistance = 300;
                if (distance > maxDistance)
                    distance = maxDistance;
                volume = (maxDistance - distance) / maxDistance;
                if (volume === 0)
                    volume = 0.01;
                sound.play();
                sound.volume = volume;
            };
            this.state.add("Load", GameOfColor.Load, false);
            this.state.add("Simulation", GameOfColor.Simulation, false);
            this.state.start("Load");
        }
        return Game;
    }(Phaser.Game));
    GameOfColor.Game = Game;
})(GameOfColor || (GameOfColor = {}));
var GameOfColor;
(function (GameOfColor) {
    var Load = (function (_super) {
        __extends(Load, _super);
        function Load() {
            _super.apply(this, arguments);
        }
        Load.prototype.preload = function () {
            //this.load.image('preloadBar', 'assets/loader.png');
        };
        Load.prototype.create = function () {
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
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            // Make some people!
            var people = this.game.add.group();
            for (var i = 0; i < STARTING_POPULATION; i++) {
                var person = GameOfColor.Genetics.createRandomPerson(null, this.game, people);
                people.add(person);
            }
            this.game.state.start("Simulation", false, false);
        };
        return Load;
    }(Phaser.State));
    GameOfColor.Load = Load;
})(GameOfColor || (GameOfColor = {}));
var GameOfColor;
(function (GameOfColor) {
    var fullScreenKey;
    var Simulation = (function (_super) {
        __extends(Simulation, _super);
        function Simulation() {
            var _this = this;
            _super.apply(this, arguments);
            this.toggleFullScreen = function () {
                if (!_this.scale.isFullScreen)
                    _this.scale.startFullScreen();
                else
                    _this.scale.stopFullScreen();
            };
        }
        Simulation.prototype.create = function () {
            //press "F" to toggle fullscreen
            fullScreenKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
            fullScreenKey.onDown.add(this.toggleFullScreen);
        };
        return Simulation;
    }(Phaser.State));
    GameOfColor.Simulation = Simulation;
})(GameOfColor || (GameOfColor = {}));
//# sourceMappingURL=game.js.map