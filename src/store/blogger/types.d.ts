export interface IBloggerState {
    offers: {
        list: [],
        pagination: {}
    },
    platforms: {
        list: [],
        pagination: {}
    }
    deals: {
        list: [],
        pagination: {}
    },
    cities: {
        items: []
    },
    socialNetworks: [],
    loading: boolean,
    error: {
        code: number,
        message: string
    } | boolean
}