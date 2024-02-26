const Logo = () => {
    return (
      <div
        style={{
          left: 42,
          top: 42,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <svg
          height={20}
          viewBox="0 0 75 65"
          fill="black"
        >
          <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
        </svg>
        <span
          style={{
            marginLeft: 8,
            fontSize: 20,
          }}
        >
          Hangman
        </span>
      </div>
    );
}

export default Logo;