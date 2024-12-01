const initialState = {
    itemCount: 0
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CART_ITEMS_COUNT':
            return {
                ...state,
                itemCount: action.payload
            };
        default:
            return state;
    }
};

export default cartReducer;
