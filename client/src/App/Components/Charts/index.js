import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

const useStyles = makeStyles({
    title: {
        marginTop: '10px'
    },
    error: {
        textAlign: 'center'
    },
    center: {
        textAlign: 'center'
    }
});

export default function Charts() {
    const classes = useStyles();

    let i;

    const [Tickets, setTickets] = useState([]);
    const [Users, setUsers] = useState([]);
    const [concertTickets, setConcertTickets] = useState([]);

    useEffect(() => {
        const getTicketForConcert = async () => {
            const response = await axios.get('/api/concerts/');
            setConcertTickets(response.data);
        };

        getTicketForConcert();
        const getTicket = async () => {
            const response = await axios.get('/api/tickets/');
            setTickets(response.data);
        };

        getTicket();

        const getUsers = async () => {
            const response = await axios.get('/api/users/');
            setUsers(response.data);
        };

        getUsers();
    }, []);


    const pointsBuild = [];
    concertTickets.forEach((x) => { pointsBuild.push(moment(x.time).format('MM')); });
    pointsBuild.sort();

    const a = []; const b = []; let prev;
    pointsBuild.forEach((x) => {
        if (x !== prev) {
            a.push(x);
            b.push(1);
        } else {
            b[b.length - 1]++;
        }
        prev = x;
    });
    const months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ];

    function monthNumToName(monthnum) {
        return months[monthnum - 1] || '';
    }
    for (i = 0; i < a.length; i++) {
        a[i] = monthNumToName(a[i]);
    }

    const r = [];

    for (i = 0; i < a.length; i++) {
        r.push({ name: a[i], y: b[i] });
    }

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Concerts per month'
        },
        legend: {
            enabled: false
        },
        xAxis: {
            type: 'category'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        tooltip: {
            enabled: false
        },
        series: [
            {
                colorByPoint: true,
                type: 'column',
                data: r
            }
        ]
    };

    // Pie Chart
    const arr = [];
    let myid = {};
    let myuser = {};
    let myname = {};
    Tickets.forEach((x) => {
        myid = x.user;
        Users.forEach((y) => { if (y._id === myid) myuser = y; });
        myname = myuser.name;
        arr.push(myname);
    });
    arr.sort();

    const names = []; const count = []; let prev2;

    arr.forEach((x) => {
        if (x !== prev2) {
            names.push(x);
            count.push(1);
        } else {
            count[count.length - 1]++;
        }
        prev2 = x;
    });

    const ticksperUsr = [];

    for (i = 0; i < names.length; i++) {
        ticksperUsr.push({ name: names[i], y: count[i] });
    }

    const pieoptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Posts per User'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [
            {
                name: 'Tickets',
                colorByPoint: true,
                data: ticksperUsr
            }]
    };


    return (
        <div>
            <div className={classes.center}>
                <Typography variant="h3" className={classes.title}>Statistics</Typography>
            </div>
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
                <HighchartsReact highcharts={Highcharts} options={pieoptions} />
            </div>
        </div>
    );
}
