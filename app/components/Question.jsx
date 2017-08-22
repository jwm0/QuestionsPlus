import React from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import * as actions from 'actions';

import Peer from 'Peer';
import Voting from 'Voting';

export class Question extends React.Component {
  constructor () {
    super();
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }
  handleRedirect () {
    this.props.dispatch(actions.setCurrentQuestion(this.props.id));
  }
  handleFollow () {
    this.props.dispatch(actions.followQuestion(this.props.id));
  }
  render () {
    var {id, author, title, text, score, peers, related, conversations, users, answered, isPost, follow} = this.props;

    const followButton = follow ? "unfollow" : "follow";
    const arrayLen = users.length;

    var renderPeers = () => {
      return users.map((user, i) => {
        if(arrayLen == i+1){
          return (<Peer key={user.id} {...user} answered={answered}/>);
        }
        else{
          return (<Peer key={user.id} {...user}/>);
        }
      });
    };

    const QuestionDefault = () => {
      return(
        <div className="large-8 small-12 small-centered question">
          <div className="question-left">
            <div className="question-top">
              <div className="picture-wrapper"><div className="picture"></div></div>
              <div className="header-wrapper">
                <h3>{author} <span className="span-style">IS ASKING:</span> {score}</h3>
                <Link to="/comments" onClick={this.handleRedirect}><h3 style={{'margin':'0;font-style:italic'}}>{title}</h3></Link>
              </div>
            </div>
            <div className="question-bottom">
              <div className="question-side text-center">
                <div className="text-footer">ASKED</div>
              </div>
              <div className="question-fill">
                <div style={{width:'20%'}}>
                  <div className="question-blank">
                    <span className="blank-number">{related}</span>
                    <div className="peer-footer">
                      <div className="text-center" style={{fontStyle:'italic'}}>more<br/>activities</div>
                      <span className="profile-dot"></span>
                    </div>
                  </div>
                </div>
                {renderPeers()}
              </div>
            </div>
          </div>

          <div className="question-right">
            <h4>{related} related discussion</h4>
            <h4>{peers} peers involved</h4>
            <h4>{conversations} conversations</h4>
          </div>
        </div>
      );
    }

    const QuestionPost = () => {
      return (
        <div className="large-8 small-12 small-centered question" style={{padding:0}}>
          <div style={{width:'100%'}}>
            <div className="question-top">
              <div className="picture-wrapper"><div className="picture"></div></div>
              <div className="header-wrapper">
                <h3>{author} <span className="span-style">IS ASKING:</span> {score}</h3>
                <Link to="/comments" onClick={this.handleRedirect}><h3 style={{'margin':'0;font-style:italic'}}>{title}</h3></Link>
              </div>
              <div className="follow-button"><button onClick={this.handleFollow}>{followButton}</button></div>
            </div>
            <div className="question-bottom">
              <div className="question-side"></div>
              <div className="question-text">
                <div className="comment-left">
                  <p>{text}</p>
                </div>
                <div className="comment-right"><Voting score={score} id={id}/></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    if (isPost) return(QuestionPost());
    return(QuestionDefault());
  }
}

export default connect()(Question);
