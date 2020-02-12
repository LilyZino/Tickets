import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { registerSocketEvent } from '../../_services/socketService';
import moment from 'moment';

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

export default function Charts() {
  const [Tickets, setTickets] = useState([]);
  const [Users, setUsers] = useState([]);
  const [concertTickets, setConcertTickets] = useState([]);
  useEffect(() => {
    const getTicketForConcert = async () => {

      const response = await axios.get(`/api/concerts/`);
      setConcertTickets(response.data);
    };

    getTicketForConcert();
    const getTicket = async () => {

      const response = await axios.get(`/api/tickets/`);
      setTickets(response.data);
    };

    getTicket();

    const getUsers = async () => {

      const response = await axios.get(`/api/users/`);
      setUsers(response.data);
    };

    getUsers();

  }, []);
  
  const classes = useStyles();
  var pointsBuild = [];
  for (var i = 0; i < concertTickets.length; i++) {
    pointsBuild.push(moment(concertTickets[i].time).format('MM'));
  }

  var a = [], b = [], prev;

  pointsBuild.sort();
  for (var i = 0; i < pointsBuild.length; i++) {
    if (pointsBuild[i] !== prev) {
      a.push(pointsBuild[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = pointsBuild[i];
  }
  var months = [
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

  var r = [];

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
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>'
    },
    series: [
      {
        colorByPoint: true,
        type: 'column',
        data: r
      }
    ]
  };

  //Pie Chart

  var arr = [];
  for (var i = 0; i < Tickets.length; i++) {
    var myid = Tickets[i].user;
    for (var j = 0; j < Users.length; j++) {
      if (Users[j]._id == myid)
        var myuser = Users[j]
    }
    var myname = myuser.name
    arr.push(myname);
  }

  var names = [], count = [], prev2;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev2) {
      names.push(arr[i]);
      count.push(1);
    } else {
      count[count.length - 1]++;
    }
    prev2 = arr[i];
  }

  var ticksperUsr = [];

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
      text: 'Tickets per User'
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
        name: 'Brands',
        colorByPoint: true,
        data: ticksperUsr
      }]
  };



  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <HighchartsReact highcharts={Highcharts} options={pieoptions} />
    </div>
  );
}

