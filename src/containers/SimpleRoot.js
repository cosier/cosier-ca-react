import React, {PropTypes, Component} from 'react';
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
