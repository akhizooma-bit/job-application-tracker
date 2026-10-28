require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const applicationRoutes = require("./routes/applications");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Job Application Tracker API is running" });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "jobTracker",
    });

    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

startServer();