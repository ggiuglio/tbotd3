import React, { Component } from "react";
import { connect } from "react-redux";
import { loadGame, endTurn } from "../store/actions/actionsCreator.js";
import { bindActionCreators } from "redux";
import ActionLogConsole from "../components/actionLogConsole/actionLogConsole";
import CharacterSheet from "../components/characterSheet/characterSheet"
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
        <CharacterSheet></CharacterSheet>
        <ControlDashBoard char = {this.props.activeCharacter} endTurn = {this.props.endTurn}></ControlDashBoard>
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
    activeCharacter: state.activeCharacter
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadGame,
      endTurn
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);