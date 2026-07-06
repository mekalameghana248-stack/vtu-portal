require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const studentRoutes = require("./routes/studentroutes");

const app = express();

// Database
connectDB();

// Middleware
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("VTU Student Portal API Running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});