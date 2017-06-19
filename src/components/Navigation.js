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
            <div className={`route-${this.props.route.replace(/^\//, '')} navigation`}>
                <img src={PointerImage} className='pointer'/>
                <Link to='/'
                      className={this.active(HELLO)}>
                    Hello
                </Link>

                <Link to='/work'
                      className={this.active(WORK)}>
                    Client Work
                </Link>

                <Link to='/services'
                      className={this.active(SERVICES)}>
                    Services
                </Link>

                <Link to='/talk'
                      className={this.active(TALK)}>
                    Let's Talk
                </Link>
            </div>
        );
    }

    click(link) {
    }

}


export {Navigation};
