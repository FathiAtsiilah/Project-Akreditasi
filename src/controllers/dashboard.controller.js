const { Op } = require("sequelize");
const { User, Log, Faculty, Major, Accreditation } = require("../models");

module.exports = {
   getDashboardData: async (req, res) => {
      try {
         const userCount = await User.count();
         const facultyCount = await Faculty.count({
            where: {
               code: {
                  [Op.ne]: "GENERAL",
               },
            },
         });
         const majorCount = await Major.count({
            where: {
               code: {
                  [Op.ne]: "GENERAL",
               },
            },
         });
         const accreditationCount = await Accreditation.count();
         const logs = await Log.findAll({
            order: [["created_on", "DESC"]],
            include: [
               {
                  model: User,
                  as: "user",
                  attributes: ["username"],
               },
            ],
            limit: 5,
         });
         res.status(200).json({
            userCount,
            facultyCount,
            majorCount,
            accreditationCount,
            logs
         });
      } catch (error) {
         console.error("Error during get dashboard data:", error);
         res.status(500).json({ message: "Internal server error" });
      }
   },
}

