import { Reducer } from "redux";
import {Action, IRootState} from "./types";
import {
    AUTH_USER,
    AUTH_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    GET_BLOGGER_OFFERS,
    GET_BLOGGER_DEALS,
    GET_PLATFORMS,
    GET_AD_INFO,
    GET_CITIES,
    GET_SOCIAL_NETWORKS,
    SET_ERROR,
    SET_DEALS,
    SET_PLATFORMS,
    SET_OFFERS,
    GET_ADVERTISER_OFFERS,
    GET_ADVERTISER_DEALS,
    GET_ADMIN_OFFERS,
    SET_CITIES,
    SET_AD_INFO,
    SET_SOCIAL_NETWORKS,
    GET_USER_INFO,
    SET_USER_INFO,
    GET_USERS,
    SET_USERS,
    SEARCH_BLOGGER,
    SET_SEARCH_BLOGGER
} from "./action-types";

// @ts-ignore
const AppReducer: Reducer<IRootState, Action> = (state: IRootState , action: Action) : IRootState => {
    switch (action.type) {

        /************ *** User *** ************/

        case AUTH_USER: {
            return {
                ...state,
                user: {firstName: '', lastName: '', photo: ''},
                loading: true,
                error: false,
            }
        }
        case AUTH_USER_SUCCESS: {
            return {
                ...state,
                user: action.value,
                loading: false,
                error: false,
            }
        }
        case REGISTER_USER: {
            return {
                ...state,
                user: {firstName: '', lastName: '', photo: ''},
                loading: true,
                error: false,
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
            }
        }
        case GET_USER_INFO: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case SET_USER_INFO: {
            return {
                ...state,
                user: action.value,
                loading: false,
                error: false
            }
        }

        /************ *** Offers *** ************/

        case GET_BLOGGER_OFFERS : {
            return {
                ...state,
                offers: {items: [], pagination: {}},
                loading: true,
                error: false
            }
        }
        case GET_ADVERTISER_OFFERS : {
            return {
                ...state,
                offers: {items: [], pagination: {}},
                loading: true,
                error: false
            }
        }
        case GET_ADMIN_OFFERS : {
            return {
                ...state,
                offers: {items: [], pagination: {}},
                loading: true,
                error: false
            }
        }
        case SET_OFFERS : {
            return {
                ...state,
                offers: action.value,
                loading: false,
                error: false
            }
        }

        /************ *** Deals *** ************/

        case GET_BLOGGER_DEALS : {
            return {
                ...state,
                deals: {items: [], pagination: {}},
                loading: true,
                error: false
            }
        }
        case GET_ADVERTISER_DEALS : {
            return {
                ...state,
                deals: {items: [], pagination: {}},
                loading: true,
                error: false
            }
        }
        case SET_DEALS : {
            return {
                ...state,
                deals: action.value,
                loading: false,
                error: false
            }
        }

        /************ *** Platforms *** ************/

        case GET_PLATFORMS : {
            return {
                ...state,
                platforms: {items: [], pagination: {}},
                loading: true,
                error: false,
            }
        }
        case SET_PLATFORMS : {
            return {
                ...state,
                platforms: action.value,
                loading: false,
                error: false,
            }
        }
        case SEARCH_BLOGGER : {
            return {
                ...state,
                platforms: {items: [], pagination: {}},
                loading: true,
                error: false
            }
        }
        case SET_SEARCH_BLOGGER : {
            return {
                ...state,
                platforms: action.value,
                loading: false,
                error: false
            }
        }

        /************ *** Admin *** ************/

        case GET_USERS : {
            return {
                ...state,
                users: {items: [], pagination: {}},
                loading: true,
                error: false,
            }
        }
        case SET_USERS : {
            return {
                ...state,
                users: action.value,
                loading: false,
                error: false,
            }
        }

        /************ *** Other *** ************/

        case GET_SOCIAL_NETWORKS : {
            return {
                ...state,
                socialNetworks: [],
                loading: false,
                error: false,
            }
        }
        case SET_SOCIAL_NETWORKS : {
            return {
                ...state,
                socialNetworks: action.value,
                loading: false,
                error: false,
            }
        }
        case GET_CITIES : {
            return {
                ...state,
                cities: [],
                loading: true,
                error: false,
            }
        }
        case SET_CITIES : {
            return {
                ...state,
                cities: action.value,
                loading: false,
                error: false,
            }
        }
        case GET_AD_INFO: {
            return {
                ...state,
                adTypes: [],
                adFormats: [],
                adCategories: [],
                socialNetworks: [],
                loading: true,
                error: false,
            }
        }
        case SET_AD_INFO: {
            return {
                ...state,
                loading: false,
                error: false,
                ...action.value
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.value
            }
        }
        default: return state;
    }
}

export default AppReducer;