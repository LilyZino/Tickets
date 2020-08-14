import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Report from './report';
// import { registerSocketEvent, initSockets } from '../../_services/socketService';

const useStyles = makeStyles(() => ({
    title: {
        marginTop: 10,
        textAlign: 'center'
    }
}));

const ReportList = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [reports] = useState([]);
    const [newreports] = useState([[]]);
    const [merged] = useState([[]]);
    const [allset, setallset] = useState(false);

    useEffect(() => {
        const getReports = async () => {
            const response = await axios.get('/api/users/');
            setUsers(response.data);
            users.forEach((user) => {
                if (user.reports.length > 0) {
                    if (!reports.includes({ name: user.name, report: user.reports })) {
                        reports.push({ name: user.name, report: user.reports });
                    }
                }
            });
        };
        if (reports.length === 0) {
            getReports();
        }
        if (reports.length > 0) {
            newreports.fill(reports.map((x) => (
                x.report.map((r) => (
                    { name: x.name, complaint: r.complaint, by: r.byUser, _id: r._id })))));
        }

        if (newreports.length > 0) {
            merged.fill(newreports.flat());
            merged.fill(merged[0].flat());
            setallset(true);
        }

        // initSockets();
        // registerSocketEvent('reports-updated', () => {
        //     getReports();
        // });
    }, [merged, newreports, reports, users, allset]);

    return (
        <div>
            <div className={classes.title}>
                <Typography variant="h3" className={classes.title}>Reports</Typography>
            </div>
            {merged[0].map((x) => (
                <Report
                    key={x._id}
                    name={x.name}
                    complaint={x.complaint}
                    byUser={x.by}
                    _id={x._id}
                />
            ))}
        </div>
    );
};

export default ReportList;