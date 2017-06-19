import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'utils';

@connect((state)=>({ isAuthenticated: state.auth.isAuthenticated  }))
class WorkView extends React.Component {
  render() {
    return (
        <div className={`work-view`}>
            client work
        </div>
    )
  }
}

export {WorkView};
