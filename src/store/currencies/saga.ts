import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import {SagaIterator } from 'redux-saga';

import request from '../../plugins/axios'
import {GET_CURRENCY} from "./actionTypes";
import {setCurrencyItems, setError} from "./actionCreators";

function* fetchCurrencies(params: {value: string}): SagaIterator {
    try {
        const response = yield call(request, 'GET', 'latest', params.value);

        yield put(setCurrencyItems(response));
    } catch (error) {
        yield put(setError(error));
    }
}

function* WatchCalculate(): SagaIterator {
    // @ts-ignore
    yield takeEvery(GET_CURRENCY, fetchCurrencies);
}

export default function* CurrencySaga() {
    yield all([fork(WatchCalculate)]);
}
