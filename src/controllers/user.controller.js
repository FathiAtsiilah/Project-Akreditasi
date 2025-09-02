const { Op } = require("sequelize");
const { User, Role, Major } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
   getAllUsers: async (req, res) => {
      try {
         const users = await User.findAll({
            attributes: ["id", "username", "fullname", "email", "active"],
            include: [
               {
                  model: Role,
                  as: "role",
                  attributes: ["id", "code", "name"]
               },
               {
                  model: Major,
                  as: "major",
                  attributes: ["id", "code", "name"]
               }
            ]
         });
         res.status(200).json(users);
      } catch (error) {
         console.error("Error during get all users:", error);
         res.status(500).json({ message: "Internal server error" });
      }
   },
   createUser: async (req, res) => {
      try {
         const { username, fullname, email, role_id, major_id, active } = req.body;
         const existingUser = await User.findOne({
            where: {
               [Op.or]: [
                  { email },
                  { username }
               ]
            }
         });
         if (existingUser) {
            return res.status(400).json({
               message: "User with this email or username already exists"
            });
         }
         const newUser = await User.create({
            username,
            fullname,
            email,
            role_id,
            major_id,
            active,
            password: await bcrypt.hash(
               Array(10)
                  .fill(null)
                  .map(() => (Math.random() * 36).toString(36)[Math.floor(Math.random() * 36)])
                  .join(""),
               10
            ),
            created_on: new Date(),
            updated_on: new Date()
         });
         res.status(201).json(newUser);
      } catch (error) {
         console.error("Error during create user:", error);
         res.status(500).json({ message: "Internal server error" });
      }
   },
   updateUser: async (req, res) => {
      try {
         const { id } = req.params;
         const { username, fullname, email, role_id, major_id, active } = req.body;

         const user = await User.findByPk(id);
         if (!user) {
            return res.status(404).json({ message: "User not found" });
         }

         const existingUser = await User.findOne({
            where: {
               [Op.and]: [
                  { id: { [Op.ne]: id } },
                  {
                     [Op.or]: [
                        { username },
                        { email }
                     ]
                  }
               ]
            }
         });
         if (existingUser) {
            return res.status(400).json({
               message: "User with this email or username already exists"
            });
         }

         user.username = username;
         user.fullname = fullname;
         user.email = email;
         user.role_id = role_id;
         user.major_id = major_id;
         user.active = active;

         await user.save();
         res.status(200).json(user);
      } catch (error) {
         console.error("Error during update user:", error);
         res.status(500).json({ message: "Internal server error" });
      }
   },
   deleteUser: async (req, res) => {
      try {
         const { id } = req.params;
         const user = await User.findByPk(id);
         if (!user) {
            return res.status(404).json({ message: "User not found" });
         }
         await user.destroy();
         res.status(204).send();
      } catch (error) {
         console.error("Error during delete user:", error);
         res.status(500).json({ message: "Internal server error" });
      }
   }
};
