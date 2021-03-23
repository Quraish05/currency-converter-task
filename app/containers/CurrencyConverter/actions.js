/*
 *
 * CurrencyConverter actions
 *
 */

import {
  DEFAULT_ACTION,
  PUT_ALL_PRICES,
  GET_ALL_PRICES,
  GET_PRICE_FOR_CHART,
  PUT_PRICE_FOR_CHART,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAllPrices() {
  return {
    type: GET_ALL_PRICES,
  };
}

export function putAllPrices(allPrices) {
  return {
    type: PUT_ALL_PRICES,
    allPrices,
  };
}

export function getPriceForChart(currency) {
  return {
    type: GET_PRICE_FOR_CHART,
    currency,
  };
}

export function putPriceForChart(response) {
  return {
    type: PUT_PRICE_FOR_CHART,
    response,
  };
}
