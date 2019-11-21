import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { Container, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
    },
    chip: {
        margin: theme.spacing(0.5),
        color: 'white'
    },
}));

// Note: data items can also include an onClick callback
// const mockChipData = [
//     { key: 0, label: 'Angular' },
//     { key: 1, label: 'jQuery' },
//     { key: 2, label: 'Polymer' },
//     { key: 3, label: 'React' },
//     { key: 4, label: 'Vue.js' },
// ]

export default function ChipsArray(props) {
    const classes = useStyles();
    const { data, setData, onPaper, color, chipStyle } = props

    const handleDelete = chipToDelete => () => {
        setData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
    };

    const chips = data.map(item => {
        return (item.tooltip) ? (
            <Tooltip title={item.tooltip} justify={item.justifyTooltip}>
                <Chip
                    key={item.key}
                    label={item.label}
                    onClick={item.onClick}
                    onDelete={setData ? handleDelete(item) : undefined}
                    className={chipStyle ? chipStyle : classes.chip}
                    color={color}
                />
            </Tooltip>
        ) : (
                <Chip
                    key={item.key}
                    label={item.label}
                    onClick={item.onClick}
                    onDelete={setData ? handleDelete(item) : undefined}
                    className={chipStyle ? chipStyle : classes.chip}
                    color={color}
                />
            )
    })

    return ((onPaper) ?
        <Paper className={classes.root}> {chips} </Paper> :
        <Container> {chips} </Container>
    );
}

