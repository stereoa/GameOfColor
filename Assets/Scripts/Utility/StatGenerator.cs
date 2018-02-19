namespace GameOfColor
{
    public static class StatGenerator
    {
        /// <summary>
        /// Generates stat number for the most important stats for that position
        /// </summary>
        /// <returns></returns>
        public static int PositionExpert()
        {
            return Utility.GenerateRandomNumber(70, 90);

        }
        /// <summary>
        /// Generates stat number for the second most important stats for that position
        /// </summary>
        /// <returns></returns>
        public static int PositionAdvanced()
        {
            return Utility.GenerateRandomNumber(50, 80);
        }
        /// <summary>
        /// Generates stat number for the least important stats for that position
        /// </summary>
        /// <returns></returns>
        public static int PositionNovice()
        {
            return Utility.GenerateRandomNumber(30, 65);
        }
        /// <summary>
        /// Generates stat number for strategy stats
        /// </summary>
        /// <returns></returns>
        public static int StatStrat()
        {
            return Utility.GenerateRandomNumber(30, 90);
        }
        /// <summary>
        /// Generates stat number only for Endurance and Awareness stats (except the qb who has a Expert awareness)
        /// </summary>
        /// <returns></returns>
        public static int StatEnduranceAwareness()
        {
            return Utility.GenerateRandomNumber(50, 90);
        }
    }
}