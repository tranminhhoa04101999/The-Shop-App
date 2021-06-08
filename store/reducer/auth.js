import { SIGNUP, LOGIN,AUTHENTICATE } from "../action/auth";

const initialAuth = {
    token: null,
    userId: null
};

export default (state = initialAuth, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId : action.userId,
            };
        case SIGNUP:
            return {
                token: action.token,
                userId : action.userId,
            };
        default:
            return state;
    }
};