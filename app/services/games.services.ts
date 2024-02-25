import { collections, connectToDB } from './database.services';
import { Game, TOTAL_LIFES } from '../models/game';

export async function createNewGame(playerId: number, word: string): Promise<Game> {
  await connectToDB();
  const count = (await collections.games?.countDocuments()) || 0;
  const game = new Game(
    count + 1,
    playerId,
    word,
    new Set<string>(),
    new Set<string>(),
    TOTAL_LIFES,
    TOTAL_LIFES,
    false,
  );
  const res = await collections.games?.insertOne(game);
  console.log(`game created: ${res?.insertedId}`);
  return game;
}

export async function getGame(playerId: number, gameId?: number): Promise<Game | undefined> {
  if (gameId) {
    console.log(`using game id ${gameId}`);
    return (await collections.games?.findOne({ gameId: gameId })) || undefined;
  }

  const res = await collections.games
    ?.find({ playerId: playerId })
    .sort({ gameId: -1 })
    .limit(1)
    .toArray();
  if (res && res.length > 0) {
    console.log(`found game with ${res[0].gameId}`);
    return res[0];
  }
}

export async function updateGame(game: Game): Promise<Game | undefined> {
  const res = await collections.games?.findOneAndReplace({ gameId: game.gameId }, game);
  return res || undefined;
}
