// backend/routes/payment.js
const Razorpay = require("razorpay");
const express = require("express");
const router = express.Router();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post("/payment-razorpay", async (req, res) => {
    const { appointmentId } = req.body;

    const options = {
        amount: 50000, // Amount in paise (e.g. ₹500 = 50000 paise)
        currency: "INR",
        receipt: `receipt_order_${appointmentId}`,
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order });
    } catch (err) {
        res.status(500).json({ success: false, message: "Razorpay order creation failed" });
    }
});

module.exports = router;
