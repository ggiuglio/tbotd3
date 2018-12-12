export const INITIAL_STATE = {
    stage: null,
    level: null,
    gamePCs: [],
    characterList: []
};


const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_PCS':
        {
            return {...state, ...{gamePCs: action.payload} }
        }
        case 'SET_STAGE':
        {
            return {...state, ...{stage: action.payload} }
        }
        case 'SET_LEVEL':
        {
            return {...state, ...{level: action.payload} }
        }
        case 'SET_ACTIVE_PCS':
        {
            const characterList = JSON.parse(JSON.stringify(state.characterList));
            const activePCs = state.gamePCs.filter((char) => {
                return action.payload.includes(char.id) ? true : false;
            });
            characterList.push(...activePCs);

            return {...state, ...{characterList: characterList} }
        }
        case 'SET_NPCS':
        {
            const characterList = JSON.parse(JSON.stringify(state.characterList));
            characterList.push(...action.payload);
            
            return {...state, ...{characterList: characterList} }
        }



       
   

        default: 
            return state
    }
}

export default Reducer