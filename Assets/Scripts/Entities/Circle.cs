using System;
using System.Collections.Generic;
using System.Linq;

namespace GameOfColor.Entities
{
    public class Circle : Creature
    {
        
        /// <summary>
        /// A basic living thing represented by a colored circle
        /// </summary>
        public Circle()
        {
            var firstName = Utility.FirstNamesPool[Utility.GenerateRandomNumber(0, Utility.FirstNamesPool.Count - 1)];
            var lastName = Utility.LastNamesPool[Utility.GenerateRandomNumber(0, Utility.LastNamesPool.Count - 1)];
            Name = $"{firstName} {lastName}";
            Stats = new List<Stat>();

        }
        private Stat GetStat(Stats statType)
        {
            return Stats.FirstOrDefault(s => s.StatType == statType);
        }

        public int Health
        {
            get
            {
                return GetStat(GameOfColor.Stats.Health)?.Value ?? 0;
            }
            set
            {
                GetStat(GameOfColor.Stats.Health).Value = value;
            }
        }

        public int Speed
        {
            get
            {
                return GetStat(GameOfColor.Stats.Speed)?.Value ?? 0;
            }
            set
            {
                GetStat(GameOfColor.Stats.Speed).Value = value;
            }
        }

        public int ShotPower
        {
            get
            {
                return GetStat(GameOfColor.Stats.ShotPower)?.Value ?? 0;
            }
            set
            {
                GetStat(GameOfColor.Stats.ShotPower).Value = value;
            }
        }

        public int ShotDistance
        {
            get
            {
                return GetStat(GameOfColor.Stats.ShotDistance)?.Value ?? 0;
            }
            set
            {
                GetStat(GameOfColor.Stats.ShotDistance).Value = value;
            }
        }

        public int Evasion
        {
            get
            {
                return GetStat(GameOfColor.Stats.Evasion)?.Value ?? 0;
            }
            set
            {
                GetStat(GameOfColor.Stats.Evasion).Value = value;
            }
        }

        public int Defense
        {
            get
            {
                return GetStat(GameOfColor.Stats.Defense)?.Value ?? 0;
            }
            set
            {
                GetStat(GameOfColor.Stats.Defense).Value = value;
            }
        }

        public int Accuracy
        {
            get
            {
                return GetStat(GameOfColor.Stats.Accuracy)?.Value ?? 0;
            }
            set
            {
                GetStat(GameOfColor.Stats.Accuracy).Value = value;
            }
        }

        public int Vision
        {
            get
            {
                return GetStat(GameOfColor.Stats.Vision)?.Value ?? 0;
            }
            set
            {
                GetStat(GameOfColor.Stats.Vision).Value = value;
            }
        }

        public int Awareness
        {
            get
            {
                return GetStat(GameOfColor.Stats.Awareness)?.Value ?? 0;
            }
            set
            {
                GetStat(GameOfColor.Stats.Awareness).Value = value;
            }
        }
        
        public List<Stat> Stats { get; internal set; }

        public void InitStats()
        {
            //populate stats list with all possible stats defaulted to novice levels
            foreach (var stat in Enum.GetValues(typeof(Stats)))
            {
                Stats.Add(new Stat((Stats)stat, StatGenerator.PositionNovice()));
            }

            //generate defaults
        }

        internal void Update()
        {
            throw new NotImplementedException();
        }

        public override string ToString()
        {
            return $"Name {Name}";
        }
    }

}
