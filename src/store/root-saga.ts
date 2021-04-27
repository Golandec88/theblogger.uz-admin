import {all, fork} from "redux-saga/effects";
import AuthSaga from "./auth/saga";
import BloggerSaga from "./blogger/saga";
import AdvertisersSaga from "./advertiser/saga";
import AdminSaga from "./admin/saga"
import UserSaga from "./user/saga";

const RootSaga = function* () {
    yield all([
        fork(AuthSaga),
        fork(UserSaga),
        fork(BloggerSaga),
        fork(AdvertisersSaga),
        fork(AdminSaga)
    ]);
}
export default RootSaga