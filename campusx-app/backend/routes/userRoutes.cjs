const express = require("express");
const database = require("../connect.cjs");

const userRoutes = express.Router();

//Read all users
userRoutes.route("/users").get(async (req, res) => {
    let db = database.getDb();
    try {
        let data = await db.collection("users").find({},
            {projection:{_id:0, password:0}}).toArray();
        if (data.length < 1) throw new Error("Data not found");
        res.json(data);
    }
    catch (error) {
        console.error(error);
    }
});

//Read one user
userRoutes.route("/users/:id").get(async (req, res) => {
    let db = database.getDb();
    try {
        let data = await db.collection("users").findOne(
            {userId: req.params.id,}, 
            {projection:{_id:0, password:0}}
            );
        if (!data) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error"});
    }
});

//Authenticate a user
userRoutes.route("/users/:id").post(async (req, res) => {
    let db = database.getDb();
    const {type, password} = req.body;
    try {
        let data = await db.collection("users").findOne(
            {
                userId: req.params.id, 
                password,
                type,
            }, 
            {projection:{_id:0, password:0}}
            );
        if (!data) {
            let userExists = await db.collection("users").findOne(
                {userId: req.params.id}, {projection:{_id:0, userId:1}}
            );
            if (!userExists) return res.status(404).json({ msg: "User not found" });
            else return res.status(401).json({msg: "Incorrect password"});
        } 
        return res.status(200).json({data, msg: "Login Succesful!"});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error"});
    }
});

//Create a user
userRoutes.route("/users").post(async (req, res) => {
    try {
        let db = database.getDb();
        let mongoUser = {
            userId: req.body.id,
            type: req.body.type,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        }
        
        switch(mongoUser.type) {
            case "student" :  
                mongoUser =  {
                ...mongoUser,
                savedEvents: [],
                claimedTickets: []
                }
                break;

            case "organizer" :  
                mongoUser =  {
                ...mongoUser,
                organization: req.body.organization,
                isApproved:false
                }
                break;
        }
      
        let userExists = await db.collection("users").findOne( 
                {userId: mongoUser.userId}, 
                {projection: {userId:1}}
            );

        if (userExists) return res.status(409).json({ msg: "A user with this ID already exists" });
        else {
            let addUser = await db.collection("users").insertOne(mongoUser);
            if (addUser && addUser.acknowledged === true)
                return res.status(201).json({addUser, msg:"User created successfully!"});
            else throw new Error();
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "500 - Server error"});
    }
});

//Update a user
//save an event
userRoutes.route("/users/save").patch(async (req, res) => {
    try {

        let db = database.getDb();
        const user = await db.collection("users").findOne({userId: req.body.userId}, {projection: {_id:0, savedEvents:1}});
        console.log("saved events", user);
        if (user.savedEvents.find(eventId => eventId === req.body.eventId)) 
            return res.status(409).json({msg:"Event already saved by user"}); //check if event aready saved
        let mongoUser = {
            $set:{
                savedEvents:[...user.savedEvents, req.body.eventId ]
            }
        }

        let data = await db.collection("users").updateOne({userId: req.body.userId}, mongoUser);
        let updatedUser = await db.collection("users").findOne({userId: req.body.userId}, {projection: {_id:0, password:0}});
        return res.status(200).json({data, user:updatedUser, msg:"Event saved successfully!"}); 
    }
        
    catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "500 - Server error"});
    }
});

//save an event
userRoutes.route("/users/unsave").patch(async (req, res) => {
    try {

        let db = database.getDb();
        const user = await db.collection("users").findOne({userId: req.body.userId}, {projection: {_id:0, savedEvents:1}});
        console.log("saved events", user);
        if (!user.savedEvents.find(eventId => eventId === req.body.eventId)) 
            return res.status(409).json({msg:"Event was never saved by user"}); //check if event aready saved
        let mongoUser = {
            $set:{
                savedEvents: user.savedEvents.filter(eventId => eventId !== req.body.eventId)
            }
        }

        let data = await db.collection("users").updateOne({userId: req.body.userId}, mongoUser);
        let updatedUser = await db.collection("users").findOne({userId: req.body.userId}, {projection: {_id:0, password:0}});
        return res.status(200).json({data, user:updatedUser, msg:"Event unsaved successfully!"}); 
    }
        
    catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "500 - Server error"});
    }
});


