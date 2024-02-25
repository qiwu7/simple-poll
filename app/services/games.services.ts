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

export async function getGame(playerId: number, gameId?: number): Promise<Game | undefined> {
  await connectToDB();

  if (gameId) {
    return (await collections.games?.findOne({ gameId: gameId })) || undefined;
  }

  const res = await collections.games
    ?.find({ playerId: playerId })
    .sort({ gameId: -1 })
    .limit(1)
    .toArray();
  if (res && res.length > 0) {
    return res[0];
  }
}

export async function updateGame(game: Game): Promise<Game | undefined> {
  const res = await collections.games?.findOneAndReplace({ gameId: game.gameId }, game);
  return res || undefined;
}
