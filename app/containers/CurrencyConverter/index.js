/**
 *
 * CurrencyConverter
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCurrencyConverter from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getAllPrices, getPriceForChart } from './actions';

import {
  LineChart,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import Select from 'react-select';

import { Col, Row, Container } from 'reactstrap';

import 'aos/dist/aos.css';
import AOS from 'aos';

const options = [
  { value: 'GBP', label: 'British Pound Sterling' },
  { value: 'EUR', label: 'Euro' },
  { value: 'USD', label: 'United States Dollar' },
];

export function CurrencyConverter(props) {
  useInjectReducer({ key: 'currencyConverter', reducer });
  useInjectSaga({ key: 'currencyConverter', saga });

  const [selectedCurrency, setSelectedCurrency] = useState({
    value: 'GBP',
    label: 'British Pound Sterling',
  });

  useEffect(() => {
    props.dispatch(getAllPrices());
    props.dispatch(getPriceForChart('USD'));
    return () => {};
  }, []);

  useEffect(() => {
    console.debug('Home props', props);
    AOS.init({
      // initialise with other settings
      duration: 2000,
    });
    return () => {};
  }, []);

  const handleChange = selectedCurrency => {
    setSelectedCurrency(selectedCurrency);
    props.dispatch(getPriceForChart(selectedCurrency.value));

    console.log(`Option selected:`, selectedCurrency);
    console.log(
      `Option selected:`,
      props.currencyConverter.allPrices.bpi[selectedCurrency.value].rate,
    );
  };

  return (
    <div>
      <Helmet>
        <title>CurrencyConverter</title>
        <meta name="description" content="Description of CurrencyConverter" />
      </Helmet>

      <Container fluid className="mainContainer">
        <div data-aos="fade-up" className="w-100">
          <Row>
            <Col xs="12">
              <p className="w-100 comingSoonText mb-5">
                Bitcoin Currency Converter
              </p>
            </Col>
            <Col xs="12" sm="3">
              <p className="w-100 mb-2 statsSmallText">1 Bitcoin equals</p>
              <Select
                className="w-100 mb-4"
                value={selectedCurrency}
                onChange={handleChange}
                options={options}
              />

              {selectedCurrency.value &&
              props.currencyConverter.allPrices.bpi ? (
                <>
                  <p className="w-100 conversionText mb-1">
                    {
                      props.currencyConverter.allPrices.bpi[
                        selectedCurrency.value
                      ].rate
                    }
                  </p>

                  <p className="w-100 successText mb-5">
                    {selectedCurrency.label}s
                  </p>
                </>
              ) : (
                <p className="w-100 conversionText mb-5">0</p>
              )}
            </Col>

            <Col xs="12" sm="9">
              <div>
                {/* <ResponsiveContainer width="100%" height="100%"> */}
                <AreaChart
                  width={950}
                  height={600}
                  className="chartCurrency"
                  data={props.currencyConverter.pricePerCurrency}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 20,
                    bottom: 10,
                  }}
                  stackOffset="silhouette"
                  baseValue="auto"
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#20C95E" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" type="category" />
                  <YAxis type="number" domain={[15000, 65000]} />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                    activeDot={{ r: 8 }}
                  />
                </AreaChart>
                {/* </ResponsiveContainer> */}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

CurrencyConverter.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currencyConverter: makeSelectCurrencyConverter(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CurrencyConverter);
