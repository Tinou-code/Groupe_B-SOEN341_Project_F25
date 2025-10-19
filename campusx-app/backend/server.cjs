const connect = require("./connect.cjs");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.cjs");
const eventRoutes = require("./routes/eventRoutes.cjs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",userRoutes)
app.use("/", eventRoutes)

app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Server running on port ${PORT}`)
})