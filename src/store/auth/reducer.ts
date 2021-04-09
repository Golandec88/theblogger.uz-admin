import {IAuthState} from './types'
import AuthState from './state'
import {AUTH_USER_SUCCESS, REGISTER_USER_SUCCESS} from "./actionTypes";

export function AuthReducer(state: IAuthState = AuthState, action: any): IAuthState {
    switch (action.type) {
        case AUTH_USER_SUCCESS || REGISTER_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                userInfo: action.value
            }
        }
        default: return state;
    }
}