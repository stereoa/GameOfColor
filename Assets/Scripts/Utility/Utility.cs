using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace GameOfColor
{
    public static class Utility
    {
        private static Random random = new Random();
        private static object syncObj = new object();

        public static int GenerateRandomNumber(int min, int max)
        {
            lock (syncObj)
            {
                if (random == null)
                    random = new Random(); // Or exception...
                return min + random.Next(max -min);
            }
        }

        public static int RollDie(int numOfSides)
        {
            return GenerateRandomNumber(1, numOfSides);
        }

        public static List<string> FirstNamesPool = new List<string>();
        public static List<string> LastNamesPool = new List<string>();
        public static List<string> TeamNamesPool = new List<string>();
        //public static List<string> FirstNamesPool = File.ReadLines("utility/firstnames.txt").ToList();
        //public static List<string> LastNamesPool = File.ReadLines("utility/lastnames.txt").ToList();
        //public static List<string> TeamNamesPool = File.ReadLines("utility/teamnames.txt").ToList();
    }
}
