import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

// data items can also include onClick
const mockChipData = [
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
]

export default function ChipsArray(props) {
    const classes = useStyles();
    const { data, setData } = props

    const handleDelete = chipToDelete => () => {
        setData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
    };

    return (
        <Paper className={classes.root}>
            {data.map(item => {
                let icon;

                if (item.label === 'React') {
                    icon = <TagFacesIcon />;
                }

                return (
                    <Chip
                        key={item.key}
                        icon={icon}
                        label={item.label}
                        onClick={item.onClick}
                        onDelete={handleDelete(item)}
                        className={classes.chip}
                    />
                );
            })}
        </Paper>
    );
}
