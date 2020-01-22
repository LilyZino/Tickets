import React from 'react';
import Video from '../../../Assets/Vids/tomorrowland.mp4';

export default function About() {
    return (
        <div>
            <div id="videoDiv">
                <div id="videoBlock">
                    <video id="video" autoPlay loop muted>
                        <source src={Video} type="video/mp4" />
                    </video>
                </div>
                <div id="videoMessage">
                    <h1>
                        <span>
                            Life is built on memories
                            <br />
                            Find your show today
                        </span>
                    </h1>
                </div>
            </div>
            <div>
                <h2>About us</h2>
                <div>
                    <p>
                        We believe that no ticket should ever go to waste.
                    </p>
                    <p>
                        This is why we created the best platform for people to sell
                        their unwanted tickets and for others to buy the tickets to 
                        their favorite artists.
                    </p>
                </div>
            </div>
        </div>
    );
}

