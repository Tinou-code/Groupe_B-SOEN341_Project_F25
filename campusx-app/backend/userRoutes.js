const express = require("express");
const database = require("./connect.cjs");

let userRoutes = express.Router();

//Find user
userRoutes.route("/users").get(async (req, res) => {
    let db = database.getDb();
    try {
        let data = await db.collection("users").find({}).toArray();
        if (data.length < 1) throw new Error("Data not found");
        res.json(data);
    }
    catch (error) {
        console.error(error);
    }
});