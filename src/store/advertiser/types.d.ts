export interface IAdvertisersState {
    loading: boolean,
    offers: {
        list: [],
        pagination: {}
    },
    deals: {
        list: [],
        pagination: {}
    }
    error: {
        code: number,
        message: string
    } | boolean
}