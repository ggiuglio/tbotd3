import React, { Component } from "react";
import { connect } from "react-redux";
import { loadGame } from "../store/actions/actionsCreator.js";
import { bindActionCreators } from "redux";
import ActionLogConsole from "../components/actionLogConsole/actionLogConsole";

class GameContainer extends Component {
  componentDidMount () {
    this.props.loadGame();
  }

  handleClick() {
    this.props.loadGame();
  }

  render() {
    const characters = this.props.characters.map(c => {
        return <div key={c.id}> name: {c.name}</div>
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    characters: state.characterList,
    stage: state.stage,
    level: state.level,
    logs: state.logMessages
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadGame
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);