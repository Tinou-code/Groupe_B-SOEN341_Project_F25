//this unit test is for getEvents() - fetch all Events data
import {vi, describe, test, expect, beforeEach} from "vitest";

global.fetch = vi.fn();

const { getEvents, getEvent } = require("../../api/events.js");

beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("getEvents() - fetch data from all Events", () => {

    test("should return data on success", async () => {
        fetch.mockResolvedValue({
            status: 200,
            json: () => Promise.resolve({
                data: [{id:1, title: "event1"}, {id:2, title: "event2"}, {id:3, title: "event3"}],
                msg: "Success",
            })
        });

        const res = await getEvents();

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/events",
            expect.any(Object)
        );

        expect(res).toEqual({
                status:200,
                events: [{id:1, title: "event1"}, {id:2, title: "event2"}, {id:3, title: "event3"}],
                msg: "Success",
            }  
        )
    });

    test("should return 500 on error", async () => {
        fetch.mockRejectedValue(new Error("error"))

        const res = await getEvents();

        expect(res).toEqual({
                status:500,
                msg: "500 - Server error",
            }  
        )
    });
});

describe("getEvent(id) - fetch data from one Event by id", () => {

    test("should return data on success", async () => {
        fetch.mockResolvedValue({
            status: 200,
            json: () => Promise.resolve({
                data: {id:"EV12345", title: "event1"},
                msg: "Success",
            })
        });

        const res = await getEvent("EV12345");

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/events/EV12345",
            expect.any(Object)
        );

        expect(res).toEqual({
                status:200,
                event: {id:"EV12345", title: "event1"},
                msg: "Success",
            }  
        )
    });

    test("should return 500 on error", async () => {
        fetch.mockRejectedValue(new Error("error"))

        const res = await getEvents();

        expect(res).toEqual({
                status:500,
                msg: "500 - Server error",
            }  
        )
    });
});