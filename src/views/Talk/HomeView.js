import React from 'react';
import classes from './HomeView.scss';
import {connect} from 'react-redux';
import {Link} from 'utils';

import Logo from 'components/header/logo_trans.png';

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
