import {all, fork} from "redux-saga/effects";
import OthersSaga from "./sagas/others";
import AuthSaga from "./sagas/auth";
import OffersSaga from "./sagas/offers";
import DealsSaga from "./sagas/deals";
import PlatformsSaga from "./sagas/platforms";
import UsersSaga from "./sagas/users";

const RootSaga = function* () {
    yield all([
        fork(AuthSaga),
        fork(OffersSaga),
        fork(DealsSaga),
        fork(PlatformsSaga),
        fork(OthersSaga),
        fork(UsersSaga)
    ]);
}
export default RootSaga