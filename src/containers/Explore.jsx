import React from 'react';
import { Grid, Typography, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DataSourcesAutocomplete from '../components/autocomplete/DataSourcesAutocomplete';
import { useHistory } from "react-router-dom";
import ChipsArray from '../components/chips/ChipsArray';

const useStyles = makeStyles({
    root: {
        height: '100%',
        padding: '2% 4% 0 4%'
    },
    autocomplete: {
        position: 'relative',
        width: '30vw'
    },
    card: {
        width: '45vw',
        marginBottom: '2vh'
    }
})

export default function Explore() {
    const classes = useStyles()
    const [dataSource, setDataSource] = React.useState('')
    const [dataSourceObjs, setDataSourceObjs] = React.useState([])
    // const [dataSourceTables, setDataSourceTables] = React.useState([])
    let history = useHistory()

    const getSelectedDataSourceObj = (dataSource) => {
        return dataSourceObjs.filter(obj => obj.name === dataSource)[0]
    }

    // const setTablesForDataSource = (dataSource) => {
    //     if (dataSource) {
    //         const dataSourceObj = getSelectedDataSourceObj(dataSource)
    //         setDataSourceTables(dataSourceObj.associated_tables.map(dst => ({ label: dst })))
    //     }
    // }

    return (
        <Grid className={classes.root} container direction='column' alignItems='center' justify='center' spacing={4}>
            <Grid item>
                <Typography variant='h5'> Explore </Typography>
            </Grid>
            <Grid item>
                <DataSourcesAutocomplete
                    selectedItem={dataSource}
                    setSelectedItem={setDataSource}
                    setItems={setDataSourceObjs} // if you want all the items accessible in the parent
                // onSelect={setTablesForDataSource}
                />
            </Grid>
            {(dataSource && dataSource.length > 0) &&
                <Grid item>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant='h6' gutterBottom>
                                Description
                            </Typography>
                            <Typography variant='body1' gutterBottom>
                                {getSelectedDataSourceObj(dataSource).description}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant='h6' gutterBottom>
                                Available Data
                            </Typography>
                            <ChipsArray
                                color='primary'
                                data={getSelectedDataSourceObj(dataSource).associated_tables.map(t => ({
                                    key: t,
                                    label: t,
                                    tooltip: 'Click to View',
                                    onClick: () => {
                                        history.push({
                                            pathname: '/data-viewer',
                                            state: { detail: { table: t } }
                                        })
                                    }, // Default: scan entire table and display in a Table, however, special mappings can change this
                                }))}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            }
            {/* <Grid item>
                <Autocomplete
                    label={`${dataSource} Datasets`}
                    placeholder={`Select a ${dataSource} Dataset...`}
                    suggestions={dataSourceTables}
                    onChange={table => setTable(table)}
                    selectedItem={table}
                    containerStyle={classes.autocomplete}
                />
            </Grid> */}
        </Grid>
    )
}

