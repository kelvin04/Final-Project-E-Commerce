const INITIAL_STATE = { searchResult: [], error: '' }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "PRODUCT_NOT_FOUND" :
            return action.payload;
        case "SEARCH_SUCCESS" :
            return action.payload;
        default :
            return state;
    }
}