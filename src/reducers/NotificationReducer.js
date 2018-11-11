const INITIAL_STATE = { notification: [] }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "GET_CART_QUANTITY" :
            return action.payload;
        default : 
            return state;
    }
}