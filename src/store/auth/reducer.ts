import {IAuthState} from './types'
import AuthState from './state'
import {
    AUTH_USER,
    AUTH_USER_ERROR,
    AUTH_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS
} from "./action-types";

export function AuthReducer(state: IAuthState = AuthState, action: any): IAuthState {
    switch (true) {
        case action.type === REGISTER_USER || action.type === AUTH_USER: {
            return {
                ...state,
                loading: true,
                error: false,
                isAuth: false
            }
        }
        case action.type === AUTH_USER_SUCCESS || action.type === REGISTER_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                isAuth: true,
                userInfo: action.value
            }
        }
        case action.type === REGISTER_USER_ERROR || action.type === AUTH_USER_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                isAuth: false
            }
        }
        default: return state;
    }
}