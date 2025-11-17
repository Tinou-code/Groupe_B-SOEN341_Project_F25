//this code tests events routes

const request = require("supertest");
const {MongoMemoryServer} = require("mongodb-memory-server");
const connect = require("../backend/connect.cjs");
const app = require("../backend/app.cjs");

let mongoServer;

beforeAll(async () => {

    //create and connect to test db
    mongoServer = await MongoMemoryServer.create(); 
    const uri = mongoServer.getUri();
    await connect.connectToServer(uri);
    const db = connect.getDb();
    
    //create test users for test db
    await db.collection("events").insertMany([
        {nextEventId:103},
        {eventId: "EV01",title: "title", date: new Date().getFullYear(), location:"H Building"},
        {eventId: "EV02",title: "title", date: new Date(), location:"2"},
    ]);

});

afterAll(async () => {
    await connect.closeConnection();
    await mongoServer.stop();
});

describe("POST /api/events", () => {

    //test valid event creation
    it("should return 201 for valid event creation", async () => {
        const res = await request(app)
            .post("/api/events")
            .send({title: "title", date: new Date(), location:"3"});
        expect(res.status).toBe(201);
    });

    //test event creation with same date and location as event that already exists
    it("should return 409 if event with same date and location already exists", async () => {
        const res = await request(app)
            .post("/api/events")
            .send({title: "title", date: new Date().getFullYear(), location:"H Building"});
        expect(res.status).toBe(409);
        expect(res.body.msg).toBe("An event already exists at this date and location");
    });

});

describe("GET /api/events", () => {

    //test read a valid event by id
    it("should return 200 for valid read", async () => {
        const res = await request(app)
            .get("/api/events/EV01")
        expect(res.status).toBe(200);
        expect(res.body.data.eventId).toBe("EV01");
    });

    //test read an event with invalid id
    it("should return 404 if the event doesn't exist", async () => {
        const res = await request(app)
            .get("/api/events/randomId")
        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Data not found");
    });
});