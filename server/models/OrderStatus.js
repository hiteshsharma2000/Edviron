const mongoose = require("mongoose");

const OrderStatusSchema = new mongoose.Schema({
  collect_request_id: String,
  status: String,
  amount: Number,
  gateway: String,
  payment_details: String,
  bank_reference: String,
  payment_message: String,
  error_message: String,
  payment_time: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("OrderStatus", OrderStatusSchema);
