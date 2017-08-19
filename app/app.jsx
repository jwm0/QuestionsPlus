import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import {Provider} from 'react-redux';

import Main from 'Main';
import QuestionList from 'QuestionList';
import Post from 'Post';
var actions = require('actions');
var store = require('configureStore').configure();
var QuestionAPI = require('QuestionAPI');


store.subscribe(() => {
  var state = store.getState();
  console.log('New state', state);
  QuestionAPI.setQuestions(state.questions);
});

var initialQuestions = QuestionAPI.getQuestions();
store.dispatch(actions.addQuestions(initialQuestions));
store.dispatch(actions.createUserDatabase(6));

// load foundation
$(document).foundation();

// app css
require('!style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <Route path="/comments" component={Post}/>
        <IndexRoute component={QuestionList}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
