import {IAdvertisersState} from './types'
import {
    GET_ADVERTISER_OFFERS,
    GET_ADVERTISER_OFFERS_SUCCESS,
    GET_ADVERTISER_OFFERS_ERROR, GET_ADVERTISER_DEALS, GET_ADVERTISER_DEALS_SUCCESS,
} from "./action-types";
import AdvertisersState from './state'

type Action = {
    type: string,
    offers: {
        list: [],
        pagination: {}
    },
    deals: {
        list: [],
        pagination: {}
    },
    error: {
        code: number,
        message: string
    } | boolean
}

export function AdvertisersReducer (state: IAdvertisersState = AdvertisersState, action: Action) :IAdvertisersState {
    switch (action.type) {
        case GET_ADVERTISER_OFFERS : {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case GET_ADVERTISER_OFFERS_SUCCESS : {
            return {
                ...state,
                offers: action.offers,
                loading: false,
                error: false
            }
        }
        case GET_ADVERTISER_DEALS : {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case GET_ADVERTISER_DEALS_SUCCESS : {
            return {
                ...state,
                deals: action.deals,
                loading: false,
                error: false
            }
        }
        case GET_ADVERTISER_OFFERS_ERROR : {
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