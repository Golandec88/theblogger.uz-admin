import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import {SagaIterator } from 'redux-saga';

import request from '../../plugins/axios'
import {getOffersSuccess, setError} from "./action-creators";
import {GET_ADMIN_OFFERS} from "./action-types";

function* fetchOffers(): SagaIterator {
    try {
        const res = yield call(request, 'GET', 'admin/offer/moderation');

        yield put(getOffersSuccess(res));
    } catch(e) {
        yield put(setError(e));
    }
}
function* AdminWatcher(): SagaIterator {
    // @ts-ignore
    yield takeEvery(GET_ADMIN_OFFERS, fetchOffers);
}

export default function* AdminSaga() {
    yield all([fork(AdminWatcher)]);
}
