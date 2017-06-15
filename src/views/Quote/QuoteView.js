import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'utils';

@connect((state)=>({ isAuthenticated: state.auth.isAuthenticated  }))
class QuoteView extends React.Component {
  render() {
    return (
        <div className={`quote-view`}>
            Quote
        </div>
    )
  }
}

export {QuoteView};
