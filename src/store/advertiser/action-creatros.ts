import {
    GET_ADVERTISER_DEALS, GET_ADVERTISER_DEALS_SUCCESS,
    GET_ADVERTISER_OFFERS,
    GET_ADVERTISER_OFFERS_ERROR,
    GET_ADVERTISER_OFFERS_SUCCESS
} from "./action-types";

export const getOffers = () => {
    return {
        type: GET_ADVERTISER_OFFERS,
        loading: true,
        error: false
    }
}
export const getOffersSuccess = (res: {items: [], pagination: {}}) => {
    return {
        type: GET_ADVERTISER_OFFERS_SUCCESS,
        offers: {
            list: res.items,
            pagination: res.pagination
        },
        loading: false,
        error: false
    }
}
export const getDeals = () => {
    return {
        type: GET_ADVERTISER_DEALS,
        loading: true,
        error: false
    }
}

export const getDealsSuccess = (res: {items: [], pagination: {}}) => {
    return {
        type: GET_ADVERTISER_DEALS_SUCCESS,
        deals: {
            list: res.items,
            pagination: res.pagination
        },
        loading: false,
        error: false
    }
}
export const setError = (err: {code: number, message: string} | boolean) => {
    return {
        type: GET_ADVERTISER_OFFERS_ERROR,
        loading: false,
        error: typeof err === "object" ? {
            code: err.code,
            message: err.message
        } : err
    }
}