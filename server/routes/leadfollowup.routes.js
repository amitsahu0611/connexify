/** @format */

const express = require("express");
const {
  createFollowup,
  getFollowupByLeadId,
  getByCreatedBy,
} = require("../controllers/followup.controller");
const router = express.Router();

router.post("/createFollowup", createFollowup);
router.get("/getFollowupByLeadId/:leadId", getFollowupByLeadId);
router.get("/getByCreatedBy/:id", getByCreatedBy);

module.exports = router;
