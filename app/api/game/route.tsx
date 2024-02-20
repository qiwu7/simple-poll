import { ImageResponse } from "@vercel/og";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // ?word=<word>&guesses=<guesses>
    const word = searchParams.get('word') || 'hangman';
    const guesses = searchParams.get('guesses')?.split('') || ['a', 'e'];
    const lifes = Number(searchParams.get('lifes')) || 5;

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
                <svg
                    width="75"
                    viewBox="0 0 75 65"
                    fill="#000"
                    style={{ margin: '0 75px' }}
                >
                    <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
                </svg>
                <div style={{display: 'flex', marginTop: 40}}>
                    Lifes: {lifesLeft(word, guesses, lifes)}
                </div>
                <div style={{display: 'flex', marginTop: 40}}>
                    {word?.split('').map((letter, index) => {
                        return (
                            <div key={index}>
                                {guesses?.includes(letter) ? letter : '_'}
                            </div>
                        );
                    })}
                </div>
                <div style={{ display: 'flex', marginTop: 40 }}>
                    {guesses?.join(', ')}
                </div>
            </div>

        )
    );
}

function lifesLeft(word: string, guesses: string[], lifes: number) {
    let lifesLeft = lifes;
    const wordSet = new Set(word.split(''));
    for (const guess of guesses) {
        if (!wordSet.has(guess)) {
            lifesLeft--;
        }
    }

    return lifesLeft;
}