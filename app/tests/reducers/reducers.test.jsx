var expect = require('expect');
var reducers = require('reducers');
var uuid = require('node-uuid');

describe('Reducers',()=>{
  it('should search for ids', ()=>{

    var state = [];
    var id = 0;
    for (var i=0; i<1000000; i++){
      state.push(
        {
                  id: id++,
                  author: 'Anon',
                  title: 'Test',
                  text: 'test',
                  score: 1,
                  related: 10,
                  peers: 5,
                  conversations: 3,
                  answered: true,
                  follow: false,
                  submitted: 1131,
                  users: [
                    {
                      id: id++,
                      image: 'something',
                      name: 'anon',
                      score: 1,
                      voteStatus: {upvoted:false,downvoted:false}
                    },
                    {
                      id: id++,
                      image: 'something',
                      name: 'anon',
                      score: 1,
                      voteStatus: {upvoted:false,downvoted:false}
                    },
                    {
                      id: id++,
                      image: 'something',
                      name: 'anon',
                      score: 1,
                      voteStatus: {upvoted:false,downvoted:false}
                    }
                ],
                  voteStatus: {upvoted:false,downvoted:false}
        }
      )
    };
    var action = {
      type: 'VOTE3',
      id: 1202,
      voteStatus: null,
      score: 100,
      superID: 1200
    }
    var t0 = performance.now();
    reducers.questionsReducer(state,action);
    var t1 = performance.now();
    console.log("Searching questions took " + (t1 - t0) + " milliseconds.");
    // var res = reducers.questionsReducer(state,action);
    // expect(res[200].users[0].score).toEqual(100);
  });
});
