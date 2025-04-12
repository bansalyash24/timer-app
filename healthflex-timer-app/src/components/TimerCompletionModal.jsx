import React from "react";
import "@/styles/components/TimerCompletionModal.css";

const TimerCompletionModal = ({ timerData, handleClose }) => {
  return (
    <div className="completion-modal-overlay">
      <div className="completion-modal-content">
        <h3 className="modal-title">🎉 Timer Complete!</h3>
        <p className="modal-message">{timerData.name} has finished!</p>
        <button className="modal-close-button" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TimerCompletionModal;
