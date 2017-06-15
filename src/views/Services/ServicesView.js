import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'utils';

@connect((state)=>({ isAuthenticated: state.auth.isAuthenticated  }))
class ServicesView extends React.Component {
  render() {
    return (
        <div className='services-view'>
            Services
        </div>
    )
  }
}

export {ServicesView};
