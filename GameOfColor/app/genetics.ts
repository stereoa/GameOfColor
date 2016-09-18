module GameOfColor.Genetics {

    export function createRandomPerson(gender, game, people): Person {
        return new Person(game, people, gender, null, null, null, null);
    }

    export function getRandomColor(): string {
        return `0x${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    export function getChildDna(mother, father): Dna {
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

    function getChildStrength(motherStrength, fatherStrength, gender): number {
        var baseStrength = (motherStrength + fatherStrength) / 2;
        if (gender === Gender.Male) baseStrength += randomNum(-1, 4);
        return baseStrength;
    }

    function getChildOpinions(fatherOpinions: GameOfColor.Opinion[], motherOpinions: GameOfColor.Opinion[]) {
        var childOpinions = new Array<GameOfColor.Opinion>();
        fatherOpinions.forEach(fatherOpinion => {
            var newOpinion = new GameOfColor.Opinion();

            var motherOpinion = motherOpinions.filter(m => m.color === fatherOpinion.color)[0];
            if (motherOpinion == null) motherOpinion = fatherOpinion;
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

    function getChildGender(): Gender {
        if (randomNum(0, 1) === 1) return Gender.Male;
        else return Gender.Female;
    }

    function getChildSpeed(motherSpeed, fatherSpeed): number {
        return (motherSpeed + fatherSpeed) / 2;
    }

    export class Dna {
        color: string;
        strength: number;
        gender: Gender;
        speed: number;
        opinions: GameOfColor.Opinion[];
        sight: number;
        decay: number;

        constructor() {
            this.color = "";
            this.strength = 0;
            this.gender = Gender.Female;
            this.speed = 0;
            this.opinions = [];
            this.sight = 0;
            this.decay = 0;
        }
    }
}