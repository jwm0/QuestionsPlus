var $ = require('jquery');
import * as actions from 'actions';

module.exports = {
  setQuestions: function (questions) {
    if (!$.isEmptyObject(questions)) {
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
    var questions = {};

    try {
      questions = JSON.parse(stringQuestions);
    } catch (e) {}

    return $.isEmptyObject(questions) ? {} : questions;
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
    // filteredQuestions contains an array of question IDs
    var filteredQuestions = questions.allIDs;

    // Filter by "My shelf" or "All questions"
    if(filter == 'my_shelf') {
      filteredQuestions = filteredQuestions.filter((question) => {
        return questions.byID[question].follow;
      });
    }

    // Filter by searchText
    filteredQuestions = filteredQuestions.filter((question) => {
      var text = questions.byID[question].title.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });

    // Sort by recent or hot
    if (sortBy == 'recent'){
      filteredQuestions.sort((a, b) => {
        if (questions.byID[a].submitted > questions.byID[b].submitted) {
          return -1;
        } else if (questions.byID[a].submitted < questions.byID[b].submitted) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortBy == 'hot') {
      filteredQuestions.sort((a, b) => {
        if (questions.byID[a].score < questions.byID[b].score) {
          return 1;
        } else if (questions.byID[a].score > questions.byID[b].score) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    return filteredQuestions;
  }
};
