import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga';

import request from '../../plugins/axios'
import {GET_ADVERTISER_DEALS, GET_ADVERTISER_OFFERS} from "./action-types";
import {setError, getOffersSuccess, getDealsSuccess} from "./action-creatros";

function* fetchOffersList(): SagaIterator {
    try {
        const response = yield call(request, 'GET', 'advertiser/offer');

        yield put(getOffersSuccess(response));
    } catch (err) {
        yield put(setError(err));
    }
}
function* fetchDealsList(): SagaIterator {
    try {
        const response = yield call(request, 'GET', 'advertiser/deal');

        yield put(getDealsSuccess(response));
    } catch (err) {
        yield put(setError(err));
    }
}
function* AdvertisersWatcher(): SagaIterator {
    // @ts-ignore
    yield takeLatest(GET_ADVERTISER_OFFERS, fetchOffersList);
    // @ts-ignore
    yield takeLatest(GET_ADVERTISER_DEALS, fetchDealsList);
}

export default function* AdvertisersSaga() {
    yield all([fork(AdvertisersWatcher)]);
}
