/** @format */

const CallHistory = require("../models/CallHistory.model");
const {createSuccess} = require("../utils/response");

const createCall = async (req, res) => {
  try {
    const {
      lead_id,
      campaign_id,
      user_id,
      status,
      notes,
      call_time,
      start_time,
    } = req.body;

    const call = await CallHistory.create({
      lead_id,
      campaign_id,
      user_id,
      status,
      notes,
      start_time,
      call_time,
    });

    res.status(201).json({success: true, data: call});
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
};

const getAllCalls = async (req, res) => {
  try {
    const calls = await CallHistory.findAll({
      include: ["lead", "campaign", "caller"],
    });

    res.status(200).json({success: true, data: calls});
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
};

const getCallsByLead = async (req, res) => {
  try {
    const {lead_id} = req.params;

    const calls = await CallHistory.findAll({
      where: {lead_id},
      include: ["campaign", "caller"],
    });

    res.status(200).json(createSuccess("Call by lead is fetched", calls));
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
};

const getCallsByCampaign = async (req, res) => {
  try {
    const {campaign_id} = req.params;

    const calls = await CallHistory.findAll({
      where: {campaign_id},
      include: ["lead", "caller"],
    });

    res.status(200).json({success: true, data: calls});
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
};

const getCallsByUser = async (req, res) => {
  try {
    const {user_id} = req.params;

    const calls = await CallHistory.findAll({
      where: {user_id},
      include: ["lead", "campaign"],
    });

    res.status(200).json({success: true, data: calls});
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
};

const getCallsByLeadAndCampaign = async (req, res) => {
  try {
    const {lead_id, campaign_id} = req.params;

    const calls = await CallHistory.findAll({
      where: {lead_id, campaign_id},
      include: ["caller"],
    });

    res.status(200).json({success: true, data: calls});
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
};

const updateCall = async (req, res) => {
  try {
    const {id} = req.params;
    const updated = await CallHistory.update(req.body, {
      where: {id},
    });

    res
      .status(200)
      .json({success: true, message: "Call updated successfully", updated});
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
};

const deleteCall = async (req, res) => {
  try {
    const {id} = req.params;
    await CallHistory.update({is_deleted: true}, {where: {id}});

    res.status(200).json({success: true, message: "Call deleted successfully"});
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
};

module.exports = {
  createCall,
  getAllCalls,
  getCallsByLead,
  getCallsByCampaign,
  getCallsByUser,
  getCallsByLeadAndCampaign,
  updateCall,
  deleteCall,
};
