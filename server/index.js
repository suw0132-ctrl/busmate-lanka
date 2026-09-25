import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import busRoutes from "./routes/buses.js";
import bookingRoutes from "./routes/bookings.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/busmate")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
