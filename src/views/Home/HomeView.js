import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'utils';
import {Clouds, Rocks, Mobile} from 'media';

@connect((state)=>({ isAuthenticated: state.auth.isAuthenticated  }))
class HomeView extends React.Component {
    render() {
        console.log("C1:", Clouds.C1);
    return (
        <div className='home-view view'>
            <div className='home-backer'></div>
            <div className='row top-content'>
                <div className='col-sm-6'>
                    <div className='mobile'>
                        <div className='clouds'>
                            <div className='c1'>
                                <div className='inner'>
                                </div>
                            </div>
                            <div className='c2'>
                                <div className='inner'>
                                </div>
                            </div>
                            <div className='c3'>
                                <div className='inner'>
                                </div>
                            </div>
                            <div className='c4'>
                                <div className='inner'>
                                </div>
                            </div>
                            <div className='c5'>
                                <div className='inner'>
                                </div>
                            </div>
                        </div>
                        <div className='text'></div>
                        <div className='phone-base'>
                            <div className='frame f1'>
                            </div>
                            <div className='frame f2'>
                            </div>
                            <div className='frame f3'>
                            </div>
                            <div className='frame f4'>
                            </div>
                            <div className='frame f5'>
                            </div>
                            <div className='frame f6'>
                            </div>
                            <div className='frame f7'>
                            </div>
                            <div className='frame f8'>
                            </div>
                            <div className='frame f9'>
                            </div>
                            <div className='frame f10'>
                            </div>
                            <div className='rock r1'>
                            </div>
                            <div className='rock r2'>
                            </div>
                            <div className='rock r3'>
                            </div>
                            <div className='rock r4'>
                            </div>
                            <div className='rock r5'>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6 intro'>
                    <div className='box'>
                        <h1>Full stack</h1>
                        <h1 className='mobile-and-cloud'><strong>Mobile</strong> & <strong>Cloud</strong> Development</h1>
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
