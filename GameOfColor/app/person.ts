//Person class
enum Gender {
    Male = 1,
    Female = 2
}

module GameOfColor {

    export class Opinion {
        color: string;
        //number from -100 to 100 of how much you hate/like a color
        rating: number;
    }

    export class Person extends Phaser.Sprite {
        mother: Person;
        father: Person;
        parents: Person[];
        dna: Genetics.Dna;

        //relationships
        mate = null;
        target: Phaser.Point;
        threats = [];
        victims = [];
        people: Person[];

        direction: number;

        constructor(game, people, gender, x, y, mother, father) {
            super(game, 0, 0);
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
                this.dna = Genetics.getChildDna(mother, father);
            } else {
                //random
                this.dna = new Genetics.Dna();

                if (gender === null) {
                    this.dna.gender = randomNum(Gender.Male, Gender.Female);
                }
                this.dna.color = Genetics.getRandomColor();
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

        update() {
            //create list of people that can be seen
            var visiblePeople = [];
            var personTarget;
            var i: number;
            this.people.forEach(p => {
                if (this.position.distance(p.position) < this.dna.sight) visiblePeople.push(p);
            });

            if (this.threats.length !== 0) {
                //run from any threatening people
            }

            if (this.mate == null) {
                if (this.dna.gender === Gender.Male) {
                    //try to find mate
                    var viableMates = [];
                    visiblePeople.forEach(p => {
                        if (p.gender === Gender.Female) viableMates.push(p);
                    });

                    //evaluate viable mates
                    viableMates.some(m => {
                        var currentMate = viableMates[i];

                        if (currentMate.mate == null) {
                            this.target = currentMate;
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
                //decide if you are going to attack someone
            } else {
                //decide if you CAN attack someone right now
            }

            //die a little (age)
            //this.health -= this.dna.decay;
        }
    }
}