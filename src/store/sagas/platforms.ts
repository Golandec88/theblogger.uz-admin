import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga';

import request from '../../plugins/axios'

import {GET_PLATFORMS, SEARCH_BLOGGER} from "../action-types";

import {
    setBloggersList,
    setError, setPlatforms,
} from "../action-creators";

function* fetchPlatformsList(): SagaIterator {
    try {
        const response = yield call(request, 'GET', 'blogger/platform');

        yield put(setPlatforms(response));
    } catch (err) {
        yield put(setError(err));
    }
}
// @ts-ignore
function* searchBlogger({city, subs}): SagaIterator {
    try {
        const response = yield call(request, 'GET', `customer/platform?subscribers=sort,${subs ? 'asc' : 'desc'}&city_id=${(city)}`)

        yield put(setBloggersList(response))
    } catch (err) {
        yield put(setError(err))
    }
}

function* PlatformsWatcher(): SagaIterator {
    // @ts-ignore
    yield takeLatest(GET_PLATFORMS, fetchPlatformsList);
    // @ts-ignore
    yield takeLatest(SEARCH_BLOGGER, searchBlogger)
}

export default function* PlatformsSaga() {
    yield all([fork(PlatformsWatcher)]);
}
