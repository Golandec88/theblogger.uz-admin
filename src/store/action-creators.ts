import {
    AUTH_USER,
    AUTH_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    SET_ERROR,
    GET_BLOGGER_OFFERS,
    GET_BLOGGER_DEALS,
    GET_PLATFORMS,
    GET_AD_INFO,
    GET_CITIES,
    GET_SOCIAL_NETWORKS,
    GET_ADVERTISER_DEALS,
    SET_OFFERS,
    GET_ADVERTISER_OFFERS,
    GET_ADMIN_OFFERS,
    SET_DEALS,
    SET_PLATFORMS,
    SET_CITIES,
    SET_SOCIAL_NETWORKS,
    SET_AD_INFO,
    GET_USER_INFO, SET_USER_INFO,
} from "./action-types";
import {Error} from './types'

/************ *** User *** ************/

export const authUser = (form: {}) => {
    return { type: AUTH_USER, form}
}
export const authUserSuccess = (value: {}) => {
    return { type: AUTH_USER_SUCCESS, value }
}
export const registerUser = (form: {}) => {
    return { type: REGISTER_USER, form }
}
export const registerUserSuccess = () => {
    return { type: REGISTER_USER_SUCCESS }
}
export const getUserInfo = () => {
    return { type: GET_USER_INFO }
}
export const setUserInfo = (value: {}) => {
    return { type: SET_USER_INFO, value }
}

/************ *** Offers *** ************/

export const getBloggerOffers = () => {
    return { type: GET_BLOGGER_OFFERS }
}
export const getAdvertiserOffers = () => {
    return { type: GET_ADVERTISER_OFFERS }
}
export const getAdminOffers = () => {
    return { type: GET_ADMIN_OFFERS }
}
export const setOffers = (value: {}) => {
    return { type: SET_OFFERS, value}
}

/************ *** Deals *** ************/

export const getBloggerDeals = () => {
    return { type: GET_BLOGGER_DEALS }
}
export const getAdvertiserDeals = () => {
    return { type: GET_ADVERTISER_DEALS }
}
export const setDeals = (value: {}) => {
    return { type: SET_DEALS, value }
}

/************ *** Blogger *** ************/

export const getPlatforms = () => {
    return { type: GET_PLATFORMS }
}
export const setPlatforms = (value: {}) => {
    return { type: SET_PLATFORMS, value }
}

/************ *** Other *** ************/

export const getCities = () => {
    return { type: GET_CITIES }
}
export const setCities = (value: []) => {
    return { type: SET_CITIES, value}
}
export const getSocialNetworks = () => {
    return { type: GET_SOCIAL_NETWORKS }
}
export const setSocialNetworks = (value: []) => {
    return { type: SET_SOCIAL_NETWORKS, value }
}
export const getAdInfo = () => {
    return { type: GET_AD_INFO }
}
export const setAdInfo = (value: {}) => {
    return { type: SET_AD_INFO, value }
}
export const setError = (value: Error) => {
    return { type: SET_ERROR, value }
}