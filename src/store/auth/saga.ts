import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import {SagaIterator } from 'redux-saga';

import request from '../../plugins/axios'
import {AUTH_USER, REGISTER_USER} from "./action-types";
import {
    authUserError,
    authUserSuccess,
    registerUserError,
    registerUserSuccess
} from "./action-creators";

function* authUser(action: {payload: {}}): SagaIterator {
    try {
        const tokens = yield call(request, 'POST', 'login_check', action.payload);

        localStorage.setItem('user-token', tokens.token)
        localStorage.setItem('user-refresh-token', tokens.refresh_token)

        const userInfo = yield call(request, 'GET', 'user')

        if(userInfo.roles.find((role: string) => role === 'ROLE_ADMIN')) localStorage.setItem('user-is-admin', String(true))
        else localStorage.setItem('user-is-admin', String(false))

        localStorage.setItem('username', `${userInfo.profile.first_name} ${userInfo.profile.last_name}`)

        yield put(authUserSuccess({...tokens, ...userInfo}));
    } catch {
        yield put(authUserError());
    }
}
function* registerUser(action: {payload: any}): SagaIterator {
    try {
        yield call(request, 'POST', 'register', {
            username: action.payload.username,
            password: action.payload.password,
            profile: {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName
            }
        });

        yield put(registerUserSuccess());
    } catch {
        yield put(registerUserError());
    }
}
function* AuthWatcher(): SagaIterator {
    // @ts-ignore
    yield takeEvery(AUTH_USER, authUser);
    // @ts-ignore
    yield takeEvery(REGISTER_USER, registerUser);
}

export default function* AuthSaga() {
    yield all([fork(AuthWatcher)]);
}
