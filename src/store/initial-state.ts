import {IRootState} from "./types";

const initialState : IRootState = {
    socialNetworks: [],
    adTypes: [],
    adFormats: [],
    adCategories: [],
    cities: [],
    loading: false,
    error: false,
    user: {},
    offers: {
        items: [],
        pagination: {}
    },
    deals: {
        items: [],
        pagination: {}
    },
    platforms: {
        items: [],
        pagination: {}
    },
}
export default initialState