import mongoose from "mongoose";
import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
import dotenv from "dotenv";
import { Bus } from "./models/Bus.js";

dotenv.config();

const buses = [
  { operator: "Lanka Glide Express", from: "Colombo", to: "Kandy", depart: "07:30", arrive: "10:45", price: 1850, rating: 4.9, seats: 18, type: "Luxury AC", busNo: "NB-4821", driver: "Nimal Perera", eta: "8 min", delay: "On time", speed: 54, next: "Kadawatha", progress: 28, color: "from-sky-500 to-cyan-400" },
  { operator: "Ceylon Coast Rider", from: "Colombo", to: "Galle", depart: "09:15", arrive: "11:50", price: 1450, rating: 4.7, seats: 11, type: "Expressway AC", busNo: "SP-7740", driver: "Kasun Silva", eta: "14 min", delay: "+3 min", speed: 72, next: "Welipenna", progress: 42, color: "from-emerald-500 to-teal-400" },
  { operator: "Northern Star Coach", from: "Colombo", to: "Jaffna", depart: "21:00", arrive: "05:40", price: 3950, rating: 4.8, seats: 7, type: "Sleeper Luxury", busNo: "NC-9018", driver: "Ravi Tharmalingam", eta: "22 min", delay: "On time", speed: 65, next: "Kurunegala", progress: 18, color: "from-indigo-500 to-violet-500" },
  { operator: "Hill Country Line", from: "Kandy", to: "Ella", depart: "06:40", arrive: "12:20", price: 2200, rating: 4.6, seats: 14, type: "Panoramic Coach", busNo: "CP-4429", driver: "Saman Kumara", eta: "11 min", delay: "+5 min", speed: 38, next: "Nuwara Eliya", progress: 35, color: "from-lime-500 to-emerald-400" }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/busmate");
    console.log("Connected to MongoDB for Seeding");

    await Bus.deleteMany({});
    console.log("Cleared existing buses");

    await Bus.insertMany(buses);
    console.log("Database seeded successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
