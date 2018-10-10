const INITIAL_STATE = { searchResult: [], error: '' }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SEARCH_SUCCESS" :
            return action.payload;
        default :
            return state;
    }
}