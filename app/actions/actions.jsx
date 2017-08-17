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

export var followQuestion = () => {
  return {
    type: 'TRIGGER_FOLLOW',
    follow: !follow
  }
}

export var addQuestion = (author, title, text, peers, users, answered) => {
  return {
    type: 'ADD_QUESTION',
    peers,
    author,
    title,
    text,
    users,
    answered
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

// For demo purposes, we create a...
export var newQuestion = (title, text, peers, answered) => {
  return (dispatch, getState) => {
    if (peers == 0) {
      dispatch(addQuestion('Anonymous', title, text, peers, [], false));
    }
    else if (peers > 0) {
      // var peerPool = [];
      // getState().users.map((user)=>{
      //   peerPool.push(user.id);
      // });
      // peerPool = peerPool.sort(function(){return 0.5 - Math.random()}).slice(0, peers);
      // dispatch(addQuestion('Anonymous', title, text, {count: peers, id: peerPool}));
      var size = peers;
      if (size > 4) size = 4;
      var users = getState().users.sort(function(){return 0.5 - Math.random()}).slice(0, size);
      dispatch(addQuestion('Anonymous', title, text, peers, users, answered));
    }
  }
}
