import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
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