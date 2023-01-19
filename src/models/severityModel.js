const mongoose = require("mongoose");

const severitySchema = mongoose.Schema({
  user_id: { type: mongoose.ObjectId, require: true },
  name: {
    type: String,
    require: true,
  },
  value: { type: String, require: true },
});

const Severity = mongoose.model("severity", severitySchema);

module.exports = { Severity };
