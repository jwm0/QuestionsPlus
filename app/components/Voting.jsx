var React = require('react');

var random = function (){
  return Math.floor(Math.random() * 10);
};
var liczba = random();
var Voting = React.createClass({
  getDefaultProps: function() {
    return {
      number: liczba,
      upvote: 'upvote',
      downvote: 'downvote'
    };
  },
  getInitialState: function () {
    return{
      upvoted: false,
      downvoted: false
    };
  },
  upvote: function () {
    this.setState({
      upvoted: !this.state.upvoted,
      downvoted: false
    });
  },
  downvote: function () {
    this.setState({
      upvoted: false,
      downvoted: !this.state.downvoted
    });
  },
  render: function () {
    var {number, upvote, downvote} = this.props;
    var {upvoted, downvoted} = this.state;

    function voting(){
      if(upvoted){
        number++;
        upvote = 'upvote-active';
      } else if(downvoted){
        number--;
        downvote = 'downvote-active';
      }
    };

    voting();
    return(
      <div className="vote">
        <div className={upvote} onClick={this.upvote}></div>
        <div className="score">{number}</div>
        <div className={downvote} onClick={this.downvote}></div>
      </div>
    );
  }
});

module.exports = Voting;
