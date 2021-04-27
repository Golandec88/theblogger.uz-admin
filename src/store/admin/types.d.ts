export interface IAdminState {
    loading: boolean,
    offers: {
        list: [],
        pagination: {}
    },
    error: {
        code: number,
        message: string
    } | boolean,
}