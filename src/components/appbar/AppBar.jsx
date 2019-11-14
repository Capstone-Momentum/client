import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        background: 'linear-gradient(90deg, rgba(4, 255, 210, 0) -2.53%, #019738 102.15%);',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        marginRight: '2%',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 200,
            '&:focus': {
                width: 350,
            },
        },
    },
}));


export default function AppBar() {
    const classes = useStyles();

    const title = (
        <Typography className={classes.title} variant="h6" noWrap>
            Hourglass Project
        </Typography>
    )

    const menu = (
        <Grid container direction='row' alignItems='center' spacing={3}>
            <Grid item xs={2}>
                {title}
            </Grid>
            <Grid item>
                <Typography>
                    Interactive Map
                </Typography>
            </Grid>
        </Grid>
    )

    const searchBar = (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    )

    const accountIcon = (
        <IconButton>
            <AccountCircleIcon fontSize='large' />
        </IconButton>
    )

    return (
        <div className={classes.root}>
            <MuiAppBar className={classes.appbar} position="static">
                <Toolbar>
                    {menu}
                    {searchBar}
                    {accountIcon}
                </Toolbar>
            </MuiAppBar>
        </div>
    );
}
