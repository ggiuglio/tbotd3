import { SET_STAGE, SET_LEVEL, LOAD_GAME, SET_PCS, SET_ACTIVE_PCS, SET_NPCS, END_TURN, ADD_LOG_ENTRY, 
    SET_CHAR_LIVE_STATS, TOGGLE_CHAR_SHEET, TOGGLE_INVENTORY, ORDER_CHARACTER_BY_INITIATIVE, 
    SET_CHARACTER_INITIATIVE, CLOSE_CHAR_SHEET, CLOSE_INVENTORY } from '../actions/actionsTypes'

export const INITIAL_STATE = {
    stage: null,
    level: null,
    activeCharacter: null,
    gamePCs: [],
    logMessages: [],
    characterList: [],
    charSheet: {
        open: false,
        onTop: false
    },
    inventory: {
        open: false,
        onTop: false
    }
};


const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_GAME:
        {
            return INITIAL_STATE
        }
        case SET_PCS:
        {
            return {...state, ...{gamePCs: action.payload} }
        }
        case SET_STAGE:
        {
            return {...state, ...{stage: action.payload} }
        }
        case SET_LEVEL:
        {
            return {...state, ...{level: action.payload} }
        }
        case SET_ACTIVE_PCS:
        {
            const characterList = JSON.parse(JSON.stringify(state.characterList));
            const activePCs = state.gamePCs.filter((char) => {
                return action.payload.includes(char.id) ? true : false;
            });
            characterList.push(...activePCs);

            return {...state, ...{characterList: characterList} }
        }
        case SET_NPCS:
        {
            const characterList = JSON.parse(JSON.stringify(state.characterList));
            characterList.push(...action.payload);
            
            return {...state, ...{characterList: characterList} }
        }
        case ADD_LOG_ENTRY:
        {
            const messages = JSON.parse(JSON.stringify(state.logMessages));
            messages.push(action.payload);
            
            return {...state, ...{logMessages: messages}}
        }
        case SET_CHARACTER_INITIATIVE:
        {
            const characterList = JSON.parse(JSON.stringify(state.characterList));
            characterList.map(char => {
                if (char.id === action.payload.id) {
                    char.initiative = action.payload.initiative;
                }
                return char;
            }); 
            return {...state, ...{characterList: characterList} }
        }
        case ORDER_CHARACTER_BY_INITIATIVE: {
            const characterList = JSON.parse(JSON.stringify(state.characterList));                
            characterList.sort((a, b) => {
                    if (a.initiative > b.initiative || 
                        (a.initiative === b.initiative && a.liveStats.dexBonus >= b.liveStats.dexBonus)) {
                            return -1;
                    } else return 1
                });
            
            return {...state, ...{characterList: characterList, activeCharacter: characterList[0]} }
        }
        case SET_CHAR_LIVE_STATS: {
            const characterList = JSON.parse(JSON.stringify(state.characterList));                
            characterList.forEach(char => {
                if (char.id === action.payload.id) {
                    char.liveStats = action.payload.stats
                }
            });
            return {...state, ...{characterList: characterList} }
        }
        case END_TURN: {
            let activeCharacter = null;
            state.characterList.forEach((char, i) => {
                if (char.id === state.activeCharacter.id) {
                    if (i < state.characterList.length - 1) {
                        activeCharacter =state.characterList[i + 1];
                    } else activeCharacter = state.characterList[0];
                }
            });
            return {...state, ...{activeCharacter: activeCharacter} }
        }

        case TOGGLE_CHAR_SHEET: {
            const charSheet = {
                open: state.charSheet.open && state.charSheet.onTop ? false : true,
                onTop: state.charSheet.open && (state.charSheet.onTop) ? false : true
            }
            const inventory = {
                open: state.inventory.open,
                onTop: !charSheet.onTop
            }
            return {...state, ...{charSheet: charSheet, inventory: inventory} }
        }
        case TOGGLE_INVENTORY: {
            const inventory = {
                open: state.inventory.open && state.inventory.onTop ? false : true,
                onTop: state.inventory.open && state.inventory.onTop ? false : true
            }
            const charSheet = {
                open: state.charSheet.open,
                onTop: !inventory.onTop
            }
            return {...state, ...{inventory: inventory, charSheet: charSheet} }
        }
        case CLOSE_CHAR_SHEET: {
            const charSheet = {
                open: false,
                onTop: false
            }
            return {...state, ...{charSheet: charSheet}}
        }
        case CLOSE_INVENTORY: {
            const inventory = {
                open: false,
                onTop: false
            }
            return {...state, ...{inventory: inventory}}
        }

        default: 
            return state
    }
}

export default Reducer