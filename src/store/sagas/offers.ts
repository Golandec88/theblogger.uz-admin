import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga';

import request from '../../plugins/axios'
import {GET_ADMIN_OFFERS, GET_ADVERTISER_OFFERS, GET_BLOGGER_OFFERS} from "../action-types";
import {
    setError, setOffers,
} from "../action-creators";

function* fetchOffersList(action: {type: string}): SagaIterator {
    try {
        let url = ""

        switch (action.type) {
            case GET_BLOGGER_OFFERS: url = "blogger/offer"; break
            case GET_ADVERTISER_OFFERS: url = "customer/offer"; break
            case GET_ADMIN_OFFERS: url = "admin/offer/moderation"
        }

        const response = yield call(request, 'GET', url);

        yield put(setOffers(response));
    } catch (err) {
        yield put(setError(err));
    }
}

function* OffersWatcher(): SagaIterator {
    yield takeLatest([
        GET_BLOGGER_OFFERS,
        GET_ADVERTISER_OFFERS,
        GET_ADMIN_OFFERS
    ], fetchOffersList);
}

export default function* OffersSaga() {
    yield all([fork(OffersWatcher)]);
}
