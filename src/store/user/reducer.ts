import {IUserState} from "./types";
import UserState from './state'
import {GET_AD_INFO_SUCCESS} from "./action-types";

export function UserReducer(state: IUserState = UserState, action: any): IUserState {
    switch (action.type) {
        case GET_AD_INFO_SUCCESS: {
            return {
                ...state,
                error: false,
                ...action.items
            }
        }
        default: return state;
    }
}