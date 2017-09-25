import React from 'react';
import ProfileModal from 'ProfileModal';
import {connect} from 'react-redux';
import * as actions from 'actions';
import ProfilePicture from 'ProfilePicture';

export class Peer extends React.Component {
  render () {
    var {answered, id, users, comments} = this.props;
    var userID = users.byID[comments.byID[id].author].name;
    var image = users.byID[comments.byID[id].author].image;
    var renderPeer = () => {
      if (answered) {
        return (
          <div style={{width:'20%'}}>
            <div className="question-profile">
              <div style={{marginTop:'20px'}}><ProfilePicture name={userID} image={image}/></div>
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
              <div style={{marginTop:'20px'}}><ProfilePicture name={userID} image={image}/></div>
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
      comments: state.comments,
      users: state.users
    }
  }
)(Peer);
