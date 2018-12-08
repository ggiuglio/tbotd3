import React, { Component } from "react";
import { connect } from "react-redux";
import { loadGame } from "../store/actions/actionsCreator.js";
import { bindActionCreators } from "redux";

class GameContainer extends Component {
  componentDidMount () {
    this.props.loadGame();
  }

  render() {
    const characters = this.props.characters.map(c => {
        return <div key={c.id}> name: {c.name}</div>
    });
    const stageName = this.props.stage ? this.props.stage.name : "Loading";

    return (
      <div>
        TBODT 3 (quella buona)
        <div>
          {stageName}
        </div>
       
        <div>
          characters
        </div>
        <div>
          {characters}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    characters: state.characterList,
    stage: state.stage
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