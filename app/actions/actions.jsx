export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  }
}

export var setFilter = (filter) => {
  return {
    type: 'CHANGE_FILTER',
    filter
  }
}

export var setSort = (sortBy) => {
  return {
    type: 'SET_SORT',
    sortBy
  }
}

export var addQuestions = (questions) => {
  return {
    type: 'ADD_QUESTIONS',
    questions
  }
}

export var addUser = (name, image) => {
  return {
    type: 'NEW_USER',
    name,
    image
  }
}

export var addQuestion = (author, title, text) => {
  return {
    type: 'ADD_QUESTION',
    author,
    title,
    text
  }
}

// Creating a fake user database (6 users) for demonstration purposes
export var createUserDatabase = (size) => {
  var names = ['Elon', 'Selena', 'Jacob', 'Andrew', 'Barbra', 'Beth'];
  return (dispatch, getState) => {
    for (var i=0; i<size; i++) {
      dispatch(addUser(names[i], undefined));
    }
  }
}

// For demo purposes, we create a...
export var newQuestion = (title, text, peers) => {
  return (dispatch, getState) => {
    if (typeof peers === 'number' && peers > 0) {
      var user_id = getState();
      dispatch(addQuestion(title, text))
    }
  }
}
