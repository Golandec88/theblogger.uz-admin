import {
    GET_CURRENCY,
    SET_CURRENCY_ERROR,
    SET_CURRENCY_SUCCESS,
} from './actionTypes'

export const getCurrencies = (params: string) => {
    return {
        type: GET_CURRENCY,
        loading: true,
        value: params
    }
}
export const setCurrencyItems = (items: object[] | unknown) => {
    return {
        type: SET_CURRENCY_SUCCESS,
        loading: false,
        value: items
    }
}
export const setError = (error: Error | boolean) => {
    return {
        type: SET_CURRENCY_ERROR,
        error: error
    }
}