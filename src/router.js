import React, {PropTypes} from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';

import Main from './view/Main';
import Home from './view/Home';
import Category from './view/Category';
import Cart from './view/Cart';
import Mine from './view/Mine';
import Login from './view/Login';
import ProductDetail from './view/ProductDetail';
import Check from './view/Check';
import OrderIndex from './view/OrderIndex'
import DeliveryIndex from './view/DeliveryIndex'

import database from './util/database';

export default function ({history}) {

    const validate = function (next, replace, callback) {
        if ((database.getToken() == '' || database.getToken() == null) && next.location.pathname != '/login') {
            // replace('/login');
        }

        callback();
    };

    return (
        <Router history={history}>
            <Route path="/">
                <IndexRedirect to="home"/>
                <Route path="login" component={Login}/>
                <Route component={Main} onEnter={validate}>
                    <Route path="home" component={Home}/>
                    <Route path="category" component={Category}/>
                    <Route path="cart" component={Cart}/>
                    <Route path="mine" component={Mine}/>
                </Route>
                <Route path="product/detail/:product_id" component={ProductDetail}/>
                <Route path="check" component={Check}/>
                <Route path='order/index' component={OrderIndex}/>
                <Route path="delivery/index" component={DeliveryIndex}/>
            </Route>
        </Router>
    );
};
