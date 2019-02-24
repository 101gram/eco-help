import {
    UserActions,
    defaultPayload
} from '@actions/user';

import {UserStateType} from  './../actions/user';

const initialState = {
    ...defaultPayload
};

export default function userReducer(state = initialState, action: UserActions) {
    const data = action.payload;
    switch (action.type) {
        case UserStateType.AuthRequest:
        case UserStateType.RegisterRequest: {
            return {
                ...state, 
                isFetching: data.isFetching
            };
        }
        case UserStateType.AuthSuccess:
        case UserStateType.RegisterSuccess: {
            return {
                ...state, 
                isFetching:  data.isFetching,
                token:       data.token,
                currentUser: data.currentUser
            };
        }
        case UserStateType.Logout: {
            return {
                ...initialState
            };
        }
        default: {
            return state;
        }
    }
}