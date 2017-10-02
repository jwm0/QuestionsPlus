import React from 'react';
import Voting from 'Voting';
import ProfilePicture from 'ProfilePicture';

export default class ChildComment extends React.Component{
  render() {
    return (
      <div className="reply">
        <div className="reply-container">
          <div className="picture-wrapper"><ProfilePicture name={this.props.name} image={this.props.image}/></div>
          <div className="comment-section">
            <div className="comment-top">
              {this.props.name} <span className="id1">COMMENTED IT &#9679;</span> <span className="id2">today</span>
            </div>
            <div className="comment-bottom">
              <div className="comment-left">
                {this.props.text}
              </div>
              <div className="comment-right">
                <Voting score={this.props.score}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
