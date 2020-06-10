import React, { useState, useEffect, useRef } from 'react';
import { Graph } from 'react-d3-graph';
import axios from 'axios';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { authenticationService } from '../../_services';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';

const useStyles = makeStyles({
    title: {
        marginTop: '10px'
    },
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Exchanges(props) {
    // const [graphData, setGraphData] = useState({ nodes: [{ id: 'init' }], links: [] });
    // const theme = useTheme();
    const classes = useStyles();
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

    // useEffect(() => {
    //     (async () => {
    //         const userId = authenticationService.currentUserValue.data
    //             ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;

    //         const cycle = (await axios.get(`/api/exchangeCycles/${userId}`)).data;

    //         console.log(cycle);
    //         console.log(graph);

    //         const formatedGraphData = {
    //             nodes: cycle.map((node) => ({ id: node.id, name: node.artist })),
    //             links: cycle.map((node, index, array) => ({ source: node.id, target: array[(index + 1) % array.length].id }))
    //         };

    //         formatedGraphData.nodes[0].x = 400;
    //         formatedGraphData.nodes[0].y = 200;


    //         const highlightedId = formatedGraphData.nodes[0].id;

    //         setGraphData(formatedGraphData);

    //         graph.current._setNodeHighlightedValue(highlightedId, true);
    //     })();
    // }, []);

    const bull = <span className={classes.bullet}>•</span>;

    return (
        // <div>
        //     <Typography variant="h4" className={classes.title}> Welcome the exchange area</Typography>
        //     <Typography>Here you can find the exchanges possabilities</Typography>
        //     <Graph
        //         id="exchangesGraph"
        //         data={graphData}
        //         config={graphConfig}
        //         ref={graph}
        //     />
        // </div>
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Exchange option #1
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    You will Recieve:
                </Typography>
                <Typography variant="h5" component="h2">
                    Ravid Plutnik
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    If you give:
                </Typography>
                <Typography variant="h5" component="h3">
                    Lady Gaga
                </Typography>

                {/* <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography> */}
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
    );
}