//this unit test is for handleCreateEvent - validate CreateEvent form input before fetching data
import {vi, describe, test, expect, beforeAll, afterAll, beforeEach} from "vitest";
const { handleCreateEvent } = require("../../api/events.js");

global.fetch = vi.fn();

beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("handleCreateEvent - validate CreateEvent form input before fetching data", () => {

     //test CreateEvent with missing fields
    test("should return 400 for missing fields", async () => {
        const eventMissingField = ["title",new Date(),"13:00","location","","organizer", 10,"type","imagesrc","desc"];  
        const res1 = await handleCreateEvent(...eventMissingField);
        expect(res1).toEqual({status:400, msg: "Missing fields"});
    });

    //test CreateEvent with invalid date
    test("should return 401 for invalid date", async () => {
        const event2 = ["title","2024-01-01","13:00","location","category","organizer",10,"type","image","desc"];  
        const res1 = await handleCreateEvent(...event2);
        expect(res1).toEqual({status:401, msg: "Enter a valid date for the event!"});
    });

     //test CreateEvent with invalid amount of tickets (0 or negative number)
    test("should return 401 for # of tickets", async () => {
        const event1 = ["title","2050-01-01","13:00","location","category","organizer",-1,"type","image","desc"];  
        const res1 = await handleCreateEvent(...event1);
        expect(res1).toEqual({status:401, msg: "Enter a valid number of tickets"});

        const event2 = ["title","2050-01-01","13:00","location","category","organizer", 0,"type","image","desc"];  
        const res2 = await handleCreateEvent(...event2);
        expect(res2).toEqual({status:401, msg: "Enter a valid number of tickets"});
    });

});