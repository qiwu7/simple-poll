import { ObjectId } from 'mongodb';

export const TOTAL_LIFES = 5;

export class Game {
  constructor(
    public gameId: number,
    public playerId: number,
    public word: string,
    public guesses: string,
    public totalLifes: number,
    public lifesLeft: number,
    public win: boolean,
    public _id?: ObjectId,
  ) {}
}
