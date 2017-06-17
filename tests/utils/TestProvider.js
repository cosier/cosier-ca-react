import {Component} from 'react';
import {Provider} from 'react-redux';
import {reducer as formReducer} from 'redux-form';
import {combineReducers, createStore} from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

/**
 * Test wrapper for root Provider
 */
export default class TestProvider extends Component {

  /**
   * Constructor
   * return {void} Nothing
   */
  constructor() {
    super();
    const reducers = combineReducers({form: formReducer});
    this.store = createStore(reducers);
  }

  /**
   * Render
   * @return {Element} Provider
   */
  render() {
    return(
      <Provider store={this.props.store || this.store}>
        <MuiThemeProvider>
          {props.children}
        </MuiThemeProvider>
      </Provider>
    );
  }
}

TestProvider.propTypes = {
  store: PropTypes.object.isRequired,
};
