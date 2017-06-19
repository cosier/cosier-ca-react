import {Component} from 'react';
import {connect} from 'react-redux';
import {modal} from 'react-redux-modal';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {
  TextField,
} from 'material-ui';

import {navigate} from 'actions/NavigationActions';

import IconMenu   from 'components/menu/IconMenu';
import MenuItem   from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider    from 'material-ui/Divider';

import {Link} from 'react-router-dom';

import {Navigation} from 'components/Navigation';


import {LogoMini} from 'media';

/**
 * Map state helper
 * @param {object} state
 * @return {object} Local state
 */
function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch){
  return {...bindActionCreators({
    navigate
  }, dispatch)}
}


/**
 * Description for H.
 */
class HeaderUI extends Component {

  navigate(url) {
    this.props.navigate(url)
  }

  /**
   * Render Fn
   * @return {Element} HeaderUI
   */
    render() {


        return (
            <div className='header'>
                <div className='container'>
                <div className='header-core'>
                <Link className='navbar-brand' to='/' style={{top: '-10px'}}>
                <img src={LogoMini} className='logo-container' />
                </Link>
                <div className='bailey-cosier'>
                <span className="first-name">Bailey</span>
                <span className="last-name">Cosier</span>
                </div>
                <div className='emdash'></div>
                <div className='quality'>Quality Application Development</div>
                </div>
                </div>
                <Navigation />
        </div>
    );
  }
}

/**
 * PropTypes
 */
HeaderUI.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

/**
 * @class HeaderUI yo
 * @namespace HeaderUI
 * @absract HeaderUI
 */
const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderUI)
export {Header, HeaderUI};
