
const defaultState = {
  stockData: []
}


const reducer = ( state = defaultState, action={} ) => {
    switch ( action.type ) {
        case 'SAVE_STOCKDATA':
            return {
                ...state,
                stockData: action.payload
            };
        case 'REMOVE_STOCKDATA':
            return {
                ...state,
                 stockData: action.payload
            };
        default:
            return state;
    }
};

export default reducer;