import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
  QuestionAPI.setComments(state.comments);
});

// ==== DEMO ONLY ====
// Check if a user database exists, otherwise create a fake one
if ($.isEmptyObject(QuestionAPI.getUsers())) {
  store.dispatch(actions.createUserDatabase());
  store.dispatch(actions.addUser('Admin', 'https://scontent.fwaw3-1.fna.fbcdn.net/v/t1.0-9/11216827_513406205492333_3223951621385475176_n.jpg?oh=0b19aa204208c69a737215740d3def54&oe=5A70FF38', 1))
  // save to local storage
  QuestionAPI.createUserDatabase(store.getState().users);
}
// ==== DEMO ONLY ====

var users = QuestionAPI.getUsers();
var comments = QuestionAPI.getComments();
var initialQuestions = QuestionAPI.getQuestions();

// load question and users from local storage
store.dispatch(actions.login('1'));
store.dispatch(actions.addUsers(users));
store.dispatch(actions.addComments(comments));
store.dispatch(actions.addQuestions(initialQuestions));



const App = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <Route path="comments/:questionid" component={Post}/>
          <IndexRoute component={QuestionList}/>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
);



// load foundation
$(document).foundation();

// app css
require('!style!css!sass!applicationStyles');

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
