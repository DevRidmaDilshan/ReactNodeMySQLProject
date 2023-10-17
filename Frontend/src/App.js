import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './components/Pages/Home';
import Invoice from './components/Pages/Invoice';
import TradeCommition from './components/Pages/TradeCommition'
import axios from 'axios';
import Layout from './Layout';




const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/tradeCommition" component={TradeCommition} />
            <Route path="/invoice" component={Invoice} />
            {/* Add more routes here */}
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
