import React, {Component} from 'react';

import { FlatButton, RaisedButton } from 'components';
import Dialog from 'material-ui/Dialog';

class ConfirmModal extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  render() {
    const actions = [
      <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose}
      />,
      <FlatButton
          label="Submit"
          primary={true}
          disabled={true}
          onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Modal Dialog" onTouchTap={this.handleOpen} />
        <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={true}
            open={this.state.open}
        >
          Only actions can close this dialog.
        </Dialog>
      </div>
    );
  }
}

export {ConfirmModal}
