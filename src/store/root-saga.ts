import AuthSaga from "./auth/saga";
import {all, fork} from "redux-saga/effects";

const RootSaga = function* () {
    yield all([fork(AuthSaga)]);
}
export default RootSaga