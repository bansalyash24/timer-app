import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import TimerCreationForm from "./components/TimerCreationForm";
import TimerList from "./components/TimerList";
import TimerHistory from "./components/TimerHistory";
import TimerModal from "./components/TimerModal";

function App() {
  const [timers, setTimers] = useState([]);
  const [history, setHistory] = useState([]);
  const [modalInfo, setModalInfo] = useState(null);

  useEffect(() => {
    const storedTimers = JSON.parse(localStorage.getItem("timers")) || [];
    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setTimers(storedTimers);
    setHistory(storedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const addTimer = (newTimer) => {
    setTimers((prev) => [...prev, newTimer]);
  };

  const updateTimer = (updatedTimer) => {
    setTimers((prev) =>
      prev.map((timer) => (timer.id === updatedTimer.id ? updatedTimer : timer))
    );
  };

  const completeTimer = (completedTimer) => {
    setTimers((prev) => prev.filter((timer) => timer.id !== completedTimer.id));
    setHistory((prev) => [
      ...prev,
      { name: completedTimer.name, completedAt: new Date().toLocaleString() },
    ]);
    setModalInfo({ name: completedTimer.name });
  };

  const clearModal = () => setModalInfo(null);

  return (
    <div className="container">
      <nav className="top-nav">
        <div className="nav-logo">
          <div className="brand-icon" />
          <span className="brand-text">HealthFlex</span>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/history">History</Link>
        </div>
        <button className="contact-button">Contact</button>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <TimerCreationForm addTimer={addTimer} />
              <TimerList
                timers={timers}
                updateTimer={updateTimer}
                completeTimer={completeTimer}
                setTimers={setTimers}
              />
            </>
          }
        />
        <Route path="/history" element={<TimerHistory history={history} />} />
      </Routes>
      {modalInfo && <TimerModal info={modalInfo} onClose={clearModal} />}
    </div>
  );
}

export default App;
