import React from 'react';
import * as actions from 'actions';
import {connect} from 'react-redux';
import blankImage from '../img/blank.png'

export class ProfilePicture extends React.Component {
  constructor () {
    super();
    this.handlePictureClick = this.handlePictureClick.bind(this);
    var test = 'something';
  }
  handlePictureClick () {
    var {name, image} = this.props;
    image = image ? image : blankImage;
    this.props.dispatch(actions.openModal(name, image));
  }
  render () {
    var {name, image} = this.props;
    var pictureStyle = {
        height: 75,
        width: 75,
        backgroundImage: `url(${image ? image : blankImage})`,
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

export default connect()(ProfilePicture);
