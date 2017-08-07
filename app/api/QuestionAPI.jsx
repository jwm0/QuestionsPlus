var $ = require('jquery');

module.exports = {
  setQuestions: function (questions) {
    if ($.isArray(questions)) {
      localStorage.setItem('questions', JSON.stringify(questions));
      return questions;
    }
  },
  getQuestions: function () {
    var stringQuestions = localStorage.getItem('questions');
    var questions = [];

    try {
      questions = JSON.parse(stringQuestions);
    } catch (e) {
    }

    return $.isArray(questions) ? questions : [];
  },
  filterQuestions: function (questions, searchText) {
    var filteredQuestions = questions;

    // Filter by "My shelf" or "All questions"
    // filteredTodos = filteredTodos.filter((todo) => {
    //   return !todo.completed || showCompleted;
    // });

    // Filter by searchText
    filteredQuestions = filteredQuestions.filter((question) => {
      var text = question.title.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });

    // sort by recent or hot

    return filteredQuestions;
  }
};
