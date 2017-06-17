import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Root from './Root';

/**
 * AppContainer
 */
export default class SimpleRoot extends Component {

  render(){
    return(<div><Root {...this.props}/></div>)
  }

}

export {SimpleRoot}
