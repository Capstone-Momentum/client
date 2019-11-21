import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useLocation } from "react-router-dom";
import FixedHeaderTable from '../components/table/FixedHeaderTable';
import { scanTable } from '../graphql/queries/explore/general';

const useStyles = makeStyles({
    root: {
        padding: '2% 4% 0 4%'
    },
    title: {
        paddingBottom: '2%'
    }
})

export default function DataViewer() {
    const classes = useStyles()
    const location = useLocation()
    const table = location.state.detail.table
    const [rows, setRows] = React.useState([])
    const [columns, setColumns] = React.useState([])

    useEffect(() => {
        const load = async () => {
            let data = await scanTable(table)
            data = JSON.parse(JSON.parse(data))
            setColumns(Object.keys(data[0]).map(attr => ({ id: attr, label: attr })))
            data = data.map(item => ({ ...item, key: JSON.stringify(item) }))
            setRows(data)
        }
        load()
    }, [table])

    return (
        <Grid container className={classes.root} direction='column' alignItems='center'>
            <Typography className={classes.title} variant='h5'> Data Viewer </Typography>
            <FixedHeaderTable
                title={`${table}`}
                rows={rows}
                columns={columns}
            />
        </Grid>
    )
}