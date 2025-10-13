const {MongoClient} = require("mongodb");
const env = require("dotenv");
env.config({path:"./config.env"});

const URI = process.env.ATLAS_URI;
const client = new MongoClient(URI)

let database;

module.exports = {
    connectToServer: () => {
        database = client.db("campusx");
        console.log(database);
    },
    getDb: () => {
        return database;
    }
}


