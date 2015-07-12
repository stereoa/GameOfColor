function peopleTouched(personA, personB)
{
    personA.damage(personB.strength);
    personB.damage(personA.strength);
}