var React = require('react');

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
    var {score} = this.props;
    var {upvoted, downvoted} = this.state;
    var upvote = 'upvote';
    var downvote = 'downvote';

    function voting(){
      if(upvoted){
        score++;
        upvote = 'upvote-active';
      } else if(downvoted){
        score--;
        downvote = 'downvote-active';
      }
    };

    voting();
    return(
      <div className="vote">
        <div className={upvote} onClick={this.upvote}></div>
        <div className="score">{score}</div>
        <div className={downvote} onClick={this.downvote}></div>
      </div>
    );
  }
}
