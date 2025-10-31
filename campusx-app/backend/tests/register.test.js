//this code tests register functions

const request = require("supertest");
const {MongoMemoryServer} = require("mongodb-memory-server");
const connect = require("../connect.cjs");
const app = require("../app.cjs");

let mongoServer;

beforeAll(async () => {

    //create and connect to test db
    mongoServer = await MongoMemoryServer.create(); 
    const uri = mongoServer.getUri();
    await connect.connectToServer(uri);
    const db = connect.getDb();
    
    //create test users for test db
    await db.collection("users").insertMany([
        {userId: "S12345",password: "12345",type: "student"},
        {userId: "A123",password: "admin123",type: "admin"},
    ]);

});

afterAll(async () => {
    await connect.closeConnection();
    await mongoServer.stop();
});

describe("POST /api/users", () => {
    it("should return 201 for valid register", async () => {
        const res = await request(app)
            .post("/api/users")
            .send({userId: "S45678", password: "12345",type: "student"});
        expect(res.status).toBe(201);
    });

    it("should return 409 for register with id that already exists", async () => {
        const res = await request(app)
            .post("/api/users")
            .send({userId: "S12345", password: "randompass",type: "student"});
        expect(res.status).toBe(409);
    });

});