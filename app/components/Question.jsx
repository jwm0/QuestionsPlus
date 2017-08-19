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
  }
  handleRedirect () {
    this.props.dispatch(actions.setCurrentQuestion(this.props.id));
  }
  render () {
    var {id, author, title, text, score, peers, related, conversations, users, answered} = this.props;

    const arrayLen = users.length;
    var renderPeers = () => {
      return users.map((user, i) => {
        if(arrayLen == i+1){
          return (
            <Peer key={user.id} {...user} answered={answered}/>
          );
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
                <div className="question-blank">
                  <div className="text-footer"><span style={{marginBottom:'60px;font-size:20px'}}><b>{related}</b></span><span>more</span><span>activities</span></div>
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
        <div className="large-8 small-12 small-centered">
          <div className="question" style={{height:'300px'}}>
              <div className="question-top">
                <div className="picture-wrapper"><div className="picture"></div></div>
              <div className="header-wrapper">
                <h3 >{author} <span className="span-style">IS ASKING:</span></h3>
                <h3 style={{'margin':'0;font-style:italic'}}>{title}</h3>
              </div>
              </div>
              <div>
                <div className="question-side"></div>
                <div style={{float:'left;width:85%;padding: 10px 20px'}}>
                  <div className="comment-left">
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                  </div>
                  <div className="comment-right"><Voting/></div>
                </div>
              </div>
          </div>
        </div>
      )
    }

    return(
      QuestionDefault()
    );
  }
}

export default connect()(Question);
