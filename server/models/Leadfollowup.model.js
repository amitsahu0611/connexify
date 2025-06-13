/** @format */

const {DataTypes} = require("sequelize");
const sequelize = require("../connection/db_connection");

const LeadFollowup = sequelize.define(
  "LeadFollowup",
  {
    FollowupType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Lead_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "LeadFollowup",
    timestamps: true,
  }
);

module.exports = LeadFollowup;

// (async () => {
//   try {
//     await LeadFollowup.sync({alter: true}); // Use alter to update table if it already exists
//     console.log("LeadFollowup table synced successfully.");
//   } catch (error) {
//     console.error("Error syncing Users table:", error);
//   } finally {
//     await sequelize.close();
//   }
// })();
