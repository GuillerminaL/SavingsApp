import classes from './LoadingSpinner.module.css';

function LoadingSpinner() {
  return (
    <div className={classes.grid}>
      <div className={classes.loadingio}>
      <div className={classes.ldio}>
        <div></div>
      </div>
    </div>
    </div>
  );
}

export default LoadingSpinner;

  // <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: auto, background: rgb(241, 242, 243), display: block, shapeRendering: auto, animationPlayState: running, animationDelay: _0s,}} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  //   <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#85a2b6" stroke="none" style={{animationPlayState: running, animationDelay: _0s,}}>
  //     <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51" style={{animationPlayState: running, animationDelay: _0s}}></animateTransform>
  //   </path>
  // </svg>