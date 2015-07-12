//Person class

Person = function (game, x, y, mother, father) {

    // init and add to appropriate lists
    Phaser.Sprite.call(this, game, x, y);
    game.add.existing(this);
    people.add(this);

    //enable physics
    game.physics.arcade.enable(this);

    //create parents if needed
    if (mother == null)
    {
        //make a parent from settings
        mother = createRandomParent();
    }

    if (father == null)
    {
        //make a parent from settings
        if (randomNum(1,10)==1) father = createRandomParent();
        else
        {
            father = mother;
            //sexism
            father.strength += randomNum(3,12);
        }
    }

    this.color = getChildColor(mother.color, father.color);

    //get access to drawing method
    var shape = game.add.graphics();

    // do this to stop the graphics object having a 10 pixel invisible border
    shape.boundsPadding = 0;

    //draw a circle to represent the person
    shape.lineStyle(0);

    shape.beginFill(this.color, 1);
    shape.drawCircle(0, 0, 10);
    shape.endFill();

    //its important to add the shape after we've enabled physics otherwise it gets its own physics body on enable
    this.addChild(shape);



};

Person.prototype = Object.create(Phaser.Sprite.prototype);
Person.prototype.constructor = Person;
Person.prototype.update = function() {
    if (this.threats.length !=0)
    {
        //run from any threatening people
    }

    if (this.mate == null)
    {
        //try to find mate
    }
    else
    {
        //think about mate
    }


    if (this.victims.length == 0)
    {
        //decide if you are going to attack someone
    }
    else
    {
        //decide if you CAN attack someone right now
    }

}

function getChildColor(motherColor, fatherColor) {
    var childRed = motherColor[]
}