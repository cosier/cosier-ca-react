import React from 'react';
import {Header} from 'components/header/Header';
import classes from 'layouts/CoreLayout/CoreLayout.scss';

/**
 * CoreLayout
 */
export default class CoreLayout extends React.Component {

  static propTypes = {
    children: React.PropTypes.array.isRequired,
  }

  /**
   * Render
   * @return {Element} Layout container
   */
  render() {
    return (
      <div style={{height: '100%'}} className='app-container'>

        <div className="container-fluid no-padding text-center core-layout">
          <Header />
          <div className='fade-anim core-children'>
            {this.props.children}
          </div>
        </div>
        <div className='page-bg'/>
      </div>
    );
  }
}

export {CoreLayout}
