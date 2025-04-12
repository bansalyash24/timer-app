import React, { useState } from "react";
import '@/styles/components/TimerCreationForm.css';

const TimerCreationForm = ({ showCreationForm, onClose, addTimer }) => {
  const [name, setName] = useState("");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [category, setCategory] = useState("");

  if (!showCreationForm) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || hours === "" || minutes === "" || seconds === "") {
      alert("Please fill in all fields");
      return;
    }

    if (!validateTime(hours, minutes, seconds)) {
      return;
    }

    const totalDurationInSeconds = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds);

    const newTimer = {
      id: Date.now(),
      name,
      duration: totalDurationInSeconds,
      remaining: totalDurationInSeconds,
      category,
      status: "Paused",
    };

    addTimer(newTimer);
    resetForm();
    onClose();
  };

  const validateTime = (hours, minutes, seconds) => {
    if (parseInt(hours) > 99 || parseInt(minutes) > 99 || parseInt(seconds) > 99) {
      alert("Time input should be in HH:MM:SS format, with each component less than or equal to 99.");
      return false;
    }
    return true;
  };

  const handleNumberInputChange = (setter) => (e) => {
    let value = e.target.value;
    if (value.toString().length > 2) value = value.substr(0, 2); // Restrict to two digits
    setter(value);
  };

  const resetForm = () => {
    setName("");
    setHours("");
    setMinutes("");
    setSeconds("");
    setCategory("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className="timer-form">
          <h2 className="form-title">Create New Timer</h2>
          <div className="form-group">
            <label htmlFor="timer-name">Name:</label>
            <input
              id="timer-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Timer Name"
              required
            />
          </div>
          <div className="form-group">
            <label>Time (HH:MM:SS):</label>
            <div className="time-inputs">
              <input
                type="number"
                value={hours}
                onChange={handleNumberInputChange(setHours)}
                placeholder="HH"
                max="99"
                min="0"
                required
              />
              <span>:</span>
              <input
                type="number"
                value={minutes}
                onChange={handleNumberInputChange(setMinutes)}
                placeholder="MM"
                max="99"
                min="0"
                required
              />
              <span>:</span>
              <input
                type="number"
                value={seconds}
                onChange={handleNumberInputChange(setSeconds)}
                placeholder="SS"
                max="99"
                min="0"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              required
            />
          </div>
          <button type="submit" className="add-timer-button">Add Timer</button>
        </form>
      </div>
    </div>
  );
};

export default TimerCreationForm;
