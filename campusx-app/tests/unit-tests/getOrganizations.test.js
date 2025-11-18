//this unit test is for getOrganizations() - fetch all organizations data
import {vi, describe, test, expect, beforeEach} from "vitest";

global.fetch = vi.fn();

const { getOrganizations, getOrganization } = require("../../api/admin.js");

beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("getOrganizations() - fetch data from all organizations", () => {

    test("should return data on success", async () => {
        fetch.mockResolvedValue({
            status: 200,
            json: () => Promise.resolve({
                data: [{id:1, name: "org1"}, {id:2, name: "org2"}, {id:3, name: "org3"}],
                msg: "Success",
            })
        });

        const res = await getOrganizations();

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/organizations",
            expect.any(Object)
        );

        expect(res).toEqual({
                status:200,
                organizations: [{id:1, name: "org1"}, {id:2, name: "org2"}, {id:3, name: "org3"}],
                msg: "Success",
            }  
        )
    });

    test("should return 500 on error", async () => {
        fetch.mockRejectedValue(new Error("error"))

        const res = await getOrganizations();

        expect(res).toEqual({
                status:500,
                msg: "500 - Server error",
            }  
        )
    });
});

describe("getOrganization(id) - fetch data from one organization by id", () => {

    test("should return data on success", async () => {
        fetch.mockResolvedValue({
            status: 200,
            json: () => Promise.resolve({
                data: {id:"ORG12345", name: "org1"},
                msg: "Success",
            })
        });

        const res = await getOrganization("ORG12345");

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/organizations/ORG12345",
            expect.any(Object)
        );

        expect(res).toEqual({
                status:200,
                organization: {id:"ORG12345", name: "org1"},
                msg: "Success",
            }  
        )
    });

    test("should return 500 on error", async () => {
        fetch.mockRejectedValue(new Error("error"))

        const res = await getOrganizations();

        expect(res).toEqual({
                status:500,
                msg: "500 - Server error",
            }  
        )
    });
});