import React from 'react';
import Comment from 'Comment';

export default class CommentList extends React.Component {
  render() {
    var {users} = this.props;

    var renderComments = () => {
      var hasChild = true;
      return users.map((user, i)=>{
        if (i>0) hasChild=false;
        return (
          <div key={user.id}>
            <Comment {...user} hasChild={hasChild}/>
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
