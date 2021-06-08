import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga';

import request from '../../plugins/axios'

import {GET_USERS} from "../action-types";

import {setError, setUsers,} from "../action-creators";

function* fetchUsersList(action: string): SagaIterator {
    try {
        const response = yield call(request, 'GET', 'admin/user');

        yield put(setUsers(response));
    } catch (err) {
        yield put(setError(err));
    }
}

function* UsersWatcher(): SagaIterator {
    // @ts-ignore
    yield takeLatest(GET_USERS, fetchUsersList);
}

export default function* UsersSaga() {
    yield all([fork(UsersWatcher)]);
}
