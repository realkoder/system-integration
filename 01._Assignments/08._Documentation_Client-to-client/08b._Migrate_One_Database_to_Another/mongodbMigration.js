import pkg from "pg";
import { MongoClient } from "mongodb";

const { Client } = pkg;

const postgresConfig = {
  user: "migrator",
  host: "localhost",
  database: "music_database",
  password: "migrator",
  port: 5432,
};

const mongoConfig = {
  url: "mongodb://localhost:27017", // MongoDB connection URL
  dbName: "strict_music_database", // MongoDB database name
};

async function migrateData() {
  const pgClient = new Client(postgresConfig);
  const mongoClient = new MongoClient(mongoConfig.url);

  try {
    // Connect to PostgreSQL
    await pgClient.connect();
    console.log("Connected to PostgreSQL");

    // Connect to MongoDB
    await mongoClient.connect();
    console.log("Connected to MongoDB");

    const pgQuery = "SELECT * FROM artists";
    const artistsResult = await pgClient.query(pgQuery);
    const artists = artistsResult.rows;

    const mongoDb = mongoClient.db(mongoConfig.dbName);
    const artistsCollection = mongoDb.collection("artists");

    // Insert artists into MongoDB
    await artistsCollection.insertMany(artists);
    console.log("Artists migrated to MongoDB");

    const songsQuery = "SELECT * FROM songs";
    const songsResult = await pgClient.query(songsQuery);
    const songs = songsResult.rows;

    const songsCollection = mongoDb.collection("songs");

    // Insert songs into MongoDB
    await songsCollection.insertMany(songs);
    console.log("Songs migrated to MongoDB");

    const albumsQuery = "SELECT * FROM albums";
    const albumsResult = await pgClient.query(albumsQuery);
    const albums = albumsResult.rows;

    const albumsCollection = mongoDb.collection("albums");

    // Insert albums into MongoDB
    await albumsCollection.insertMany(albums);
    console.log("Albums migrated to MongoDB");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    // Close connections
    await pgClient.end();
    await mongoClient.close();
    console.log("Connections closed");
  }
}

migrateData();
