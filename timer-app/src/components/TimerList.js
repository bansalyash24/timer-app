import React from "react";
import TimerItem from "./TimerItem";

const TimerList = ({ timers, updateTimer, completeTimer, setTimers }) => {
  const grouped = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const handleBulkAction = (category, action) => {
    const updatedTimers = timers.map((timer) => {
      if (timer.category === category) {
        if (action === "start") {
          return { ...timer, status: "Running" };
        } else if (action === "pause") {
          return { ...timer, status: "Paused" };
        } else if (action === "reset") {
          return { ...timer, remaining: timer.duration, status: "Paused" };
        }
      }
      return timer;
    });
    setTimers(updatedTimers);
  };
  return (
    <div className="timer-list">
      <h2>Timers</h2>
      {Object.keys(grouped).map((category) => (
        <div key={category} className="category-group">
          <h3>{category}</h3>
          <div className="bulk-actions">
            <button onClick={() => handleBulkAction(category, "start")}>
              Start all
            </button>
            <button onClick={() => handleBulkAction(category, "pause")}>
              Pause all
            </button>
            <button onClick={() => handleBulkAction(category, "reset")}>
              Reset all
            </button>
          </div>
          {grouped[category].map((timer) => (
            <TimerItem
              key={timer.id}
              timer={timer}
              updateTimer={updateTimer}
              completeTimer={completeTimer}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimerList;
