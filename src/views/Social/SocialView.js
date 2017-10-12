import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'utils';

@connect((state)=>({ isAuthenticated: state.auth.isAuthenticated  }))
class SocialView extends React.Component {
  render() {
    return (
        <div className='talk-view view'>
            Social details
        </div>
    )
  }
}

export {SocialView};
