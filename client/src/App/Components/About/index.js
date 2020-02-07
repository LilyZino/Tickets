import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Video from '../../../Assets/Vids/tomorrowland.mp4';

const useStyles = makeStyles((theme) => ({
    columns: {
        columnCount: 2
    },
    twiterFeed: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

export default function About() {
    const classes = useStyles();

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
                <Typography component="h2" variant="h2">About us</Typography>
                <div className={classes.columns}>
                    <Typography>
                        We believe that no ticket should ever go to waste.
                    </Typography>
                    <Typography>
                        This is why we created the best platform for people to sell
                        their unwanted tickets and for others to buy the tickets to
                        their favorites shows.
                    </Typography>
                    <Typography>
                        Our goal is to provide the best platform for selling and purchasing second hand concerts tickets
                    </Typography>
                </div>
            </section>
            <aside className={classes.twiterFeed}>
                <a href="https://twitter.com/intent/tweet?screen_name=Tickets" className="twitter-mention-button" data-show-count="false">Tweet to FriendForYou</a>
                <br />
                <a className="twitter-timeline" data-width="800" data-height="500" href="https://twitter.com/IoTickets">Tweets by FriendForYou</a>
                <script>{!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + "://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "twitter-wjs")}</script>
                <script async src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>
            </aside>
        </div>
    );
}

