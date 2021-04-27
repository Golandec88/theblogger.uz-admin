import {IAdminState} from './types'
import AdminState from './state'
import {GET_ADMIN_OFFERS, GET_ADMIN_OFFERS_ERROR, GET_ADMIN_OFFERS_SUCCESS} from "./action-types";

export function AdminReducer(state: IAdminState = AdminState, action: any): IAdminState {
    switch (action.type) {
        case GET_ADMIN_OFFERS : {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case GET_ADMIN_OFFERS_SUCCESS : {
            return {
                ...state,
                offers: action.offers,
                loading: false,
                error: false
            }
        }
        case GET_ADMIN_OFFERS_ERROR : {
            return {
                ...state,
                loading: false,
                error: typeof action.error === "object" ? {
                    code: action.error.code,
                    message: action.error.message
                } : true
            }
        }
        default: return state
    }
}