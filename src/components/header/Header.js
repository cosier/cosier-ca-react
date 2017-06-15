import {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {modal} from 'react-redux-modal';
import {bindActionCreators} from 'redux';

import {
  TextField,
} from 'material-ui';

import {navigate} from 'actions/NavigationActions';

import Logo from './logo_emblem.png';

import IconMenu   from 'components/menu/IconMenu';
import MenuItem   from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider    from 'material-ui/Divider';

import {Link} from 'react-router-dom';

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

  btnStyle() {
    return (
      {
        fontFamily: 'Roboto Condensed, sans-serif',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#e0e0e0 !important'
      }
    )
  }

  buildMenuItem({text, path, icon }) {
    return(<div/>);
  }
  /**
   * Render Fn
   * @return {Element} HeaderUI
   */
  render() {
    return (
        <div className='header-container'>
            <nav className='navbar navbar-default'>
            <div className='container-fluid'>
                <div className='navbar-header'>
                    <button type='button'
                      className='navbar-toggle collapsed'
                      data-toggle='collapse'
                      data-target='#bs-example-navbar-collapse-1'
                      aria-expanded='false'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar' />
                        <span className='icon-bar' />
                        <span className='icon-bar' />
                    </button>
                    <Link className='navbar-brand' to='/' style={{top: '-10px'}}>
                      <img src={Logo} className='logo' />
                    </Link>
                </div>
            </div>
          </nav>
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
