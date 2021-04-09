import {
    AUTH_USER, AUTH_USER_ERROR, AUTH_USER_SUCCESS, REGISTER_USER, REGISTER_USER_ERROR
} from './actionTypes'

export const authUser = (form: {}) => {
    return {
        type: AUTH_USER,
        payload: form
    }
}
export const authUserSuccess = (userInfo: {}) => {
    return {
        type: AUTH_USER_SUCCESS,
        payload: userInfo
    }
}
export const authUserError = (error: string) => {
    return {
        type: AUTH_USER_ERROR,
        error
    }
}
export const registerUser = (form: {}) => {
    return {
        type: REGISTER_USER,
        payload: form
    }
}
export const registerUserSuccess = (userInfo: {}) => {
    return {
        type: REGISTER_USER,
        payload: userInfo
    }
}
export const registerUserError = (error: string) => {
    return {
        type: REGISTER_USER_ERROR,
        error
    }
}