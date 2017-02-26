import React, {PropTypes} from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';

import Main from './view/Main';
import Home from './view/Home';
import Mine from './view/Mine';
import Login from './view/Login';
import Course from './view/Course';
import Password from './view/Password';
import Apply from './view/Apply';

import database from './util/database';

export default function ({history}) {

  const validate = function (next, replace, callback) {
    if ((database.getToken() == '' || database.getToken() == null) && next.location.pathname != '/login') {
      replace('/login');
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
          <Route path="mine" component={Mine}/>
        </Route>
        <Route path="course/:course_id" component={Course}/>
        <Route path="password" component={Password}/>
        <Route path="apply" component={Apply}/>
      </Route>
    </Router>
  );
};
