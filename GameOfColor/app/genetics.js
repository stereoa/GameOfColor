function createRandomParent() {
    throw new Error("Not implemented");
}
;
function getChildStrength(motherStrength, fatherStrength, gender) {
    var baseStrength = (motherStrength + fatherStrength) / 2;
    if (gender === Gender.Male)
        baseStrength += randomNum(-1, 4);
    return baseStrength;
}
function getChildOpinions(fatherOpinions, motherOpinions) {
    var childOpinions = new Array();
    fatherOpinions.forEach(fatherOpinion => {
        var newOpinion = new GameOfColor.Opinion();
        var motherOpinion = motherOpinions.filter(m => m.color === fatherOpinion.color)[0];
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
function getChildOfParents(mother, father) {
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
class Dna {
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
//# sourceMappingURL=genetics.js.map