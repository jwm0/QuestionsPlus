import React from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';

import Peer from 'Peer';

export class Question extends React.Component {
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

    return(
      <div className="large-8 small-12 small-centered question">
        <div className="question-left">
          <div className="question-top">
            <div className="picture-wrapper"><div className="picture"></div></div>
            <div className="header-wrapper">
              <h3>{author} <span className="span-style">IS ASKING:</span> {score}</h3>
              <Link to="/comments"><h3 style={{'margin':'0;font-style:italic'}}>{title}</h3></Link>
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
}

export default connect()(Question);
