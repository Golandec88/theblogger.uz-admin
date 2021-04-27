import {GET_ADMIN_OFFERS, GET_ADMIN_OFFERS_ERROR, GET_ADMIN_OFFERS_SUCCESS} from "./action-types";

export const getOffers = () => {
    return {
        type: GET_ADMIN_OFFERS,
        loading: true,
        error: false
    }
}
export const getOffersSuccess = (res: {items: [], pagination: {}}) => {
    return {
        type: GET_ADMIN_OFFERS_SUCCESS,
        offers: {
            list: res.items,
            pagination: res.pagination
        },
        loading: false,
        error: false
    }
}
export const setError = (err: {code: number, message: string} | boolean) => {
    return {
        type: GET_ADMIN_OFFERS_ERROR,
        loading: false,
        error: typeof err === "object" ? {
            code: err.code,
            message: err.message
        } : err
    }
}