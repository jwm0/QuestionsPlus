import React from 'react';
import Comment from 'Comment';

export default class CommentList extends React.Component {
  render() {
    var {users} = this.props;

    var renderComments = () => {
      return users.map((user)=>{
        return (
          <div key={user.id}>
            <Comment {...user}/>
            <div className="button-label"><button className="button-custom" style={{margin:0}}>COMMENT</button></div>
          </div>
        )
      });
    }

    return (
      <div>
        {renderComments()}
      </div>
    )
  }
}
