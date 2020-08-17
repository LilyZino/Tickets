import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Report from './report';

const useStyles = makeStyles(() => ({
    title: {
        marginTop: 10,
        textAlign: 'center'
    }
}));

export default function ReportList() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const blah = (await axios.get('/api/users/'));
            setUsers(blah.data);
        })();
    }, []);

    return (
        <div>
            <div className={classes.title}>
                <Typography variant="h3" className={classes.title}>Reports</Typography>
            </div>
            {users.map((user) => {
                return user.reports.map((report) => (
                    <Report
                        user={user} // the user that  was reported
                        key={Date()}
                        name={user.name}
                        complaint={report.complaint}
                        byUser={report.byUser}
                        _id={report._id}
                    />
                ));
            })}
        </div>
    );
};