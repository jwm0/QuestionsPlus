var uuid = require('node-uuid');

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

export var addUsers = (users) => {
  return {
    type: 'LOAD_USERS',
    users
  }
}

export var addUser = (name, image) => {
  return {
    type: 'ADD_USER',
    name,
    image
  }
}

export var followQuestion = (id) => {
  return {
    type: 'TRIGGER_FOLLOW',
    id
  }
}

export var vote = (id, score, voteStatus) => {
  return {
    type: 'VOTE',
    id,
    voteStatus,
    score
  }
}

export var addQuestion = (id, author, title, text, peers, users, answered, comments) => {
  return {
    type: 'ADD_QUESTION',
    peers,
    author,
    title,
    text,
    users,
    answered,
    comments,
    id
  }
}

// comment under question
export var addComment = (questionid, user, text) => {
  var id = uuid();
  return {
    type: 'ADD_COMMENT',
    user,
    text,
    id,
    questionid
  }
}

// reply under comment
export var addChildComment = (parentID, user, text) => {
  var id = uuid();
  return {
    type: 'ADD_CHILD_COMMENT',
    parentID,
    childID: id,
    user,
    text
  }
}

export var addComments = (comments) => {
  return {
    type: 'LOAD_COMMENTS',
    comments
  }
}

export var setAnsweredComment = (commentID, questionID) => {
  return {
    type: 'SET_ANSWERED',
    commentID,
    questionID
  }
}

export var newComment = (user, text) => {
  var id = uuid();
  return (dispatch, getState) => {
    dispatch(addComment(user, text));
    //dispatch()
  }
}

// Creating a fake user database (6 users) for demonstration purposes
export var createUserDatabase = () => {
  var names = ['Elon', 'Selena', 'Jacob', 'Andrew', 'Barbra', 'Beth', 'Eva', 'Gary'];
  var images = [
    'https://randomuser.me/api/portraits/men/33.jpg',
    'https://randomuser.me/api/portraits/women/27.jpg',
    'https://randomuser.me/api/portraits/men/27.jpg',
    'https://randomuser.me/api/portraits/men/53.jpg',
    'https://randomuser.me/api/portraits/women/33.jpg',
    'https://randomuser.me/api/portraits/women/13.jpg',
    'https://randomuser.me/api/portraits/women/17.jpg',
    'https://randomuser.me/api/portraits/men/17.jpg'
  ];
  return (dispatch, getState) => {
    for (var i=0; i<names.length; i++) {
      dispatch(addUser(names[i], images[i]));
    }
  }
}



// For demo purposes
export var newQuestion = (title, text, peers, answered) => {
  // Passing id as argument in order to simulate user interaction inside a Post
  // otherwise id should be set in a reducer
  var id = uuid();
  return (dispatch, getState) => {
    if (peers == 0) {
      dispatch(addQuestion(id, 'Anonymous', title, text, peers, [], false));
    }
    else if (peers > 0) {
      var size = peers;
      if (size > 4) size = 4;
      var users = getState().users.allIDs.sort(function(){return 0.5 - Math.random()}).slice(0, size);
      dispatch(addQuestion(id, 'Anonymous', title, text, peers, users, answered));
      for (var i=0; i<users.length; i++){
        dispatch(addComment(id, users[i], 'Test comment #' + i));
      }
    }
  }
}

export var openModal = (user = "Anonymous", image) => {
  return {
    type: 'OPEN_MODAL',
    user,
    image
  }
}

export var hideModal = () => {
  return {
    type: 'HIDE_MODAL'
  }
}
