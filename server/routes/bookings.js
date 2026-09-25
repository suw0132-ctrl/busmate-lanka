import express from "express";
import QRCode from "qrcode";
import nodemailer from "nodemailer";
import { Booking } from "../models/Booking.js";
import { Bus } from "../models/Bus.js";

const router = express.Router();

// Helper to configure the email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // e.g., your-email@gmail.com
      pass: process.env.EMAIL_PASS, // e.g., your App Password
    },
  });
};

router.post("/", async (req, res) => {
  try {
    const { userEmail, userName, busId, seatsBooked, totalPrice } = req.body;

    // 1. Verify bus exists
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    // 2. Create the booking document
    const newBooking = new Booking({
      userEmail,
      userName,
      busId,
      seatsBooked,
      totalPrice,
      paymentStatus: "Paid",
    });
    await newBooking.save();

    // 3. Generate QR Code containing booking info
    const qrData = JSON.stringify({
      bookingId: newBooking._id,
      user: userName,
      bus: bus.busNo,
      route: `${bus.from} to ${bus.to}`,
      seats: seatsBooked,
      status: "Paid",
    });
    
    const qrCodeDataUrl = await QRCode.toDataURL(qrData);

    // Save QR Code URL back to booking (optional)
    newBooking.qrCodeUrl = qrCodeDataUrl;
    await newBooking.save();

    // 4. Send Email with QR Code
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = createTransporter();
      
      const mailOptions = {
        from: `"BusMate Lanka" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: "Your Bus Booking Confirmation & E-Ticket",
        html: `
          <h2>Thank you for booking with BusMate Lanka, ${userName}!</h2>
          <p>Your payment of <strong>LKR ${totalPrice}</strong> was successful.</p>
          <p><strong>Journey:</strong> ${bus.from} to ${bus.to}</p>
          <p><strong>Bus:</strong> ${bus.operator} (${bus.busNo})</p>
          <p><strong>Seats Booked:</strong> ${seatsBooked}</p>
          <p><strong>Departure:</strong> ${bus.depart}</p>
          <p>Please find your E-Ticket QR Code attached below. Show this QR code to the conductor when boarding.</p>
        `,
        attachments: [
          {
            filename: 'ticket-qrcode.png',
            path: qrCodeDataUrl, // Nodemailer can handle Data URLs directly
            cid: 'qrcode' 
          }
        ]
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn("EMAIL_USER and EMAIL_PASS not configured in .env. Email skipped.");
    }

    res.status(201).json({ 
      message: "Booking successful! Ticket sent to email.",
      booking: newBooking 
    });

  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "An error occurred during booking." });
  }
});

export default router;
