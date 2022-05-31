function LoadingScreen(): JSX.Element {
  return (
    <div
      style={{
        position: 'fixed',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        zIndex: '999999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.8)',
      }}
      className="preloader"
    >
      <svg
        style={{
          maxWidth: '25em',
          borderRadius: '3px',
          background: 'rgba(255, 255, 255, 0.8)',
          fill: 'none',
          stroke: '#131212',
          strokeLinecap: 'round',
          strokeWidth: '12%',
        }}
        viewBox="-2000 -1000 4000 2000"
      >
        <path id="inf" d="M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z"></path>
        <use strokeDasharray="1570 5143" strokeDashoffset="6713px"></use>
      </svg>
    </div>
  );
}

export default LoadingScreen;
