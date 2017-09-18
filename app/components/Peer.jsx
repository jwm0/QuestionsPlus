import React from 'react';
import ProfileModal from 'ProfileModal';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class Peer extends React.Component {
  constructor () {
    super();
    this.handlePictureClick = this.handlePictureClick.bind(this);
  }
  handlePictureClick () {
    var {name, image} = this.props;
    this.props.dispatch(actions.openModal(name, image));
  }
  render () {
    var {answered, id, users} = this.props;
    var image = users.byID;
    var renderPeer = () => {
      if (answered) {
        return (
          <div style={{width:'20%'}}>
            <div className="question-profile">
              <div className="picture" style={{backgroundImage: `url(${users.byID[id].image})`}} onClick={this.handlePictureClick}></div>
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
              <div className="picture" style={{backgroundImage: `url(${users.byID[id].image})`}} onClick={this.handlePictureClick}></div>
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
      users: state.users
    }
  }
)(Peer);
