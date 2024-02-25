import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { Game } from '../../models/game';
import { getGame, updateGame } from '../../services/games.services';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const gameId = Number(searchParams.get('id')) || -1;
  let game: Game | undefined;

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    const accountAddress = message.interactor.verified_accounts[0];
    const fid = message.interactor.fid;
    if (gameId != -1) {
      game = await getGame(fid, gameId);
    } else {
      game = await getGame(fid);
    }
  }

  if (message?.input && game) {
    const letter = message.input.toLowerCase();
    if (isLetter(letter)) {
      game = await updateGameStates(game, letter);
    }
  }

  if (game?.win) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'New Game',
          },
        ],
        image: `${NEXT_PUBLIC_URL}/api/image/game?guesses=${game?.guesses}&word=${game?.word}&lifes=${game?.lifesLeft}&win=${game?.win}`,
        postUrl: `${NEXT_PUBLIC_URL}/api/start-game`,
      }),
    );
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Submit',
        },
      ],
      image: `${NEXT_PUBLIC_URL}/api/image/game?guesses=${game?.guesses}&word=${game?.word}&lifes=${game?.lifesLeft}&win=${game?.win}`,
      input: {
        text: 'Letter',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/game?id=${gameId}`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';

function isLetter(str: string) {
  return str.length === 1 && str.match(/[a-zA-Z]/i);
}

function hasWon(word: string, guesses: string): boolean {
  for (let char of word) {
    if (!guesses.includes(char)) {
      return false;
    }
  }

  return true;
}

async function updateGameStates(game: Game, letter: string): Promise<Game> {
  if (game.guesses.includes(letter)) {
    return game;
  }
  if (game.win) {
    return game;
  }
  game.guesses = game.guesses + letter;
  if (!game.word.includes(letter)) {
    game.lifesLeft--;
  }
  if (hasWon(game.word, game.guesses)) {
    game.win = true;
  }
  await updateGame(game);

  return game;
}
