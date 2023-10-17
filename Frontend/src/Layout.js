import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';
import Home from './components/Pages/Home';
import TradeCommition from './components/Pages/TradeCommition';
import Invoice from './components/Pages/Invoice';

const Layout = () => {
    const items = [
        { label: 'Home', icon: 'pi pi-fw pi-home', url: '/' },
        { label: 'Invoice', icon: 'pi pi-fw pi-calendar', url: '/invoice' },
        { label: 'TradeCommition', icon: 'pi pi-fw pi-pencil', url: '/tradeCommition' },

    ];

    return (
        <Router>
            <div className="layout">
                <div className="sidebar">
                    <TabMenu model={items} />
                </div>
                <div className="content">
                    <Route path="/" exact component={Home} />
                    <Route path="/tradeCommition" component={TradeCommition} />
                    <Route path="/invoice" component={Invoice} />
                </div>
            </div>
        </Router>
    );
};

export default Layout;
