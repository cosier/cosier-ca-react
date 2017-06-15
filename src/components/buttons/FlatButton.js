import {FlatButton as Button} from 'material-ui';
import React, {Component} from 'react';

export class FlatButton extends Component {
  render() {
    return (
      <Button {...this.props}
      className={`${this.props.className || ''} flatbutton`}
      label={this.props.label || 'Button'}
      style={{ ...(this.props.style || {}),
               paddingLeft: 0,
               paddingRight: 0,
               textAlign: 'center'
      }}
      />)
  }
}

export default FlatButton;
