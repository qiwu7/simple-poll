import { ObjectId } from 'mongodb';

export default class Game {
  constructor(
    public gameId: number,
    public player: string,
    public word: string,
    public guesses: string,
    public matches: string,
    public totalLifes: number,
    public lifesLeft: number,
    public win: boolean,
    public id?: ObjectId,
  ) {}
}
