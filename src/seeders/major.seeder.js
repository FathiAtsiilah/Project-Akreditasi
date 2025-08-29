"use strict";

const table = "majors";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      try {
         const processData = [
            {
               level: "General",
               code: "GENERAL",
               name: "General",
               created_on: new Date(),
               updated_on: new Date(),
               active: true,
            },
            {
               level: "Bachelor",
               code: "ELECTRICAL_ENGINEERING",
               name: "Teknik Elektro",
               created_on: new Date(),
               updated_on: new Date(),
               active: true,
            },
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
