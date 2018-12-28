import React from 'react';
import "./controlDashboard.css"

const ControlDashboard = ({char, endTurn, toggleCharSheet, toggleInventory}) => {
  const handleEndTurn = () => {
    if (char) {
      endTurn();
    }
  }
  const handleToggleCharacterSheet = () => {
    if (char) {
      toggleCharSheet();
    }
  }
  const handleToggleInventory = () => {
    if (char) {
      toggleInventory();
    }
  }

const activeCharName = char ? char.name : "";

  return (
    <div className="dashBoard">
      <div className="lateralCommandBox">
        <span onClick={() => handleToggleCharacterSheet()}> Char </span>
      </div>

      <div className="centralSpace">
        {activeCharName}
      </div>

      <div className="controlBox">
        <span className="button" onClick={() => handleEndTurn()}> END TURN </span>
      </div>

      <div className="lateralCommandBox">
        <span onClick = {() => handleToggleInventory()}> Euip </span>
      </div>
    </div>
  )
}

export default ControlDashboard;