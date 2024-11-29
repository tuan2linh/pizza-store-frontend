import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT, FETCH_USER_REGISTER_SUCCESS } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        token: '',
        refreshToken: '',
        role: '',
        username: '',
        isAuthenticated: false,
    },
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_REGISTER_SUCCESS:
            return {
                ...state, 
                account: {
                    token: action?.payload?.token,
                    refreshToken: action?.payload?.refreshToken,
                    role: action?.payload?.role,
                    username: action?.payload?.username,
                    isAuthenticated: true
                },
            };
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, 
                account: {
                    token: action?.payload?.token,
                    refreshToken: action?.payload?.refreshToken,
                    role: action?.payload?.role,
                    username: action?.payload?.username,
                    isAuthenticated: true
                },
            };
        case USER_LOGOUT:
            return {
                ...state,
                account: {
                    token: '',
                    refreshToken: '',
                    role: '',
                    username: '',
                    isAuthenticated: false
                }
            };
        default:
            return state;
    }
};

export default userReducer;