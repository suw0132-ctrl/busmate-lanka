import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  seatsBooked: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, default: "Paid" },
  qrCodeUrl: { type: String }, // Store the Data URL of the generated QR Code
  createdAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.model("Booking", bookingSchema);
