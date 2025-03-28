import React, { useEffect, useRef } from "react";

const TimerItem = ({ timer, updateTimer, completeTimer }) => {
  const intervalRef = useRef(null);

  const remainingRef = useRef(timer.remaining);

  useEffect(() => {
    remainingRef.current = timer.remaining;
  }, [timer.remaining]);

  useEffect(() => {
    if (timer.status === "Running" && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        tick();
      }, 1000);
    }

    if (timer.status !== "Running" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current);
  }, [timer.status]);

  const tick = () => {
    if (remainingRef.current > 0) {
      const newRemaining = remainingRef.current - 1;
      remainingRef.current = newRemaining;
      updateTimer({ ...timer, remaining: newRemaining });

      if (newRemaining === Math.floor(timer.duration / 2)) {
        alert(`Halfway there for ${timer.name}!`);
      }
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      completeTimer({ ...timer, status: "Completed" });
    }
  };

  const startTimer = () => {
    if (timer.remaining > 0 && timer.status !== "Running") {
      updateTimer({ ...timer, status: "Running" });
    }
  };

  const pauseTimer = () => {
    if (timer.status === "Running") {
      updateTimer({ ...timer, status: "Paused" });
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    updateTimer({ ...timer, remaining: timer.duration, status: "Paused" });
  };

  const progress = Math.round(
    ((timer.duration - timer.remaining) / timer.duration) * 100
  );

  return (
    <div className="timer-item">
      <h4>{timer.name}</h4>
      <p>Remaining: {timer.remaining}s</p>
      <p>Status: {timer.status}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="controls">
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default TimerItem;
