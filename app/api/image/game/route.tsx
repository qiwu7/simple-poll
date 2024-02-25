import { ImageResponse } from '@vercel/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // ?word=<word>&guesses=<guesses>
  const word = searchParams.get('word') || 'hangman';
  const guesses = searchParams.get('guesses')?.split('') || ['a', 'e'];
  const lifesLeft = Number(searchParams.get('lifes')) || 5;
  const win = searchParams.get('win');
  console.log(`win ${win}, win === true ${win === 'true'}`);

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
        <div style={{ display: 'flex', marginTop: 40 }}>
          {word?.split('').map((letter, index) => {
            return <div key={index}>{(guesses?.includes(letter) ? letter : '_') + ' '}</div>;
          })}
        </div>
        <div style={{ display: 'flex', marginTop: 40 }}>{guesses?.join(', ')}</div>
        <div style={{ display: 'flex', marginTop: 40 }}>Win?: {win}</div>
      </div>
    ),
  );
}
