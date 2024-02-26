type Props = {
    lifes: number;
};

const Stickman = (props: Props) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
            <h2>Lives: {props.lifes}</h2>
        </div>
    );
};

export default Stickman;