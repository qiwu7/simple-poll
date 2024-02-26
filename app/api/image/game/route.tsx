import { ImageResponse } from '@vercel/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // ?word=<word>&guesses=<guesses>&lifes=<lifes>&win=<win>
  const word = searchParams.get('word');
  const guesses = searchParams.get('guesses')?.split('');
  const lifesLeft = Number(searchParams.get('lifes'));
  const win = searchParams.get('win') === 'true' ? true : false;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <svg width="75" viewBox="0 0 75 65" fill="#000" style={{ margin: '0 75px' }}>
          <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
        </svg>
        <div style={{ display: 'flex', marginTop: 40 }}>Lifes: {lifesLeft}</div>
        <div style={{ display: 'flex'}}>
          <h1>
            {word?.split('').map((letter, index) => {
              return <div key={index}>{(guesses?.includes(letter) ? letter : '_') + ' '}</div>;
            })}
          </h1>
        </div>
        <div style={{ display: 'flex' }}>
          {guesses?.join(', ')}
        </div>
        <div style={{ display: 'flex', marginTop: 40 }}>
          <span tw="text-indigo-600">{gameState(win, lifesLeft)}</span>
        </div>
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
