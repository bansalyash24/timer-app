import React from "react";
import TimerItem from "@/components/TimerItem";
import "@/styles/components/TimerList.css";

const TimerList = ({ timers, updateTimer, completeTimer, setTimers }) => {
  const categorizedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) acc[timer.category] = [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const handleCategoryControl = (category, action) => {
    const updatedTimers = timers.map((timer) => {
      if (timer.category === category) {
        switch (action) {
          case "pause":
            return { ...timer, status: "Paused" };
          case "start":
            return { ...timer, status: "Running" };
          case "reset":
            return { ...timer, remaining: timer.duration, status: "Paused" };
          default:
            return timer;
        }
      }
      return timer;
    });
    setTimers(updatedTimers);
  };

  return (
    <div className="timer-list-container">
      <h2 className="title">Timers</h2>
      {Object.keys(categorizedTimers).length==0 && 'No Timers'}
      {Object.keys(categorizedTimers).map((category) => (
        <div key={category} className="category-section">
          <div className="category-header">
            <h3>Category : {category}</h3>
            <div className="category-controls">
              <button
                className="control-btn start"
                onClick={() => handleCategoryControl(category, "start")}
              >
                Start All
              </button>
              <button
                className="control-btn pause"
                onClick={() => handleCategoryControl(category, "pause")}
              >
                Pause All
              </button>
              <button
                className="control-btn reset"
                onClick={() => handleCategoryControl(category, "reset")}
              >
                Reset All
              </button>
            </div>
          </div>

          <div className="timer-grid">
            {categorizedTimers[category].map((timer) => (
              <TimerItem
                key={timer.id}
                timer={timer}
                updateTimer={updateTimer}
                completeTimer={completeTimer}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimerList;
