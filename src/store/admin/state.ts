import {IAdminState} from "./types";

const state: IAdminState = {
    loading: false,
    error: false,
    offers: {
        list: [],
        pagination: {}
    }
}

export default state