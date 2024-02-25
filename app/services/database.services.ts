// External Dependencies
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import Game from '../models/game';

// Global Variables
export const collections: { games?: mongoDB.Collection<Game> } = {};

// Initialize Connection
export async function connectToDB() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  const gamesCollection: mongoDB.Collection<Game> = db.collection<Game>(
    process.env.GAMES_COLLECTION_NAME as string,
  );

  collections.games = gamesCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collections: ${gamesCollection.collectionName}`,
  );
}
