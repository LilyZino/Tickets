import React, { useState, useEffect } from 'react';
import { Graph } from 'react-d3-graph';
import axios from 'axios';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { authenticationService } from '../../_services';
import { useRef } from 'react';

const useStyles = makeStyles({
    title: {
        marginTop: '10px'
    }
});

export default function Exchanges(props) {
    const [graphData, setGraphData] = useState({ nodes: [{ id: 'init' }], links: [] });
    const theme = useTheme();
    const classes = useStyles();
    const graph = useRef();

    const graphConfig = {
        directed: true,
        highlightDegree: 0,
        node: {
            color: theme.palette.secondary.main,
            labelProperty: 'name',
            size: 900,
            fontSize: 12,
            highlightFontSize: 16,
            highlightFontWeight: 'bold',
            highlightStrokeColor: 'black',
            highlightStrokeWidth: 3,
        },
        link: {
            color: theme.palette.primary.main,
            type: 'CURVE_SMOOTH',
            // semanticStrokeWidth:true,
            strokeWidth: 3
        }
    };

    useEffect(() => {
        (async () => {
            const userId = authenticationService.currentUserValue.data
                ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;

            const cycle = (await axios.get(`/api/exchangeCycles/${userId}`)).data;

            console.log(cycle);
            console.log(graph);

            const formatedGraphData = {
                nodes: cycle.map((node) => ({ id: node.id, name: node.artist })),
                links: cycle.map((node, index, array) => ({ source: node.id, target: array[(index + 1) % array.length].id }))
            };

            formatedGraphData.nodes[0].x = 400;
            formatedGraphData.nodes[0].y = 200;


            const highlightedId = formatedGraphData.nodes[0].id;

            setGraphData(formatedGraphData);

            graph.current._setNodeHighlightedValue(highlightedId, true);

        })();
    }, []);

    return (
        <div>
            <Typography variant="h4" className={classes.title}> Welcome the exchange area</Typography>
            <Typography>Here you can find the exchanges possabilities</Typography>
            <Graph
                id="exchangesGraph"
                data={graphData}
                config={graphConfig}
                ref={graph}
            />
        </div>
    );
}