
import React from 'react';
import Autocomplete from './DownshiftAutocomplete';
import { makeStyles } from '@material-ui/styles';
import { getAllCensusDatasetItems } from '../../graphql/queries/census/general';

const useStyles = makeStyles({
    autocomplete: {
        position: 'relative',
        width: '30vw'
    }
})

/*
    Define the following in the parent component to use the autocomplete field:

    For state:
    const [selectedItem, setSelectedItem] = React.useState('')
    const [datasetItems, setDatasetItems] = React.useState([])

    To render:
    <CensusDatasetsAutocomplete
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setDatasetItems={setDatasetItems} // if you want all the items accessible in the parent
    />
*/

export default function CensusDatasetsAutocomplete(props) {
    const classes = useStyles()
    const { selectedItem, setSelectedItem, setDatasetItems } = props
    const [suggestions, setSuggestions] = React.useState([])

    React.useEffect(() => {
        const getDatasetItems = async () => {
            let items = await getAllCensusDatasetItems()
            items = JSON.parse(JSON.parse(items))
            if (setDatasetItems) setDatasetItems(items)
            const suggestions = items.map(i => ({ label: i.title }))
            setSuggestions(suggestions)
        }
        getDatasetItems()
    }, [])

    return (
        <Autocomplete
            label='Datasets'
            suggestions={suggestions}
            onChange={selectedItem => setSelectedItem(selectedItem)}
            selectedItem={selectedItem}
            containerStyle={classes.autocomplete}
        />
    )
}
