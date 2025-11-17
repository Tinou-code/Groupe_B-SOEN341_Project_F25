//this code tests login routes

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
        {userId: "O12345",password: "org123",type: "organizer"},
        {userId: "A123",password: "admin123",type: "admin"},
    ]);

});

afterAll(async () => {
    await connect.closeConnection();
    await mongoServer.stop();
});

describe("POST /api/users/:id", () => {

    //test valid student login
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
        expect(res.body.msg).toBe("Incorrect password");
    });

    //test login with user id that doesnt exist
    it("should return 404 for invalid id", async () => {
        const res = await request(app)
            .post("/api/users/S123")
            .send({password: "12345",type: "student"});
        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("User not found");
    });

    //test valid organizer login
    it("should return 200 and user data for valid login", async () => {
        const res = await request(app)
            .post("/api/users/O12345")
            .send({password: "org123",type: "organizer"});
        expect(res.status).toBe(200);
        expect(res.body.data.userId).toBe("O12345");
        expect(res.body.data.type).toBe("organizer");
    });

    //test valid admin login
    it("should return 200 and user data for valid login", async () => {
        const res = await request(app)
            .post("/api/users/A123")
            .send({password: "admin123",type: "admin"});
        expect(res.status).toBe(200);
        expect(res.body.data.userId).toBe("A123");
        expect(res.body.data.type).toBe("admin");
    });

    //test login with wrong user type e.g. admin tries to login through student portal 
    it("should return 404 for invalid user type", async () => {
        const res = await request(app)
            .post("/api/users/A123")
            .send({password: "admin123",type: "student"});
        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("User not found");
    });

});