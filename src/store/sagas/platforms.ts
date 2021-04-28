import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga';

import request from '../../plugins/axios'

import {GET_PLATFORMS} from "../action-types";

import {
    setError, setPlatforms,
} from "../action-creators";

function* fetchPlatformsList(action: string): SagaIterator {
    try {
        const response = yield call(request, 'GET', 'blogger/platform');

        yield put(setPlatforms(response));
    } catch (err) {
        yield put(setError(err));
    }
}

function* PlatformsWatcher(): SagaIterator {
    // @ts-ignore
    yield takeLatest(GET_PLATFORMS, fetchPlatformsList);
}

export default function* PlatformsSaga() {
    yield all([fork(PlatformsWatcher)]);
}
