import React, { useState, useEffect } from 'react';
import { Graph } from 'react-d3-graph';

export default function Exchanges() {
    const [graphData, setGraphData] = useState({ nodes: [{ id: 'init' }], links: [] });
    const graphConfig = {
        directed: true,
        // staticGraph: true
        node: {
            color: 'purple'
        }
    };

    useEffect(() => {
        setGraphData({
            nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
            links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }],
        });
    }, []);

    return (
        <Graph
            id="exchangesGraph"
            data={graphData}
            config={graphConfig}
        />
    );
}