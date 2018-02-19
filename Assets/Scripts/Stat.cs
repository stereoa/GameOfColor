namespace GameOfColor
{
    public class Stat
    {
        public Stats StatType { get; set; }
        public int Value { get; set; }
        public Stat(Stats stat, int value)
        {
            StatType = stat;
            Value = value;
        }
    }
    public enum Stats
    {
        Health,
        Speed,
        Defense,
        Accuracy,
        ShotDistance,
        ShotPower,
        Vision,
        Evasion,
        Awareness,
        Endurance
    }
}
