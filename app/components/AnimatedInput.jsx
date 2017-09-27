import React from 'react';

export default class AnimatedInput extends React.Component {
  constructor (props) {
    super(props);
    this.onHandleClick = this.onHandleClick.bind(this);
    this.state = {
      display: false,
      open: false
    };
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  onHandleClick () {
    this.setState({display: !this.state.display, open: true});
  }
  render () {
    //let display = this.state.display ? 'flex' : 'none';
    let test = this.state.display ? 'boxVisible' : 'boxHidden';

    var styles = {
      boxHidden: {
        display: 'flex',
        boxSizing: 'border-box',
        opacity: 1,
        maxHeight: 0,
        overflow: 'hidden',
        width: '80%',
        backgroundColor: '#fefefe',
        boxShadow: 'inset 0px 0px 0px 1px rgba(240,240,240,0.7)',
        transition: 'all 1s ease-out',
      },
      boxVisible: {
        display: 'flex',
        overflow: 'hidden',
        boxSizing: 'border-box',
        width: '80%',
        opacity: 1,
        maxHeight: 400,
        backgroundColor: '#fefefe',
        boxShadow: 'inset 0px 0px 0px 1px rgba(240,240,240,0.7)',
        transition: 'all 1s ease',
      }
    }

    return (
      <div style={styles[test]}>
        {this.props.children}
      </div>
    )
  }
}
