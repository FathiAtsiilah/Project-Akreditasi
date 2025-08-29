"use strict";
const { QueryTypes } = require("sequelize")
const bcrypt = require("bcrypt");

const table = "users";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      try {
         const sysadminRole = await queryInterface.sequelize.query(
            `SELECT id FROM roles WHERE code = 'SYSADMIN' LIMIT 1`,
            { type: QueryTypes.SELECT }
         );
         const studyProgramRole = await queryInterface.sequelize.query(
            `SELECT id FROM roles WHERE code = 'STUDY_PROGRAM' LIMIT 1`,
            { type: QueryTypes.SELECT }
         );
         const generalMajor = await queryInterface.sequelize.query(
            `SELECT id FROM majors WHERE code = 'GENERAL' LIMIT 1`,
            { type: QueryTypes.SELECT }
         );
         const electricalEngineeringMajor = await queryInterface.sequelize.query(
            `SELECT id FROM majors WHERE code = 'ELECTRICAL_ENGINEERING' LIMIT 1`,
            { type: QueryTypes.SELECT }
         );
         const processData = [
            {
               fullname: "System Administrator",
               username: "sysadmin",
               role_id: sysadminRole[0].id,
               major_id: generalMajor[0].id,
               email: "sysadmin@gunadarma.com",
               password: await bcrypt.hash("password", 10),
               created_on: new Date(),
               updated_on: new Date(),
               active: true,
            },
            {
               fullname: "Prodi Teknik Elektro",
               username: "prodi_teknik_elektro",
               role_id: studyProgramRole[0].id,
               major_id: electricalEngineeringMajor[0].id,
               email: "prodi_teknik_elektro@gunadarma.com",
               password: await bcrypt.hash("password", 10),
               created_on: new Date(),
               updated_on: new Date(),
               active: true,
            }
         ]
         await queryInterface.bulkInsert(table, processData, {});
      } catch (error) {
         console.error("Error seeding" + table + " :", error);
      }
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete(table, null, {});
   },
};
