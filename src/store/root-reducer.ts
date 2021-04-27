import {combineReducers} from 'redux';

import {AuthReducer} from "./auth/reducer";
import {UserReducer} from "./user/reducer"
import {BloggerReducer} from './blogger/reducer'
import {AdvertisersReducer} from "./advertiser/reducer";
import {AdminReducer} from "./admin/reducer"

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    blogger: BloggerReducer,
    advertiser: AdvertisersReducer,
    admin: AdminReducer
})

export default rootReducer;