// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { putAllPrices, putPriceForChart } from './actions';
import { GET_ALL_PRICES, GET_PRICE_FOR_CHART } from './constants';

import { getRequest } from 'utils/request';

export function* getAllPricesSaga() {
  try {
    const response = yield call(
      getRequest,

      `https://api.coindesk.com/v1/bpi/currentprice.json`,
    );
    console.log(`RES of getAllPricesSaga`, response);

    yield put(putAllPrices(response));
  } catch (err) {
    console.log(err);
  }
}

export function* getPriceForChartSaga({ currency }) {
  if (!currency) {
    currency = 'EUR';
  }
  try {
    const response = yield call(
      getRequest,

      `
      https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=2013-09-01&end=2013-09-10`,
    );
    console.log(`RES of getPriceForChartSaga`, response);

    yield put(putPriceForChart(response));
  } catch (err) {
    console.log(err);
  }
}

export default function* watchAll() {
  yield takeLatest(GET_ALL_PRICES, getAllPricesSaga);
  yield takeLatest(GET_PRICE_FOR_CHART, getPriceForChartSaga);
}
