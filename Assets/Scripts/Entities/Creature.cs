
namespace GameOfColor.Entities
{
    public class Creature : Entity
    {
        public Gender Gender { get; set; }
    }

    public enum Gender
    {
        Male,
        Female
    }
}