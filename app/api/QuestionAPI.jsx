var $ = require('jquery');
import * as actions from 'actions';

module.exports = {
  setQuestions: function (questions) {
    if ($.isArray(questions)) {
      localStorage.setItem('questions', JSON.stringify(questions));
      return questions;
    }
  },
  createUserDatabase: function (users) {
    localStorage.setItem('users', JSON.stringify(users));
    return users;
  },
  getQuestions: function () {
    var stringQuestions = localStorage.getItem('questions');
    var questions = [];

    try {
      questions = JSON.parse(stringQuestions);
    } catch (e) {}

    return $.isArray(questions) ? questions : [];
  },
  getUsers: function () {
    var stringUsers = localStorage.getItem('users');
    var users = {};

    try {
      users = JSON.parse(stringUsers);
    } catch (e) {}
    return users;
  },
  filterQuestions: function (questions, searchText, sortBy, filter) {
    var filteredQuestions = questions;

    // Filter by "My shelf" or "All questions"
    if(filter == 'my_shelf') {
      filteredQuestions = filteredQuestions.filter((question) => {
        return question.follow;
      });
    }


    // Filter by searchText
    filteredQuestions = filteredQuestions.filter((question) => {
      var text = question.title.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });

    // Sort by recent or hot
    if (sortBy == 'recent'){
      filteredQuestions.sort((a, b) => {
        if (a.submitted > b.submitted) {
          return -1;
        } else if (a.submitted < b.submitted) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortBy == 'hot') {
      filteredQuestions.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else if (a.score > b.score) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    return filteredQuestions;
  }
};
