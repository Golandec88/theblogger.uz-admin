import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga';

import request from '../../plugins/axios'
import {GET_ADVERTISER_DEALS, GET_BLOGGER_DEALS} from "../action-types";
import {setDeals, setError} from "../action-creators";

function* fetchDealsList(action: {type: string}): SagaIterator {
    try {
        let url = ""

        switch (action.type) {
            case GET_BLOGGER_DEALS: url = "blogger/deal"; break
            case GET_ADVERTISER_DEALS: url = "customer/deal"; break
        }

        const response = yield call(request, 'GET', url);
        yield put(setDeals(response));
    } catch (err) {
        yield put(setError(err));
    }
}

function* DealsWatcher(): SagaIterator {
    // @ts-ignore
    yield takeLatest([
        GET_BLOGGER_DEALS,
        GET_ADVERTISER_DEALS
    ], fetchDealsList);
}

export default function* DealsSaga() {
    yield all([fork(DealsWatcher)]);
}
