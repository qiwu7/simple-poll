import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import Game from '../../models/game';
import { getGame, updateGame } from '../../services/games.services';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const gameId = Number(searchParams.get('id')) || -1;
  var game: Game | undefined;

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
      game.guesses.add(letter);
    }
    if (game.word.includes(letter)) {
      game.matches.add(letter);
    } else {
      game.lifesLeft--;
    }
    if (hasWon(game.word, game.guesses)) {
      game.win = true;
    }
    updateGame(game);
  }

  const guessesString = game ? Array.from(game.guesses).join('') : '';

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Submit',
        },
      ],
      image: `${NEXT_PUBLIC_URL}/api/image/game?guesses=${guessesString}&word=${game?.word}&lifes=${game?.lifesLeft}&win=${game?.win}`,
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

function hasWon(word: string, guesses: Set<String>): boolean {
  for (let char of word) {
    if (!guesses.has(char)) {
      return false;
    }
  }

  return true;
}
