const {MongoClient} = require("mongodb");
const env = require("dotenv");
env.config({path:"./.env.local"});

let URI = process.env.ATLAS_URI;
let client;
let database;

module.exports = {
    connectToServer: async (customURI) => {
        URI = customURI || URI;

        if (!URI) {
            throw new Error("Missing ATLAS_URI in environment variables");
        }

        client = new MongoClient(URI)
        await client.connect();
        database = client.db("campusx");
    },
    
    getDb: () => {
        return database;
    },
    closeConnection: async () => {
        if (client) await client.close();
    },
}


