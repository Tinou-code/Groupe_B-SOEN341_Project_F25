const connect = require("./connect.cjs");
const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes.cjs");
const eventRoutes = require("./routes/eventRoutes.cjs");

const app = express();
const PORT = process.env.PORT || 3000 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api",userRoutes)
app.use("/api", eventRoutes)

//load static frontend before serve
app.use(express.static(path.join(__dirname, "../frontend/dist")));
//serve front end
app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
});

app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Server running on port ${PORT}`)
})