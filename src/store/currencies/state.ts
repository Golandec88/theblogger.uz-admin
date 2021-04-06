import {ICurrencyState} from "./types";

const state: ICurrencyState = {
    loading: false,
    error: false,
    items: {
        rates: {}
    },
}

export default state