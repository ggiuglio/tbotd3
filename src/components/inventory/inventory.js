import React from 'react';
import "./inventory.css"

const Inventory = ({char, onTop, closeInventory}) => {
  const inventoryClass = onTop ? 'inventoryOnTop' : 'inventory';

  return (
    <div className = {inventoryClass} >
      <div className="inventoryContent">
          <div className="header">
            <div className="title">INVENTORY</div>
            <div className="close" onClick={() => closeInventory()}>X</div>
          </div>
        </div>
    </div>
  )
}

export default Inventory;