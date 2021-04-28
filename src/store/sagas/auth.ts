import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import {SagaIterator } from 'redux-saga';

import request from '../../plugins/axios'
import {authUserSuccess, registerUserSuccess, setError} from "../action-creators";
import {AUTH_USER, REGISTER_USER} from "../action-types";

function* authUser(action: {form: {}}): SagaIterator {
    try {
        const tokens = yield call(request, 'POST', 'login_check', action.form);

        localStorage.setItem('user-token', tokens.token)
        localStorage.setItem('user-refresh-token', tokens.refresh_token)

        const userInfo = yield call(request, 'GET', 'user')

        if(userInfo.roles.find((role: string) => role === 'ROLE_ADMIN')) localStorage.setItem('user-is-admin', String(true))
        else localStorage.setItem('user-is-admin', String(false))

        localStorage.setItem('username', `${userInfo.profile.first_name} ${userInfo.profile.last_name}`)

        yield put(authUserSuccess({...tokens, ...userInfo}));
    } catch(err) {
        yield put(setError(err));
    }
}
function* registerUser(action: {form: any}): SagaIterator {
    try {
        yield call(request, 'POST', 'register', {
            username: action.form.username,
            password: action.form.password,
            profile: {
                firstName: action.form.firstName,
                lastName: action.form.lastName
            }
        });

        yield put(registerUserSuccess());
    } catch(err) {
        yield put(setError(err));
    }
}
function* AuthWatcher(): SagaIterator {
    // @ts-ignore
    yield takeEvery([AUTH_USER], authUser);
    // @ts-ignore
    yield takeEvery([REGISTER_USER], registerUser);
}

export default function* AuthSaga() {
    yield all([fork(AuthWatcher)]);
}
