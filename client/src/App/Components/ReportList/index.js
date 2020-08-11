import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Report from './report';

const useStyles = makeStyles(() => ({
    table: {
        marginTop: 30,
    },
    title: {
        marginTop: 10,
        textAlign: 'center'
    }
}));

const ReportList = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [reports, setreports] = useState([]);
    const [newreports, setnewreports] = useState([[]]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get('/api/users/');
            setUsers(response.data);
            users.forEach((user) => {
                if (user.reports.length > 0) {
                    reports.push({ ...{ name: user.name, report: user.reports } });
                    setnewreports(reports.map((x) => (
                        x.report.map((r) => (
                            { name: x.name, complaint: r.complaint, by: r.byUser })))));
                }
            });
        };
        if (reports.length === 0) {
            getUsers();
        }
    }, [newreports, reports, users]);

    return (
        <div>
            <div className={classes.title}>
                <Typography variant="h3" className={classes.title}>Reports</Typography>
            </div>
            {newreports[0].map((x) => (
                <Report
                    name={x.name}
                    reports={x.complaint}
                    reporter={x.by}
                />
            ))}
        </div>
    );
};

export default ReportList;