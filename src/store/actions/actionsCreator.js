import axios from 'axios';
import { stages } from "../../firebase/firbase.js"
import { games } from "../../firebase/firbase.js"


import { SET_STAGE } from './actionsTypes.js'
import { SET_PCS } from './actionsTypes.js'


export const loadGame = () => {
  return dispatch => {
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
        map: res.map,
        name: res.name
      };
      const pcs = res.pcTeam;
      const npcs = res.npcTeams.reduce((charList, team) => {
        team.characters.forEach(element => {
          charList.push(element);
        });
        return charList;
      }, []);

      dispatch({
        type: "SET_STAGE",
        payload: stage
      });
      dispatch({
        type: "SET_ACTIVE_PCS",
        payload: pcs
      });
      dispatch({
        type: "SET_NPCS",
        payload: npcs
      })
    });
  }
}







  
  