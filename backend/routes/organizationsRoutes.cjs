const express = require("express");
const database = require("../connect.cjs");

const organizationsRoutes = express.Router();

//Read all organizations
organizationsRoutes.route("/organizations").get(async (req, res) => {
    let db = database.getDb();
    try {
        let data = await db.collection("organizations").find({nextOrgId: {$exists:false}}, {projection:{_id:0}}).sort({name:-1}).toArray();
        if (data.length < 1) return res.status(404).json({msg: "Data not found" });
        res.status(200).json({data, msg: "Success"});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({msg: "Server error"});
    }
});

//Read one organization
organizationsRoutes.route("/organizations/:id").get(async (req, res) => {
    let db = database.getDb();
    try {
        let data = await db.collection("organizations").findOne({id: req.params.id});
        if (!data || data.length < 1) return res.status(404).json({msg: "Data not found" });
        res.status(200).json({data, msg: "Success"});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({msg: "Server error"});
    }
});

module.exports = organizationsRoutes;