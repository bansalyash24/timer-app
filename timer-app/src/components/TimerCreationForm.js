import React, { useState } from "react";

const TimerCreationForm = ({ addTimer }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");

  const validatePositiveNumber = (value) => {
    if (value <= 0) {
      alert("Please enter a positive number for the duration!");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !duration || !category) {
      alert("Please fill in all fields");
      return;
    }

    if (!validatePositiveNumber(duration)) {
      return;
    }

    const newTImer = {
      id: Date.now(),
      name,
      duration: parseInt(duration, 10),
      remaining: parseInt(duration, 10),
      category,
      status: "Paused",
    };
    addTimer(newTImer);
    setName("");
    setDuration("");
    setCategory("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="timer-form">
        <h2>Add timer</h2>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Workout Timer"
            required
          />
        </div>
        <div>
          <label>Duration (seconds): </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => {
              const value = e.target.value;
              setDuration(value);
              if (value && value <= 0) {
                alert("Please enter a positive number!");
              }
            }}
            required
          />
        </div>
        <div>
          <label>Category: </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Workout"
            required
          />
        </div>
        <button type="submit">Add Timer</button>
      </form>
    </div>
  );
};

export default TimerCreationForm;
