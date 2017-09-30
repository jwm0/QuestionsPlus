import React from 'react';

export default class AnimatedInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      height: 1500
    }
  }
  componentDidUpdate(prevProps, prevState) {
    var height = this.refs.inputNode ? this.refs.inputNode.clientHeight : null;
    height = prevState.height > height ? prevState.height : height;
    console.log(height);
    if (this.props.open === false && prevProps.open === true) {
      this.setState({height: height});
    }
  }
  render () {
    var {height} = this.state;
    let test = this.props.open ? 'boxVisible' : 'boxHidden';
    var styles = {
      boxHidden: {
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
        maxHeight: 0,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: '#fefefe',
        boxShadow: 'inset 0px 0px 0px 1px rgba(240,240,240,0.7)',
        transition: 'all 0.5s ease',
      },
      boxVisible: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
        width: '100%',
        maxHeight: height,
        backgroundColor: '#fefefe',
        boxShadow: 'inset 0px 0px 0px 1px rgba(240,240,240,0.7)',
        transition: 'all 0.5s ease',
      }
    }

    return (
      <div style={styles[test]} ref="inputNode">
        {this.props.children}
      </div>
    )
  }
}
