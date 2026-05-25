const dotenv = require("dotenv");

dotenv.config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

let database;

async function connectDB() {
  try {
    await client.connect();

    database = client.db("sefaTeesDB");

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

function getDB() {
  return database;
}

module.exports = {
  connectDB,
  getDB,
};