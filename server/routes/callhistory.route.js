/** @format */

const express = require("express");
const {
  createCall,
  getAllCalls,
  getCallsByLead,
  getCallsByCampaign,
  getCallsByUser,
  getCallsByLeadAndCampaign,
  updateCall,
  deleteCall,
} = require("../controllers/callhistory.controller");
const router = express.Router();

router.post("/createCall", createCall);
router.get("/getAllCalls", getAllCalls);
router.get("/getCallsByLead/:lead_id", getCallsByLead);
router.get("/getCallsByCampaign/:campaign_id", getCallsByCampaign);
router.get("/getCallsByUser/:user_id", getCallsByUser);
router.get(
  "/getCallsByLeadAndCampaign/:lead_id/:campaign_id",
  getCallsByLeadAndCampaign
);
router.post("/updateCall/:id", updateCall);

module.exports = router;
