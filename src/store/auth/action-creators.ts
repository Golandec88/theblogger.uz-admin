import {
    AUTH_USER,
    AUTH_USER_ERROR,
    AUTH_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_ERROR
} from './action-types'

export const authUser = (form: {}) => {
    return {
        type: AUTH_USER,
        payload: form
    }
}
export const authUserSuccess = (userInfo: {}) => {
    return {
        type: AUTH_USER_SUCCESS,
        userInfo: userInfo
    }
}
export const authUserError = () => {
    return {
        type: AUTH_USER_ERROR
    }
}
export const registerUser = (form: {}) => {
    return {
        type: REGISTER_USER,
        payload: form
    }
}
export const registerUserSuccess = () => {
    return {
        type: REGISTER_USER
    }
}
export const registerUserError = () => {
    return {
        type: REGISTER_USER_ERROR
    }
}