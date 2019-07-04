import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ContactPage from '../components/ContactPage';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import ItemPage from '../components/ItemPage';
import NotFoundPage from '../components/NotFoundPage';
import PortfolioPage from '../components/PortfolioPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/portfolio" component={PortfolioPage} />
        <Route path="/portfolio/:id" component={ItemPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
