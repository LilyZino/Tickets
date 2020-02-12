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
  const [concertTickets, setConcertTickets] = useState([]);
  useEffect(() => {
    const getTicketForConcert = async () => {

        const response = await axios.get(`/api/concerts/`);
        //console.log('get all tickets of concert', response.data);
        setConcertTickets(response.data);
    };

    getTicketForConcert();

    registerSocketEvent('tickets-updated', () => {
        console.log('tickets was updated');
        getTicketForConcert();
    });
}, []);
    const classes = useStyles();
    var pointsBuild = [];
    for(var i=0; i<concertTickets.length; i++) {
        pointsBuild.push(moment(concertTickets[i].time).format('MM'));
    }
    
      var a = [], b = [], prev;
  
      pointsBuild.sort();
      for ( var i = 0; i < pointsBuild.length; i++ ) {
          if ( pointsBuild[i] !== prev ) {
              a.push(pointsBuild[i]);
              b.push(1);
          } else {
              b[b.length-1]++;
          }
          prev = pointsBuild[i];
      }
      console.log(a);
      console.log(b);
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
    console.log(a);
  
      var r = [];

      for (i = 0; i < a.length; i++) {

        r.push({name:a[i], y:b[i]});
      }
      console.log(r);

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









      /*const [concertTickets, setConcertTickets] = useState([]);
      useEffect(() => {
        const getTicketForConcert = async () => {
    
            const response = await axios.get(`/api/concerts/`);
            console.log('get all tickets of concert', response.data);
            setConcertTickets(response.data);
        };
    
        getTicketForConcert();
    
        registerSocketEvent('tickets-updated', () => {
            console.log('tickets was updated');
            getTicketForConcert();
        });
    }, []);
        const classes = useStyles();
        var pointsBuild = [];
        for(var i=0; i<concertTickets.length; i++) {
            pointsBuild.push(moment(concertTickets[i].time).format('MM'));
            console.log(pointsBuild[i]);
        }
        var groups = [];
        for (var i = 0; i < pointsBuild.length; i++) {
          var groupName = pointsBuild[i];
          if (!groups[groupName]) {
            groups[groupName] = [];
          }
          groups[groupName];
        }
    
    myArray = [];
    for (var groupName in groups) {
      myArray.push({group: groupName, color: groups[groupName]});
    }*/
        const pieoptions = {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
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
        data: r
        }]
          };



    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <HighchartsReact highcharts={Highcharts} options={pieoptions} />
        </div>
    );
}

