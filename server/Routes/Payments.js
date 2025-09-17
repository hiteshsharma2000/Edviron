const express=require('express')
require('dotenv').config()
const PaymentRoute=express.Router()
const auth=require('../middleware/auth')
const { body, validationResult } = require("express-validator");
const axios = require("axios");
const {signPayload}=require('../utils/jwtsigns')
const Order =require('../models/Order')
const OrderStatus=require('../models/OrderStatus')

PaymentRoute.get('/',auth,async (req,res)=>{
    try {
        res.send({msg:"helloow"})
    } catch (error) {
        res.send({err:error})
    }
})
PaymentRoute.post(
  "/create",
  [body("amount").notEmpty(), body("callback_url").isURL()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { amount, callback_url, student_info } = req.body;

    try {
      // generate sign using PG_SECRET
      const sign = signPayload({
        school_id: process.env.SCHOOL_ID,
        amount,
        callback_url,
      });

      console.log("Using API_KEY:", process.env.PAYMENT_API_KEY?.slice(0, 20) + "...");
      console.log("Generated sign:", sign);

      const response = await axios.post(
        "https://dev-vanilla.edviron.com/erp/create-collect-request",
        {
          school_id: process.env.SCHOOL_ID,
          amount,
          callback_url,
          sign,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      // Save Order
      const order = new Order({
        school_id: process.env.SCHOOL_ID,
        amount,
        callback_url,
        student_info,
        collect_request_id: data.collect_request_id,
      });
      await order.save();

      // Save initial OrderStatus
      const status = new OrderStatus({
        collect_request_id: data.collect_request_id,
        status: "PENDING",
        amount,
      });
      await status.save();

      res.json({
        collect_request_id: data.collect_request_id,
        payment_url: data.Collect_request_url, // NOTE: capital C from docs
      });
    } catch (err) {
      console.error("Payment API error:", {
        message: err.message,
        response: err.response?.data,
        config: err.config?.data,
      });
      res.status(500).json({
        error: "Payment creation failed",
        details: err.response?.data || err.message,
      });
    }
  }
);


PaymentRoute.get("/status/:collect_request_id", auth, async (req, res) => {
  const { collect_request_id } = req.params;
  const { school_id } = req.query;
  if (!school_id) return res.status(400).json({ message: "school_id required" });

  try {
    const sign = signPayload({ school_id, collect_request_id });
    const url = `https://dev-vanilla.edviron.com/erp/collect-request/${collect_request_id}?school_id=${school_id}&sign=${sign}`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${process.env.PAYMENT_API_KEY}` },
    });

    const data = response.data;

    // Update OrderStatus
    await OrderStatus.findOneAndUpdate(
      { collect_request_id },
      { status: data.status, amount: data.amount, payment_time: new Date() },
      { upsert: true }
    );

    res.json(data);
  } catch (err) {
    console.error("Status API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Status fetch failed" });
  }
});


module.exports={PaymentRoute}