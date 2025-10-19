const express = require("express");
const database = require("../connect.cjs");

const eventRoutes = express.Router();

//Read all events
eventRoutes.route("/events").get(async (req, res) => {
    let db = database.getDb();
    try {
        let data = await db.collection("events").find({nextEventId: {$exists:false}}, {projection:{_id:0}}).sort({dateAdded:-1}).toArray();
        if (data.length < 1) return res.status(404).json({msg: "Data not found" });
        res.status(200).json({data, msg: "Success"});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({msg: "Server error"});
    }
});

//Read one event
eventRoutes.route("/events/:id").get(async (req, res) => {
    let db = database.getDb();
    try {
        let data = await db.collection("events").findOne({eventId: req.params.id});
        if (data.length < 1) return res.status(404).json({msg: "Data not found" });
        res.status(200).json({data, msg: "Success"});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({msg: "Server error"});
    }
});


//Create an event
eventRoutes.route("/events").post(async (req, res) => {
    try {
        let db = database.getDb();
        let mongoEvent = {
          title:req.body.title,
          date:req.body.date,
          time:req.body.time,
          location:req.body.location,
          category:req.body.category,
          organizer:req.body.organizer,
          tickets:Number(req.body.tickets),
          remainingTickets:Number(req.body.tickets),
          type:req.body.type, 
          desc:req.body.desc,
          guestList:[],
          attendees:[],
          imagePath:req.body.imagePath,
          dateAdded: new Date(),
          nextTicketNum:1
        }

        //check if event aready exists, assume 2 events with same date and location cannot be accepted, everything else is ok
        let eventExists = await db.collection("events").findOne( 
                {
                    date: mongoEvent.date,
                    location: mongoEvent.location
                }, 
            );

        if (eventExists) return res.status(409).json({ msg: "An event already exists at this date and location" });
        
        else {
        //assign id autotmatically
        let idTracker = await db.collection("events").findOne({nextEventId: {$exists:true}});
        if (!idTracker) return res.status(500).json({ msg: "500 - Server error"});
        else mongoEvent = {...mongoEvent, eventId:`EV${idTracker.nextEventId}`};
        let updateNextId = await db.collection("events").updateOne({_id: idTracker._id}, {$set:{nextEventId:Number(idTracker.nextEventId)+1}});
        if (!updateNextId.acknowledged === true) return res.status(500).json({ msg: "500 - Server error"});

            let addEvent = await db.collection("events").insertOne(mongoEvent);
            if (addEvent && addEvent.acknowledged === true)
                return res.status(201).json({addEvent, msg:"Event created successfully!"});
            else throw new Error();
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "500 - Server error"});
    }
});

//Update an event
eventRoutes.route("/events/:id").put(async (req, res) => {
    let db = database.getDb();
    let mongoevent = {
        $set:{
        id: req.body.id,
        type: req.body.type,
        savedEvents: [],
        claimedTickets: [],
        password: req.body.password}
    }

    let data = await db.collection("events").updateOne({id: req.params.id}, mongoevent);
    res.json(data); 
});

//Delete an event
eventRoutes.route("/events/:id").delete(async (req, res) => {
    let db = database.getDb();
        let data = await db.collection("events").deleteOne({id: req.params.id})
        if (Object.keys(data).length < 1) throw new Error("Data not found");
        res.json(data);
    }
);


module.exports = eventRoutes;