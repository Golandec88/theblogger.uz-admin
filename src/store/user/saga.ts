import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import {SagaIterator } from 'redux-saga';

import request from '../../plugins/axios'
import {GET_AD_INFO} from "./action-types";
import {getAdInfoError, getAdInfoSuccess} from "./action-creators";

function* getAdInfo(): SagaIterator {
    try {
        const social_networks = yield call(request, 'get', 'social-network');
        const ad_types = yield call(request, 'get', 'ad-type');
        const ad_format = yield call(request, 'get', 'ad-format');
        const ad_categories = yield call(request, 'get', 'ad-category');

        const items = {
            'socialNetworks': social_networks.items,
            'adTypes': ad_types.items,
            'adFormats': ad_format.items,
            'adCategories': ad_categories.items
        }

        yield put(getAdInfoSuccess(items))
    } catch {
        yield put(getAdInfoError());
    }
}
function* UserWatcher(): SagaIterator {
    // @ts-ignore
    yield takeEvery(GET_AD_INFO, getAdInfo);
}

export default function* UserSaga() {
    yield all([fork(UserWatcher)]);
}
