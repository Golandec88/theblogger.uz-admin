import {
    GET_BLOGGER_DEALS, GET_BLOGGER_DEALS_SUCCESS,
    GET_CITIES, GET_CITIES_SUCCESS,
    GET_OFFERS,
    GET_OFFERS_ERROR,
    GET_OFFERS_SUCCESS, GET_PLATFORMS, GET_PLATFORMS_SUCCESS,
    GET_SOCIAL_NETWORKS,
    GET_SOCIAL_NETWORKS_SUCCESS
} from "./action-types";

export const getOffers = () => {
    return {
        type: GET_OFFERS,
        loading: true,
        error: false
    }
}
export const getOffersSuccess = (res: {items: [], pagination: {}}) => {
    return {
        type: GET_OFFERS_SUCCESS,
        offers: {
            list: res.items,
            pagination: res.pagination
        },
        loading: false,
        error: false
    }
}
export const getSocialNetworks = () => {
    return {
        type: GET_SOCIAL_NETWORKS,
        loading: true,
        error: false
    }
}
export const getSocialNetworksSuccess = (items: []) => {
    return {
        type: GET_SOCIAL_NETWORKS_SUCCESS,
        socialNetworks: items,
        loading: false,
        error: false
    }
}
export const getPlatforms = () => {
    return {
        type: GET_PLATFORMS,
        loading: true,
        error: false
    }
}
export const getPlatformsSuccess = (res: {items: [], pagination: []}) => {
    return {
        type: GET_PLATFORMS_SUCCESS,
        platforms: {
            list: res.items,
            pagination: res.pagination
        },
        loading: false,
        error: false
    }
}
export const getCities = () => {
    return {
        type: GET_CITIES,
        loading: true,
        error: false
    }
}
export const getCitiesSuccess = (items: []) => {
    return {
        type: GET_CITIES_SUCCESS,
        cities: items,
        loading: true,
        error: false
    }
}

export const getDeals = () => {
    return {
        type: GET_BLOGGER_DEALS,
        loading: true,
        error: false
    }
}
export const getDealsSuccess = (res: {items: [], pagination: []}) => {
    return {
        type: GET_BLOGGER_DEALS_SUCCESS,
        deals: {
            list: res.items,
            pagination: res.pagination
        },
        loading: true,
        error: false
    }
}
export const setError = (err: {code: number, message: string} | boolean) => {
    return {
        type: GET_OFFERS_ERROR,
        loading: false,
        error: typeof err === "object" ? {
            code: err.code,
            message: err.message
        } : err
    }
}