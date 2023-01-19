const express = require("express");
const { authValidator } = require("../middleWares/authMiddleware");
const severityRouter = express.Router();
const { Severity } = require("../models/severityModel");

severityRouter.post("/", authValidator, async (req, res) => {
  const { user_id, name, value } = req.body;

  try {
    await Severity.create({ user_id, name, value });
    res.status(200).send({ msg: "severity Created Successfully!" });
  } catch (err) {
    res.status(500).send({ msg: "Failed to send severity" });
  }
});

severityRouter.get("/", authValidator, async (req, res) => {
  const { user_id } = req.body;

  try {
    let severity = await Severity.find({ user_id });
    res.status(200).send({ msg: "severity Created Successfully!", severity });
  } catch (err) {
    res.status(500).send({ msg: "Failed to send severity" });
  }
});

module.exports = { severityRouter };
