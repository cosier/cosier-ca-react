import {FlatButton as Button} from 'material-ui';
import React, {Component} from 'react';
import {Link} from 'utils';
import Icon from 'react-icons/lib/md/chevron-left';

export class BackButton extends Component {
  render() {
    return (
      <Link to={this.props.to || '#'} className='back-btn-link'>
        <Button className='back-btn'
                icon={<Icon/>}
                label={this.props.label || 'Go Back'}
                style={{opacity: '1', width: 153}}/>
      </Link>
    );
  }
}

export default BackButton;
