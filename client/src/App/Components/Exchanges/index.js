import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { authenticationService } from '../../_services';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop: '10px'
    },
    title: {
        marginTop: '10px'
    },
    pos: {
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: '14px'
    }
});

export default function Exchanges() {
    // const [graphData, setGraphData] = useState({ nodes: [{ id: 'init' }], links: [] });
    // const theme = useTheme();
    const classes = useStyles();
    const [exchanges, setExchanges] = useState([]);
    const [userId, setUserId] = useState();
    // const graph = useRef();

    // const graphConfig = {
    //     directed: true,
    //     highlightDegree: 0,
    //     node: {
    //         color: theme.palette.secondary.main,
    //         labelProperty: 'name',
    //         size: 900,
    //         fontSize: 12,
    //         highlightFontSize: 16,
    //         highlightFontWeight: 'bold',
    //         highlightStrokeColor: 'black',
    //         highlightStrokeWidth: 3,
    //     },
    //     link: {
    //         color: theme.palette.primary.main,
    //         type: 'CURVE_SMOOTH',
    //         // semanticStrokeWidth:true,
    //         strokeWidth: 3
    //     }
    // };

    useEffect(() => {
        (async () => {
            const userId = authenticationService.currentUserValue.data
                ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;

            const exchangesData = (await axios.get(`/api/exchangeCycles/${userId}`)).data;
            console.log(exchangesData);

            setExchanges(exchangesData);
            setUserId(userId);


            // const formatedGraphData = {
            //     nodes: cycle.map((node) => ({ id: node.id, name: node.artist })),
            //     links: cycle.map((node, index, array) => ({ source: node.id, target: array[(index + 1) % array.length].id }))
            // };

            // formatedGraphData.nodes[0].x = 400;
            // formatedGraphData.nodes[0].y = 200;


            // const highlightedId = formatedGraphData.nodes[0].id;

            // setGraphData(formatedGraphData);

            // graph.current._setNodeHighlightedValue(highlightedId, true);
        })();
    }, []);

    return (
        <div>
            <Typography variant="h4" className={classes.title}> Welcome the exchange area</Typography>
            <Typography>Here you can find the exchanges possabilities</Typography>
            {//     <Graph
                //         id="exchangesGraph"
                //         data={graphData}
                //         config={graphConfig}
                //         ref={graph}
                //     /> */}
            }
            { exchanges.length === 0 ? <div /> : exchanges.map((exchange, index) => (
                <Card className={classes.root} key={uuid()}>
                    <CardContent>
                        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                            {`Exchange option #${index + 1}`}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            You will Recieve:
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {
                                _.findIndex(exchange, (node) => node.userId === userId) !== -1
                                    ? exchange[(_.findIndex(exchange, (node) => node.userId === userId) - 1) % exchange.length].artist
                                    : null
                            }
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            If you give:
                        </Typography>
                        <Typography variant="h5" component="h3">
                            {
                                _.findIndex(exchange, (node) => node.userId === userId) !== -1
                                    ? exchange[(_.findIndex(exchange, (node) => node.userId === userId))].artist
                                    : null
                            }
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton>
                            <CheckIcon />
                        </IconButton>
                        <IconButton>
                            <BlockIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </div>

    // <div></div>
    );
}