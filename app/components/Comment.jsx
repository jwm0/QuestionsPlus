import React from 'react';
import Voting from 'Voting';

export default class Comment extends React.Component {
  render() {
    var {name, image} = this.props;
    return(
      <div style={{marginTop:'20px'}}>
        <div className="large-8 small-12 small-centered">
          <div className="comment-container">
            <div className="picture-wrapper"><div className="picture" style={{backgroundImage: `url(${image})`}}></div></div>
            <div className="comment-section">
              <div className="comment-top">
                {name} <span className="id1">COMMENTED IT &#9679;</span> <span className="id2">yesterday</span>
              </div>
              <div className="comment-bottom">
                <div className="comment-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pellentesque congue dolor a ultrices. Nulla facilisi. Donec commodo pretium leo, eu laoreet justo.
                </div>
                <div className="comment-right">
                  <Voting/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
