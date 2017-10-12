import React from 'react';
import * as actions from 'actions';
import {connect} from 'react-redux';
import blankImage from '../img/blank.png'

/*
NEEDS PROPS REVAMP, SHOULD ONLY TAKE USER ID AS PROP AND FETCH DATA FROM DATABASE
*/

export class ProfilePicture extends React.Component {
  constructor () {
    super();
    this.handlePictureClick = this.handlePictureClick.bind(this);
  }
  handlePictureClick () {
    var {name, image} = this.props;
    image = image ? image : blankImage;
    this.props.dispatch(actions.openModal(name, image));
  }
  render () {
    var {id, users} = this.props;
    console.log(id);
    var image = users.byID[id] ? users.byID[id].image : blankImage;
    var pictureStyle = {
        height: 75,
        width: 75,
        backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        borderRadius: '50%',
        margin: '0 auto',
        cursor: 'pointer',
    }
    return (
      <div style={pictureStyle} onClick={this.handlePictureClick}></div>
    )
  }
}

export default connect(
  (state) => {
    return {
      users: state.users
    }
  }
)(ProfilePicture);
