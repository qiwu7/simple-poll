import { ObjectId } from 'mongodb';

export default class Game {
  constructor(
    public gameId: number,
    public playerId: number,
    public word: string,
    public guesses: Set<string>,
    public matches: Set<string>,
    public totalLifes: number,
    public lifesLeft: number,
    public win: boolean,
    public _id?: ObjectId,
  ) {}
}
