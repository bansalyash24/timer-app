import React, { useEffect, useRef } from "react";
import "@/styles/components/TimerItem.css";

const TimerItem = ({ timer, updateTimer, completeTimer }) => {
  const timerIntervalRef = useRef(null);
  const currentRemainingRef = useRef(timer.remaining);

  const handleStart = () => {
    if (timer.remaining > 0 && timer.status !== "Running") {
      updateTimer({ ...timer, status: "Running" });
    }
  };

  const handlePause = () => {
    if (timer.status === "Running") {
      updateTimer({ ...timer, status: "Paused" });
    }
  };

  const handleReset = () => {
    clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = null;
    updateTimer({ ...timer, remaining: timer.duration, status: "Paused" });
  };

  const handleTick = () => {
    if (currentRemainingRef.current > 0) {
      const updatedRemaining = currentRemainingRef.current - 1;
      currentRemainingRef.current = updatedRemaining;
      updateTimer({ ...timer, remaining: updatedRemaining });

      if (updatedRemaining === Math.floor(timer.duration / 2)) {
        alert(`⏳ Halfway there for "${timer.name}"!`);
      }
    } else {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
      completeTimer({ ...timer, status: "Completed" });
    }
  };

  useEffect(() => {
    currentRemainingRef.current = timer.remaining;
  }, [timer.remaining]);

  useEffect(() => {
    if (timer.status === "Running" && timerIntervalRef.current === null) {
      timerIntervalRef.current = setInterval(handleTick, 1000);
    }

    if (timer.status !== "Running" && timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    return () => {
      clearInterval(timerIntervalRef.current);
    };
  }, [timer.status]);

  const progressPercent = Math.round(
    ((timer.duration - timer.remaining) / timer.duration) * 100
  );

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  

  return (
    <div className="timer-card">
      <h4 className="timer-title">{timer.name}</h4>
      <p className="timer-remaining">Timer Left ⏱️: {formatTime(timer.remaining)}</p>
      <p className="timer-status">Status: <strong>{timer.status}</strong></p>

      <div className="timer-progress-bar">
        <div className="timer-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="timer-controls">
        <button onClick={handleStart} className="btn start">Start</button>
        <button onClick={handlePause} className="btn pause">Pause</button>
        <button onClick={handleReset} className="btn reset">Reset</button>
      </div>
    </div>
  );
};

export default TimerItem;
