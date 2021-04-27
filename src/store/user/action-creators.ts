import {GET_AD_INFO, GET_AD_INFO_ERROR, GET_AD_INFO_SUCCESS} from "./action-types";

export const getAdInfo = () => {
    return {
        type: GET_AD_INFO
    }
}
export const getAdInfoSuccess = (items: {}) => {
    return {
        type: GET_AD_INFO_SUCCESS,
        items
    }
}
export const getAdInfoError = () => {
    return {
        type: GET_AD_INFO_ERROR
    }
}