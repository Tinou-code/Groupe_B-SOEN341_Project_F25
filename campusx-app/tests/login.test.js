//this code tests login functions

const request = require("supertest");
const {MongoMemoryServer} = require("mongodb-memory-server");
const connect = require("../backend/connect.cjs");
const app = require("../backend/app.cjs");

let mongoServer;

beforeAll(async () => {

    //create and connect to temp db
    mongoServer = await MongoMemoryServer.create(); 
    const uri = mongoServer.getUri();
    await connect.connectToServer(uri);
    const db = connect.getDb();
    
    //create test users for temp db
    await db.collection("users").insertMany([
        {userId: "S12345",password: "12345",type: "student"},
        {userId: "A123",password: "admin123",type: "admin"},
    ]);

});

afterAll(async () => {
    await connect.closeConnection();
    await mongoServer.stop();
});

describe("POST /api/users/:id", () => {

    //test valid login
    it("should return 200 and user data for valid login", async () => {
        const res = await request(app)
            .post("/api/users/S12345")
            .send({password: "12345",type: "student"});
        expect(res.status).toBe(200);
        expect(res.body.data.userId).toBe("S12345");
        expect(res.body.data.type).toBe("student");
    });

    //test login with wrong password
    it("should return 401 for wrong password", async () => {
        const res = await request(app)
            .post("/api/users/S12345")
            .send({password: "randompass",type: "student"});
        expect(res.status).toBe(401);
    });

    //test login with user id that doesnt exist
    it("should return 404 for wrong invalid id", async () => {
        const res = await request(app)
            .post("/api/users/S123")
            .send({password: "randompass",type: "student"});
        expect(res.status).toBe(404);
    });

});