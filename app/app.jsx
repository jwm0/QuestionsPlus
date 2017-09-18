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

// load question from local storage
var initialQuestions = QuestionAPI.getQuestions();
store.dispatch(actions.addQuestions(initialQuestions));

// ==== DEMO ONLY ====
// Check if a user database exists, otherwise create one
var users = QuestionAPI.getUsers();
if ($.isEmptyObject(users)) {
  store.dispatch(actions.createUserDatabase(6));
  QuestionAPI.createUserDatabase(store.getState().users);
}
store.dispatch(actions.addUsers(users));



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
