export interface IAuthState {
    loading: boolean,
    error: Error | boolean | string,
    userInfo: {
        firstName: string | undefined,
        lastName: string | undefined
    }
}