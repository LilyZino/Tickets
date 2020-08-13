import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import User from '../User';

const useStyles = makeStyles(() => ({
    table: {
        marginTop: 30,
    }
}));

const UsersList = () => {
    const classes = useStyles();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get('/api/users/');
            setUsers(response.data);
        };

        getUsers();
    }, [users]);

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Mail</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Rank</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.sort((a, b) => b.rank - a.rank).map((user) => (
                        <User
                            key={user._id}
                            id={user._id}
                            name={user.name}
                            email={user.email}
                            phone={user.phone}
                            rank={user.rank}
                            isBlocked={user.isBlocked}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersList;