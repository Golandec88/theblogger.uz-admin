import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import {SagaIterator } from 'redux-saga';

import request from '../../plugins/axios'
import {AUTH_USER, REGISTER_USER} from "./actionTypes";
import {authUserError, authUserSuccess, registerUserError, registerUserSuccess} from "./actionCreators";

function* authUser(action: {payload: {}}): SagaIterator {
    try {
        const response = yield call(request, 'POST', 'login_check', action.payload);

        yield put(authUserSuccess(response));
    } catch (error) {
        yield put(authUserError(error));
    }
}
function* registerUser(form: {}): SagaIterator {
    try {
        const response = yield call(request, 'POST', 'register', form);

        yield put(registerUserSuccess(response));
    } catch (error) {
        yield put(registerUserError(error));
    }
}

function* AuthWatcher(): SagaIterator {
    // @ts-ignore
    yield takeEvery(AUTH_USER, authUser);
    yield takeEvery(REGISTER_USER, registerUser)
}

export default function* AuthSaga() {
    yield all([fork(AuthWatcher)]);
}
