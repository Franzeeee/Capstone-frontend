import React, { useState, useEffect, useRef } from 'react';
import styles from '../assets/css/components/timer.module.css';

export default function TimerComponent({ time = 0, finishedTime, pause, onPause,id }) {
  const [countdown, setCountdown] = useState(Number(time));
  const timerRef = useRef(null);

  useEffect(() => {
    setCountdown(Number(time));

    // Start the timer if not paused
    if (!pause) {
      timerRef.current = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timerRef.current);
            finishedTime(); // Callback when timer finishes
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    // Cleanup on unmount or when time changes
    return () => clearInterval(timerRef.current);
  }, [time, pause]);

  // Pause the timer and return remaining time
  useEffect(() => {
    if (pause && timerRef.current) {
      clearInterval(timerRef.current);
      if (onPause) {
        onPause(countdown); // Callback to send remaining time when paused
      }
    }
  }, [pause, countdown, onPause]);

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) {
      return '00:00';
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className={styles.timerContainer}id={id}>
      <p>Time Left: {formatTime(countdown)}</p>
    </div>
  );
}
