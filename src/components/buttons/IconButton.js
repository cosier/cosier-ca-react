import {IconButton as Button} from 'material-ui';
import React, {Component} from 'react';

export class IconButton extends Component {
  render() {
    return (
      <Button {...this.props}
      className={`${this.props.className || ''} iconbutton`}
      label={this.props.label || 'Button'}
      style={{ ...(this.props.style || {}),
               paddingLeft: 0,
               paddingRight: 0,
               textAlign: 'center'
      }}
      />)
  }
}

export default IconButton;
