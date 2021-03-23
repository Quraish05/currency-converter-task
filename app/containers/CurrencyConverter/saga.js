// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { putAllPrices, putPriceForChart } from './actions';
import { GET_ALL_PRICES, GET_PRICE_FOR_CHART } from './constants';

import { getRequest } from 'utils/request';

var dayjs = require('dayjs');
var duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

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
  console.log('new Date', new Date().toDateString('YYYY-MM-DD'));

  let rawDate = new Date();
  let formattedTodayDate = dayjs(rawDate).format('YYYY-MM-DD');

  let oldDate = dayjs().subtract(dayjs.duration({ days: 60 }));
  let oldDateFormatted = dayjs(oldDate).format('YYYY-MM-DD');

  console.log('rawDate', rawDate);
  console.log('formattedTodayDate', formattedTodayDate);
  console.log('dayjs(oldDate).format', dayjs(oldDate).format('YYYY-MM-DD'));

  if (!currency) {
    currency = 'EUR';
  }
  try {
    const response = yield call(
      getRequest,
      `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${oldDateFormatted}&end=${formattedTodayDate}`,
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
