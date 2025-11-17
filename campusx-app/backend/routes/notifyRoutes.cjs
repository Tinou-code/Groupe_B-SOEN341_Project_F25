const express = require("express");
const sendEmail = require("../utils/sendEmail.cjs");
const getSmsGateway = require("../utils/smsGateways.cjs");
const router = express.Router();

router.post("/email", async (req, res) => {
  const { email, event } = req.body;

  if (!email || !event)
    return res.status(400).json({ message: "Missing fields" });

  const message =
    `${event.title}\n` +
    `Date: ${event.date}\n` +
    `Time: ${event.time}\n` +
    `Location: ${event.location}`;

  const result = await sendEmail(email, `Reminder: ${event.title}`, message);

  if (result.success) res.json({ message: "Email sent!" });
  else res.status(500).json({ message: "Failed to send email." });
});

router.post("/sms", async (req, res) => {
  const { phone, carrier, event } = req.body;

  if (!phone || !carrier || !event)
    return res.status(400).json({ message: "Missing fields" });

  const smsEmail = getSmsGateway(phone, carrier);

  if (!smsEmail)
    return res.status(400).json({ message: "Carrier not supported." });

  const message =
    `${event.title}\n` +
    `${event.date} at ${event.time}`;

  const result = await sendEmail(smsEmail, "", message);

  if (result.success) res.json({ message: "SMS sent!" });
  else res.status(500).json({ message: "Failed to send SMS." });
});

module.exports = router;
