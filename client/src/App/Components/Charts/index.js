import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

export default function Charts() {
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
    for (i = 0; i < concertTickets.length; i++) {
        pointsBuild.push(moment(concertTickets[i].time).format('MM'));
    }

    const a = []; const b = []; let
        prev;

    pointsBuild.sort();
    for (i = 0; i < pointsBuild.length; i++) {
        if (pointsBuild[i] !== prev) {
            a.push(pointsBuild[i]);
            b.push(1);
        } else {
            b[b.length - 1]++;
        }
        prev = pointsBuild[i];
    }
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
    console.log(Tickets);
    const arr = [];
    let myid = {};
    let myuser = {};
    let myname = {};
    for (i = 0; i < Tickets.length; i++) {
        myid = Tickets[i].user;
        for (let j = 0; j < Users.length; j++) {
            if (Users[j]._id === myid) myuser = Users[j];
        }
        myname = myuser.name;
        arr.push(myname);
    }
    arr.sort();

    const names = []; const count = []; let
        prev2;

    for (i = 0; i < arr.length; i++) {
        if (arr[i] !== prev2) {
            names.push(arr[i]);
            count.push(1);
        } else {
            count[count.length - 1]++;
        }
        prev2 = arr[i];
    }

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
            <HighchartsReact highcharts={Highcharts} options={options} />
            <br />
            <br />
            <HighchartsReact highcharts={Highcharts} options={pieoptions} />
        </div>
    );
}
