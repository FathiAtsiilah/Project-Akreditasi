const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
   login: async (req, res) => {
      const { username, password } = req.body;
      try {
         const user = await User.findOne({ where: { username } });
         if (!user) {
            return res.status(401).json({ message: "Login gagal" });
         }
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return res.status(401).json({ message: "Login gagal" });
         }
         jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
               if (err) {
                  console.error("Error signing JWT:", err);
                  return res.status(500).json({ message: "Internal server error" });
               }
               res.cookie("gndr_cookie", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
                  maxAge: 24 * 60 * 60 * 1000,
               });
               res.status(200).json({ message: "Login berhasil", username: user.username });
            }
         );
      } catch (error) {
         console.error("Error during login:", error);
         res.status(500).json({ message: "Internal server error" });
      }
   },
   checkUserLogin: async (req, res) => {
      const token = req.cookies.gndr_cookie;
      if (!token) {
         return res.status(401).json({ message: "Unauthorized" });
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
         if (err) {
            console.error("Error verifying JWT:", err);
            return res.status(401).json({ message: "Unauthorized" });
         }
         res.status(200).json({ message: "User is logged in", user: decoded });
      });
   },
   logout: async (req, res) => {
      res.clearCookie("gndr_cookie");
      res.status(200).json({ message: "Logout berhasil" });
   },
}
