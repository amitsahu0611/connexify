/** @format */

// models/associateModels.js

const Campaign = require("./Campaign.model");
const Lead = require("./lead.model");
const LeadCampaignMap = require("./LeadCampaignMap.model");
const CampaignAssignee = require("./CampaignAssignee.model");
const Users = require("./users.model");
const CallHistory = require("./CallHistory.model");

const associateModels = () => {
  Lead.belongsToMany(Campaign, {
    through: LeadCampaignMap,
    foreignKey: "lead_id",
    otherKey: "campaign_id",
  });

  Users.hasMany(Lead, {
    foreignKey: "createdBy",
    sourceKey: "user_id",
    as: "leads",
  });

  Lead.belongsTo(Users, {
    foreignKey: "createdBy",
    targetKey: "user_id",
    as: "creator",
  });

  Campaign.belongsToMany(Lead, {
    through: LeadCampaignMap,
    foreignKey: "campaign_id",
    otherKey: "lead_id",
  });

  Campaign.hasMany(CampaignAssignee, {
    foreignKey: "campaign_id",
    as: "assignees",
  });

  CampaignAssignee.belongsTo(Campaign, {
    foreignKey: "id",
    as: "campaign",
  });

  Users.hasMany(CampaignAssignee, {
    foreignKey: "user_id",
    as: "campaignAssignments",
  });

  CampaignAssignee.belongsTo(Users, {
    foreignKey: "user_id",
    as: "user",
  });

  Lead.hasMany(CallHistory, {foreignKey: "lead_id", as: "callLogs"});
  CallHistory.belongsTo(Lead, {foreignKey: "lead_id", as: "lead"});

  Campaign.hasMany(CallHistory, {foreignKey: "campaign_id", as: "callLogs"});
  CallHistory.belongsTo(Campaign, {foreignKey: "campaign_id", as: "campaign"});

  Users.hasMany(CallHistory, {foreignKey: "user_id", as: "userCalls"});
  CallHistory.belongsTo(Users, {foreignKey: "user_id", as: "caller"});
};

module.exports = associateModels;
