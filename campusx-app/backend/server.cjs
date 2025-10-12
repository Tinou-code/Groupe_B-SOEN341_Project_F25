const connect = require("./connect.cjs");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Server running on port ${PORT}`)
})