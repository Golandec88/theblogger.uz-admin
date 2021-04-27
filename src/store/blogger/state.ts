import {IBloggerState} from "./types";

const state: IBloggerState = {
    offers: {
        list: [],
        pagination: {}
    },
    platforms: {
        list: [],
        pagination: {}
    },
    deals: {
        list: [],
        pagination: {}
    },
    cities: {
        items: []
    },
    socialNetworks: [],
    loading: false,
    error: false
}
export default state