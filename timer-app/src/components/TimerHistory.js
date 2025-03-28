import React from "react";

const TimerHistory = ({ history }) => {
  return (
    <div className="timer-history">
      <h2>Timer History</h2>
      {history.length === 0 ? (
        <p>No Completed timers yet</p>
      ) : (
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              {entry.name} - Completed at {entry.completedAt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimerHistory;
