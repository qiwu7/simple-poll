type Props = {
    win: boolean;
    lifesLeft: number;
    word?: string;
    guesses?: string[];
};

const Guesses = (props: Props) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
            <h1>
                {props.word?.split('').map((letter, index) => {
                    return <div key={index}>{(props.guesses?.includes(letter) ? letter : '_') + ' '}</div>;
                })}
            </h1>
            <div style={{ display: 'flex' }}>
                {props.guesses?.join(', ')}
            </div>
            <div style={{ display: 'flex', marginTop: 40 }}>
                <span tw="text-indigo-600">{gameState(props.win, props.lifesLeft)}</span>
            </div>
        </div>
    );
};

function gameState(win: boolean, lifeLeft: number): string {
  if (win) {
    return 'You won';
  } else if (lifeLeft <= 0) {
    return 'You lost';
  } else {
    return 'Keep guessing...';
  }
}

export default Guesses;