import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'utils';

@connect((state)=>({ isAuthenticated: state.auth.isAuthenticated  }))
class SkillsView extends React.Component {
  render() {
    return (
        <div className='skills-view view'>
            Skills
        </div>
    )
  }
}

export {SkillsView};
