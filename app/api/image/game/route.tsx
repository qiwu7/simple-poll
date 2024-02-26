import { ImageResponse } from '@vercel/og';
import { NEXT_PUBLIC_URL } from '../../../config';
import Logo from './Logo';
import Stickman from './Stickman';
import Guesses from './Guesses';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // ?word=<word>&guesses=<guesses>&lifes=<lifes>&win=<win>
  const word = searchParams.get('word') || '';
  const guesses = searchParams.get('guesses')?.split('') || [];
  const lifesLeft = Number(searchParams.get('lifes'));
  const win = searchParams.get('win') === 'true' ? true : false;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <Logo />
        <Stickman lifes={lifesLeft}/>
        <Guesses win={win} lifesLeft={lifesLeft} word={word} guesses={guesses}/>
      </div>
    ),
  );
}

function gameState(win: boolean, lifeLeft: number): string {
  if (win) {
    return 'You won';
  } else if (lifeLeft <= 0) {
    return 'You lost';
  } else {
    return 'Keep guessing...';
  }
}
