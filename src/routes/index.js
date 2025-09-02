const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/auth.controller");
const { getDashboardData } = require("../controllers/dashboard.controller");
const { getAllUsers, createUser, updateUser, deleteUser } = require("../controllers/user.controller");
const { getAllRoles } = require("../controllers/role.controller");
const { getAllMajors, createMajor, updateMajor, deleteMajor } = require("../controllers/major.controller");
const { getAllFaculties } = require("../controllers/faculty.controller");

router.post("/login", login);
router.get("/logout", logout);
   
router.get("/users", getAllUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/majors", getAllMajors);
router.post("/majors", createMajor);
router.put("/majors/:id", updateMajor);
router.delete("/majors/:id", deleteMajor);

router.get("/faculties", getAllFaculties);

router.get("/dashboard", getDashboardData);
router.get("/roles", getAllRoles);

module.exports = router;