import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  operator: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  depart: { type: String, required: true },
  arrive: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  seats: { type: Number, required: true },
  type: { type: String, required: true },
  busNo: { type: String, required: true },
  driver: { type: String, required: true },
  eta: { type: String },
  delay: { type: String },
  speed: { type: Number },
  next: { type: String },
  progress: { type: Number, default: 0 },
  color: { type: String, default: "from-sky-500 to-cyan-400" }
}, { timestamps: true });

export const Bus = mongoose.model("Bus", busSchema);
