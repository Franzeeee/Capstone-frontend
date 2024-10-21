import React, { useState, useEffect } from 'react';
import styles from '../assets/css/components/timer.module.css';

export default function TimerComponent({ time = 0, finishedTime  }) {
  const [countdown, setCountdown] = useState(Number(time));

  useEffect(() => {
    // Reset countdown when time prop changes
    setCountdown(Number(time));

    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          finishedTime(); // Callback function when timer finishes
          return 0; // Stop at 0
        }
        return prevCountdown - 1; // Decrement countdown
      });
    }, 1000);

    // Cleanup interval on unmount or when time changes
    return () => clearInterval(timer);
  }, [time]);

  // Format seconds into MM:SS format
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) {
      return '00:00';
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className={styles.timerContainer}>
      <p>Time Left: {formatTime(countdown)}</p>
    </div>
  );
}
