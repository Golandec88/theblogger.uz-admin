export interface IAuthState {
    loading: boolean,
    error: Error | boolean | string,
    isAuth: boolean,
    userInfo: {
        token: string | undefined,
        refresh_token: string | undefined,
        profile: {}
    }
}