import {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const TALK = '/talk';
const SERVICES = '/services';
const WORK = '/work';
const HELLO = '/hello';

import PointerImage from '../../public/images/pointer.png';

const mapStateToProps = (state)=> {
    return {
        route: state.router.location.pathname
    }
}

@connect(mapStateToProps)
class Navigation extends Component {

    constructor() {
        super();
        this.now = HELLO;
    }

    active(name) {
        let r = this.props.route;

        if (r == "/" || r == "") {
            r = HELLO;
        }

        if (name == r) {
            return "active";
        } else {
            return "inactive";
        }
    }



    render() {

        return (
            <div className='nav container'>
              <div className={`route-${this.props.route.replace(/^\//, '') || "hello"} navigation`}>
                <img src={PointerImage} className='pointer'/>
                <Link to='/'
                      className={this.active(HELLO)}>
                  Intro
                </Link>

                <Link to='/work'
                      className={this.active(WORK)}>
                  Work
                </Link>

                <Link to='/services'
                      className={this.active(SERVICES)}>
                  Skills
                </Link>

                <Link to='/talk'
                      className={this.active(TALK)}>
                  Contact
                </Link>
              </div>
            </div>
        );
    }

    click(link) {
    }

}


export {Navigation};
