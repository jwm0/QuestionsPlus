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
    var {answered, name, image, id} = this.props;
    var renderPeer = () => {
      if (answered) {
        return (
          <div className="question-profile">
            <div className="picture" style={{backgroundImage: `url(${image})`}} onClick={this.handlePictureClick}></div>
            <div className="text-footer" style={{'borderTop': '2px solid rgba(0,0,0,0.6)'}}><b>ANSWERED</b></div>
            <span>&#9679;</span>
          </div>
        )
      } else {
        return (
          <div className="question-profile">
            <div className="picture" style={{backgroundImage: `url(${image})`}} onClick={this.handlePictureClick}></div>
            <div className="text-footer">COMMENTED</div>
          </div>
        )
      }
    }
    return (
      renderPeer()
    );
  }
}

export default connect()(Peer);
