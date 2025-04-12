import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "@/pages/Home";
import '@/App.css';
import TimerHistory from "@/pages/TimerHistory";
import TimerCompletionModal from "@/components/TimerCompletionModal";

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
    <div className="app-container">
      <Nav />
      
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                addTimer={addTimer}
                timers={timers}
                updateTimer={updateTimer}
                completeTimer={completeTimer}
                setTimers={setTimers}
              />
            }
          />
          <Route path="/history" element={<TimerHistory history={history} />} />
        </Routes>
      </main>

      {modalInfo && (
        <TimerCompletionModal
          timerData={modalInfo}
          handleClose={clearModal}
        />
      )}
    </div>
  );
}

const Nav = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <span className="brand-name">HealthFlex</span>
    </div>
    <div className="navbar-links">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/history" className="nav-link">
        History
      </Link>
    </div>
  </nav>
);

export default App;
