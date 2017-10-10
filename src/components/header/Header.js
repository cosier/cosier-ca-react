import {
  Component
} from 'react';
import {
  connect
} from 'react-redux';

import {
  bindActionCreators
} from 'redux';

import PropTypes from 'prop-types';

import {
  navigate
} from 'actions/NavigationActions';

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
              <div className='bailey-cosier col-xs-4 col-sm-2'>
                <span className="first-name">Bailey</span>
                <span className="initial">C</span>
                <span className="last-name">Cosier</span>
              </div>

              <div className = 'emdash hidden-xxs col-xs-2'></div>
              <div className = 'quality col-xs-6'>
                <span className='v1 visible-xxs hidden-xs hidden-md hidden-lg'>Fullstack Dev.</span>
                <span className='v2 visible-xs hidden-xxs'>Fullstack Developer</span>
                <span className='v3 visible-sm visible-md visible-lg'>Fullstack Cloud Developer</span>
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
const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderUI);

export {
  Header,
  HeaderUI
}
