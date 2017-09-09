import {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const TALK = '/contact';
const SKILLS = '/skills';
const WORK = '/work';
const HELLO = '/hello';
const BLOG = '/blogger';

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
            return "active " + name.replace('/','');
        } else {
            // console.log(`name(${name}) does not match route(${r})`);
            return "inactive " + name.replace('/', '');
        }
    }



    render() {

        return (
            <div className='nav container'>
              <div className={`route-${this.props.route.replace(/^\//, '') || "hello"} navigation container`}>
                <div className='pointer'>
                  <div className='bar-wrap'>
                    <div className='bar left'></div>
                    <div className='bar center c2'></div>
                    <div className='bar center'></div>
                    <div className='bar right'></div>
                    <div className='bg'></div>
                  </div>
                </div>
                <Link to='/'
                      className={this.active(HELLO)}>
                  Intro
                  <div className='border'/>
                </Link>

                <Link to='/work'
                      className={this.active(WORK)}>
                  Work
                  <div className='border'/>
                </Link>

                <Link to='/skills'
                      className={this.active(SKILLS)}>
                  Skills
                  <div className='border'/>
                </Link>

                <Link to='/blogger'
                      className={this.active(BLOG)}>
                  Social
                  <div className='border'/>
                </Link>

                <Link to='/contact'
                      className={this.active(TALK)}>
                  Contact
                  <div className='border'/>
                </Link>
              </div>
            </div>
        );
    }

    click(link) {
    }

}


export {Navigation};
