import {IAuthState} from "./types";

const state: IAuthState = {
    loading: false,
    error: false,
    userInfo: {
        firstName: undefined,
        lastName: undefined
    }
}

export default state