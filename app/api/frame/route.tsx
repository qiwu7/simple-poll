import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

const word = 'hangman';
const lifes = 5;

var guesses = new Set<string>();

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let guessesString = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (message?.input) {
    const letter = message.input.toLowerCase();
    if (isLetter(letter)) {
      guesses.add(letter);
    }
    const guessesArray = Array.from(guesses);
    guessesString = guessesArray.join('');
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Last Guessed Letter: ${guesses}`,
        },
        {
          label: 'Submit',
        },
      ],
      image: `${NEXT_PUBLIC_URL}/api/game?guesses=${guessesString}&word=${word}&lifes=${lifes}`,
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