import {IAdvertisersState} from "./types";

const AdvertisersState: IAdvertisersState = {
    loading: false,
    error: false,
    offers: {
        list: [],
        pagination: {}
    },
    deals: {
        list: [],
        pagination: {}
    }
}
export default AdvertisersState