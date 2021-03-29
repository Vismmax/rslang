import React, { useState, useEffect, useCallback } from 'react';
import { useInterval } from './useInterval';

export const useTimer = (maxTime: number) => {
  // const [delay, setDelay] = useState<number | null>(1000);
  const delay = 1000;
  const [isRunning, setIsRunning] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    console.log('useEffect');
    setIsRunning(true);
  }, []);

  useInterval(
    () => {
      console.log('UseTimer time: ', time);
      setTime(time + delay / 1000);
    },
    isRunning ? delay : null,
  );

  const startTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  return { time, startTimer, stopTimer };
};
