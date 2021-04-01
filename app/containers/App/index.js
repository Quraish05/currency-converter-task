/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import CurrencyConverter from 'containers/CurrencyConverter/Loadable';
import Demo from 'containers/Demo/Loadable';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(1250px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Bitcoin Currency Converter"
        defaultTitle="React.js Bitcoin Currency Converter"
      >
        <meta name="description" content="A React.js Bitcoin Currency Converter application" />
      </Helmet>
      {/* <Header /> */}
      <Switch>
        <Route path="/" component={CurrencyConverter} />
        <Route path="/demo" component={Demo} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}
