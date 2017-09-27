import React from 'react';
import Voting from 'Voting';
import {connect} from 'react-redux';
import ProfilePicture from 'ProfilePicture';

export class Comment extends React.Component {
  render() {
    var {id, authorName, image, text, score, hasChild} = this.props;
    var reply = ()=>{
      if(hasChild){
        return(
          <div id="reply">
            <div className="large-8 medium-10 small-12 small-centered">
              <div className="reply-container">
                <div className="picture-wrapper"><ProfilePicture name="Andrew"/></div>
                <div className="comment-section">
                  <div className="comment-top">
                    Andrew <span className="id1">COMMENTED IT &#9679;</span> <span className="id2">today</span>
                  </div>
                  <div className="comment-bottom">
                    <div className="comment-left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pellentesque congue dolor a ultrices. Nulla facilisi. Donec commodo pretium leo, eu laoreet justo.
                    </div>
                    <div className="comment-right">
                      <Voting score={1}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    };

    return(
      <div>
        <div className="large-8 medium-10 small-12 small-centered">
          <div className="comment-container">
            <div className="picture-wrapper"><ProfilePicture name={authorName} image={image}/></div>
            <div className="comment-section">
              <div className="comment-top">
                {authorName} <span className="id1">COMMENTED IT &#9679;</span> <span className="id2">yesterday</span>
              </div>
              <div className="comment-bottom">
                <div className="comment-left">
                  {text}
                </div>
                <div className="comment-right">
                  <Voting id={id} score={score}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        {reply()}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      users: state.users
    }
  }
)(Comment);
