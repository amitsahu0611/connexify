/** @format */

const Lead = require("../models/lead.model");
const LeadFollowup = require("../models/Leadfollowup.model");
const {createSuccess} = require("../utils/response");

const createFollowup = async (req, res) => {
  try {
    const followup = await LeadFollowup.create(req.body);
    return res.json(createSuccess("All followups by Asignee", followup));
  } catch (error) {
    console.error("Error creating follow-up:", error);
    throw error;
  }
};

const getFollowupByLeadId = async (req, res) => {
  const {leadId} = req.params;
  try {
    const followups = await LeadFollowup.findAll({
      where: {Lead_id: leadId},
      order: [["createdAt", "DESC"]],
    });
    return res.json(createSuccess("All followups by Lead", followups));
  } catch (error) {
    console.error("Error fetching follow-ups by Lead_id:", error);
    throw error;
  }
};

const getByCreatedBy = async (req, res) => {
  const {createdBy} = req.params;
  try {
    const followups = await LeadFollowup.findAll({
      where: {createdBy},
      order: [["createdAt", "DESC"]],
    });
    return res.json(createSuccess("All followups by Asignee", followups));
  } catch (error) {
    console.error("Error fetching follow-ups by createdBy:", error);
    throw error;
  }
};

module.exports = {createFollowup, getFollowupByLeadId, getByCreatedBy};
