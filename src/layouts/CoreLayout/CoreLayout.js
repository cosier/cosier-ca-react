import React from 'react';
import Header from 'components/header';
import Footer from 'components/footer';

/* import classes from 'layouts/CoreLayout/CoreLayout.scss';*/
import classes from '../../styles/main.scss';
import PropTypes from 'prop-types';

/**
 * CoreLayout
 */
export default class CoreLayout extends React.Component {

  static propTypes = {
    //   children: PropTypes.array.isRequired,
      initialised: PropTypes.bool.isRequired,
  }

  /**
   * Render
   * @return {Element} Layout container
   */
    render() {
        // Set a class marker identifier for first-load semantics
        // let first_load_id = (this.props.first_load) ? 'first-load' : '';
        let children = this.props.children;

        if (!this.props.initialised) {
            children = <div>loading</div>;
        }

        return (
            <div style={{height: '100%'}} className={`app-container`}>
                <div className="container-fluid no-padding core-layout">
                    <div id='toggle'><span/><span/><span/></div>
                    <Header />
                    <div className='core-children'>
                        {children}
                    </div>
                </div>
                <div className='page-bg'/>
                <Footer/>
            </div>
        );
  }
}

export {CoreLayout}
