import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga';

import request from '../../plugins/axios'
import {GET_BLOGGER_DEALS, GET_CITIES, GET_OFFERS, GET_PLATFORMS, GET_SOCIAL_NETWORKS} from "./action-types";
import {
    setError,
    getOffersSuccess,
    getSocialNetworksSuccess,
    getPlatformsSuccess,
    getCitiesSuccess,
    getDealsSuccess
} from "./action-creators";

function* fetchOffersList(): SagaIterator {
    try {
        const response = yield call(request, 'GET', 'blogger/offer');

        yield put(getOffersSuccess(response));
    } catch (err) {
        yield put(setError(err));
    }
}
function* fetchSocialNetworks(): SagaIterator {
    try {
        const response = yield call(request, 'GET', 'social-network');

        yield put(getSocialNetworksSuccess(response.items));
    } catch (err) {
        yield put(setError(err));
    }
}
function* fetchPlatforms(): SagaIterator {
    try {
        const response = yield call(request, 'GET', 'blogger/platform');

        yield put(getPlatformsSuccess(response));
    } catch (err) {
        yield put(setError(err));
    }
}
function* fetchCities(): SagaIterator {
    try {
        const response = yield call(request, 'GET', 'city');

        yield put(getCitiesSuccess(response));
    } catch (err) {
        yield put(setError(err));
    }
}

function* fetchDeals(): SagaIterator {
    try {
        const response = yield call(request, 'GET', 'blogger/deal');
        yield put(getDealsSuccess(response));
    } catch (err) {
        yield put(setError(err));
    }
}

function* BloggerWatcher(): SagaIterator {
    // @ts-ignore
    yield takeLatest(GET_OFFERS, fetchOffersList);
    yield takeLatest(GET_SOCIAL_NETWORKS, fetchSocialNetworks);
    yield takeLatest(GET_PLATFORMS, fetchPlatforms);
    yield takeLatest(GET_CITIES, fetchCities);
    yield takeLatest(GET_BLOGGER_DEALS, fetchDeals)
}

export default function* BloggerSaga() {
    yield all([fork(BloggerWatcher)]);
}
