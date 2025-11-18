//this code tests register routes
import {describe, it, expect, beforeAll, afterAll} from "vitest";
const request = require("supertest");
const {MongoMemoryServer} = require("mongodb-memory-server");
const connect = require("../../backend/connect.cjs");
const app = require("../../backend/app.cjs");

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

    //test valid register
    it("should return 201 for valid register", async () => {
        const res = await request(app)
            .post("/api/users")
            .send({userId: "S45678", password: "12345",type: "student"});
        expect(res.status).toBe(201);
    });

    //test register with user id that is alreay used by another user
    it("should return 409 for register with id that already exists", async () => {
        const res = await request(app)
            .post("/api/users")
            .send({userId: "S12345", password: "randompass",type: "student"});
        expect(res.status).toBe(409);
    });

});