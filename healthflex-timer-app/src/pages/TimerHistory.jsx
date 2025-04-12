import React from "react";
import "@/styles/pages/TimerHistory.css";

function TimerHistory({ history }) {
  const exportToJSON = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "timer-history.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>⏱️ Timer History</h2>
        {history.length > 0 && (
          <button className="export-button" onClick={exportToJSON}>
            Export JSON
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <p className="no-history">No timers completed yet.</p>
      ) : (
        <ul className="history-list">
          {history.map((entry, index) => (
            <li key={index} className="history-entry">
              <span className="entry-name">{entry.name}</span>
              <span className="entry-time">Completed at: {entry.completedAt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TimerHistory;
