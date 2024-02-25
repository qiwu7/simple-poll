import { collections, connectToDB } from './database.services';
import Game from '../models/game';

export async function createNewGame(playerId: number, word: string): Promise<Game> {
  await connectToDB();
  const count = (await collections.games?.countDocuments()) || 0;
  const game = new Game(
    count + 1,
    playerId,
    word,
    new Set<string>(),
    new Set<string>(),
    5,
    5,
    false,
  );
  const res = await collections.games?.insertOne(game);
  console.log(res?.insertedId);
  return game;
}
