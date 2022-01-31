import { useCallback, useEffect, useRef, useState } from 'react';

// This is a port of https://github.com/SU-SWS/adapt-my-account/blob/dev/src/hooks/useTimer.ts
export const useTimer = ({
  timeout = 15000,
  tickDuration = 1000,
  autostart = false,
  onTimeout = () => undefined,
}) => {
  const timeoutRef = useRef();
  const tickTimeoutRef = useRef();
  const [isRunning, setIsRunning] = useState(autostart);
  const [elapsedTime, setElapsedTime] = useState(0);

  const clearTicker = () => clearTimeout(tickTimeoutRef.current);
  const clearTimer = () => clearTimeout(timeoutRef.current);
  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      timeoutRef.current = setTimeout(() => {
        onTimeout();
        clearTicker();
        setElapsedTime(timeout);
      }, timeout);
    }
  }, [isRunning, setIsRunning, setElapsedTime, timeout, onTimeout]);

  const stop = useCallback(() => {
    setIsRunning(false);
    clearTicker();
    clearTimer();
  }, [setIsRunning]);

  const reset = useCallback(() => {
    stop();
    setElapsedTime(0);
  }, [stop, setElapsedTime]);

  // elapsedTime/remainingTime
  const getElapsedTime = useCallback(() => elapsedTime, [elapsedTime]);
  const getRemainingTime = useCallback(
    () => timeout - getElapsedTime(),
    [timeout, getElapsedTime]
  );

  // ticker effect
  useEffect(() => {
    if (isRunning && tickDuration) {
      tickTimeoutRef.current = setTimeout(() => {
        setElapsedTime(Math.min(timeout, elapsedTime + tickDuration));
      }, tickDuration);
    }
  }, [isRunning, tickDuration, elapsedTime, setElapsedTime, timeout]);

  // mount effect
  useEffect(() => {
    // Start timer as necessary
    if (autostart) {
      start();
    }

    return () => {
      // Clear any timeouts
      clearTimer();
      clearTicker();
    };
    // NOTE: We only want this check fired on initial mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hook payload
  return {
    start,
    stop,
    reset,
    getElapsedTime,
    getRemainingTime,
    isRunning,
    elapsedTime,
    remainingTime: timeout - elapsedTime,
  };
};
