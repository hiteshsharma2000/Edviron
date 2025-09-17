const Order = require("../models/Order");
const express=require('express')
const OrderStatus=require('../models/OrderStatus')
const transaction_route=express.Router();
const auth=require('../middleware/auth')


transaction_route.get("/", auth,async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortField = req.query.sort || "payment_time";
    const sortOrder = req.query.order === "asc" ? 1 : -1;

    const pipeline = [
      {
        $lookup: {
          from: "orderstatuses",
          localField: "collect_request_id",
          foreignField: "collect_request_id",
          as: "status_info",
        },
      },
      { $unwind: "$status_info" },
      {
        $project: {
          _id: 0,
           collect_id: "$collect_request_id",
          school_id: 1,
          gateway: "$status_info.gateway",
          order_amount: "$status_info.amount",
          transaction_amount: "$status_info.amount",
          status: "$status_info.status",
          custom_order_id: "$collect_request_id", 
          amount:"$status_info.amount",
          student_info: 1,
          callback_url: 1,
          payment_time: "$status_info.payment_time",
          bank_reference: "$status_info.bank_reference",
          payment_mode: "$status_info.payment_mode",
          payment_message: "$status_info.payment_message",
        },
      },
      { $sort: { [sortField]: sortOrder } }, 
      { $skip: skip },                     
      { $limit: limit },
    ];

    const [items, total] = await Promise.all([
      Order.aggregate(pipeline),
      Order.countDocuments(),
    ]);

    res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Fetch transactions error:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});



transaction_route.get("/school/:schoolId", auth,async (req, res) => {
  try {
    const schoolId = req.params.schoolId;

    const transactions = await Order.aggregate([
      { $match: { school_id: schoolId } },
      {
        $lookup: {
          from: "orderstatuses",
          localField: "collect_request_id",
          foreignField: "collect_request_id",
          as: "status_info",
        },
      },
      { $unwind: "$status_info" },
      {
        $project: {
          collect_id: "$collect_request_id",
          school_id: 1,
          gateway: "$status_info.gateway",
          order_amount: "$status_info.amount",
          transaction_amount: "$status_info.amount",
          status: "$status_info.status",
          custom_order_id: "$_id",
        },
      },
    ]);

    res.json(transactions);
  } catch (err) {
    console.error("Fetch by school error:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

transaction_route.get("/status/:collect_request_id", auth, async (req, res) => {
  try {
    const collectRequestId = req.params.collect_request_id;

    // Find the order by collect_request_id
    const order = await Order.findOne({ collect_request_id: collectRequestId });
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Find the status using the same collect_request_id
    const status = await OrderStatus.findOne({ collect_request_id: collectRequestId });
    if (!status) return res.status(404).json({ error: "Status not found" });

    console.log("Order:", order);
    console.log("Status:", status);

    // Return structured response
    res.json({
      collect_id: order.collect_request_id,
      status: status.status, // 'success', 'pending', etc.
      amount: status.amount,
      transaction_amount: status.amount,
      gateway: status.gateway || "NA",
    });
  } catch (err) {
    console.error("Check status error:", err);
    res.status(500).json({ error: "Failed to check transaction status" });
  }
});



module.exports={transaction_route}