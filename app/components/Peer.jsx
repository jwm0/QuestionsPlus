import React from 'react';
import {connect} from 'react-redux';

export class Peer extends React.Component {
  render () {
    var {answered, name, image, id} = this.props;
    // var random = Math.floor(Math.random() * 5); // random number (0-5)v
    // var id = users[random].id;
    // var name = users[random].name;
    // var image = users[random].image;
    var renderPeer = () => {
      if (answered) {
        return (
          <div className="question-profile">
            <div className="picture" style={{backgroundImage: `url(${image})`}}></div>
            <div className="text-footer" style={{'borderTop': '2px solid rgba(0,0,0,0.6)'}}><b>ANSWERED</b></div>
            <span>&#9679;</span>
          </div>
        )
      } else {
        return (
          <div className="question-profile">
            <div className="picture" style={{backgroundImage: `url(${image})`}}></div>
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
