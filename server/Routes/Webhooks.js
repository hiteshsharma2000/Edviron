const express = require("express");
const WebhookRoute=express.Router()
const WebhookLog = require("../models/webhooklog");
const OrderStatus = require("../models/OrderStatus");



WebhookRoute.post("/", async (req, res) => {
  try {
    const payload = req.body;
    await WebhookLog.create({ raw: payload });

    if (payload.order_info) {
      const info = payload.order_info;
      await OrderStatus.findOneAndUpdate(
        { collect_request_id: info.order_id },
        {
          status: info.status,
          amount: info.transaction_amount,
          gateway: info.gateway,
          payment_details: info.payemnt_details,
          bank_reference: info.bank_reference,
          payment_message: info.Payment_message,
          error_message: info.error_message,
          payment_time: info.payment_time,
        },
        
      );
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ error: "Webhook failed" });
  }
});

module.exports = {WebhookRoute};
