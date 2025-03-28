import React from "react";

const TimerModal = ({ info, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Congratulations!</h3>
        <p>{info.name} has completed.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TimerModal;
