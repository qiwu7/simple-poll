import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { connectToDB } from '../../services/database.services';
import { createNewGame } from '../../services/games.services';
import { Game, TOTAL_LIFES } from '../../models/game';

const WORDS : string[] = [
  'blockchain',
  'ethereum',
  'based',
  'hangman',
  'mining',
  'decentralization',
  'cryptocurrency',
  'satoshi',
  'smartcontract',
  'frames',
  'farcaster',
  'stablecoin',
  'memecoin',
  'coinbase',
  'uponly',
  'altcoin'
]

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
  var game: Game | undefined;

  if (isValid) {
    const accountAddress = message.interactor.verified_accounts[0];
    const fid: number = message.interactor.fid;

    await connectToDB();
    const word = getRandomWord();
    game = await createNewGame(fid, word);
    console.log(`game ${game.gameId} started: ${word}`);
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Submit',
        },
      ],
      image: `${NEXT_PUBLIC_URL}/api/image/game?guesses=&word=${game?.word}&lifes=${game?.totalLifes}&win=false`,
      input: {
        text: 'Letter',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/game?id=${game?.gameId}`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';

function getRandomWord(): string {
  const index = Math.floor(Math.random() * WORDS.length);
  return WORDS[index];
}
