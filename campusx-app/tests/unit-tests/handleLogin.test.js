//this unit test is for handleLogin - validate login form input before fetching data
import {vi, describe, test, expect, beforeAll, afterAll, beforeEach} from "vitest";
const { handleLogin } = require("../../api/login.js");

global.fetch = vi.fn();

beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("handleLogin - validate login form input before fetching data", () => {

     //test login with missing fields
    test("should return 400 for missing fields", async () => {
        //missing user type
        const res1 = await handleLogin("", "S123", "pass");
        expect(res1).toEqual({status:400, msg: "Missing fields"});

        //missing user id
        const res2 = await handleLogin("student", "", "pass");
        expect(res2).toEqual({status:400, msg: "Missing fields"});

        //missing password
        const res3 = await handleLogin("student", "", "pass");
        expect(res3).toEqual({status:400, msg: "Missing fields"});
    });

    //test login with invalid user type
    test("should return 401 for invalid user type", async () => {
        const res1 = await handleLogin("random type", "S123", "pass");
        expect(res1).toEqual({status:401, msg: "Invalid username"});
    });

    //test login with invalid user id
    test("should return 401 for invalid user ID", async () => {
        //wrong format - not s[d] (string - digits)
        const res1 = await handleLogin("student", "123", "pass");
        expect(res1).toEqual({status:401, msg: "Invalid username"});

        //wrong format - not s[d] (string - digits)
        const res2 = await handleLogin("student", "SSSS", "pass");
        expect(res2).toEqual({status:401, msg: "Invalid username"});
    });

     //test login with valid data 
    test("should return 200 and user data if login valid", async () => {
        
        fetch.mockResolvedValue({
            status: 200,
            json: () => Promise.resolve({
                data: {userId:"S123", name: "name", type:"student"},
                msg: "Success",
            })
        });

        const res1 = await handleLogin("student", "S123", "pass");

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/users/S123",
            expect.any(Object)
        );

        expect(res1).toEqual({status:200, user: {userId:"S123", name: "name", type:"student"}, msg: "Success"});
    });

    test("should return 500 on error", async () => {
            fetch.mockRejectedValue(new Error("error"))
    
            const res = await handleLogin("student", "S123", "pass");
    
            expect(res).toEqual({
                    status:500,
                    msg: "500 - Server error",
                }  
            )
        });

});
