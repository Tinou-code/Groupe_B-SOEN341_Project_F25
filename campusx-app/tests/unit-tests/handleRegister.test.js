//this unit test is for handleRegister - validate Register form input before fetching data
import {vi, describe, test, expect, beforeAll, afterAll, beforeEach} from "vitest";
const { handleRegister } = require("../../api/register.js");

global.fetch = vi.fn();

beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("handleRegister - validate Register form input before fetching data", () => {

     //test Register with missing fields
    test("should return 400 for missing fields", async () => {
       
        const userOK = ["student", "S123", "pass", "firstname", "lastName", "email@email.com", "123-123-1234", "organization", "carrier"];        
        //missing phone carrier
        const userMissingCarrier = ["student", "S123", "pass", "firstname", "lastName", "email@email.com", "123-123-1234", "organization", ""];
        const res1 = await handleRegister(...userMissingCarrier);
        expect(res1).toEqual({status:400, msg: "Please select your phone carrier."});

        //missing organization for organizer
        const userMissingOrg = ["organizer", "S123", "pass", "firstname", "lastName", "email@email.com", "123-123-1234", "", "carrier"];
        const res2 = await handleRegister(...userMissingOrg);
        expect(res2).toEqual({status:400, msg: "Missing fields"});

        //missing any other field
        const res3 = await handleRegister("student", "", "pass");
        expect(res3).toEqual({status:400, msg: "Missing fields"});
    });

    //test Register with invalid user id
    test("should return 401 for invalid user id", async () => {
        const user1 = ["student", "SSSS", "pass", "firstname", "lastName", "email@email.com", "123-123-1234", "organization", "carrier"];
        const user2 = ["student", "12345", "pass", "firstname", "lastName", "email@email.com", "123-123-1234", "organization", "carrier"];        
    
        //wrong format - not s[d] (string - digits)
        const res1 = await handleRegister(...user1);
        expect(res1).toEqual({status:401, msg: "Enter a valid ID"});

        //wrong format - not s[d] (string - digits)
        const res2 = await handleRegister(...user2);
        expect(res2).toEqual({status:401, msg: "Enter a valid ID"});
    });

    //test Register with invalid email or phone number
    test("should return 401 for invalid email or phone number", async () => {

        const user1 = ["student", "S123", "pass", "firstname", "lastName", "email", "123-123-1234", "organization", "carrier"];
        const user2 = ["organizer", "S123", "pass", "firstname", "lastName", "email@email.com", "123-123-12", "organization", "carrier"];        

        //wrong format - not [s]@[s].[s]
        const res1 = await handleRegister(...user1);
        expect(res1).toEqual({status:401, msg: "Invalid email"});

        //wrong format - not 10 digits
        const res2 = await handleRegister(...user2);
        expect(res2).toEqual({status:401, msg: "Invalid phone number. Must be a 10-digit Canadian number."});
    });
});