import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { connectToDB } from '../../services/database.services';
import { createNewGame } from '../../services/games.services';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    const accountAddress = message.interactor.verified_accounts[0];
    const fid: number = message.interactor.fid;

    await connectToDB();
    const game = await createNewGame(fid, 'hangman');
    console.log(game.gameId);
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Submit',
        },
      ],
      image: `${NEXT_PUBLIC_URL}/api/image/game?guesses=&word=hello&lifes=5`,
      input: {
        text: 'Letter',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
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