const { Faculty } = require("../models");

module.exports = {
   getAllFaculties: async (req, res) => {
      try {
         const faculties = await Faculty.findAll({
            attributes: ["id", "code", "name", "active"],
         });
         res.status(200).json(faculties);
      } catch (error) {
         console.error("Error during get all faculties:", error);
         res.status(500).json({ message: "Internal server error" });
      }
   },
   createFaculty: async (req, res) => {
      try {
         const { code, name, active } = req.body;
         const existingFaculty = await Faculty.findOne({
            where: {
               code,
            },
         });
         if (existingFaculty) {
            return res.status(400).json({ message: "Kode fakultas sudah ada" });
         }
         const newFaculty = await Faculty.create({
            code,
            name,
            active,
            created_on: new Date(),
            updated_on: new Date(),
         });
         res.status(201).json(newFaculty);
      } catch (error) {
         console.error("Error during create faculty:", error);
         res.status(500).json({ message: "Internal server error" });
      }
   },
   updateFaculty: async (req, res) => {
      try {
         const { id } = req.params;
         const { code, name, active } = req.body;
         const faculty = await Faculty.findByPk(id);
         if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
         }
         const existingFacultyWithSameCode = await Faculty.findOne({
            where: {
               code,
               id: {
                  [Op.ne]: id,
               },
            },
         });
         if (existingFacultyWithSameCode) {
            return res.status(400).json({ message: "Kode fakultas sudah digunakan" });
         }
         faculty.code = code;
         faculty.name = name;
         faculty.active = active;
         await faculty.save();
         res.status(200).json(faculty);
      } catch (error) {
         console.error("Error during update faculty:", error);
         res.status(500).json({ message: "Internal server error" });
      }
   },
   deleteFaculty: async (req, res) => {
      try {
         const { id } = req.params;
         const faculty = await Faculty.findByPk(id);
         if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
         }
         await faculty.destroy();
         res.status(204).send();
      } catch (error) {
         console.error("Error during delete faculty:", error);
         res.status(500).json({ message: "Internal server error" });
      }
   },
}

