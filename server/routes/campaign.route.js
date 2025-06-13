/** @format */

const express = require("express");
const {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  getCampaignByLeadId,
} = require("../controllers/campaign.controller");

const router = express.Router();

router.post("/createCampaign", createCampaign);
router.get("/getAllCampaigns/:id", getAllCampaigns);
router.get("/getCampaignById/:id", getCampaignById);
router.post("/updateCampaign/:id", updateCampaign);
router.delete("/deleteCampaign/:id", deleteCampaign);
router.get("/getCamapignByLeadId/:lead_id", getCampaignByLeadId);

module.exports = router;
