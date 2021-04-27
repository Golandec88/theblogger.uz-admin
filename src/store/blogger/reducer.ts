import {IBloggerState} from './types'
import {
    GET_BLOGGER_DEALS, GET_BLOGGER_DEALS_SUCCESS,
    GET_CITIES, GET_CITIES_SUCCESS,
    GET_OFFERS,
    GET_OFFERS_ERROR,
    GET_OFFERS_SUCCESS, GET_PLATFORMS, GET_PLATFORMS_ERROR, GET_PLATFORMS_SUCCESS,
    GET_SOCIAL_NETWORKS, GET_SOCIAL_NETWORKS_ERROR,
    GET_SOCIAL_NETWORKS_SUCCESS
} from "./action-types";
import BloggerState from './state'

type Action = {
    type: string,
    offers: {
        list: [],
        pagination: {}
    },
    platforms: {
        list: [],
        pagination: {}
    },
    deals: {
        list: [],
        pagination: {}
    },
    cities: {
        items: []
    },
    socialNetworks: [],
    error: {
        code: number,
        message: string
    } | boolean
}

export function BloggerReducer (state: IBloggerState = BloggerState, action: Action) :IBloggerState {
    switch (action.type) {
        case GET_OFFERS : {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case GET_OFFERS_SUCCESS : {
            return {
                ...state,
                offers: action.offers,
                loading: false,
                error: false
            }
        }
        case GET_OFFERS_ERROR : {
            return {
                ...state,
                loading: false,
                error: typeof action.error === "object" ? {
                    code: action.error.code,
                    message: action.error.message
                } : true
            }
        }
        case GET_SOCIAL_NETWORKS : {
            return {
                ...state,
                loading: false,
                error: false,
            }
        }
        case GET_SOCIAL_NETWORKS_SUCCESS : {
            return {
                ...state,
                socialNetworks: action.socialNetworks,
                loading: false,
                error: false,
            }
        }
        case GET_SOCIAL_NETWORKS_ERROR : {
            return {
                ...state,
                loading: false,
                error: typeof action.error === "object" ? {
                    code: action.error.code,
                    message: action.error.message
                } : true
            }
        }
        case GET_PLATFORMS : {
            return {
                ...state,
                loading: true,
                error: false,
            }
        }
        case GET_PLATFORMS_SUCCESS : {
            return {
                ...state,
                platforms: action.platforms,
                loading: false,
                error: false,
            }
        }
        case GET_PLATFORMS_ERROR : {
            return {
                ...state,
                loading: false,
                error: typeof action.error === "object" ? {
                    code: action.error.code,
                    message: action.error.message
                } : true
            }
        }
        case GET_BLOGGER_DEALS : {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case GET_BLOGGER_DEALS_SUCCESS : {
            return {
                ...state,
                deals: action.deals,
                loading: false,
                error: false
            }
        }
        case GET_CITIES : {
            return {
                ...state,
                loading: true,
                error: false,
            }
        }
        case GET_CITIES_SUCCESS : {
            return {
                ...state,
                cities: action.cities,
                loading: false,
                error: false,
            }
        }
        default: return state
    }
}