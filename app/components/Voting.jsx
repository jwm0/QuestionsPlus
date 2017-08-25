import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class Voting extends React.Component {
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
    var {score} = this.props;
    var {upvoted, downvoted} = this.state;

    if(!upvoted && !downvoted) score++;
    else if(!downvoted && upvoted) score--;
    else if (downvoted && !upvoted) score+=2;
    this.props.dispatch(actions.vote(this.props.id, score, this.state));
  }
  downvote () {
    this.setState({
      upvoted: false,
      downvoted: !this.state.downvoted
    });
    //---
    var {score} = this.props;
    var {upvoted, downvoted} = this.state;

    if(!upvoted && !downvoted) score--;
    else if(!upvoted && downvoted) score++;
    else if (upvoted && !downvoted) score-=2;
    this.props.dispatch(actions.vote(this.props.id, score, this.state));
  }
  render () {
    var {score} = this.props;
    var {upvoted, downvoted} = this.state;
    var upvote = 'upvote';
    var downvote = 'downvote';

    if(upvoted) upvote = 'upvote-active';
    else if(downvoted) downvote = 'downvote-active';

    return(
      <div className="vote">
        <div className={upvote} onClick={this.upvote}></div>
        <div className="score">{score}</div>
        <div className={downvote} onClick={this.downvote}></div>
      </div>
    );
  }
}

export default connect()(Voting);
