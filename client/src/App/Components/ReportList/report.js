import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles(() => ({
    card: {
        minWidth: 275,
        marginTop: 15,
    },
    sideDiv: {
        float: 'right',
        margin: '10px'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));

export default function Report(props) {
    const classes = useStyles();
    const { name, complaint, byUser, _id } = props;

    const solveReport = async (target) => {
        await axios.post('/api/users/remove_report', {
            object: { _id, complaint, byUser },
            target
        });
    };

    return (
        <Card className={classes.card} elavation="2">
            <div className={classes.cardContent}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        <b>{name}</b> was reported by {byUser}
                    </Typography>
                    <Typography>
                        {complaint}
                    </Typography>
                </CardContent>
            </div>
            <div className={classes.sideDiv}>
                <CardActions>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            solveReport(name);
                        }}
                    >
                    Mark as solved
                    </Button>
                </CardActions>
            </div>
        </Card>
    );
}