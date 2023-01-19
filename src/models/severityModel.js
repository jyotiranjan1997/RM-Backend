const mongoose = require("mongoose");

const severitySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  value: { type: String, require: true },
  user: { type: mongoose.isObjectIdOrHexString, require: true },
});

const Severity = mongoose.model("severity", severitySchema);

module.exports = { Severity };
