import React from 'react';
import ProfileModal from 'ProfileModal';
import {connect} from 'react-redux';
import * as actions from 'actions';
import ProfilePicture from 'ProfilePicture';

export class Peer extends React.Component {
  render () {
    var {answered, id, comments} = this.props;
    try {
      var userID = comments.byID[id].author;
    } catch(e) {
      userID = null;
    }

    var renderPeer = () => {
      if (answered) {
        return (
          <div style={{width:'20%'}}>
            <div className="question-profile">
              <div style={{marginTop:'20px'}}><ProfilePicture id={userID} name={userID}/></div>
              <div className="peer-footer">
                <div className="text-footer" style={{'borderTop': '2px solid rgba(0,0,0,0.6)'}}><b>ANSWERED</b></div>
                <span className="profile-dot" style={{backgroundColor:'#222'}}></span>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div style={{width:'20%'}}>
            <div className="question-profile">
              <div style={{marginTop:'20px'}}><ProfilePicture id={userID} name={userID}/></div>
              <div className="peer-footer">
                <div className="text-footer">COMMENTED</div>
                <span className="profile-dot"></span>
              </div>
            </div>
          </div>
        )
      }
    }
    return (
      renderPeer()
    );
  }
}

export default connect(
  (state) => {
    return {
      comments: state.comments
    }
  }
)(Peer);
