import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';

import classes from './LoadingProgress.module.scss';

const LoadingProgress = () => {
  const isLoading = useSelector((state) => state.isLoading);
  const tickets = useSelector((state) => state.tickets);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          if (newProgress >= 100) {
            clearInterval(intervalId);
            return 100;
          }
          return newProgress;
        });
      }, 100);
      return () => clearInterval(intervalId);
    } else {
      setProgress(100);
    }
  }, [isLoading, tickets]);

  return (
    <div className={classes.wrapper}>
      <LoadingBar
        color="#2196f3"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        shadow={false}
        height={6}
        containerClassName={classes['loading-progress']}
        waitingTime={700}
      />
      <span>{isLoading ? 'Загружаем билеты...' : null}</span>
    </div>
  );
};

export default LoadingProgress;
