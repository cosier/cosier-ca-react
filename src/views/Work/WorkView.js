import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'utils';

@connect((state)=>({ isAuthenticated: state.auth.isAuthenticated  }))
class HomeView extends React.Component {
  render() {
    return (
        <div className={`${classes.homeView} home-view`}>
            home
        </div>
    )
  }
}

export {HomeView};
