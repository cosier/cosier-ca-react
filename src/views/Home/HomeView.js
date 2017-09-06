import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'utils';

@connect((state)=>({ isAuthenticated: state.auth.isAuthenticated  }))
class HomeView extends React.Component {
  render() {
    return (
        <div className='home-view row'>
            <div className='col-sm-6'>
                <div className='mobile'>
                    <div className='text'></div>
                    <div className='phone-base'></div>
                    <div className='ground'></div>
                </div>
            </div>
            <div className='col-sm-6'>
            </div>
        </div>
    )
  }
}

export {HomeView};
