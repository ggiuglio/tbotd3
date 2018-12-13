import axios from 'axios';
import store from '../store';

import { stages } from "../../firebase/firbase.js"
import { games } from "../../firebase/firbase.js"


import { SET_STAGE, LOAD_GAME } from './actionsTypes.js'
import { SET_PCS } from './actionsTypes.js'


export const loadGame = () => {
  return dispatch => {
    dispatch({
      type: LOAD_GAME,
      payload: null
    });
    games.on('value', snapshot => {
      const game = snapshot.val();
      dispatch({
        type: SET_PCS,
        payload: game.pcs
      });

      dispatch (loadStage(game.stageId));
    });
  }
}

export const loadStage = (stageId) => {
  return dispatch => {
    stages.orderByKey().equalTo(stageId.toString()).on('value', snapshot => {
      const res = snapshot.val()[stageId];
      const stage = {
        id: stageId,
        name: res.name
      };
      dispatch({
        type: "SET_STAGE",
        payload: stage
      });
      dispatch(loadLevel(stageId, 0));
    });
  }
}

export const loadLevel = (stageId, levelId) => {
  return dispatch => {
    stages.orderByKey().equalTo(stageId.toString()).on('value', snapshot => {
      const res = snapshot.val()[stageId].levels[levelId];
      const level = {
        map: res.map,
        id: levelId
      };
      const pcs = res.pcTeam;
      const npcs = res.npcTeams.reduce((charList, team) => {
        team.characters.forEach(element => {
          charList.push(element);
        });
        return charList;
      }, []);

      dispatch({
        type: "SET_LEVEL",
        payload: level
      });
      dispatch({
        type: "SET_ACTIVE_PCS",
        payload: pcs
      });
      dispatch({
        type: "SET_NPCS",
        payload: npcs
      })
      dispatch({
        type: "ADD_LOG_ENTRY",
        payload: "Game loaded"
      })
    });
  }
}







  
  