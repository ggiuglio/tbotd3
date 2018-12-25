import React from 'react';
import "./controlDashboard.css"

const ControlDashboard = ({char, endTurn}) => {
  const handleEndTurn = () => {
    if (char) {
      endTurn();
    }
  }

const activeCharName = char ? char.name : "";

  return (
    <div className="dashBoard">
      <div className="lateralCommandBox">
        Character sheet
      </div>

      <div className="centralSpace">
        {activeCharName}
      </div>

      <div className="controlBox">
        <span className="button" onClick={() => handleEndTurn()}> END TURN </span>
      </div>

      <div className="lateralCommandBox">
        Equipment
      </div>
    </div>
  )
}

export default ControlDashboard;