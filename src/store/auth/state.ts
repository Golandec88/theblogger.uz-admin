import {IAuthState} from "./types";

const state: IAuthState = {
    loading: false,
    error: false,
    isAuth: false,
    userInfo: {
        token: undefined,
        refresh_token: undefined,
        profile: {}
    }
}

export default state