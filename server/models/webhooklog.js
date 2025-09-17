const mongoose = require("mongoose");

const WebhookLogSchema = new mongoose.Schema({
  raw: Object,
  receivedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WebhookLog", WebhookLogSchema);
