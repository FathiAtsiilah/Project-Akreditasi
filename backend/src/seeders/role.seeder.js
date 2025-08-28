"use strict";

const table = "roles";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      try {
         const processData = [
            {
               code: "SYSADMIN",
               name: "System Administrator",
               created_on: new Date(),
               updated_on: new Date(),
               active: true,
            },
            {
               code: "STUDY_PROGRAM",
               name: "Study Program",
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
