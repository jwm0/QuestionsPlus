import React from 'react';
import Voting from 'Voting';

export default class Comment extends React.Component {
  render() {
    var {id, name, image, score} = this.props;
    return(
      <div>
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
                  <Voting id={id} score={score}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
