import {SagaIterator} from "redux-saga";
import {all, call, fork, put, takeLatest} from "redux-saga/effects";

import request from "../../plugins/axios";
import {GET_AD_INFO, GET_CITIES, GET_SOCIAL_NETWORKS} from '../action-types'
import {
    setAdInfo, setCities,
    setError, setSocialNetworks
} from "../action-creators";

function* fetchAdInfo(): SagaIterator {
    try {
        const ad_types = yield call(request, 'get', 'ad-type');
        const ad_format = yield call(request, 'get', 'ad-format');
        const ad_categories = yield call(request, 'get', 'ad-category');

        const items = {
            adTypes: ad_types.items,
            adFormats: ad_format.items,
            adCategories: ad_categories.items
        }

        yield put(setAdInfo(items))
    } catch(err) {
        yield put(setError(err));
    }
}
function* fetchSocialNetworks(): SagaIterator {
    try {
        const response = yield call(request, 'GET', 'social-network');

        yield put(setSocialNetworks(response.items));
    } catch (err) {
        yield put(setError(err));
    }
}
function* fetchCities(): SagaIterator {
    try {
        const response = yield call(request, 'GET', 'city');

        yield put(setCities(response.items));
    } catch (err) {
        yield put(setError(err));
    }
}

function* OthersWatcher(): SagaIterator {
    yield takeLatest(GET_AD_INFO, fetchAdInfo);
    yield takeLatest(GET_SOCIAL_NETWORKS, fetchSocialNetworks);
    yield takeLatest(GET_CITIES, fetchCities);
}

export default function* OthersSaga() {
    yield all([fork(OthersWatcher)]);
}