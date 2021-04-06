import {ICurrencyState} from './types'
import CurrencyState from './state'
import {SET_CURRENCY_SUCCESS} from "./actionTypes";

export function CurrencyReducer(state: ICurrencyState = CurrencyState, action: any): ICurrencyState {
    switch (action.type) {
        case SET_CURRENCY_SUCCESS: {
            return {
                ...state,
                loading: false,
                items: action.value
            }
        }
        default: return state;
    }
}