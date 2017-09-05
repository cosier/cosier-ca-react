import {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  modal
} from 'react-redux-modal';
import {
  bindActionCreators
} from 'redux';

import PropTypes from 'prop-types';

import {
  TextField,
} from 'material-ui';

import {
  navigate
} from 'actions/NavigationActions';

import IconMenu from 'components/menu/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

import {
  Link
} from 'react-router-dom';

import {
  Navigation
} from 'components/Navigation';

import {
  LogoMini
} from 'media';

/**
 * Map state helper
 * @param {object} state
 * @return {object} Local state
 */
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      navigate
    }, dispatch)
  };
}

/**
 * Description for H.
 */
class HeaderUI extends Component {

  navigate(url) {
    this.props.navigate(url);
  }

  /**
   * Render Fn
   * @return {Element} HeaderUI
   */
  render() {

    return (
        <div className = 'header'>
          <div className = 'wrapper'>

            <div className = 'header-core container'>
              <div className='bailey-cosier col-xs-2'>
                <span className="first-name"> Bailey </span>
                <span className="last-name"> Cosier </span>
              </div>

              <div className = 'emdash hidden-xs col-xs-3'></div>
              <div className = 'visible-xs col-xs-2'></div>
              <div className = 'quality col-xs-6'>
                <span className='visible-xs'>Fullstack App Development</span>
                <span className='visible-sm visible-md visible-lg'>Fullstack Application Development</span>
              </div>
            </div>
          </div>
          <Navigation / >
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
export {
  Header,
  HeaderUI
}
