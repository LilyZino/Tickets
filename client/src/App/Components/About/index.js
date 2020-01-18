import React from 'react';

export default function About() {
    return (
        <div>
            <div>
                <video autoPlay loop muted>
                    <source src="../Assest/Vids/Tomorrowland.mp3" type="video/mp3"/>
                </video>
                <div>
                    <h1>
                        <span>
                            Find your show today
                            <br />
                            You only live once
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