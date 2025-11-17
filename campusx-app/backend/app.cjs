const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes.cjs");
const eventRoutes = require("./routes/eventRoutes.cjs");
const organizationsRoutes = require("./routes/organizationsRoutes.cjs");
const notifyRoutes = require("./routes/notifyRoutes.cjs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api",userRoutes);
app.use("/api", eventRoutes);
app.use("/api", organizationsRoutes);
app.use("/api/notify", notifyRoutes);

//load static frontend before serve
app.use(express.static(path.join(__dirname, "../frontend/dist")));
//serve front end
app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
});

module.exports = app;