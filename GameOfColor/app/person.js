//Person class
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
var GameOfColor;
(function (GameOfColor) {
    class Opinion {
    }
    GameOfColor.Opinion = Opinion;
    class Person extends Phaser.Sprite {
        constructor(game, x, y, people, mother, father) {
            // init and add to appropriate lists
            super(game, x, y);
            //relationships
            this.mate = null;
            this.threats = [];
            this.victims = [];
            game.add.existing(this);
            //enable physics
            this.physicsEnabled = true;
            //create parents if needed
            if (mother == null) {
                //make a parent from settings
                this.mother = createRandomParent();
            }
            if (father == null) {
                //make a parent from settings
                if (randomNum(1, 10) === 1)
                    father = createRandomParent();
                else {
                    this.father = mother;
                    //sexism
                    this.father.dna.strength += randomNum(3, 12);
                }
            }
            var childDna = getChildOfParents(mother, father);
            this.parents = [mother, father];
            //inherited attributes
            this.dna.color = childDna.color;
            this.dna.strength = childDna.strength;
            this.dna.gender = childDna.gender;
            this.dna.speed = childDna.speed;
            this.dna.opinions = childDna.opinions;
            this.dna.sight = childDna.sight;
            this.dna.decay = childDna.decay;
            //relationships
            this.mate = null;
            this.threats = [];
            this.victims = [];
            this.people = people;
            //travel direction
            this.direction = 0;
            //get access to drawing method
            var shape = game.add.graphics();
            // do this to stop the graphics object having a 10 pixel invisible border
            shape.boundsPadding = 0;
            //draw a circle to represent the person
            shape.lineStyle(0);
            shape.beginFill(this.dna.color, 1);
            shape.arc(0, 0, 10, 0, game.math.degToRad(this.health), true);
            shape.lineTo(0, 0);
            shape.endFill();
            shape.endFill();
            //its important to add the shape after we've enabled physics otherwise it gets its own physics body on enable
            this.addChild(shape);
        }
        update() {
            //create list of people that can be seen
            var visiblePeople = [];
            var personTarget;
            var i;
            this.people.forEach(p => {
                if (this.body.physics.distanceBetween(this, p) < this.dna.sight)
                    visiblePeople.push(p);
            });
            if (this.threats.length !== 0) {
            }
            if (this.mate == null) {
                if (this.dna.gender === Gender.Male) {
                    //try to find mate
                    var viableMates = [];
                    visiblePeople.forEach(p => {
                        if (p.gender === Gender.Female)
                            viableMates.push(p);
                    });
                    //evaluate viable mates
                    for (i = 0; i < viableMates.length; i++) {
                        var currentMate = viableMates[i];
                        if (currentMate.mate == null) {
                            this.target = currentMate;
                            break;
                        }
                    }
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
            //die a little (age)
            this.health -= this.dna.decay;
        }
    }
    GameOfColor.Person = Person;
})(GameOfColor || (GameOfColor = {}));
//# sourceMappingURL=person.js.map