/*
 *
 * CurrencyConverter reducer
 *
 */
import produce, { isDraft } from 'immer';
import {
  DEFAULT_ACTION,
  PUT_ALL_PRICES,
  PUT_PRICE_FOR_CHART,
} from './constants';

export const initialState = {
  allPrices: {},

  priceForChart: {},
  pricePerCurrency: [],
};

/* eslint-disable default-case, no-param-reassign */
const currencyConverterReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

      case PUT_ALL_PRICES:
        draft.allPrices = action.allPrices;
        break;

      case PUT_PRICE_FOR_CHART:
        let tempArray = [];
        draft.priceForChart = action.response;

        for (const [key, value] of Object.entries(action.response.bpi)) {
          // console.log(`${key}: ${value}`);
          tempArray.push({
            data: key,
            price: value,
          });
        }

        /* Object.keys(action.response.bpi).map((key, ind) =>
          tempArray.push({
            name: [key],
            id: key,
          }),
        ) */

        console.debug('tempArray', tempArray);

        draft.pricePerCurrency = tempArray;
        break;
    }
  });

export default currencyConverterReducer;
