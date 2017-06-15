import {RaisedButton as Button} from 'material-ui';
import React, {Component} from 'react';

export class RaisedButton extends Component {
  render() {
    return (
      <Button {...this.props}
      className={`${this.props.className || ''} raisedbutton`}
      label={this.props.label || 'Button'} />
    );
  }
}

export default RaisedButton;
