import express from "express";
import { Bus } from "../models/Bus.js";

const router = express.Router();

// Get all buses
router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;
    let query = {};
    if (from && to) {
      query = { from, to };
    }
    const buses = await Bus.find(query);
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a bus
router.post("/", async (req, res) => {
  const bus = new Bus(req.body);
  try {
    const newBus = await bus.save();
    res.status(201).json(newBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
