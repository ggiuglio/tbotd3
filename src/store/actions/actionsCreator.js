import axios from 'axios';
import store from '../store';
import { D20Math } from '../../gameFunctions/d20Math';

import { stages } from "../../firebase/firbase.js"
import { games } from "../../firebase/firbase.js"


import { SET_STAGE, LOAD_GAME } from './actionsTypes.js'
import { SET_PCS } from './actionsTypes.js'
import { checkServerIdentity } from 'tls';


export const loadGame = () => {
  return dispatch => {
    dispatch({
      type: LOAD_GAME,
      payload: null
    });
    games.on('value', snapshot => {
      const game = JSON.parse(JSON.stringify(snapshot.val()));
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
      const res = JSON.parse(JSON.stringify(snapshot.val()[stageId]));
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
      const res = JSON.parse(JSON.stringify(snapshot.val()[stageId].levels[levelId]));
      const level = {
        map: res.map,
        id: levelId
      };
      const pcs = res.pcTeam;
      const npcs = res.npcTeams.reduce((charList, team) => {
        team.characters.forEach(element => {
          element.team = team.name;
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

      dispatch(loadCharactesLiveStats());
      dispatch(rollInitiatives());
    });
  }
}

export const loadCharactesLiveStats = () => {
  return (dispatch, getState) => {
    getState().characterList.forEach( char => {
      dispatch(calculateLiveStats(char));
    });
  }
}

export const rollInitiatives = () => {
  return (dispatch, getState) => {
    getState().characterList.forEach( char => {
        const init = char.liveStats.dexBonus + D20Math.rollD20();
        dispatch({
          type: 'SET_CHARACTER_INITIATIVE',
          payload: { id: char.id, initiative: init }
        })
        dispatch({
          type: "ADD_LOG_ENTRY",
          payload: `${char.name} rolls initiative: ${init}`
        });
    });

    dispatch({
      type: "ORDER_CHARACTER_BY_INITIATIVE"
    })
  }
}

export const calculateLiveStats = (char) => {
  //TODO will need to be updated when equipment and spells will be implemented
  return (dispatch) => {
    const liveStats = {
        str: char.stats.str,
        dex: char.stats.dex,
        con: char.stats.con,
        int: char.stats.int,
        wis: char.stats.wis,
        cha: char.stats.cha,
        strBonus: D20Math.calculateStatsBonus(char.stats.str),
        dexBonus: D20Math.calculateStatsBonus(char.stats.dex),
        conBonus: D20Math.calculateStatsBonus(char.stats.con),
        intBonus: D20Math.calculateStatsBonus(char.stats.int),
        wisBonus: D20Math.calculateStatsBonus(char.stats.wis),
        chaBonus: D20Math.calculateStatsBonus(char.stats.cha),
        armorClass: 13,
        hp: char.stats.hp,
        hpLost: char.liveStats && char.liveStats.hpLost ? char.liveStats.hpLost : 0
    };

    liveStats.savingThrows = {
      reflex: char.stats.baseSavingThrows.reflex + liveStats.dexBonus,
      fortitude: char.stats.baseSavingThrows.fortitude + liveStats.conBonus,
      will: char.stats.baseSavingThrows.will + liveStats.wisBonus
    }

    dispatch({
      type: "SET_CHAR_LIVE_STATS",
      payload: { id: char.id, stats: liveStats}
    })
  }
}






  
  