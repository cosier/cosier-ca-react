import {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {modal} from 'react-redux-modal';
import {bindActionCreators} from 'redux';


import {
  TextField,
} from 'material-ui';

import {logoutRequest} from 'actions/auth/LoginActions';
import {searchRequest} from 'actions/SearchActions';
import {navigate} from 'actions/NavigationActions';

import Logo from './logo_emblem.png';

import SearchIcon     from 'react-material-icons/icons/action/search';
import DashboardIcon  from 'react-icons/lib/md/dashboard';
import WelcomeIcon    from 'react-material-icons/icons/action/face';
import UserAvatarIcon from 'react-material-icons/icons/action/account-circle';

import AccountIcon    from 'react-material-icons/icons/action/account-circle';
import BillingIcon    from 'react-material-icons/icons/action/credit-card';
import HelpIcon       from 'react-material-icons/icons/action/help-outline';
import LogoutIcon     from 'react-material-icons/icons/alert/error-outline';
import UserListsIcon  from 'react-icons/lib/md/contacts';

import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import UserMenuIcon   from 'material-ui/svg-icons/navigation/more-vert';

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
    logoutRequest,
    searchRequest,
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

  goAccount(evt) {
    evt.preventDefault();
    this.navigate('/account');
  }

  goBilling(evt) {
    evt.preventDefault();
    if (__DEV__) { console.log("goBilling") }
    this.navigate('/billing');
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

  goLists(evt) {
    evt.preventDefault();
    this.navigate('/lists');
  }

  logout(evt) {
    evt.preventDefault();
    this.props.logoutRequest();
  }

  search(evt) {
    evt.preventDefault();
    if (__DEV__) console.log("Header dispatch searchRequest")
    const terms = this.refs.search.getValue();
    this.props.searchRequest({ terms: terms });
  }

  buildMenuItem({text, path, icon }) {
    return(<div/>);
  }

  /**
   * Render Navigation Links
   * @return {Element} Navigation UI
   */
  renderNavLinks() {
    if (this.props.isAuthenticated) {
      return(
        <ul className='nav nav-menu-x navbar-nav navbar-right'>
          <li>
            <Link className='btn' to='/lists'>
              <UserListsIcon/>
              Lists
            </Link>
          </li>
          <li>
            <Link className='btn' to='/dashboard'>
              <DashboardIcon/>
              Dashboard
            </Link>
          </li>
          <li className='user-menu'>
            <IconMenu
              anchorOrigin={{"horizontal":"left","vertical":"bottom"}}
              className='user-icon-menu' iconButtonElement={<IconButton><UserMenuIcon/></IconButton>}>
              <div className='user-avatar-dropdown'>
                <UserAvatarIcon/>
              </div>
              <div className='dropdown-menu-items'>
                {this.buildMenuItem({ path: '/lists', label: 'Your Lists', icon: <UserListsIcon/> })}

                <MenuItem value='account'
                          onClick={this.goAccount.bind(this)}
                          primaryText="Account" leftIcon={<div><AccountIcon/></div>}/>

                <MenuItem value='billing'
                          onClick={this.goBilling.bind(this)}
                          primaryText="Billing" leftIcon={<div><BillingIcon/></div>}/>

                <MenuItem primaryText="Help" leftIcon={<div><HelpIcon/></div>} />
                <Divider/>
                <MenuItem primaryText="Log out" onClick={this.logout.bind(this)}
                            leftIcon={<div className='logout-icon'><LogoutIcon/></div>}/>
              </div>
            </IconMenu>
          </li>
        </ul>
      );
    } else {
      return(
        <ul className='nav navbar-nav navbar-right'>
            <li><Link style={this.btnStyle()}  className='btn login' to='/login'>
              Log In</Link></li>
            <li><Link style={this.btnStyle()} className='btn register' to='/signup'>
              Free Sign up</Link></li>
        </ul>);
    }
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

                <div className='collapse navbar-collapse'
                     id='bs-example-navbar-collapse-1'>
                  <form onSubmit={this.search.bind(this)}
                        className='header-search navbar-form navbar-left'
                        style={{display: 'inline-block'}}>
                      <div className='form-group'>
                        <TextField hintText='Crowdist Search'
                               className='search-field'
                               id='search-field'
                               ref='search'
                               name='search'/>
                        </div>
                        <button type='submit'
                          className='btn btn-default search-btn'>
                          <SearchIcon />
                        </button>
                    </form>
                    {this.renderNavLinks()}
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
