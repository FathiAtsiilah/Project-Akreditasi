const { Op } = require("sequelize");
const { User, Log, Faculty, Major, Accreditation, Institution } = require("../models");

module.exports = {
   getDashboardData: async (req, res) => {
      try {
         const institutionInternationalCount = await Accreditation.count({
            include: [
               {
                  model: Institution,
                  as: "institution",
                  where: {
                     type: "Internasional",
                     active: true
                  }
               }
            ]
         });
         const institutionNationalCount = await Accreditation.count({
            include: [
               {
                  model: Institution,
                  as: "institution",
                  where: {
                     type: "Nasional",
                     active: true
                  }
               }
            ]
         });
         const majorCount = await Major.count({
            where: {
               code: {
                  [Op.ne]: "GENERAL",
               },
            },
         });
         const institutionCount = await Institution.count();
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
            institutionInternationalCount,
            institutionNationalCount,
            majorCount,
            institutionCount,
            accreditationCount,
            logs
         });
      } catch (error) {
         console.error("Error during get dashboard data:", error);
         res.status(500).json({ message: "Internal server error" });
      }
   },
}

