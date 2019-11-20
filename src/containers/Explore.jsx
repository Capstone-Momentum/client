import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getAllCensusDatasetItems } from '../graphql/queries/census/general';
import Autocomplete from '../components/autocomplete/Autocomplete';

const useStyles = makeStyles({
    root: {
        height: '100%',
        padding: '2% 4% 0 4%'
    },
    autocomplete: {
        position: 'relative',
        width: '30vw'
    }
})

export default function Explore() {
    const classes = useStyles()
    const [selectedItem, setSelectedItem] = React.useState('')
    const [datasetItems, setDatasetItems] = React.useState([])
    const [suggestions, setSuggestions] = React.useState([])

    React.useEffect(() => {
        const getDatasetItems = async () => {
            let items = await getAllCensusDatasetItems()
            items = JSON.parse(JSON.parse(items))
            console.log(typeof items)
            setDatasetItems(items)
            const suggestions = items.map(i => ({ label: i.title }))
            setSuggestions(suggestions)
        }
        getDatasetItems()
    }, [])

    return (
        <Grid className={classes.root} container direction='column' alignItems='center' justify='center' spacing={4}>
            <Grid item>
                <Typography variant='h5'> Explore </Typography>
            </Grid>
            <Grid item>
                <Autocomplete
                    label='Datasets'
                    suggestions={suggestions}
                    onChange_={selectedItem => setSelectedItem(selectedItem)}
                    selectedItem={selectedItem}
                    containerStyle={classes.autocomplete}
                />
            </Grid>
        </Grid>
    )
}