//claim a ticket
userRoutes.route("/users/claim").patch(async (req, res) => {
    try {

        let db = database.getDb();
        const user = await db.collection("users").findOne({userId: req.body.userId});
        console.log("claimedTickets", user.claimedTickets);
        if (user.claimedTickets.find(t => t.eventId === req.body.eventId)) 
            return res.status(409).json({msg:"You already have a ticket for this event"}); 

        //generate ticket id - EVXXXX-XXX
        const event = await db.collection("events").findOne({eventId: req.body.eventId});
        const ticketId = `${event.eventId}-${String(event.nextTicketNum).padStart(3,"0")}`

        //add user to guest list (id, name, ticket id) and remove 1 ticket
        let updtGuestList = {
            $set:{
                guestList: [...event.guestList, {studentId: user.userId, name: `${user.lastName}, ${user.firstName}`, ticketId }],
                remainingTickets: Number(event.remainingTickets)-1,
                nextTicketNum: Number(event.nextTicketNum)+1
        }}
        let addGuest = await db.collection("events").updateOne({eventId: event.eventId}, updtGuestList);
        
        if (addGuest.acknowledged !== true) throw new Error("failed to add guest");

        //give ticket to user - event id, ticket id
        let mongoUser = {
            $set:{
                claimedTickets: [...user.claimedTickets, {eventId: event.eventId, ticketId}]
            }
        }

        let data = await db.collection("users").updateOne({userId: req.body.userId}, mongoUser);
        if (data.acknowledged !== true) throw new Error("failed to claim ticket");

        let updatedUser = await db.collection("users").findOne({userId: req.body.userId}, {projection: {_id:0, password:0}});
        return res.status(200).json({data, user:updatedUser, msg:"Ticket claimed successfully!"}); 
    }
        
    catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "500 - Server error"});
    }
});


//cancel a ticket
userRoutes.route("/users/cancel").patch(async (req, res) => {
    try {

        let db = database.getDb();
        const user = await db.collection("users").findOne({userId: req.body.userId});
        console.log("claimedTickets", user.claimedTickets);
        if (!user.claimedTickets.find(t => t.eventId === req.body.eventId)) 
            return res.status(409).json({msg:"You do not have a ticket for this event"}); 

        //generate ticket id - EVXXXX-XXX
        const event = await db.collection("events").findOne({eventId: req.body.eventId});

        //remove user from guest list and add 1 ticket
        let updtGuestList = {
            $set:{
                guestList: event.guestList.filter(g => g.studentId !== user.userId),
                remainingTickets: Number(event.remainingTickets)+1
        }}
        let removeGuest = await db.collection("events").updateOne({eventId: event.eventId}, updtGuestList);
        
        if (removeGuest.acknowledged !== true) throw new Error("failed to remove guest");

        //remove ticket from user - event id, ticket id
        let mongoUser = {
            $set:{
                claimedTickets: user.claimedTickets.filter(t => t.eventId !== event.eventId)
            }
        }

        let data = await db.collection("users").updateOne({userId: req.body.userId}, mongoUser);
        if (data.acknowledged !== true) throw new Error("failed to cancel reservation");

        let updatedUser = await db.collection("users").findOne({userId: req.body.userId}, {projection: {_id:0, password:0}});
        return res.status(200).json({data, user:updatedUser, msg:"Reservation cancelled successfully!"}); 
    }
        
    catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "500 - Server error"});
    }
});

//Delete a user
userRoutes.route("/users/:id").delete(async (req, res) => {
    let db = database.getDb();
        let data = await db.collection("users").deleteOne({id: req.params.id})
        if (Object.keys(data).length < 1) throw new Error("Data not found");
        res.json(data);
    }
);

module.exports = userRoutes;