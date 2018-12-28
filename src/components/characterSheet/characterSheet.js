import React from 'react';
import "./characterSheet.css"

const CharacterSheet = ({char, onTop, closeCharSheet}) => {
  const charSheetClass = onTop ? 'charSheetOnTop' : 'charSheet';

  return (
    <div className = {charSheetClass}>
        <div className="charSheetContent">
          <div className="header">
            <div className="title">CHARACTER SHEET</div>
            <div className="close" onClick={() => closeCharSheet()}>X</div>
          </div>
        </div>
    </div>
  )
}

export default CharacterSheet;