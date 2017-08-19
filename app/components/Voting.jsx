var React = require('react');

var random = function (){
  return Math.floor(Math.random() * 10);
};
var liczba = random();

export default class Voting extends React.Component {
  constructor () {
    super();
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.state = {
      upvoted: false,
      downvoted: false
    }
  }
  upvote () {
    this.setState({
      upvoted: !this.state.upvoted,
      downvoted: false
    });
  }
  downvote () {
    this.setState({
      upvoted: false,
      downvoted: !this.state.downvoted
    });
  }
  render () {
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
}

Voting.defaultProps = {
  number: liczba,
  upvote: 'upvote',
  downvote: 'downvote'
};
