import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'utils';

@connect((state)=>({ isAuthenticated: state.auth.isAuthenticated  }))
class HomeView extends React.Component {
  render() {
    return (
        <div className='home-view view'>
            <div className='home-backer'></div>
            <div className='row top-content'>
                <div className='col-sm-6'>
                    <div className='mobile'>
                        <div className='text'></div>
                        <div className='phone-base'>
                            <div className='frame f1'/>
                            <div className='frame f2'/>
                            <div className='frame f3'/>
                            <div className='frame f4'/>
                            <div className='frame f5'/>
                            <div className='frame f6'/>
                            <div className='frame f7'/>
                            <div className='frame f8'/>
                            <div className='frame f9'/>
                            <div className='frame f10'/>
                            <div className='rock r1'/>
                            <div className='rock r2'/>
                            <div className='rock r3'/>
                            <div className='rock r4'/>
                            <div className='rock r5'/>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6 intro'>
                    <div className='box'>
                        <h1>Full stack</h1>
                        <h1 className='blue'><strong>Mobile</strong> & <strong>Cloud</strong> Development</h1>
                        <hr/>
                        <h2>With a focus on</h2>
                        <h3 className='focus'>UX Design & Usability</h3>
                        <div className='buttons'>
                            <div className='button work'>View Recent Work</div>
                            <div className='button quote'>Get a Free Quote</div>
                        </div>
                    </div>
                    <div className='clear'/>
                </div>
            </div>
            <div className='rowe info-baileys'>
                <div className='greeting'>
                    <h1>
                        <strong>Hello!</strong> I'm Bailey,<br/>
                    </h1>
                    <h2>A software developer by day<br/>
                        <span className='shift'>
                            <i>and visual designer by night...</i></span>
                    </h2>
                    <hr/>
                    <p className='one'>
                        I am obsessed with creating engaging User Experiences
                        with tools that let me get the job done quickly!
                        <span className='such-as'>
                            Such as React, NodeJS and Ruby on Rails.
                        </span>
                    </p>
                </div>
            </div>

            <div className='life'>
                <hr/>
                <p>
                    As a youngster, I first started out writing software in Perl, back in 1996. Since then I've graduated and got my first job in Java—which introduced me to the JavaEE bean scene—back in 2008.
                </p>
            </div>

            <div className='success'>
                <hr/>
                <p>
                    Since then, I've built large scale ecommerce solutions on various platforms and languages covering many APIs— from telephony PBX routing systems to Social Identity Web crawlers and intelligent scheduling heuristics.
                </p>
                <hr/>
                <p>
                    Resulting in a ridiculous amount of experience
                    <br/>in the many corners of the web.
                </p>
            </div>

        </div>
    )
  }
}

export {HomeView};
