import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BlockUser from '../BlockUser';

export default function User(props) {
    const { id, name, email, phone, rank, isBlocked } = props;

    return (
        <TableRow key={id}>
            <TableCell component="th" scope="row">
                {name}
            </TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{rank}</TableCell>
            <TableCell>
                <BlockUser isBlocked={isBlocked} id={id} />
            </TableCell>
        </TableRow>
    );
}