import React, { Component } from "react";
import { connect } from "react-redux";
import { loadGame, endTurn, toggleCharSheet, toggleInventory, closeCharSheet, closeInventory } from "../store/actions/actionsCreator.js";
import { bindActionCreators } from "redux";
import ActionLogConsole from "../components/actionLogConsole/actionLogConsole";
import CharacterSheet from "../components/characterSheet/characterSheet";
import Inventory from "../components/inventory/inventory";
import ControlDashBoard from "../components/controlDashboard/controlDashboard"

class GameContainer extends Component {
  componentDidMount () {
    this.props.loadGame();
  }

  handleClick() {
    this.props.loadGame();
  }

  render() {
    const characters = this.props.characters.map(c => {
      return <div key={c.id}> name: {c.name}, - initiative: {c.initiative}</div>
    });
    const stageName = this.props.stage ? this.props.stage.name : "Loading";
    const level = this.props.level ? ` - ${this.props.level.id + 1} ${this.props.level.map}` : "";
    const charOnTop = this.props.charSheet.onTop ? "char sheet ontop": '';
    const invOnTop = this.props.inventory.onTop ? "inventory ontop": '';

    const charSheetTemplate = this.props.activeCharacter && this.props.charSheet.open ? 
    <CharacterSheet char = {this.props.activeCharacter} onTop = {this.props.charSheet.onTop} 
      closeCharSheet = {this.props.closeCharSheet}> 
    </CharacterSheet> : '';

    const inventoryTemplate = this.props.activeCharacter && this.props.inventory.open ?
    <Inventory char = {this.props.activeCharacter} onTop = {this.props.inventory.onTop} 
      closeInventory = {this.props.closeInventory}> 
    </Inventory> : '';

    return (
      <div>
        TBODT 3 (quella buona)
        <div>
          {stageName} {level}
        </div>
       
        <div>
          characters
        </div>
        <div>
          {characters}
        </div>
        <div onClick={(e) => this.handleClick(e)} >
          RELOAD
        </div>
        <ActionLogConsole messages = {this.props.logs}></ActionLogConsole>
        {charSheetTemplate}
        {inventoryTemplate}
        <ControlDashBoard char = {this.props.activeCharacter} endTurn = {this.props.endTurn} 
          toggleCharSheet = {this.props.toggleCharSheet} toggleInventory = {this.props.toggleInventory}>
        </ControlDashBoard>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    characters: state.characterList,
    stage: state.stage,
    level: state.level,
    logs: state.logMessages,
    activeCharacter: state.activeCharacter,
    charSheet: state.charSheet,
    inventory: state.inventory
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadGame,
      endTurn,
      toggleCharSheet,
      toggleInventory,
      closeCharSheet,
      closeInventory
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);