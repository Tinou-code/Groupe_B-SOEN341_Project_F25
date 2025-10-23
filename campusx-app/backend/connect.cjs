const {MongoClient} = require("mongodb");
const env = require("dotenv");
env.config({path:"./.env.local"});

const URI = process.env.ATLAS_URI;

if (!URI) {
  throw new Error("Missing ATLAS_URI in environment variables");
}

const client = new MongoClient(URI)

let database;
module.exports = {
    connectToServer: () => {
        database = client.db("campusx");
    },
    getDb: () => {
        return database;
    }
}


