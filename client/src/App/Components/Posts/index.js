import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        marginTop: 15
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Post(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.artist}, {props.date}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.text}
                </Typography>
                <Typography align="right">
                    {props.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">More Details</Button>
            </CardActions>
        </Card>
    );
}