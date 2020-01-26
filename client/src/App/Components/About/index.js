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
            <section>
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
            </section>
            <aside>
                <a href="https://twitter.com/intent/tweet?screen_name=Tickets" className="twitter-mention-button" data-show-count="false">Tweet to FriendForYou</a>
                <br />
                <a className="twitter-timeline" data-width="400" data-height="500" href="https://twitter.com/IoTickets">Tweets by FriendForYou</a>
                <script>{!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + "://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "twitter-wjs")}</script>
                <script async src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>
            </aside>
        </div>
    );
}

